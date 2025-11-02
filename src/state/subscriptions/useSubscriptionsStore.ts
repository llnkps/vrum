import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import * as SecureStorage from 'expo-secure-store';
import { ExtendedUserSubscriptionFilter } from '@/openapi/client';
import { userApi } from '@/openapi/userApi';
import { createAuthenticatedApiCall } from '@/openapi/auth-utils';
import { createAuthenticatedConfiguration } from '@/openapi/configurations';

interface ExtendedUserSubscriptionFilter {
  id: number;
  name: string;
  filters: { [slug: string]: string[] };
  createdAt?: string;
  lastUsed?: string;
  isDefault?: boolean;
  isActive?: boolean;
  newAdsCount?: number;
}

interface SubscriptionsState {
  subscriptions: ExtendedUserSubscriptionFilter[];
  isLoading: boolean;
  error: string | null;
  fetchSubscriptions: () => Promise<void>;
  retry: () => void;
  toggleSubscription: (id: number, isActive: boolean) => Promise<void>;
}

const storage = {
  getItem: async (name: string) => {
    const value = await SecureStorage.getItemAsync(name);
    return value ? JSON.parse(value) : null;
  },
  setItem: async (name: string, value: any) => {
    await SecureStorage.setItemAsync(name, JSON.stringify(value));
  },
  removeItem: async (name: string) => {
    await SecureStorage.deleteItemAsync(name);
  },
};

export const useSubscriptionsStore = create<SubscriptionsState>()(
  persist(
    (set, get) => ({
      subscriptions: [],
      isLoading: false,
      error: null,

      fetchSubscriptions: async () => {
        set({ isLoading: true, error: null });
        try {
          const userApi = new UserApi(createAuthenticatedConfiguration());
          // Замените на реальный метод API, например: const response = await userApi.getUserSubscriptions();
          // Пока используем тестовые данные
          const mockData: ExtendedUserSubscriptionFilter[] = [
            {
              id: 1,
              name: 'BMW от 2016 года',
              filters: { brand: ['BMW'], year: ['2016', '2017', '2018'], price: ['до 20000'] },
              createdAt: '2023-10-01T10:00:00Z',
              lastUsed: '2023-10-15T14:30:00Z',
              isDefault: true,
              isActive: true,
              newAdsCount: 5,
            },
            {
              id: 2,
              name: 'SUV до 20 000€',
              filters: { bodyType: ['SUV'], price: ['до 20000'], region: ['Молдова'] },
              createdAt: '2023-09-20T09:15:00Z',
              lastUsed: '2023-10-10T16:45:00Z',
              isDefault: false,
              isActive: false,
              newAdsCount: 0,
            },
          ];
          set({ subscriptions: mockData, isLoading: false });
        } catch (err) {
          set({ error: 'Ошибка загрузки подписок', isLoading: false });
        }
      },

      retry: async () => {
        await get().fetchSubscriptions();
      },

      toggleSubscription: (id: number, isActive: boolean) => {
        set(state => ({
          subscriptions: state.subscriptions.map(sub => (sub.id === id ? { ...sub, isActive } : sub)),
        }));
        // TODO: API вызов для toggle, затем fetchSubscriptions для синхронизации
      },
    }),
    {
      name: 'subscriptions-storage',
      storage: createJSONStorage(() => storage),
      // Сохраняем только subscriptions, остальные поля не персистим
      partialize: state => ({ subscriptions: state.subscriptions }),
    }
  )
);
