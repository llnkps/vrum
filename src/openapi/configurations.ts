import { Configuration } from './client';
import { tokenManager } from '../utils/token-manager';
import { jwtDecode } from 'jwt-decode';
import { router } from 'expo-router';

// Configuration for React Native with token management
export function createAuthenticatedConfiguration(): Configuration {
  return new Configuration({
    credentials: 'include',
    accessToken: async (name?: string, scopes?: string[]) => {
      const token = tokenManager.getToken();
      console.log('TOKEN FETCHED FOR CONFIGURATION:', token);
      return token || '';
    },
  });
}

// Types for auth results
export interface AuthResult {
  isAuthorized: boolean;
  token?: string;
}
