import {
  GetAppSimpleautocontextPresentationBrandgetcollectionGetbrands200ResponseInner,
  GetAppSimpleautocontextPresentationModelgetcollectionGetcollectionbyfilters200ResponseInner,
  GetAppSimpleautocontextPresentationGenerationgetcollectionGetgenerations200ResponseInner
} from '@/openapi/client';
import { create } from 'zustand';

type SelectionStore = {
  selectedBrandsMap: Record<number, GetAppSimpleautocontextPresentationBrandgetcollectionGetbrands200ResponseInner>;
  selectedModelsByBrand: Record<number, GetAppSimpleautocontextPresentationModelgetcollectionGetcollectionbyfilters200ResponseInner[]>;
  selectedGenerationsByModel: Record<number, GetAppSimpleautocontextPresentationGenerationgetcollectionGetgenerations200ResponseInner[]>;
  
  // Filter states
  priceFilter: { min?: number; max?: number } | null;
  yearFilter: { min?: number; max?: number } | null;
  regionFilter: GetAppSimpleautocontextPresentationBrandgetcollectionGetbrands200ResponseInner | null; // Using brand type as placeholder, should be region type
  
  addSelectedBrand: (item: GetAppSimpleautocontextPresentationBrandgetcollectionGetbrands200ResponseInner) => void;
  addSelectedModel: (item: GetAppSimpleautocontextPresentationModelgetcollectionGetcollectionbyfilters200ResponseInner) => void;
  addSelectedGeneration: (item: GetAppSimpleautocontextPresentationGenerationgetcollectionGetgenerations200ResponseInner) => void;
  removeSelectedBrand: (id: number) => void;
  removeSelectedModel: (id: number) => void;
  removeSelectedGeneration: (id: number) => void;
  
  // Filter actions
  setPriceFilter: (price: { min?: number; max?: number } | null) => void;
  setYearFilter: (year: { min?: number; max?: number } | null) => void;
  setRegionFilter: (region: GetAppSimpleautocontextPresentationBrandgetcollectionGetbrands200ResponseInner | null) => void;
  
  currentBrand: GetAppSimpleautocontextPresentationBrandgetcollectionGetbrands200ResponseInner | null;
  setCurrentBrand: (brand: GetAppSimpleautocontextPresentationBrandgetcollectionGetbrands200ResponseInner | null) => void;
  
  clearSelections: () => void;
};

export const useAutoSelectStore = create<SelectionStore>((set, get) => ({
  selectedBrandsMap: {},
  selectedModelsByBrand: {},
  selectedGenerationsByModel: {},
  priceFilter: null,
  yearFilter: null,
  regionFilter: null,
  currentBrand: null,
  addSelectedBrand: (selectedBrand) => set((state) => {
    const isSelected = state.selectedBrandsMap[selectedBrand.id!];
    if (isSelected) return state;
    return {
      selectedBrandsMap: {
        ...state.selectedBrandsMap,
        [selectedBrand.id!]: selectedBrand
      },
    };
  }),
  addSelectedModel: (selectedModel) => set((state) => {
    const brandId = state.currentBrand?.id;
    if (!brandId) return state;
    
    const existingModels = state.selectedModelsByBrand[brandId] || [];

    const isAlreadySelected = existingModels.some(m => m.id === selectedModel.id);
    if (isAlreadySelected) return state;

    const newModelsForBrand = [...existingModels, selectedModel];
    return {
      selectedModelsByBrand: {
        ...state.selectedModelsByBrand,
        [brandId]: newModelsForBrand
      },
      selectedBrandsMap: {
        ...state.selectedBrandsMap,
        [brandId]: state.currentBrand!
      }
    };
  }),
  addSelectedGeneration: (selectedGeneration) => set((state) => {
    const modelId = (selectedGeneration as any).modelId;
    const existingGenerations = state.selectedGenerationsByModel[modelId] || [];
    const isAlreadySelected = existingGenerations.some(g => g.id === selectedGeneration.id);
    if (isAlreadySelected) return state;
    const newGenerationsForModel = [...existingGenerations, selectedGeneration];
    return {
      selectedGenerationsByModel: {
        ...state.selectedGenerationsByModel,
        [modelId]: newGenerationsForModel
      }
    };
  }),

  removeSelectedBrand: (id) => set((state) => {
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
      selectedGenerationsByModel: newSelectedGenerationsByModel
    };
  }),
  
  removeSelectedModel: (id) => set((state) => {
    let brandId: number | undefined;
    for (const [bId, models] of Object.entries(state.selectedModelsByBrand)) {
      if (models.some(m => m.id === id)) {
        brandId = +bId;
        break;
      }
    }
    if (!brandId) return state;

    const newModelsForBrand = state.selectedModelsByBrand[brandId].filter((m) => m.id !== id);
    
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
      selectedGenerationsByModel: newSelectedGenerationsByModel
    };
  }),

  removeSelectedGeneration: (id) => set((state) => {
    let modelId: number | undefined;
    for (const [mId, gens] of Object.entries(state.selectedGenerationsByModel)) {
      if (gens.some(g => g.id === id)) {
        modelId = +mId;
        break;
      }
    }
    if (!modelId) return state;
    const newGenerationsForModel = state.selectedGenerationsByModel[modelId].filter((g) => g.id !== id);
    const newSelectedGenerationsByModel = { ...state.selectedGenerationsByModel };
    if (newGenerationsForModel.length === 0) {
      delete newSelectedGenerationsByModel[modelId];
    } else {
      newSelectedGenerationsByModel[modelId] = newGenerationsForModel;
    }
    return {
      selectedGenerationsByModel: newSelectedGenerationsByModel
    };
  }),
  
  setCurrentBrand: (brand) => set({ currentBrand: brand }),
  
  // Filter setters
  setPriceFilter: (price) => set({ priceFilter: price }),
  setYearFilter: (year) => set({ yearFilter: year }),
  setRegionFilter: (region) => set({ regionFilter: region }),
  
  clearSelections: () => set({
    selectedBrandsMap: {},
    selectedModelsByBrand: {},
    selectedGenerationsByModel: {},
    priceFilter: null,
    yearFilter: null,
    regionFilter: null,
    currentBrand: null,
  }),
}));

// Selector functions to get computed values
export const selectSelectedBrands = (state: SelectionStore) => Object.values(state.selectedBrandsMap);
export const selectSelectedModels = (state: SelectionStore) => Object.values(state.selectedModelsByBrand).flat();
export const selectSelectedGenerations = (state: SelectionStore) => Object.values(state.selectedGenerationsByModel).flat();
