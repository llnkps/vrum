import { Configuration } from './client';
import { useAuthStore } from '@/state/auth/useAuthStore';
import { jwtDecode } from 'jwt-decode';

// Configuration for React Native with token management
export function createAuthenticatedConfiguration(): Configuration {
  const { token } = useAuthStore.getState();

  return new Configuration({
    credentials: 'include',
    accessToken: token || undefined,
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
