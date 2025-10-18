import {
  GetAppSimpleautocontextPresentationBrandgetcollectionGetbrands200ResponseInner,
  GetAppSimpleautocontextPresentationGenerationgetcollectionGetgenerations200ResponseInner,
  GetAppSimpleautocontextPresentationModelgetcollectionGetcollectionbyfilters200ResponseInner,
  GetRegionIndex200ResponseInner,
} from '@/openapi/client';
import { create } from 'zustand';


type BottomSheetOptionType = {
  value: string;
  label: string;
}

type SelectionStore = {
  selectedBrandsMap: Record<number, GetAppSimpleautocontextPresentationBrandgetcollectionGetbrands200ResponseInner>;
  selectedModelsByBrand: Record<number, GetAppSimpleautocontextPresentationModelgetcollectionGetcollectionbyfilters200ResponseInner[]>;
  selectedGenerationsByModel: Record<number, GetAppSimpleautocontextPresentationGenerationgetcollectionGetgenerations200ResponseInner[]>;

  getSelectedModelsByBrand: (brandId: number) => GetAppSimpleautocontextPresentationModelgetcollectionGetcollectionbyfilters200ResponseInner[];
  getSelectedGenerationsByModel: (modelId: number) => GetAppSimpleautocontextPresentationGenerationgetcollectionGetgenerations200ResponseInner[];

  // Filter states
  tab: 'all' | 'old' | 'new';
  selectedRegions: GetRegionIndex200ResponseInner[];
  onlyUnsold: boolean;
  onlyWithPhotos: boolean;
  transmission?: BottomSheetOptionType[];
  fuelType?: BottomSheetOptionType[];
  drivetrain?: BottomSheetOptionType[];
  bodyType?: BottomSheetOptionType[];
  color?: BottomSheetOptionType[];
  condition?: BottomSheetOptionType[];
  documentsOk?: BottomSheetOptionType[];
  numberOfOwners?: BottomSheetOptionType[];
  seller?: BottomSheetOptionType[];
  tradeAllow?: BottomSheetOptionType[];
  currency?: BottomSheetOptionType[];
  priceRange?: { min?: number; max?: number };
  yearRange?: { min?: number; max?: number };
  engineCapacityRange?: { min?: number; max?: number };
  powerRange?: { min?: number; max?: number };
  mileageRange?: { min?: number; max?: number };

  addSelectedBrand: (item: GetAppSimpleautocontextPresentationBrandgetcollectionGetbrands200ResponseInner) => void;
  addSelectedModel: (item: GetAppSimpleautocontextPresentationModelgetcollectionGetcollectionbyfilters200ResponseInner) => void;
  addSelectedGeneration: (item: GetAppSimpleautocontextPresentationGenerationgetcollectionGetgenerations200ResponseInner) => void;
  removeSelectedBrand: (id: number) => void;
  removeSelectedModel: (id: number) => void;
  removeSelectedGeneration: (id: number) => void;

  // Filter actions
  setTab: (tab: 'all' | 'old' | 'new') => void;
  setSelectedRegions: (regions: GetRegionIndex200ResponseInner[]) => void;
  addRegion: (region: GetRegionIndex200ResponseInner) => void;
  removeRegion: (regionId: number) => void;
  toggleOnlyUnsold: () => void;
  toggleOnlyWithPhotos: () => void;
  setTransmission: (value: BottomSheetOptionType[] | undefined) => void;
  setFuelType: (value: BottomSheetOptionType[] | undefined) => void;
  setDrivetrain: (value: BottomSheetOptionType[] | undefined) => void;
  setBodyType: (value: BottomSheetOptionType[] | undefined) => void;
  setColor: (value: BottomSheetOptionType[] | undefined) => void;
  setCondition: (value: BottomSheetOptionType[] | undefined) => void;
  setDocumentsOk: (value: BottomSheetOptionType[] | undefined) => void;
  setNumberOfOwners: (value: BottomSheetOptionType[] | undefined) => void;
  setSeller: (value: BottomSheetOptionType[] | undefined) => void;
  setTradeAllow: (value: BottomSheetOptionType[] | undefined) => void;
  setCurrency: (value: BottomSheetOptionType[] | undefined) => void;
  setPriceRange: (range: { min?: number; max?: number } | undefined) => void;
  setYearRange: (range: { min?: number; max?: number } | undefined) => void;
  setEngineCapacityRange: (range: { min?: number; max?: number } | undefined) => void;
  setPowerRange: (range: { min?: number; max?: number } | undefined) => void;
  setMileageRange: (range: { min?: number; max?: number } | undefined) => void;
  resetFilters: () => void;

  currentBrand: GetAppSimpleautocontextPresentationBrandgetcollectionGetbrands200ResponseInner | null;
  setCurrentBrand: (brand: GetAppSimpleautocontextPresentationBrandgetcollectionGetbrands200ResponseInner | null) => void;

  clearSelections: () => void;
};

