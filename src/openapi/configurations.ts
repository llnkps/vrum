import { Configuration } from './client';
import { useAuthStore } from '@/state/auth/useAuthStore';
import { jwtDecode } from 'jwt-decode';
import { router } from 'expo-router';

// Configuration for React Native with token management
export function createAuthenticatedConfiguration(): Configuration {
  const { token, refreshToken } = useAuthStore.getState();

  // Validate JWT token
  if (!token || !isValidJWT(token)) {
    console.log('Invalid or missing JWT token, redirecting to sign-in');
    router.push('/sign-in');
    throw new Error('Invalid JWT token');
  }

  // Check if refresh token exists
  if (!refreshToken) {
    console.log('Missing refresh token, redirecting to sign-in');
    router.push('/sign-in');
    throw new Error('Missing refresh token');
  }

  return new Configuration({
    credentials: 'include',
    accessToken: token,
  });
}

// Function to check if token is expired
export function isTokenExpired(token: string): boolean {
  try {
    const payload: any = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp ? currentTime >= payload.exp : false;
  } catch (error) {
    console.error('Error decoding token:', error);
    return true; // Assume expired if can't decode
  }
}

// Function to validate JWT token (not expired and properly formatted)
export function isValidJWT(token: string): boolean {
  if (!token) return false;
  try {
    jwtDecode(token);
    return !isTokenExpired(token);
  } catch (error) {
    console.error('Error validating JWT:', error);
    return false;
  }
}

// Function to ensure valid token (refresh if needed)
export async function ensureValidToken(): Promise<boolean> {
  const { token, refreshAccessToken } = useAuthStore.getState();

  if (!token) return false;

  if (isTokenExpired(token)) {
    console.log('Token expired, attempting refresh...');
    return await refreshAccessToken();
  }

  return true;
}

// Types for auth results
export interface AuthResult {
  isAuthorized: boolean;
  token?: string;
}
