import { DefaultConfig, LoginApi, UserApi } from '@/openapi/client';
import * as SecureStore from 'expo-secure-store';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

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
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, tel: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  refreshAccessToken: () => Promise<boolean>;
}

const storage = {
  getItem: async (name: string) => {
    console.log('CALL TO GET ITEM', name);
    const value = await SecureStore.getItemAsync(name);
    return value ? JSON.parse(value) : null;
  },
  setItem: async (name: string, value: any) => {
    console.log('CALL TO SET ITEM', name, value);
    await SecureStore.setItemAsync(name, JSON.stringify(value));
  },
  removeItem: async (name: string) => {
    console.log('CALL TO REMOVE ITEM', name);
    await SecureStore.deleteItemAsync(name);
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      token: null,
      refreshToken: null,
      login: async (email: string, password: string) => {
        try {
          const loginApi = new LoginApi();

          const response = await loginApi.apiAuthPost({
            apiAuthPostRequest: {
              email,
              password,
            },
          });

          const token = response.token;
          const refreshToken = response.refreshToken;
          const user = { id: 'temp', email, tel: '' };
          set({ isAuthenticated: true, user, token, refreshToken });
        } catch (error) {
          console.error('Login error:', error);
          throw error;
        }
      },
      signup: async (email: string, tel: string, password: string) => {
        const userApi = new UserApi();

        await userApi.userSignUp({
          userSignUpDTO: { email, phoneNumber: tel, password },
        });
      },
      refreshAccessToken: async () => {
        const { refreshToken } = get();
        console.log('Refresh token:');
        console.log(refreshToken);
        if (!refreshToken) return false;
        try {
          const response = await fetch(DefaultConfig.basePath + '/api/token/refresh', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh_token: refreshToken }),
          });
          if (!response.ok) throw new Error('Refresh failed');
          const data = await response.json();
          const newToken = data.token;
          const newRefreshToken = data.refresh_token;
          set({ token: newToken, refreshToken: newRefreshToken });
          return true;
        } catch (error) {
          console.error('Refresh token error:', error);
          set({ isAuthenticated: false, user: null, token: null, refreshToken: null });
          return false;
        }
      },
      logout: async () => {
        console.log('CALL TO LOGOUT');
        const { refreshToken } = get();
        if (refreshToken) {
          try {
            await fetch('http://192.168.2.55:8000/api/token/invalidate', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${refreshToken}`,
              },
            });
          } catch (error) {
            console.error('Invalidate error:', error);
          }
        }
        set({ isAuthenticated: false, user: null, token: null, refreshToken: null });
      },
      checkAuth: async () => {
        console.log("CHECK AUTH CALLED");
        const { token, refreshAccessToken } = get();
        if (token) {
          try {
            const userApi = new UserApi();
            const response = await userApi.getAppUserdomainPresentationGetmeGetmeRaw();
            const userData = await response.value();
            const user = { id: 'current', email: userData.email || '', tel: '' };
            set({ isAuthenticated: true, user });
          } catch (error: any) {
            if (error.response?.status === 401) {
              // Try refresh
              const refreshed = await refreshAccessToken();
              if (refreshed) {
                // Retry checkAuth
                await get().checkAuth();
              } else {
                set({ isAuthenticated: false, user: null, token: null, refreshToken: null });
              }
            } else {
              set({ isAuthenticated: false, user: null, token: null, refreshToken: null });
            }
          }
        } else {
          set({ isAuthenticated: false, user: null });
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => storage),
    }
  )
);