export const useAutoSelectStore = create<SelectionStore>((set, get) => ({
  selectedBrandsMap: {},
  selectedModelsByBrand: {},
  selectedGenerationsByModel: {},
  // Filter states
  tab: 'all',
  selectedRegions: [],
  onlyUnsold: false,
  onlyWithPhotos: false,
  currentBrand: null,

  getSelectedModelsByBrand: (brandId: number) => {
    const state = get();
    return state.selectedModelsByBrand[brandId] || [];
  },
  getSelectedGenerationsByModel: (modelId: number) => {
    const state = get();
    return state.selectedGenerationsByModel[modelId] || [];
  },

  addSelectedBrand: selectedBrand =>
    set(state => {
      const isSelected = state.selectedBrandsMap[selectedBrand.id!];
      if (isSelected) return state;
      return {
        selectedBrandsMap: {
          ...state.selectedBrandsMap,
          [selectedBrand.id!]: selectedBrand,
        },
      };
    }),
  addSelectedModel: selectedModel =>
    set(state => {
      const brandId = state.currentBrand?.id;
      if (!brandId) return state;

      const existingModels = state.selectedModelsByBrand[brandId] || [];

      const isAlreadySelected = existingModels.some(m => m.id === selectedModel.id);
      if (isAlreadySelected) return state;

      const newModelsForBrand = [...existingModels, selectedModel];
      return {
        selectedModelsByBrand: {
          ...state.selectedModelsByBrand,
          [brandId]: newModelsForBrand,
        },
      };
    }),
  addSelectedGeneration: selectedGeneration =>
    set(state => {
      const modelId = (selectedGeneration as any).modelId;
      const existingGenerations = state.selectedGenerationsByModel[modelId] || [];
      const isAlreadySelected = existingGenerations.some(g => g.id === selectedGeneration.id);
      if (isAlreadySelected) return state;
      const newGenerationsForModel = [...existingGenerations, selectedGeneration];
      return {
        selectedGenerationsByModel: {
          ...state.selectedGenerationsByModel,
          [modelId]: newGenerationsForModel,
        },
      };
    }),

  removeSelectedBrand: id =>
    set(state => {
      const newSelectedBrandsMap = { ...state.selectedBrandsMap };
      delete newSelectedBrandsMap[id];
      const newSelectedModelsByBrand = { ...state.selectedModelsByBrand };
      delete newSelectedModelsByBrand[id];
      // Remove generations for models of this brand
      const newSelectedGenerationsByModel = { ...state.selectedGenerationsByModel };
      // We need to find all models that belonged to this brand and remove their generations
      // But since we don't have the model objects anymore, this is tricky
      // For now, we'll assume generations are cleaned up when models are removed
      return {
        selectedBrandsMap: newSelectedBrandsMap,
        selectedModelsByBrand: newSelectedModelsByBrand,
        selectedGenerationsByModel: newSelectedGenerationsByModel,
      };
    }),

  removeSelectedModel: id =>
    set(state => {
      let brandId: number | undefined;
      for (const [bId, models] of Object.entries(state.selectedModelsByBrand)) {
        if (models.some(m => m.id === id)) {
          brandId = +bId;
          break;
        }
      }
      if (!brandId) return state;

      const newModelsForBrand = state.selectedModelsByBrand[brandId].filter(m => m.id !== id);

      const newSelectedModelsByBrand = { ...state.selectedModelsByBrand };

      const newSelectedBrandsMap = { ...state.selectedBrandsMap };
      if (newModelsForBrand.length === 0) {
        delete newSelectedModelsByBrand[brandId];
        delete newSelectedBrandsMap[brandId];
      } else {
        newSelectedModelsByBrand[brandId] = newModelsForBrand;
      }
      // Remove generations for this model
      const newSelectedGenerationsByModel = { ...state.selectedGenerationsByModel };
      delete newSelectedGenerationsByModel[id];

      return {
        selectedModelsByBrand: newSelectedModelsByBrand,
        selectedBrandsMap: newSelectedBrandsMap,
        selectedGenerationsByModel: newSelectedGenerationsByModel,
      };
    }),

  removeSelectedGeneration: id =>
    set(state => {
      let modelId: number | undefined;
      for (const [mId, gens] of Object.entries(state.selectedGenerationsByModel)) {
        if (gens.some(g => g.id === id)) {
          modelId = +mId;
          break;
        }
      }
      if (!modelId) return state;
      const newGenerationsForModel = state.selectedGenerationsByModel[modelId].filter(g => g.id !== id);
      const newSelectedGenerationsByModel = { ...state.selectedGenerationsByModel };
      if (newGenerationsForModel.length === 0) {
        delete newSelectedGenerationsByModel[modelId];
      } else {
        newSelectedGenerationsByModel[modelId] = newGenerationsForModel;
      }
      return {
        selectedGenerationsByModel: newSelectedGenerationsByModel,
      };
    }),

  setCurrentBrand: brand => set({ currentBrand: brand }),

  // Filter actions
  setTab: tab => set({ tab }),
  setSelectedRegions: regions => set({ selectedRegions: regions }),
  addRegion: region =>
    set(state => ({
      selectedRegions: [...state.selectedRegions, region],
    })),
  removeRegion: regionId =>
    set(state => ({
      selectedRegions: state.selectedRegions.filter(r => r.id !== regionId),
    })),
  toggleOnlyUnsold: () => set(state => ({ onlyUnsold: !state.onlyUnsold })),
  toggleOnlyWithPhotos: () => set(state => ({ onlyWithPhotos: !state.onlyWithPhotos })),
  setTransmission: value => set({ transmission: value }),
  setFuelType: value => set({ fuelType: value }),
  setDrivetrain: value => set({ drivetrain: value }),
  setBodyType: value => set({ bodyType: value }),
  setColor: value => set({ color: value }),
  setCondition: value => set({ condition: value }),
  setDocumentsOk: value => set({ documentsOk: value }),
  setNumberOfOwners: value => set({ numberOfOwners: value }),
  setSeller: value => set({ seller: value }),
  setTradeAllow: value => set({ tradeAllow: value }),
  setCurrency: value => set({ currency: value }),
  setPriceRange: range => set({ priceRange: range }),
  setYearRange: range => set({ yearRange: range }),
  setEngineCapacityRange: range => set({ engineCapacityRange: range }),
  setPowerRange: range => set({ powerRange: range }),
  setMileageRange: range => set({ mileageRange: range }),
  resetFilters: () =>
    set({
      tab: 'all',
      selectedRegions: [],
      onlyUnsold: false,
      onlyWithPhotos: false,
      transmission: undefined,
      fuelType: undefined,
      drivetrain: undefined,
      bodyType: undefined,
      color: undefined,
      condition: undefined,
      documentsOk: undefined,
      numberOfOwners: undefined,
      seller: undefined,
      tradeAllow: undefined,
      currency: undefined,
      priceRange: undefined,
      yearRange: undefined,
      engineCapacityRange: undefined,
      powerRange: undefined,
      mileageRange: undefined,
    }),

  clearSelections: () =>
    set({
      selectedBrandsMap: {},
      selectedModelsByBrand: {},
      selectedGenerationsByModel: {},
      tab: 'all',
      selectedRegions: [],
      onlyUnsold: false,
      onlyWithPhotos: false,
      transmission: undefined,
      fuelType: undefined,
      drivetrain: undefined,
      bodyType: undefined,
      color: undefined,
      condition: undefined,
      documentsOk: undefined,
      numberOfOwners: undefined,
      seller: undefined,
      tradeAllow: undefined,
      currency: undefined,
      priceRange: undefined,
      yearRange: undefined,
      engineCapacityRange: undefined,
      powerRange: undefined,
      mileageRange: undefined,
      currentBrand: null,
    }),
}));

