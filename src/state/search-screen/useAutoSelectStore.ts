import {
  GetAppSimpleautocontextPresentationBrandgetcollectionGetbrands200ResponseInner,
  GetAppSimpleautocontextPresentationModelgetcollectionGetcollectionbyfilters200ResponseInner,
  GetAppSimpleautocontextPresentationGenerationgetcollectionGetgenerations200ResponseInner
} from '@/openapi/client';
import { create } from 'zustand';

type SelectionStore = {
  selectedBrands: GetAppSimpleautocontextPresentationBrandgetcollectionGetbrands200ResponseInner[];
  selectedModels: GetAppSimpleautocontextPresentationModelgetcollectionGetcollectionbyfilters200ResponseInner[];
  selectedGenerations: GetAppSimpleautocontextPresentationGenerationgetcollectionGetgenerations200ResponseInner[];
  addSelectedBrand: (item: GetAppSimpleautocontextPresentationBrandgetcollectionGetbrands200ResponseInner) => void;
  addSelectedModel: (item: GetAppSimpleautocontextPresentationModelgetcollectionGetcollectionbyfilters200ResponseInner) => void;
  addSelectedGeneration: (item: GetAppSimpleautocontextPresentationGenerationgetcollectionGetgenerations200ResponseInner) => void;
  clearSelections: () => void;
  setSelectedBrands: (brands: GetAppSimpleautocontextPresentationBrandgetcollectionGetbrands200ResponseInner[]) => void;
  setSelectedModels: (models: GetAppSimpleautocontextPresentationModelgetcollectionGetcollectionbyfilters200ResponseInner[]) => void;
  setSelectedGenerations: (generations: GetAppSimpleautocontextPresentationGenerationgetcollectionGetgenerations200ResponseInner[]) => void;
};

export const useAutoSelectStore = create<SelectionStore>((set, get) => ({
  selectedBrands: [],
  selectedModels: [],
  selectedGenerations: [],
  addSelectedBrand: (selectedBrand) => set((state) => {
    const isSelected = state.selectedBrands.some((b) => b.id === selectedBrand.id);
    return {
      selectedBrands: isSelected
        ? state.selectedBrands.filter((b) => b.id !== selectedBrand.id)
        : [selectedBrand], // Single selection for brands
    };
  }),
  addSelectedModel: (selectedModel) => set((state) => {
    const isSelected = state.selectedModels.some((m) => m.id === selectedModel.id);
    return {
      selectedModels: isSelected
        ? state.selectedModels.filter((m) => m.id !== selectedModel.id)
        : [...state.selectedModels, selectedModel],
    };
  }),
  addSelectedGeneration: (selectedGeneration) => set((state) => {
    const isSelected = state.selectedGenerations.some((g) => g.id === selectedGeneration.id);
    return {
      selectedGenerations: isSelected
        ? state.selectedGenerations.filter((g) => g.id !== selectedGeneration.id)
        : [...state.selectedGenerations, selectedGeneration],
    };
  }),
  clearSelections: () => set({
    selectedBrands: [],
    selectedModels: [],
    selectedGenerations: [],
  }),
  setSelectedBrands: (brands) => set({ selectedBrands: brands }),
  setSelectedModels: (models) => set({ selectedModels: models }),
  setSelectedGenerations: (generations) => set({ selectedGenerations: generations }),
}));
