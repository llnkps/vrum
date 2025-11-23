import { useFilterConfigs } from '@/shared/filter';
import { BACKEND_FILTERS, BackendFilterKey, FilterValue, SelectFilterType } from '@/types/filter';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { useSimpleAutoFilterStore } from './useSimpleAutoFilterStore';
import { createFilterFormatCallback, formatRangeFilterValue } from '@/utils/useTranslateRangeFilter';

// Function to create storage with MMKV fallback to AsyncStorage
const createStorage = () => {
  try {
    // Try to use MMKV
    const { createMMKV } = require('react-native-mmkv');
    const mmkvStorage = createMMKV();
    return {
      setItem: async (name: string, value: string) => {
        mmkvStorage.set(name, value);
      },
      getItem: async (name: string) => {
        const value = mmkvStorage.getString(name);
        return value ?? null;
      },
      removeItem: async (name: string) => {
        mmkvStorage.remove(name);
      },
    };
  } catch (error) {
    console.warn('MMKV not available, falling back to AsyncStorage:', error);
    return AsyncStorage;
  }
};

export const zustandStorage = createJSONStorage(createStorage);

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

        // Check if item with same id or same name already exists
        const existingItem = searchedItems.find(existing => existing.id === id || existing.name === name);

        if (existingItem) {
          // Update the existing item with new filters and timestamp
          set({
            searchedItems: searchedItems.map(f =>
              f.id === existingItem.id ? { ...item, id: existingItem.id, name, timestamp: Date.now(), ttl: item.ttl || DEFAULT_TTL } : f
            ),
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
          if (labels.length > 0)
            otherFilters.push(`${filterKey.replace(/_/g, ' ')}: ${labels.slice(0, 2).join(', ')}${labels.length > 2 ? '...' : ''}`);
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

// Custom hook to save current filters to searched filters
// Used on simple auto modal screen
export const useSaveSearchedFilters = () => {
  const { t } = useTranslation();
  const { addSearchedItem } = useSearchedFiltersStore();
  const filterConfigs = useFilterConfigs();
  const {
    currentBrand,
    selectedModelsByBrand,
    selectedBrandsMap,
    onlyUnsold,
    onlyWithPhotos,
    transmission,
    fuelType,
    drivetrain,
    bodyType,
    color,
    condition,
    documentsOk,
    numberOfOwners,
    seller,
    tradeAllow,
    priceRange,
    yearRange,
    engineCapacityRange,
    powerRange,
    mileageRange,
  } = useSimpleAutoFilterStore();

  // Helper function to get labels for selected values from filter config
  const getLabelsForSelectedValues = (filterKey: string, selectedValues: SelectFilterType) => {
    const config = filterConfigs[filterKey as keyof typeof filterConfigs];
    if (!config || !config.options) return [];

    const selectedKeys = Object.values(selectedValues);
    return config.options.filter(option => selectedKeys.includes(String(option.value))).map(option => option.label);
  };

  const saveCurrentFiltersToSearched = () => {
    const filters: Record<string, any> = {};

    // Get selected brands and models
    const selectedBrands = Object.values(selectedBrandsMap);
    const selectedModels = selectedModelsByBrand[currentBrand?.id || 0] || [];

    // Logic for brand and model display:
    // 1. If one brand and one model: show both brand and model
    // 2. If multiple models: show only models (no brand)
    if (selectedBrands.length === 1 && selectedModels.length === 1) {
      // One brand and one model: show both
      filters[BACKEND_FILTERS.BRAND] = selectedBrands[0].name;
      filters[BACKEND_FILTERS.MODEL] = selectedModels[0].name;
    } else if (selectedModels.length > 1) {
      // Multiple models: show only models
      filters[BACKEND_FILTERS.MODEL] = selectedModels.map(m => m.name).join(', ');
    }

    // Add other filters - convert SelectFilterType to arrays of labels
    if (yearRange) {
      filters[BACKEND_FILTERS.YEAR] = formatRangeFilterValue(BACKEND_FILTERS.YEAR, yearRange, t, createFilterFormatCallback(BACKEND_FILTERS.YEAR));
    }
    if (priceRange) {
      filters[BACKEND_FILTERS.PRICE] = formatRangeFilterValue(
        BACKEND_FILTERS.PRICE,
        priceRange,
        t,
        createFilterFormatCallback(BACKEND_FILTERS.PRICE)
      );
    }
    if (transmission && Object.keys(transmission).length > 0) {
      filters[BACKEND_FILTERS.TRANSMISSION] = getLabelsForSelectedValues(BACKEND_FILTERS.TRANSMISSION, transmission);
    }
    if (fuelType && Object.keys(fuelType).length > 0) {
      filters[BACKEND_FILTERS.FUEL_TYPE] = getLabelsForSelectedValues(BACKEND_FILTERS.FUEL_TYPE, fuelType);
    }
    if (drivetrain && Object.keys(drivetrain).length > 0) {
      filters[BACKEND_FILTERS.DRIVETRAIN_TYPE] = getLabelsForSelectedValues(BACKEND_FILTERS.DRIVETRAIN_TYPE, drivetrain);
    }
    if (bodyType && Object.keys(bodyType).length > 0) {
      filters[BACKEND_FILTERS.FRAME_TYPE] = getLabelsForSelectedValues(BACKEND_FILTERS.FRAME_TYPE, bodyType);
    }
    if (color && Object.keys(color).length > 0) {
      filters[BACKEND_FILTERS.COLOR] = getLabelsForSelectedValues(BACKEND_FILTERS.COLOR, color);
    }
    if (condition && Object.keys(condition).length > 0) {
      filters[BACKEND_FILTERS.CONDITION] = getLabelsForSelectedValues(BACKEND_FILTERS.CONDITION, condition);
    }
    if (documentsOk && Object.keys(documentsOk).length > 0) {
      filters[BACKEND_FILTERS.DOCUMENT_TYPE] = getLabelsForSelectedValues(BACKEND_FILTERS.DOCUMENT_TYPE, documentsOk);
    }
    if (numberOfOwners && Object.keys(numberOfOwners).length > 0) {
      filters[BACKEND_FILTERS.NUMBER_OF_OWNER] = getLabelsForSelectedValues(BACKEND_FILTERS.NUMBER_OF_OWNER, numberOfOwners);
    }
    if (seller && Object.keys(seller).length > 0) {
      filters[BACKEND_FILTERS.SELLER] = getLabelsForSelectedValues(BACKEND_FILTERS.SELLER, seller);
    }
    if (tradeAllow && Object.keys(tradeAllow).length > 0) {
      filters[BACKEND_FILTERS.TRADE_ALLOW] = getLabelsForSelectedValues(BACKEND_FILTERS.TRADE_ALLOW, tradeAllow);
    }
    if (engineCapacityRange) {
      filters[BACKEND_FILTERS.ENGINE_CAPACITY] = formatRangeFilterValue(
        BACKEND_FILTERS.ENGINE_CAPACITY,
        engineCapacityRange,
        t,
        createFilterFormatCallback(BACKEND_FILTERS.ENGINE_CAPACITY)
      );
    }
    if (powerRange) {
      filters[BACKEND_FILTERS.POWER] = formatRangeFilterValue(
        BACKEND_FILTERS.POWER,
        powerRange,
        t,
        createFilterFormatCallback(BACKEND_FILTERS.POWER)
      );
    }
    if (mileageRange) {
      filters[BACKEND_FILTERS.MILEAGE] = formatRangeFilterValue(
        BACKEND_FILTERS.MILEAGE,
        mileageRange,
        t,
        createFilterFormatCallback(BACKEND_FILTERS.MILEAGE)
      );
    }
    if (onlyUnsold) {
      filters[BACKEND_FILTERS.UNSOLD] = true;
    }
    if (onlyWithPhotos) {
      filters[BACKEND_FILTERS.WITH_IMAGE] = true;
    }

    // Only save if there are actual filters
    if (Object.keys(filters).length > 0) {
      addSearchedItem({ filters });
    }
  };

  return saveCurrentFiltersToSearched;
};
