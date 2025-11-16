import { BACKEND_FILTERS, BackendFilterKey, FilterValue, SelectFilterType } from '@/types/filter';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';




import { StateStorage } from 'zustand/middleware'
import { createMMKV } from 'react-native-mmkv'


const storage = createMMKV()

export const zustandStorage = createJSONStorage(() => ({
  setItem: (name, value) => {
    storage.set(name, value);
  },
  getItem: name => {
    const value = storage.getString(name);
    return value ?? null;
  },
  removeItem: name => {
    storage.remove(name);
  },
}));


type FilterType = Partial<Record<BackendFilterKey, FilterValue>>;

export type SearchedItem = {
  id: string;
  name: string;
  filters: FilterType;
  timestamp: number;
  ttl?: number; // Time to live in milliseconds
};

type SearchedFiltersStore = {
  searchedItems: SearchedItem[];
  currentSessionId: string | null;
  addSearchedItem: (item: Omit<SearchedItem, 'id' | 'timestamp' | 'name'>) => void;
  setCurrentSessionId: (id: string | null) => void;
  removeSearchedFilter: (id: string) => void;

  clearExpiredFilters: () => void;
  clearAllSearchedFilters: () => void;
  getSearchedFiltersByType: (type: string) => SearchedItem[];
};

const DEFAULT_TTL = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

export const useSearchedFiltersStore = create<SearchedFiltersStore>()(
  persist(
    (set, get) => ({
      searchedItems: [],
      currentSessionId: null,

      setCurrentSessionId: id => set({ currentSessionId: id }),

      addSearchedItem: item => {
        const { searchedItems, currentSessionId } = get();

        const id = currentSessionId || generateIdFromFilters(item.filters);
        const name = generateNameFromFilters(item.filters);

        // Check if item with same id already exists
        const existingItem = searchedItems.find(existing => existing.id === id);

        if (existingItem) {
          // Update the existing item with new filters and timestamp
          set({
            searchedItems: searchedItems.map(f => (f.id === existingItem.id ? { ...item, id, name, timestamp: Date.now(), ttl: item.ttl || DEFAULT_TTL } : f)),
          });
        } else {
          // Add new item
          const newItem: SearchedItem = {
            ...item,
            id,
            name,
            timestamp: Date.now(),
            ttl: item.ttl || DEFAULT_TTL,
          };

          set({
            searchedItems: [newItem, ...searchedItems].slice(0, 20), // Keep only last 20 items
          });
        }
      },

      removeSearchedFilter: id => {
        set({
          searchedItems: get().searchedItems.filter(f => f.id !== id),
        });
      },

      clearExpiredFilters: () => {
        const now = Date.now();
        const { searchedItems } = get();
        const activeFilters = searchedItems.filter(f => {
          const expirationTime = f.timestamp + (f.ttl || DEFAULT_TTL);
          return now < expirationTime;
        });

        // Only update if there are actually expired filters to remove
        if (activeFilters.length !== searchedItems.length) {
          set({ searchedItems: activeFilters });
        }
      },

      clearAllSearchedFilters: () => {
        set({ searchedItems: [] });
      },

      getSearchedFiltersByType: type => {
        const { searchedItems } = get();
        return searchedItems.filter(f => f.name.includes(type));
      },
    }),
    {
      name: 'searched-filters-storage',
      storage: zustandStorage,
      partialize: state => ({ searchedItems: state.searchedItems }),
    }
  )
);

// Generate ID from filters in specific order: BRAND, MODEL, YEAR, PRICE, and other filters (excluding GENERATION and MODIFICATION)
const generateIdFromFilters = (filters: FilterType) => {
  const idParts: string[] = [];

  // Helper to get filter value as string
  const getFilterValue = (filterKey: BackendFilterKey) => {
    const value = filters[filterKey];
    if (Array.isArray(value)) {
      // Handle arrays of labels - join them for ID generation
      return value.join(',');
    }
    if (value && typeof value === 'object' && !('min' in value) && !('max' in value)) {
      // Handle SelectFilterType objects - use keys (values) for ID (fallback for old data)
      return Object.keys(value as SelectFilterType).join(',');
    }
    return value ? String(value) : '';
  };

  // Add filters in specified order
  const brand = getFilterValue(BACKEND_FILTERS.BRAND);
  if (brand) idParts.push(`brand:${brand}`);

  const model = getFilterValue(BACKEND_FILTERS.MODEL);
  if (model) idParts.push(`model:${model}`);

  const year = getFilterValue(BACKEND_FILTERS.YEAR);
  if (year) idParts.push(`year:${year}`);

  const price = getFilterValue(BACKEND_FILTERS.PRICE);
  if (price) idParts.push(`price:${price}`);

  // Add other filters (excluding GENERATION and MODIFICATION)
  Object.values(BACKEND_FILTERS).forEach(filterKey => {
    if (
      filterKey !== BACKEND_FILTERS.BRAND &&
      filterKey !== BACKEND_FILTERS.MODEL &&
      filterKey !== BACKEND_FILTERS.YEAR &&
      filterKey !== BACKEND_FILTERS.PRICE &&
      filterKey !== BACKEND_FILTERS.GENERATION &&
      filterKey !== BACKEND_FILTERS.MODIFICATION
    ) {
      const value = getFilterValue(filterKey);
      if (value) idParts.push(`${filterKey}:${value}`);
    }
  });

  return idParts.join('_') || `item_${Date.now()}`;
};

