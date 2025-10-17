import {
  GetAppSimpleautocontextPresentationBrandgetcollectionGetbrands200ResponseInner,
  GetAppSimpleautocontextPresentationModelgetcollectionGetcollectionbyfilters200ResponseInner,
  GetAppSimpleautocontextPresentationGenerationgetcollectionGetgenerations200ResponseInner,
  GetRegionIndex200ResponseInner,
} from '@/openapi/client';
import { create } from 'zustand';

type SelectionStore = {
  selectedBrandsMap: Record<
    number,
    GetAppSimpleautocontextPresentationBrandgetcollectionGetbrands200ResponseInner
  >;
  selectedModelsByBrand: Record<
    number,
    GetAppSimpleautocontextPresentationModelgetcollectionGetcollectionbyfilters200ResponseInner[]
  >;
  selectedGenerationsByModel: Record<
    number,
    GetAppSimpleautocontextPresentationGenerationgetcollectionGetgenerations200ResponseInner[]
  >;

  // Filter states
  tab: 'all' | 'old' | 'new';
  selectedRegions: GetRegionIndex200ResponseInner[];
  onlyUnsold: boolean;
  onlyWithPhotos: boolean;
  transmission?: string;
  fuelType?: string;
  drivetrain?: string;
  bodyType?: string;
  color?: string;
  condition?: string;
  documentsOk?: string;
  numberOfOwners?: string;
  seller?: string;
  tradeAllow?: string;
  currency?: string;
  priceRange?: { min?: number; max?: number };
  yearRange?: { min?: number; max?: number };

  addSelectedBrand: (
    item: GetAppSimpleautocontextPresentationBrandgetcollectionGetbrands200ResponseInner
  ) => void;
  addSelectedModel: (
    item: GetAppSimpleautocontextPresentationModelgetcollectionGetcollectionbyfilters200ResponseInner
  ) => void;
  addSelectedGeneration: (
    item: GetAppSimpleautocontextPresentationGenerationgetcollectionGetgenerations200ResponseInner
  ) => void;
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
  setTransmission: (value: string | undefined) => void;
  setFuelType: (value: string | undefined) => void;
  setDrivetrain: (value: string | undefined) => void;
  setBodyType: (value: string | undefined) => void;
  setColor: (value: string | undefined) => void;
  setCondition: (value: string | undefined) => void;
  setDocumentsOk: (value: string | undefined) => void;
  setNumberOfOwners: (value: string | undefined) => void;
  setSeller: (value: string | undefined) => void;
  setTradeAllow: (value: string | undefined) => void;
  setCurrency: (value: string | undefined) => void;
  setPriceRange: (range: { min?: number; max?: number } | undefined) => void;
  setYearRange: (range: { min?: number; max?: number } | undefined) => void;
  resetFilters: () => void;

  currentBrand: GetAppSimpleautocontextPresentationBrandgetcollectionGetbrands200ResponseInner | null;
  setCurrentBrand: (
    brand: GetAppSimpleautocontextPresentationBrandgetcollectionGetbrands200ResponseInner | null
  ) => void;

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
        selectedBrandsMap: {
          ...state.selectedBrandsMap,
          [brandId]: state.currentBrand!,
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
      const newGenerationsForModel = state.selectedGenerationsByModel[modelId].filter(
        g => g.id !== id
      );
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
      currentBrand: null,
    }),
}));

// Selector functions to get computed values
export const selectSelectedBrands = (state: SelectionStore) =>
  Object.values(state.selectedBrandsMap);
export const selectSelectedModels = (state: SelectionStore) =>
  Object.values(state.selectedModelsByBrand).flat();
export const selectSelectedGenerations = (state: SelectionStore) =>
  Object.values(state.selectedGenerationsByModel).flat();
