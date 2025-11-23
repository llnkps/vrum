import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserSubscriptionFilter, UserApi, UserSubscriptionFilterApi } from '@/openapi/client';
import { createAuthenticatedConfiguration } from '@/openapi/configurations';
import { createAuthenticatedApiCall, AuthenticationException } from '@/openapi/auth-utils';
import { BACKEND_FILTERS, SelectFilterType, RangeFilterType } from '@/types/filter';
import { showImmediateNotification } from '@/utils/notifications';
import { SimpleAutoBrand, SimpleAutoModel, Region } from '@/openapi/client';

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
  createSubscriptionFromSimpleAutoFilters: (params: {
    selectedBrands: SimpleAutoBrand[];
    selectedModels: SimpleAutoModel[];
    priceRange?: RangeFilterType;
    yearRange?: RangeFilterType;
    selectedRegions: Region[];
    transmission?: SelectFilterType;
    fuelType?: SelectFilterType;
    drivetrain?: SelectFilterType;
    bodyType?: SelectFilterType;
    color?: SelectFilterType;
    numberOfOwners?: SelectFilterType;
    seller?: SelectFilterType;
    onlyUnsold: boolean;
    onlyWithPhotos: boolean;
    engineCapacityRange?: RangeFilterType;
    powerRange?: RangeFilterType;
    mileageRange?: RangeFilterType;
    tab: 'all' | 'old' | 'new';
    selectedModelsByBrand: Record<number, SimpleAutoModel[]>;
    onAuthError?: () => void;
  }) => Promise<void>;
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

      createSubscriptionFromSimpleAutoFilters: async (params) => {
        const {
          selectedBrands,
          selectedModels,
          priceRange,
          yearRange,
          selectedRegions,
          transmission,
          fuelType,
          drivetrain,
          bodyType,
          color,
          numberOfOwners,
          seller,
          onlyUnsold,
          onlyWithPhotos,
          engineCapacityRange,
          powerRange,
          mileageRange,
          tab,
          selectedModelsByBrand,
          onAuthError,
        } = params;

        // Build name
        const nameParts = [];
        if (selectedBrands.length > 0) {
          nameParts.push(selectedBrands.map(b => b.name).join(', '));
        }
        if (selectedModels.length > 0) {
          nameParts.push(selectedModels.map(m => m.name).join(', '));
        }
        if (priceRange?.from) nameParts.push(`от ${priceRange.from}`);
        if (priceRange?.to) nameParts.push(`до ${priceRange.to}`);
        if (yearRange?.from) nameParts.push(`год от ${yearRange.from}`);
        if (yearRange?.to) nameParts.push(`год до ${yearRange.to}`);
        if (selectedRegions.length > 0) {
          nameParts.push(`регионы: ${selectedRegions.map((r: any) => r.name).join(', ')}`);
        }
        if (transmission && Object.keys(transmission).length > 0) nameParts.push(`трансмиссия: ${Object.values(transmission).join(', ')}`);
        if (fuelType && Object.keys(fuelType).length > 0) nameParts.push(`топливо: ${Object.values(fuelType).join(', ')}`);
        if (drivetrain && Object.keys(drivetrain).length > 0) nameParts.push(`привод: ${Object.values(drivetrain).join(', ')}`);
        if (bodyType && Object.keys(bodyType).length > 0) nameParts.push(`кузов: ${Object.values(bodyType).join(', ')}`);
        if (color && Object.keys(color).length > 0) nameParts.push(`цвет: ${Object.values(color).join(', ')}`);
        if (numberOfOwners && Object.keys(numberOfOwners).length > 0) nameParts.push(`владельцы: ${Object.values(numberOfOwners).join(', ')}`);
        if (seller && Object.keys(seller).length > 0) nameParts.push(`продавец: ${Object.values(seller).join(', ')}`);
        if (onlyUnsold) nameParts.push('только не проданные');
        if (onlyWithPhotos) nameParts.push('только с фото');
        if (engineCapacityRange?.from) nameParts.push(`объем от ${engineCapacityRange.from}`);
        if (engineCapacityRange?.to) nameParts.push(`объем до ${engineCapacityRange.to}`);
        if (powerRange?.from) nameParts.push(`мощность от ${powerRange.from}`);
        if (powerRange?.to) nameParts.push(`мощность до ${powerRange.to}`);
        if (mileageRange?.from) nameParts.push(`пробег от ${mileageRange.from}`);
        if (mileageRange?.to) nameParts.push(`пробег до ${mileageRange.to}`);

        const name = nameParts.join(' ') || 'Фильтр подписки';

        // Build filterParameters
        const filterParameters: { [key: string]: any } = {};

        if (transmission && Object.keys(transmission).length > 0) {
          const transmissionObj: { [key: string]: string } = {};
          Object.values(transmission).forEach((t, index) => {
            transmissionObj[index.toString()] = t;
          });
          filterParameters[BACKEND_FILTERS.TRANSMISSION] = transmissionObj;
        }
        if (fuelType && Object.keys(fuelType).length > 0) {
          const fuelTypeObj: { [key: string]: string } = {};
          Object.values(fuelType).forEach((t, index) => {
            fuelTypeObj[index.toString()] = t;
          });
          filterParameters[BACKEND_FILTERS.FUEL_TYPE] = fuelTypeObj;
        }
        if (drivetrain && Object.keys(drivetrain).length > 0) {
          const drivetrainObj: { [key: string]: string } = {};
          Object.values(drivetrain).forEach((t, index) => {
            drivetrainObj[index.toString()] = t;
          });
          filterParameters[BACKEND_FILTERS.DRIVETRAIN_TYPE] = drivetrainObj;
        }
        if (bodyType && Object.keys(bodyType).length > 0) {
          const bodyTypeObj: { [key: string]: string } = {};
          Object.values(bodyType).forEach((t, index) => {
            bodyTypeObj[index.toString()] = t;
          });
          filterParameters[BACKEND_FILTERS.FRAME_TYPE] = bodyTypeObj;
        }
        if (color && Object.keys(color).length > 0) {
          const colorObj: { [key: string]: string } = {};
          Object.values(color).forEach((c, index) => {
            colorObj[index.toString()] = c;
          });
          filterParameters[BACKEND_FILTERS.COLOR] = colorObj;
        }
        if (numberOfOwners && Object.keys(numberOfOwners).length > 0) {
          const numberOfOwnersObj: { [key: string]: string } = {};
          Object.values(numberOfOwners).forEach((t, index) => {
            numberOfOwnersObj[index.toString()] = t;
          });
          filterParameters[BACKEND_FILTERS.NUMBER_OF_OWNER] = numberOfOwnersObj;
        }
        if (seller && Object.keys(seller).length > 0) {
          const sellerObj: { [key: string]: string } = {};
          Object.values(seller).forEach((s, index) => {
            sellerObj[index.toString()] = s;
          });
          filterParameters[BACKEND_FILTERS.SELLER] = sellerObj;
        }

        if (onlyUnsold) {
          filterParameters[BACKEND_FILTERS.UNSOLD] = 'true';
        }
        if (onlyWithPhotos) {
          filterParameters[BACKEND_FILTERS.WITH_IMAGE] = 'true';
        }
        if (tab === 'old') {
          filterParameters[BACKEND_FILTERS.CONDITION] = { '0': 'used' };
        }
        if (tab === 'new') {
          filterParameters[BACKEND_FILTERS.CONDITION] = { '0': 'new' };
        }
        if (engineCapacityRange) {
          filterParameters[BACKEND_FILTERS.ENGINE_CAPACITY] = {};
          if (engineCapacityRange.from !== undefined) filterParameters[BACKEND_FILTERS.ENGINE_CAPACITY]['from'] = engineCapacityRange.from.toString();
          if (engineCapacityRange.to !== undefined) filterParameters[BACKEND_FILTERS.ENGINE_CAPACITY]['to'] = engineCapacityRange.to.toString();
        }
        if (powerRange) {
          filterParameters[BACKEND_FILTERS.POWER] = {};
          if (powerRange.from !== undefined) filterParameters[BACKEND_FILTERS.POWER]['from'] = powerRange.from.toString();
          if (powerRange.to !== undefined) filterParameters[BACKEND_FILTERS.POWER]['to'] = powerRange.to.toString();
        }
        if (mileageRange) {
          filterParameters[BACKEND_FILTERS.MILEAGE] = {};
          if (mileageRange.from !== undefined) filterParameters[BACKEND_FILTERS.MILEAGE]['from'] = mileageRange.from.toString();
          if (mileageRange.to !== undefined) filterParameters[BACKEND_FILTERS.MILEAGE]['to'] = mileageRange.to.toString();
        }
        if (yearRange) {
          filterParameters[BACKEND_FILTERS.YEAR] = {};
          if (yearRange.from !== undefined) filterParameters[BACKEND_FILTERS.YEAR]['from'] = yearRange.from.toString();
          if (yearRange.to !== undefined) filterParameters[BACKEND_FILTERS.YEAR]['to'] = yearRange.to.toString();
        }
        if (priceRange) {
          filterParameters[BACKEND_FILTERS.PRICE] = {};
          if (priceRange.from !== undefined) filterParameters[BACKEND_FILTERS.PRICE]['from'] = priceRange.from.toString();
          if (priceRange.to !== undefined) filterParameters[BACKEND_FILTERS.PRICE]['to'] = priceRange.to.toString();
        }

        // Build brandsWithModels
        const brandsWithModels = selectedBrands?.reduce(
          (acc, b, brandIndex) => {
            if (b.id) {
              let brandModels: Record<string, number> = {};
              if (selectedModelsByBrand) {
                brandModels = (selectedModelsByBrand[b.id] || []).reduce(
                  (acc, model, modelIndex) => {
                    acc[modelIndex.toString()] = model.id;
                    return acc;
                  },
                  {} as Record<string, number>
                );
              }

              acc[brandIndex.toString()] = {
                id: b.id,
                models: brandModels,
              };
            }

            return acc;
          },
          {} as Record<string, any>
        );

        const userSubscriptionApi = new UserSubscriptionFilterApi(createAuthenticatedConfiguration());
        try {
          await createAuthenticatedApiCall(
            async () =>
              await userSubscriptionApi.createUserSubscriptionFilter({
                createUserSubscriptionFilterRequest: {
                  name,
                  sourceType: 'simple-auto',
                  b: brandsWithModels,
                  r: selectedRegions.reduce(
                    (acc, r, index) => {
                      if (r.id !== undefined) {
                        acc[index.toString()] = r.id!.toString();
                      }
                      return acc;
                    },
                    {} as Record<string, string>
                  ),
                  filterParameters: Object.keys(filterParameters).length > 0 ? filterParameters : undefined,
                },
              })
          );
          // Show success notification
          await showImmediateNotification('Subscription Created', 'Your subscription has been saved successfully!');
        } catch (error) {
          console.log('ERRRRRRRRRRRRR HERE');
          console.log(error);
          if (error instanceof AuthenticationException) {
            onAuthError?.();
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