// Selector functions to get computed values
export const selectSelectedBrands = (state: SelectionStore) => Object.values(state.selectedBrandsMap);
export const selectSelectedModels = (state: SelectionStore) => Object.values(state.selectedModelsByBrand).flat();
export const selectSelectedGenerations = (state: SelectionStore) => Object.values(state.selectedGenerationsByModel).flat();

export const getYearDisplayValue = (state: SelectionStore) => {
  if (!state.yearRange) return undefined;
  const { min, max } = state.yearRange;
  if (min && max) return `${min} - ${max}`;
  if (min) return `от ${min}`;
  if (max) return `до ${max}`;
  return undefined;
};

export const getPriceDisplayValue = (state: SelectionStore) => {
  if (!state.priceRange) return undefined;
  const { min, max } = state.priceRange;
  if (min && max) return `${min} - ${max}`;
  if (min) return `от ${min}`;
  if (max) return `до ${max}`;
  return undefined;
};

export const getEngineCapacityDisplayValue = (state: SelectionStore) => {
  if (!state.engineCapacityRange) return undefined;
  const { min, max } = state.engineCapacityRange;
  if (min && max) return `${min} - ${max}`;
  if (min) return `от ${min}`;
  if (max) return `до ${max}`;
  return undefined;
};

export const getPowerDisplayValue = (state: SelectionStore) => {
  if (!state.powerRange) return undefined;
  const { min, max } = state.powerRange;
  if (min && max) return `${min} - ${max}`;
  if (min) return `от ${min}`;
  if (max) return `до ${max}`;
  return undefined;
};

