import { useFilterConfigs } from '@/shared/filter';
import { BACKEND_FILTERS, BackendFilterKey, FilterValue, SelectFilterType } from '@/types/filter';
import { createFilterFormatCallback, formatRangeFilterValue } from '@/utils/useTranslateRangeFilter';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { useSimpleAutoFilterStore } from './useSimpleAutoFilterStore';

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
  addSearchedItem: (item: { filters: FilterType; name: string; ttl?: number }) => void;
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

        if (!currentSessionId) {
          console.warn('Current session ID is null. Cannot add searched item.');
          return;
        }

        // Check if item with same id or same name already exists
        const existingItem = searchedItems.find(existing => existing.id === currentSessionId || existing.name === item.name);

        if (existingItem) {
          // Update the existing item with new filters and timestamp
          set({
            searchedItems: searchedItems.map(f =>
              f.id === existingItem.id
                ? {
                    ...item,
                    id: existingItem.id,
                    name: item.name,
                    timestamp: Date.now(),
                    ttl: item.ttl || DEFAULT_TTL,
                  }
                : f
            ),
          });
        } else {
          // Add new item
          const newItem: SearchedItem = {
            ...item,
            id: currentSessionId,
            name: item.name,
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
    const pureFilters: FilterType = {};

    // Get selected brands and models
    const selectedBrands = Object.values(selectedBrandsMap);
    const selectedModels = selectedModelsByBrand[currentBrand?.id || 0] || [];

    const nameParts: string[] = [];

    // Logic for brand and model:
    if (selectedBrands.length === 1 && selectedModels.length === 1) {
      pureFilters[BACKEND_FILTERS.BRAND] = String(selectedBrands[0].id);
      pureFilters[BACKEND_FILTERS.MODEL] = String(selectedModels[0].id);
      nameParts.push(selectedBrands[0].name);
      nameParts.push(selectedModels[0].name);
    } else if (selectedModels.length > 1) {
      pureFilters[BACKEND_FILTERS.MODEL] = selectedModels.map(m => String(m.id));
      nameParts.push(selectedModels.map(m => m.name).join(', '));
    }

    // Add other filters with pure values and build name
    if (yearRange) {
      pureFilters[BACKEND_FILTERS.YEAR] = yearRange;
      const yearStr = formatRangeFilterValue(BACKEND_FILTERS.YEAR, yearRange, t, createFilterFormatCallback(BACKEND_FILTERS.YEAR));
      if (yearStr) nameParts.push(yearStr);
    }

    if (priceRange) {
      pureFilters[BACKEND_FILTERS.PRICE] = priceRange;
      const priceStr = formatRangeFilterValue(BACKEND_FILTERS.PRICE, priceRange, t, createFilterFormatCallback(BACKEND_FILTERS.PRICE));
      if (priceStr) nameParts.push(priceStr);
    }

    const otherFilters: string[] = [];

    if (transmission && Object.keys(transmission).length > 0) {
      pureFilters[BACKEND_FILTERS.TRANSMISSION] = transmission;
      const labels = getLabelsForSelectedValues(BACKEND_FILTERS.TRANSMISSION, transmission);
      if (labels.length > 0) otherFilters.push(labels.slice(0, 2).join(', '));
    }

    if (fuelType && Object.keys(fuelType).length > 0) {
      pureFilters[BACKEND_FILTERS.FUEL_TYPE] = fuelType;
      const labels = getLabelsForSelectedValues(BACKEND_FILTERS.FUEL_TYPE, fuelType);
      if (labels.length > 0) otherFilters.push(labels.slice(0, 2).join(', '));
    }

    if (drivetrain && Object.keys(drivetrain).length > 0) {
      pureFilters[BACKEND_FILTERS.DRIVETRAIN_TYPE] = drivetrain;
      const labels = getLabelsForSelectedValues(BACKEND_FILTERS.DRIVETRAIN_TYPE, drivetrain);
      if (labels.length > 0) otherFilters.push(labels.slice(0, 2).join(', '));
    }

    if (bodyType && Object.keys(bodyType).length > 0) {
      pureFilters[BACKEND_FILTERS.FRAME_TYPE] = bodyType;
      const labels = getLabelsForSelectedValues(BACKEND_FILTERS.FRAME_TYPE, bodyType);
      if (labels.length > 0) otherFilters.push(labels.slice(0, 2).join(', '));
    }

    if (color && Object.keys(color).length > 0) {
      pureFilters[BACKEND_FILTERS.COLOR] = color;
      const labels = getLabelsForSelectedValues(BACKEND_FILTERS.COLOR, color);
      if (labels.length > 0) otherFilters.push(labels.slice(0, 2).join(', '));
    }

    if (condition && Object.keys(condition).length > 0) {
      pureFilters[BACKEND_FILTERS.CONDITION] = condition;
      const labels = getLabelsForSelectedValues(BACKEND_FILTERS.CONDITION, condition);
      if (labels.length > 0) otherFilters.push(labels.slice(0, 2).join(', '));
    }

    if (documentsOk && Object.keys(documentsOk).length > 0) {
      pureFilters[BACKEND_FILTERS.DOCUMENT_TYPE] = documentsOk;
      const labels = getLabelsForSelectedValues(BACKEND_FILTERS.DOCUMENT_TYPE, documentsOk);
      if (labels.length > 0) otherFilters.push(labels.slice(0, 2).join(', '));
    }

    if (numberOfOwners && Object.keys(numberOfOwners).length > 0) {
      pureFilters[BACKEND_FILTERS.NUMBER_OF_OWNER] = numberOfOwners;
      const labels = getLabelsForSelectedValues(BACKEND_FILTERS.NUMBER_OF_OWNER, numberOfOwners);
      if (labels.length > 0) otherFilters.push(labels.slice(0, 2).join(', '));
    }

    if (seller && Object.keys(seller).length > 0) {
      pureFilters[BACKEND_FILTERS.SELLER] = seller;
      const labels = getLabelsForSelectedValues(BACKEND_FILTERS.SELLER, seller);
      if (labels.length > 0) otherFilters.push(labels.slice(0, 2).join(', '));
    }

    if (tradeAllow && Object.keys(tradeAllow).length > 0) {
      pureFilters[BACKEND_FILTERS.TRADE_ALLOW] = tradeAllow;
      const labels = getLabelsForSelectedValues(BACKEND_FILTERS.TRADE_ALLOW, tradeAllow);
      if (labels.length > 0) otherFilters.push(labels.slice(0, 2).join(', '));
    }

    if (engineCapacityRange) {
      pureFilters[BACKEND_FILTERS.ENGINE_CAPACITY] = engineCapacityRange;
      const rangeStr = formatRangeFilterValue(
        BACKEND_FILTERS.ENGINE_CAPACITY,
        engineCapacityRange,
        t,
        createFilterFormatCallback(BACKEND_FILTERS.ENGINE_CAPACITY)
      );
      if (rangeStr) otherFilters.push(rangeStr);
    }

    if (powerRange) {
      pureFilters[BACKEND_FILTERS.POWER] = powerRange;
      const rangeStr = formatRangeFilterValue(BACKEND_FILTERS.POWER, powerRange, t, createFilterFormatCallback(BACKEND_FILTERS.POWER));
      if (rangeStr) otherFilters.push(rangeStr);
    }

    if (mileageRange) {
      pureFilters[BACKEND_FILTERS.MILEAGE] = mileageRange;
      const rangeStr = formatRangeFilterValue(BACKEND_FILTERS.MILEAGE, mileageRange, t, createFilterFormatCallback(BACKEND_FILTERS.MILEAGE));
      if (rangeStr) otherFilters.push(rangeStr);
    }

    if (onlyUnsold) {
      pureFilters[BACKEND_FILTERS.UNSOLD] = true;
      otherFilters.push(BACKEND_FILTERS.UNSOLD.replace(/_/g, ' '));
    }

    if (onlyWithPhotos) {
      pureFilters[BACKEND_FILTERS.WITH_IMAGE] = true;
      otherFilters.push(BACKEND_FILTERS.WITH_IMAGE.replace(/_/g, ' '));
    }

    // Add up to 2 other filters to keep name concise
    if (otherFilters.length > 0) {
      nameParts.push(otherFilters.slice(0, 2).join(', '));
      if (otherFilters.length > 2) nameParts.push('...');
    }

    let name = nameParts.join(' ') || 'Search';
    console.log(name);
    // Limit name to 30 characters
    if (name.length > 30) {
      name = name.substring(0, 17) + '...';
    }

    // Only save if there are actual filters
    if (Object.keys(pureFilters).length > 0) {
      addSearchedItem({ filters: pureFilters, name });
    }
  };
  return saveCurrentFiltersToSearched;
};
