import { tokenManager } from '@/utils/token-manager';
import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from 'jwt-decode';
import { Platform } from 'react-native';

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
  const token = tokenManager.getToken();

  if (!token) return false;

  if (isTokenExpired(token)) {
    console.log('Token expired, attempting refresh...');
    return await tokenManager.refreshAccessToken();
  }

  return true;
}