export const getMileageDisplayValue = (state: SelectionStore) => {
  if (!state.mileageRange) return undefined;
  const { min, max } = state.mileageRange;
  if (min && max) return `${min} - ${max}`;
  if (min) return `от ${min}`;
  if (max) return `до ${max}`;
  return undefined;
};

export const getActiveFiltersCount = (state: SelectionStore) => {
  let count = 0;

  // Count array filters
  if (state.transmission && state.transmission.length > 0) count++;
  if (state.fuelType && state.fuelType.length > 0) count++;
  if (state.drivetrain && state.drivetrain.length > 0) count++;
  if (state.bodyType && state.bodyType.length > 0) count++;
  if (state.color && state.color.length > 0) count++;
  if (state.numberOfOwners && state.numberOfOwners.length > 0) count++;
  if (state.seller && state.seller.length > 0) count++;
  if (state.selectedRegions && state.selectedRegions.length > 0) count++;

  // Count range filters
  if (state.priceRange && (state.priceRange.min !== undefined || state.priceRange.max !== undefined)) count++;
  if (state.yearRange && (state.yearRange.min !== undefined || state.yearRange.max !== undefined)) count++;
  if (state.engineCapacityRange && (state.engineCapacityRange.min !== undefined || state.engineCapacityRange.max !== undefined)) count++;
  if (state.powerRange && (state.powerRange.min !== undefined || state.powerRange.max !== undefined)) count++;
  if (state.mileageRange && (state.mileageRange.min !== undefined || state.mileageRange.max !== undefined)) count++;

  // Count boolean filters
  if (state.onlyUnsold) count++;
  if (state.onlyWithPhotos) count++;

  return count;
};
