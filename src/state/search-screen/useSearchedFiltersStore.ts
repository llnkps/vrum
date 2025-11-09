import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type SearchedFilter = {
  id: string;
  type: string;
  label: string;
  value?: any;
  timestamp: number;
  ttl?: number; // Time to live in milliseconds
};

type SearchedFiltersStore = {
  searchedFilters: SearchedFilter[];
  addSearchedFilter: (filter: Omit<SearchedFilter, 'id' | 'timestamp'>) => void;
  removeSearchedFilter: (id: string) => void;
  clearExpiredFilters: () => void;
  clearAllSearchedFilters: () => void;
  isFilterAlreadySearched: (type: string, value?: any) => boolean;
};

const DEFAULT_TTL = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

export const useSearchedFiltersStore = create<SearchedFiltersStore>()(
  persist(
    (set, get) => ({
      searchedFilters: [],

      addSearchedFilter: (filter) => {
        const { searchedFilters } = get();
        const id = `${filter.type}_${JSON.stringify(filter.value)}_${Date.now()}`;

        // Check if this filter type with same value already exists
        const existingFilter = searchedFilters.find(
          f => f.type === filter.type && JSON.stringify(f.value) === JSON.stringify(filter.value)
        );

        if (existingFilter) {
          // Update timestamp instead of adding duplicate
          set({
            searchedFilters: searchedFilters.map(f =>
              f.id === existingFilter.id
                ? { ...f, timestamp: Date.now() }
                : f
            ),
          });
        } else {
          // Add new filter
          const newFilter: SearchedFilter = {
            ...filter,
            id,
            timestamp: Date.now(),
            ttl: filter.ttl || DEFAULT_TTL,
          };

          set({
            searchedFilters: [newFilter, ...searchedFilters].slice(0, 20), // Keep only last 20 filters
          });
        }
      },

      removeSearchedFilter: (id) => {
        set({
          searchedFilters: get().searchedFilters.filter(f => f.id !== id),
        });
      },

      clearExpiredFilters: () => {
        const now = Date.now();
        const { searchedFilters } = get();
        const activeFilters = searchedFilters.filter(f => {
          const expirationTime = f.timestamp + (f.ttl || DEFAULT_TTL);
          return now < expirationTime;
        });

        // Only update if there are actually expired filters to remove
        if (activeFilters.length !== searchedFilters.length) {
          set({ searchedFilters: activeFilters });
        }
      },

      clearAllSearchedFilters: () => {
        set({ searchedFilters: [] });
      },

      isFilterAlreadySearched: (type, value) => {
        const { searchedFilters } = get();
        return searchedFilters.some(
          f => f.type === type && JSON.stringify(f.value) === JSON.stringify(value)
        );
      },
    }),
    {
      name: 'searched-filters-storage',
      storage: createJSONStorage(() => {
        try {
          return AsyncStorage;
        } catch {
          console.warn('AsyncStorage not available, using in-memory storage');
          // Fallback to a simple in-memory storage if AsyncStorage fails
          return {
            getItem: async () => null,
            setItem: async () => {},
            removeItem: async () => {},
          };
        }
      }),
      partialize: (state) => ({ searchedFilters: state.searchedFilters }),
    }
  )
);