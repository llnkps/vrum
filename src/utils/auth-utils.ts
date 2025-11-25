import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from 'jwt-decode';
import { Platform } from 'react-native';
import { tokenManager } from '@/utils/token-manager';

// Token cache utilities
const createTokenCache = () => {
  return {
    getToken: async (key: string) => {
      try {
        const item = await SecureStore.getItemAsync(key);
        if (item) {
          console.log(`${key} was used 🔐 \n`);
        } else {
          console.log('No values stored under key: ' + key);
        }
        return item;
      } catch (error) {
        console.error('secure store get item error: ', error);
        await SecureStore.deleteItemAsync(key);
        return null;
      }
    },
    saveToken: (key: string, token: string) => {
      return SecureStore.setItemAsync(key, token);
    },
  };
};

// SecureStore is not supported on the web
export const tokenCache = Platform.OS !== 'web' ? createTokenCache() : undefined;

// Get token expiration time from JWT
export const getTokenExpirationTime = (token: string | null): number | null => {
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

// Check if token is expired
export const isTokenExpired = (token: string | null): boolean => {
  if (!token) return true;

  try {
    const payload: any = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp ? currentTime >= payload.exp : false;
  } catch (error) {
    console.error('Error decoding token:', error);
    return true; // Assume expired if can't decode
  }
};

// Validate JWT token (not expired and properly formatted)
export const isValidJWT = (token: string): boolean => {
  if (!token) return false;
  try {
    jwtDecode(token);
    return !isTokenExpired(token);
  } catch (error) {
    console.error('Error validating JWT:', error);
    return false;
  }
};

// Ensure valid token (refresh if needed)
export const ensureValidToken = async (): Promise<boolean> => {
  const token = tokenManager.getToken();

  if (!token) return false;

  if (isTokenExpired(token)) {
    console.log('Token expired, attempting refresh...');
    return await tokenManager.refreshAccessToken();
  }

  return true;
};

// Storage utilities for auth data
export const STORAGE_KEY = 'auth-storage';
export const STORAGE_VERSION = 1;

export interface AuthStorageData {
  user: { id: string; email: string; tel?: string } | null;
  token: string | null;
  refreshToken: string | null;
  tokenExpiration: number | null;
  version: number;
  timestamp: number;
}

export const saveAuthData = async (authData: Partial<AuthStorageData>) => {
  try {
    const dataToStore: AuthStorageData = {
      user: authData.user || null,
      token: authData.token || null,
      refreshToken: authData.refreshToken || null,
      tokenExpiration: authData.tokenExpiration || null,
      version: STORAGE_VERSION,
      timestamp: Date.now(),
    };
    await SecureStore.setItemAsync(STORAGE_KEY, JSON.stringify(dataToStore));
  } catch (error) {
    console.error('Error saving auth data:', error);
  }
};

export const loadAuthData = async (): Promise<Partial<AuthStorageData> | null> => {
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
};

export const clearAuthData = async () => {
  tokenManager.setToken(null);
  tokenManager.setRefreshToken(null);

  try {
    await SecureStore.deleteItemAsync(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing auth storage:', error);
  }

  if (Platform.OS !== 'web' && tokenCache) {
    try {
      await tokenCache.saveToken('accessToken', '');
      await tokenCache.saveToken('refreshToken', '');
    } catch (error) {
      console.error('Error clearing token cache:', error);
    }
  }
};
