import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FavoriteItem } from '@/modules/favorites/types';

interface FavoritesState {
  favorites: FavoriteItem[];
  isLoading: boolean;
  error: string | null;

  // Actions
  addFavorite: (item: FavoriteItem) => void;
  removeFavorite: (id: string) => void;
  toggleFavorite: (item: FavoriteItem) => void;
  isFavorite: (id: string) => boolean;
  clearFavorites: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // Sync with API
  syncWithApi: (apiFavorites: FavoriteItem[]) => void;
  getFavoritesForApi: () => { advertisementId: number }[];
}

const storage = createJSONStorage(() => AsyncStorage);

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      isLoading: false,
      error: null,

      addFavorite: (item: FavoriteItem) =>
        set(state => ({
          favorites: [...state.favorites.filter(f => f.id !== item.id), item],
        })),

      removeFavorite: (id: string) =>
        set(state => ({
          favorites: state.favorites.filter(f => f.id !== id),
        })),

      toggleFavorite: (item: FavoriteItem) =>
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

      isFavorite: (id: string) => get().favorites.some(f => f.id === id),

      clearFavorites: () => set({ favorites: [] }),

      setLoading: (loading: boolean) => set({ isLoading: loading }),

      setError: (error: string | null) => set({ error }),

      syncWithApi: (apiFavorites: FavoriteItem[]) =>
        set(() => ({
          favorites: apiFavorites,
        })),

      getFavoritesForApi: () =>
        get().favorites
          .map(fav => ({
            advertisementId: parseInt(fav.id),
          }))
          .filter(item => !isNaN(item.advertisementId)),
    }),
    {
      name: 'favorites-storage',
      storage,
      partialize: (state) => ({
        favorites: state.favorites,
      }),
    }
  )
);