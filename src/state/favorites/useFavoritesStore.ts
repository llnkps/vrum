import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AdvertisementItemResponse } from '@/openapi/client';

interface FavoritesState {
  favorites: AdvertisementItemResponse[];
  sortMethod: string;
  isLoading: boolean;
  error: string | null;

  // Actions
  addFavorite: (item: AdvertisementItemResponse) => void;
  removeFavorite: (id: number) => void;
  toggleFavorite: (item: AdvertisementItemResponse) => void;
  isFavorite: (id: number) => boolean;
  clearFavorites: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSortMethod: (method: string) => void;

  // Sync with API
  syncWithApi: (apiFavorites: AdvertisementItemResponse[]) => void;
  getFavoritesForApi: () => { advertisementId: number }[];
}

const storage = createJSONStorage(() => AsyncStorage);

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      sortMethod: 'Актульности',
      isLoading: false,
      error: null,

      addFavorite: (item: AdvertisementItemResponse) =>
        set(state => ({
          favorites: [...state.favorites.filter(f => f.id !== item.id), item],
        })),

      removeFavorite: (id: number) =>
        set(state => ({
          favorites: state.favorites.filter(f => f.id !== id),
        })),

      toggleFavorite: (item: AdvertisementItemResponse) =>
        set(state => {
          const exists = state.favorites.some(f => f.id === item.id);
          if (exists) {
            return {
              favorites: state.favorites.filter(f => f.id !== item.id),
            };
          } else {
            return {
              favorites: [...state.favorites, item],
            };
          }
        }),

      isFavorite: (id: number) => get().favorites.some(f => f.id === id),

      clearFavorites: () => set({ favorites: [] }),

      setLoading: (loading: boolean) => set({ isLoading: loading }),

      setError: (error: string | null) => set({ error }),
      
      setSortMethod: (method: string) => set({ sortMethod: method }),

      syncWithApi: (apiFavorites: AdvertisementItemResponse[]) =>
        set(() => ({
          favorites: apiFavorites,
        })),

      getFavoritesForApi: () =>
        get()
          .favorites.map(fav => ({
            advertisementId: fav.id,
          }))
          .filter(item => !isNaN(item.advertisementId)),
    }),
    {
      name: 'favorites-storage',
      storage,
      partialize: state => ({
        favorites: state.favorites,
      }),
    }
  )
);
