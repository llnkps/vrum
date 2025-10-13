import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import * as SecureStore from "expo-secure-store";

export type Language = 'en' | 'ro' | 'ru' | 'uk';

interface PreferencesState {
  language: Language;
  location: string;
  setLanguage: (language: Language) => void;
  setLocation: (location: string) => void;
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

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      language: 'en',
      location: 'Los Angeles, CA',
      setLanguage: (language: Language) => set({ language }),
      setLocation: (location: string) => set({ location }),
    }),
    {
      name: "preferences-storage",
      storage: createJSONStorage(() => storage),
    }
  )
);