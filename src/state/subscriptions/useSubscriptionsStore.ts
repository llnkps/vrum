import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserSubscriptionFilter, UserApi } from '@/openapi/client';
import { createAuthenticatedConfiguration } from '@/openapi/configurations';

export type ExtendedUserSubscriptionFilter = UserSubscriptionFilter & {
  createdAt?: string;
  lastUsed?: string;
  isDefault?: boolean;
  isActive?: boolean;
  newAdsCount?: number;
};

interface SubscriptionsState {
  subscriptions: ExtendedUserSubscriptionFilter[];
  isLoading: boolean;
  error: string | null;
  fetchSubscriptions: () => Promise<void>;
  retry: () => void;
  toggleSubscription: (id: number, isActive: boolean) => Promise<void>;
  addSubscription: (subscription: Omit<ExtendedUserSubscriptionFilter, 'id'>) => Promise<void>;
  deleteSubscription: (id: number) => Promise<void>;
  syncSubscriptions: () => Promise<void>;
}

const storage = {
  getItem: async (name: string) => {
    try {
      const value = await AsyncStorage.getItem(name);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Error getting item from storage:', error);
      return null;
    }
  },
  setItem: async (name: string, value: any) => {
    try {
      await AsyncStorage.setItem(name, JSON.stringify(value));
    } catch (error) {
      console.error('Error setting item in storage:', error);
    }
  },
  removeItem: async (name: string) => {
    try {
      await AsyncStorage.removeItem(name);
    } catch (error) {
      console.error('Error removing item from storage:', error);
    }
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
          const api = new UserApi(createAuthenticatedConfiguration());
          // TODO: Замените на реальный метод API для получения подписок пользователя
          // const response = await api.getUserSubscriptions();
          // const data = response.data as UserSubscriptionFilter[];
          // set({ subscriptions: data as ExtendedUserSubscriptionFilter[], isLoading: false });
          set({ subscriptions: [], isLoading: false });
        } catch (err) {
          console.error('Error fetching subscriptions:', err);
          set({ error: 'Ошибка загрузки подписок', isLoading: false });
        }
      },

      retry: async () => {
        await get().fetchSubscriptions();
      },

      toggleSubscription: async (id: number, isActive: boolean) => {
        // Локальное обновление
        set(state => ({
          subscriptions: state.subscriptions.map(sub => (sub.id === id ? { ...sub, isActive } : sub)),
        }));
        try {
          const api = new UserApi(createAuthenticatedConfiguration());
          // TODO: Скорректируйте под реальный метод API для переключения подписки
          // await api.toggleSubscription(id, { isActive });
        } catch (err) {
          console.error('Error toggling subscription:', err);
          // Rollback
          set(state => ({
            subscriptions: state.subscriptions.map(sub => (sub.id === id ? { ...sub, isActive: !isActive } : sub)),
          }));
          set({ error: 'Ошибка переключения подписки' });
        }
      },

      addSubscription: async subscription => {
        try {
          const api = new UserApi(createAuthenticatedConfiguration());
          // TODO: Скорректируйте под реальный метод API для создания подписки
          // const response = await api.createSubscription(subscription);
          // const newSub = response.data as UserSubscriptionFilter;
          // set(state => ({ subscriptions: [...state.subscriptions, newSub as ExtendedUserSubscriptionFilter] }));
          const newSub = { ...subscription, id: Date.now() }; // Временный ID
          set(state => ({ subscriptions: [...state.subscriptions, newSub] }));
        } catch (err) {
          console.error('Error adding subscription:', err);
          set({ error: 'Ошибка добавления подписки' });
        }
      },

      deleteSubscription: async (id: number) => {
        set(state => ({
          subscriptions: state.subscriptions.filter(sub => sub.id !== id),
        }));
        // API вызов
        try {
          const api = new UserApi(createAuthenticatedConfiguration());
          // TODO: Скорректируйте под реальный метод API для удаления подписки
          // await api.deleteSubscription(id);
        } catch (err) {
          console.error('Error deleting subscription:', err);
          // Rollback - refetch
          await get().fetchSubscriptions();
          set({ error: 'Ошибка удаления подписки' });
        }
      },

      syncSubscriptions: async () => {
        const localSubs = get().subscriptions;
        if (localSubs.length > 0) {
          try {
            const api = new UserApi(createAuthenticatedConfiguration());
            // TODO: Скорректируйте под реальный метод API для синхронизации подписок (bulk sync)
            // await api.syncSubscriptions(localSubs);
            await get().fetchSubscriptions();
          } catch (err) {
            console.error('Error syncing subscriptions:', err);
            set({ error: 'Ошибка синхронизации подписок' });
          }
        }
      },
    }),
    {
      name: 'subscriptions-storage',
      storage: createJSONStorage(() => storage),
      partialize: state => ({ subscriptions: state.subscriptions }),
    }
  )
);
