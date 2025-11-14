import { Platform } from 'react-native';
import * as AuthSession from 'expo-auth-session';

const isWeb = Platform.OS === 'web';

// OAuth Configuration
export const GOOGLE_OAUTH_CONFIG = {
  clientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID || '',
  iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID || '',
  androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID || '',
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID || '',
  scopes: ['openid', 'profile', 'email'],
  redirectUri: AuthSession.makeRedirectUri({
    path: 'oauthredirect',
  }),
};

// Discovery document for Google OAuth
export const GOOGLE_DISCOVERY = {
  authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenEndpoint: 'https://oauth2.googleapis.com/token',
  revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
};

// Create OAuth request
export const createGoogleAuthRequest = () => {
  return new AuthSession.AuthRequest({
    clientId: isWeb ? GOOGLE_OAUTH_CONFIG.webClientId : GOOGLE_OAUTH_CONFIG.clientId,
    scopes: GOOGLE_OAUTH_CONFIG.scopes,
    responseType: AuthSession.ResponseType.Token,
    redirectUri: GOOGLE_OAUTH_CONFIG.redirectUri,
    prompt: AuthSession.Prompt.SelectAccount,
  });
};

// Exchange authorization code for tokens
export const exchangeCodeAsync = async (
  code: string,
  codeVerifier?: string
): Promise<{
  accessToken: string;
  refreshToken?: string;
  idToken?: string;
  expiresIn?: number;
}> => {
  try {
    const tokenResponse = await AuthSession.exchangeCodeAsync(
      {
        clientId: isWeb ? GOOGLE_OAUTH_CONFIG.webClientId : GOOGLE_OAUTH_CONFIG.clientId,
        redirectUri: GOOGLE_OAUTH_CONFIG.redirectUri,
        code,
        extraParams: codeVerifier ? { code_verifier: codeVerifier } : {},
      },
      GOOGLE_DISCOVERY
    );

    return {
      accessToken: tokenResponse.accessToken,
      refreshToken: tokenResponse.refreshToken,
      idToken: tokenResponse.idToken,
      expiresIn: tokenResponse.expiresIn,
    };
  } catch (error) {
    console.error('OAuth token exchange failed:', error);
    throw error;
  }
};

// Refresh OAuth tokens
export const refreshOAuthToken = async (
  refreshToken: string
): Promise<{
  accessToken: string;
  refreshToken?: string;
  expiresIn?: number;
}> => {
  try {
    const tokenResponse = await AuthSession.refreshAsync(
      {
        clientId: isWeb ? GOOGLE_OAUTH_CONFIG.webClientId : GOOGLE_OAUTH_CONFIG.clientId,
        refreshToken,
      },
      GOOGLE_DISCOVERY
    );

    return {
      accessToken: tokenResponse.accessToken,
      refreshToken: tokenResponse.refreshToken,
      expiresIn: tokenResponse.expiresIn,
    };
  } catch (error) {
    console.error('OAuth token refresh failed:', error);
    throw error;
  }
};

// Get user info from Google
export const getGoogleUserInfo = async (accessToken: string) => {
  try {
    const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user info');
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to get Google user info:', error);
    throw error;
  }
};

// Validate OAuth configuration
export const validateOAuthConfig = () => {
  const requiredConfigs = [
    GOOGLE_OAUTH_CONFIG.clientId,
    GOOGLE_OAUTH_CONFIG.iosClientId,
    GOOGLE_OAUTH_CONFIG.androidClientId,
    GOOGLE_OAUTH_CONFIG.webClientId,
  ];

  const missingConfigs = requiredConfigs.filter(config => !config);

  if (missingConfigs.length > 0) {
    console.warn('OAuth configuration incomplete. Missing:', missingConfigs);
    return false;
  }

  return true;
};
