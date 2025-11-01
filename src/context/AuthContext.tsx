import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { createAuthenticatedApiCall } from '@/openapi/auth-utils';
import { LoginApi, UserApi, DefaultConfig } from '@/openapi/client';
import { createAuthenticatedConfiguration } from '@/openapi/configurations';
import { tokenManager } from '@/utils/token-manager';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { tokenCache } from '../../utils/cache';
import * as AuthSession from 'expo-auth-session';

interface User {
  id: string;
  email: string;
  tel?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  tokenExpiration: number | null;
  isLoading: boolean;
  isInitialized: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  signup: (email: string, tel: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  refreshAccessToken: () => Promise<boolean>;
  isTokenExpired: (token?: string | null) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'auth-storage';
const STORAGE_VERSION = 1;
const isWeb = Platform.OS === 'web';

const getTokenExpirationTime = (token: string | null): number | null => {
  if (!token) return null;

  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const payload = JSON.parse(atob(parts[1]));
    return payload.exp || null;
  } catch {
    return null;
  }
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null,
    refreshToken: null,
    tokenExpiration: null,
    isLoading: true,
    isInitialized: false,
  });

  // Storage utilities
  const saveAuthData = useCallback(async (authData: Partial<AuthState>) => {
    try {
      const dataToStore = {
        ...authData,
        version: STORAGE_VERSION,
        timestamp: Date.now(),
      };
      await SecureStore.setItemAsync(STORAGE_KEY, JSON.stringify(dataToStore));
    } catch (error) {
      console.error('Error saving auth data:', error);
    }
  }, []);

  const loadAuthData = useCallback(async (): Promise<Partial<AuthState> | null> => {
    try {
      const stored = await SecureStore.getItemAsync(STORAGE_KEY);
      if (!stored) return null;

      const parsed = JSON.parse(stored);
      if (parsed.version !== STORAGE_VERSION) {
        await SecureStore.deleteItemAsync(STORAGE_KEY);
        return null;
      }

      // Check if data is not too old (30 days)
      const maxAge = 30 * 24 * 60 * 60 * 1000;
      if (parsed.timestamp && Date.now() - parsed.timestamp > maxAge) {
        await SecureStore.deleteItemAsync(STORAGE_KEY);
        return null;
      }

      return {
        user: parsed.user || null,
        token: parsed.token || null,
        refreshToken: parsed.refreshToken || null,
        tokenExpiration: parsed.tokenExpiration || null,
      };
    } catch (error) {
      console.error('Error loading auth data:', error);
      await SecureStore.deleteItemAsync(STORAGE_KEY);
      return null;
    }
  }, []);

  // Initialize authentication state on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        console.log('🔐 Initializing authentication...');

        const storedAuth = await loadAuthData();
        if (!storedAuth?.token || !storedAuth?.refreshToken) {
          console.log('📱 No stored tokens found');
          setState(prev => ({ ...prev, isLoading: false, isInitialized: true }));
          return;
        }

        console.log('📱 Found stored tokens, validating...');

        // Check if token is expired
        if (isTokenExpired(storedAuth.token)) {
          console.log('🚨 Stored token is expired, attempting refresh...');

          // Try to refresh the token
          tokenManager.setToken(storedAuth.token);
          tokenManager.setRefreshToken(storedAuth.refreshToken);

          const refreshSuccess = await refreshAccessToken();
          if (!refreshSuccess) {
            console.log('❌ Token refresh failed, clearing session');
            await clearAuthData();
            setState(prev => ({ ...prev, isLoading: false, isInitialized: true }));
            return;
          }
        } else {
          // Token is valid, set it up
          tokenManager.setToken(storedAuth.token);
          tokenManager.setRefreshToken(storedAuth.refreshToken);

          if (!isWeb && tokenCache) {
            await tokenCache.saveToken('accessToken', storedAuth.token);
            await tokenCache.saveToken('refreshToken', storedAuth.refreshToken);
          }
        }

        // Validate authentication with server
        await validateAuthentication();

      } catch (error) {
        console.error('❌ Error initializing auth:', error);
        await clearAuthData();
        setState(prev => ({ ...prev, isLoading: false, isInitialized: true }));
      }
    };

    initializeAuth();
  }, []);

  // Validate authentication with server
  const validateAuthentication = useCallback(async () => {
    try {
      console.log('🔍 Validating authentication with server...');

      const userApi = new UserApi(createAuthenticatedConfiguration());
      const response = await createAuthenticatedApiCall(
        async () => await userApi.getAppUserdomainPresentationGetmeGetmeRaw()
      );

      const userData = await response.value();
      const currentUser = {
        id: 'current',
        email: userData.email || '',
        tel: (userData as any).phoneNumber || (userData as any).tel || '',
      };

      console.log('✅ Authentication validated, user:', currentUser.email);

      setState(prev => ({
        ...prev,
        isAuthenticated: true,
        user: currentUser,
        isLoading: false,
        isInitialized: true,
      }));

    } catch (error: any) {
      console.error('❌ Authentication validation failed:', error);

      if (error.response?.status === 401) {
        console.log('🚨 Token rejected by server, attempting refresh...');

        const refreshSuccess = await refreshAccessToken();
        if (refreshSuccess) {
          // Retry validation with new token
          try {
            await validateAuthentication();
            return;
          } catch (retryError) {
            console.error('❌ Validation failed even after refresh:', retryError);
          }
        }
      }

      // Clear invalid session
      await clearAuthData();
      setState(prev => ({ ...prev, isLoading: false, isInitialized: true }));
    }
  }, []);

  // Clear all authentication data
  const clearAuthData = useCallback(async () => {
    tokenManager.setToken(null);
    tokenManager.setRefreshToken(null);

    try {
      await SecureStore.deleteItemAsync(STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing auth storage:', error);
    }

    if (!isWeb && tokenCache) {
      try {
        await tokenCache.saveToken('accessToken', '');
        await tokenCache.saveToken('refreshToken', '');
      } catch (error) {
        console.error('Error clearing token cache:', error);
      }
    }
  }, []);

  // Refresh access token
  const refreshAccessToken = useCallback(async (): Promise<boolean> => {
    const currentRefreshToken = state.refreshToken;
    if (!currentRefreshToken) {
      console.warn('No refresh token available');
      return false;
    }

    try {
      console.log('🔄 Refreshing access token...');

      const response = await fetch(DefaultConfig.basePath + '/api/token/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token: currentRefreshToken }),
      });

      if (!response.ok) {
        console.warn('Token refresh failed:', response.status);
        return false;
      }

      const data = await response.json();
      const newToken = data.token;
      const newRefreshToken = data.refresh_token;

      if (!newToken) {
        console.warn('No token received from refresh endpoint');
        return false;
      }

      console.log('✅ Token refresh successful');

      // Update token manager
      tokenManager.setToken(newToken);
      tokenManager.setRefreshToken(newRefreshToken);

      // Update state
      setState(prev => ({
        ...prev,
        token: newToken,
        refreshToken: newRefreshToken,
        tokenExpiration: getTokenExpirationTime(newToken),
      }));

      // Save to storage
      await saveAuthData({
        token: newToken,
        refreshToken: newRefreshToken,
        tokenExpiration: getTokenExpirationTime(newToken),
      });

      // Update token cache
      if (!isWeb && tokenCache) {
        await tokenCache.saveToken('accessToken', newToken);
        await tokenCache.saveToken('refreshToken', newRefreshToken);
      }

      return true;
    } catch (error) {
      console.error('Token refresh error:', error);
      return false;
    }
  }, [state.refreshToken, saveAuthData]);

  // Login with email and password
  const login = useCallback(async (email: string, password: string): Promise<void> => {
    try {
      console.log('🔑 Attempting login...');
      setState(prev => ({ ...prev, isLoading: true }));

      const loginApi = new LoginApi();
      const response = await loginApi.apiAuthPost({
        apiAuthPostRequest: { email, password },
      });

      const newToken = response.token;
      const newRefreshToken = response.refreshToken;

      if (!newToken || !newRefreshToken) {
        throw new Error('Invalid login response: missing tokens');
      }

      const newUser = { id: 'temp', email, tel: '' };

      console.log('✅ Login successful');

      // Update token manager
      tokenManager.setToken(newToken);
      tokenManager.setRefreshToken(newRefreshToken);

      // Update state
      setState(prev => ({
        ...prev,
        isAuthenticated: true,
        user: newUser,
        token: newToken,
        refreshToken: newRefreshToken,
        tokenExpiration: getTokenExpirationTime(newToken),
        isLoading: false,
      }));

      // Save to storage
      await saveAuthData({
        isAuthenticated: true,
        user: newUser,
        token: newToken,
        refreshToken: newRefreshToken,
        tokenExpiration: getTokenExpirationTime(newToken),
      });

      // Save to token cache
      if (!isWeb && tokenCache) {
        await tokenCache.saveToken('accessToken', newToken);
        await tokenCache.saveToken('refreshToken', newRefreshToken);
      }

    } catch (error) {
      console.error('❌ Login error:', error);
      setState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  }, [saveAuthData]);

  // Signup with email, phone, and password
  const signup = useCallback(async (email: string, tel: string, password: string): Promise<void> => {
    try {
      console.log('📝 Attempting signup...');
      setState(prev => ({ ...prev, isLoading: true }));

      const userApi = new UserApi();
      await userApi.userSignUp({
        userSignUpDTO: { email, phoneNumber: tel, password },
      });

      console.log('✅ Signup successful');
      setState(prev => ({ ...prev, isLoading: false }));

    } catch (error) {
      console.error('❌ Signup error:', error);
      setState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  }, []);

  // Login with Google OAuth
  const loginWithGoogle = useCallback(async (): Promise<void> => {
    try {
      console.log('🔐 Attempting Google OAuth login...');
      setState(prev => ({ ...prev, isLoading: true }));

      // OAuth Configuration
      const config = {
        clientId: isWeb
          ? (process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID || '')
          : (process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID || ''),
        scopes: ['openid', 'profile', 'email'],
        redirectUri: AuthSession.makeRedirectUri({
          path: 'oauthredirect',
        }),
      };

      // Validate configuration
      if (!config.clientId) {
        throw new Error('Google OAuth client ID is not configured. Please check your environment variables.');
      }

      // Create OAuth request
      const request = new AuthSession.AuthRequest({
        clientId: config.clientId,
        scopes: config.scopes,
        responseType: AuthSession.ResponseType.Code,
        redirectUri: config.redirectUri,
        prompt: AuthSession.Prompt.SelectAccount,
        usePKCE: true,
      });

      // Get discovery document
      const discovery = {
        authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
        tokenEndpoint: 'https://oauth2.googleapis.com/token',
        revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
      };

      // Perform OAuth flow
      const result = await request.promptAsync(discovery);

      if (result.type !== 'success') {
        console.log('❌ OAuth cancelled or failed:', result.type);
        setState(prev => ({ ...prev, isLoading: false }));
        return;
      }

      // Exchange authorization code for tokens
      const tokenResult = await AuthSession.exchangeCodeAsync(
        {
          clientId: config.clientId,
          code: result.params.code,
          redirectUri: config.redirectUri,
          extraParams: request.codeVerifier ? { code_verifier: request.codeVerifier } : {},
        },
        discovery
      );

      // Get user info from Google
      const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
          Authorization: `Bearer ${tokenResult.accessToken}`,
        },
      });

      if (!userInfoResponse.ok) {
        throw new Error('Failed to fetch user info from Google');
      }

      const googleUser = await userInfoResponse.json();

      // Create user object
      const newUser = {
        id: googleUser.id,
        email: googleUser.email,
        tel: googleUser.phone_number || '',
      };

      console.log('✅ Google OAuth successful for user:', newUser.email);

      // Update token manager
      tokenManager.setToken(tokenResult.accessToken);
      tokenManager.setRefreshToken(tokenResult.refreshToken || null);

      // Update state
      setState(prev => ({
        ...prev,
        isAuthenticated: true,
        user: newUser,
        token: tokenResult.accessToken,
        refreshToken: tokenResult.refreshToken || null,
        tokenExpiration: tokenResult.expiresIn
          ? Math.floor(Date.now() / 1000) + tokenResult.expiresIn
          : null,
        isLoading: false,
      }));

      // Save to storage
      await saveAuthData({
        isAuthenticated: true,
        user: newUser,
        token: tokenResult.accessToken,
        refreshToken: tokenResult.refreshToken || null,
        tokenExpiration: tokenResult.expiresIn
          ? Math.floor(Date.now() / 1000) + tokenResult.expiresIn
          : null,
      });

      // Save to token cache
      if (!isWeb && tokenCache) {
        await tokenCache.saveToken('accessToken', tokenResult.accessToken);
        if (tokenResult.refreshToken) {
          await tokenCache.saveToken('refreshToken', tokenResult.refreshToken);
        }
      }

    } catch (error) {
      console.error('❌ Google OAuth error:', error);
      setState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  }, [saveAuthData]);

  // Logout
  const logout = useCallback(async (): Promise<void> => {
    console.log('🚪 Logging out...');

    // Invalidate refresh token on server
    if (state.refreshToken) {
      try {
        await fetch(DefaultConfig.basePath + '/api/token/invalidate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${state.refreshToken}` },
        });
      } catch (error) {
        console.error('Token invalidation error:', error);
      }
    }

    // Clear all auth data
    await clearAuthData();

    // Reset state
    setState({
      isAuthenticated: false,
      user: null,
      token: null,
      refreshToken: null,
      tokenExpiration: null,
      isLoading: false,
      isInitialized: true,
    });
  }, [state.refreshToken, clearAuthData]);

  // Check authentication (for manual validation)
  const checkAuth = useCallback(async (): Promise<void> => {
    if (!state.token) {
      setState(prev => ({ ...prev, isAuthenticated: false, user: null }));
      return;
    }

    // Check if token is expired
    if (isTokenExpired(state.token)) {
      const refreshed = await refreshAccessToken();
      if (!refreshed) {
        await clearAuthData();
        setState(prev => ({
          ...prev,
          isAuthenticated: false,
          user: null,
          token: null,
          refreshToken: null,
          tokenExpiration: null,
        }));
        return;
      }
    }

    // Validate with server
    await validateAuthentication();
  }, [state.token, refreshAccessToken, clearAuthData, validateAuthentication]);

  // Token expiration checker
  const checkTokenExpired = useCallback((tokenToCheck?: string | null): boolean => {
    return isTokenExpired(tokenToCheck ?? state.token);
  }, [state.token]);

  // Context value
  const value: AuthContextType = {
    ...state,
    login,
    loginWithGoogle,
    signup,
    logout,
    checkAuth,
    refreshAccessToken,
    isTokenExpired: checkTokenExpired,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};