// Generate human-readable name from filters in the same order: BRAND, MODEL, YEAR, PRICE, and other filters (excluding GENERATION and MODIFICATION)
const generateNameFromFilters = (filters: FilterType) => {
  const nameParts: string[] = [];

  // Helper to get filter value
  const getFilterValue = (filterKey: BackendFilterKey) => {
    return filters[filterKey] || null;
  };

  // Add filters in specified order with human-readable formatting
  const brand = getFilterValue(BACKEND_FILTERS.BRAND);
  if (brand) nameParts.push(String(brand));

  const model = getFilterValue(BACKEND_FILTERS.MODEL);
  if (model) nameParts.push(String(model));

  const year = getFilterValue(BACKEND_FILTERS.YEAR);
  if (year) {
    if (typeof year === 'object' && year !== null && 'min' in year && 'max' in year) {
      const { min, max } = year as { min?: number; max?: number };
      const yearStr = min && max ? `${min}-${max}` : (min || max || '').toString();
      if (yearStr) nameParts.push(yearStr);
    } else {
      nameParts.push(String(year));
    }
  }

  const price = getFilterValue(BACKEND_FILTERS.PRICE);
  if (price) {
    if (typeof price === 'object' && price !== null && 'min' in price && 'max' in price) {
      const { min, max } = price as { min?: number; max?: number };
      const priceStr = min && max ? `$${min}-${max}` : (min ? `$${min}` : max ? `$${max}` : '').toString();
      if (priceStr) nameParts.push(priceStr);
    } else {
      nameParts.push(`${price}`);
    }
  }

  // Add other filters (excluding GENERATION and MODIFICATION) with simplified formatting
  const otherFilters: string[] = [];
  Object.values(BACKEND_FILTERS).forEach(filterKey => {
    if (
      filterKey !== BACKEND_FILTERS.BRAND &&
      filterKey !== BACKEND_FILTERS.MODEL &&
      filterKey !== BACKEND_FILTERS.YEAR &&
      filterKey !== BACKEND_FILTERS.PRICE &&
      filterKey !== BACKEND_FILTERS.GENERATION &&
      filterKey !== BACKEND_FILTERS.MODIFICATION
    ) {
      const value = getFilterValue(filterKey);
      if (value !== null && value !== undefined && value !== '') {
        // Format different filter types appropriately
        if (typeof value === 'boolean') {
          if (value) otherFilters.push(filterKey.replace(/_/g, ' '));
        } else if (Array.isArray(value)) {
          if (value.length > 0) otherFilters.push(`${filterKey.replace(/_/g, ' ')}: ${value.slice(0, 2).join(', ')}${value.length > 2 ? '...' : ''}`);
        } else if (typeof value === 'object' && value !== null && !('min' in value) && !('max' in value)) {
          // Handle SelectFilterType objects - extract labels (fallback for old data)
          const labels = Object.values(value as SelectFilterType);
          if (labels.length > 0) otherFilters.push(`${filterKey.replace(/_/g, ' ')}: ${labels.slice(0, 2).join(', ')}${labels.length > 2 ? '...' : ''}`);
        } else if (typeof value === 'object' && value !== null && 'min' in value && 'max' in value) {
          const { min, max } = value as { min?: number; max?: number };
          const rangeStr = min && max ? `${min}-${max}` : min || max || '';
          if (rangeStr) otherFilters.push(`${filterKey.replace(/_/g, ' ')}: ${rangeStr}`);
        } else {
          otherFilters.push(`${filterKey.replace(/_/g, ' ')}: ${value}`);
        }
      }
    }
  });

  // Add up to 2 other filters to keep name concise
  if (otherFilters.length > 0) {
    nameParts.push(otherFilters.slice(0, 2).join(', '));
    if (otherFilters.length > 2) nameParts.push('...');
  }

  return nameParts.join(' ') || 'Search';
};
