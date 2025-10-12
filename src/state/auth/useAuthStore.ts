import { LoginApi, UserApi } from "@/openapi/client";
import * as SecureStore from "expo-secure-store";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface User {
  id: string;
  email: string;
  tel?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, tel: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

const storage = {
  getItem: async (name: string) => {
    const value = await SecureStore.getItemAsync(name);
    return value ? JSON.parse(value) : null;
  },
  setItem: async (name: string, value: any) => {
    await SecureStore.setItemAsync(name, JSON.stringify(value));
  },
  removeItem: async (name: string) => {
    await SecureStore.deleteItemAsync(name);
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      token: null,
      login: async (email: string, password: string) => {
        try {
          const loginApi = new LoginApi();

          const response = await loginApi.apiAuthPost({
            apiAuthPostRequest: {
              email,
              password,
            },
          });

          console.log("======================")
          console.log("======================")
          console.log(response)

          const data = await response.json();
          // Assuming the response includes token and user
          const token = data.token || response.headers.get("Authorization")?.replace("Bearer ", "");
          const user = data.user || { id: data.id, email, tel: data.tel };
          set({ isAuthenticated: true, user, token });
        } catch (error) {
          console.error("Login error:", error);
          throw error;
        }
      },
      signup: async (email: string, tel: string, password: string) => {
        try {
          const userApi = new UserApi();

          await userApi.userSignUp({
            userSignUpDTO: { email, phoneNumber: tel, password },
          });

          // Do not set authenticated here, user needs to activate account
        } catch (error: any) {
          throw error;
        }
      },
      logout: () => {
        set({ isAuthenticated: false, user: null, token: null });
      },
      checkAuth: async () => {
        const { token } = get();
        if (token) {
          try {
            const userApi = new UserApi();
            const response = await userApi.getAppUserdomainPresentationGetmeGetmeRaw();
            const userData = await response.value();
            const user = { id: "current", email: userData.email || "", tel: "" };
            set({ isAuthenticated: true, user });
          } catch {
            // Token invalid, logout
            set({ isAuthenticated: false, user: null, token: null });
          }
        } else {
          set({ isAuthenticated: false, user: null });
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => storage),
    }
  )
);
