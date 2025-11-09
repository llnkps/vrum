import { SimpleAutoBrand, SimpleAutoGeneration, SimpleAutoModel, Region } from '@/openapi/client';
import { SortMethod } from '@/types/sort';
import { create } from 'zustand';

type BottomSheetOptionType = {
  value: string;
  label: string;
};

type SelectionStore = {
  selectedBrandsMap: Record<number, SimpleAutoBrand>;
  selectedModelsByBrand: Record<number, SimpleAutoModel[]>;
  selectedGenerationsByModel: Record<number, SimpleAutoGeneration[]>;

  getSelectedModelsByBrand: (brandId: number) => SimpleAutoModel[];
  getSelectedGenerationsByModel: (modelId: number) => SimpleAutoGeneration[];

  // Filter states with type safety
  tab: 'all' | 'old' | 'new';
  selectedRegions: Region[];
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

  addSelectedBrand: (item: SimpleAutoBrand) => void;
  addSelectedModel: (item: SimpleAutoModel) => void;
  addSelectedGeneration: (item: SimpleAutoGeneration) => void;
  removeSelectedBrand: (id: number) => void;
  removeSelectedModel: (id: number) => void;
  removeSelectedGeneration: (id: number) => void;

  // Filter actions
  setTab: (tab: 'all' | 'old' | 'new') => void;
  setSelectedRegions: (regions: Region[]) => void;
  addRegion: (region: Region) => void;
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

  currentBrand: SimpleAutoBrand | null;
  setCurrentBrand: (brand: SimpleAutoBrand | null) => void;

  clearSelections: () => void;
  populateFromFilterValues: (filterValues: Array<{ slug: string; values: string[] }>) => void;
  populateFromSubscriptionFilters: (filters: { [key: string]: any }) => void;

  sortMethod?: SortMethod;
  setSortMethod: (method: SortMethod) => void;
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
  sortMethod: {fieldName: 'createdAt', direction: 3},

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
  setSortMethod: method => set({ sortMethod: method }),
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
      sortMethod: {fieldName: 'createdAt', direction: 3},
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
      sortMethod: {fieldName: 'createdAt', direction: 3},
      currentBrand: null,
    }),

  populateFromFilterValues: filterValues => {
    // Reset filters first
    get().resetFilters();
    filterValues.forEach(({ slug, values }) => {
      const mappedValues = values.map(v => ({ value: v, label: v }));
      switch (slug) {
        case 'transmission':
          set({ transmission: mappedValues });
          break;
        case 'fuelType':
          set({ fuelType: mappedValues });
          break;
        case 'drivetrain':
          set({ drivetrain: mappedValues });
          break;
        case 'bodyType':
          set({ bodyType: mappedValues });
          break;
        case 'color':
          set({ color: mappedValues });
          break;
        case 'condition':
          set({ condition: mappedValues });
          break;
        case 'documentsOk':
          set({ documentsOk: mappedValues });
          break;
        case 'numberOfOwners':
          set({ numberOfOwners: mappedValues });
          break;
        case 'seller':
          set({ seller: mappedValues });
          break;
        case 'tradeAllow':
          set({ tradeAllow: mappedValues });
          break;
        case 'currency':
          set({ currency: mappedValues });
          break;
        case 'unsold':
          set({ onlyUnsold: values[0] === 'true' });
          break;
        case 'with_image':
          set({ onlyWithPhotos: values[0] === 'true' });
          break;
        case 'price':
          if (values.length >= 1) {
            const min = values[0] ? parseInt(values[0]) : undefined;
            const max = values[1] ? parseInt(values[1]) : undefined;
            set({ priceRange: { min, max } });
          }
          break;
        case 'year':
          if (values.length >= 1) {
            const min = values[0] ? parseInt(values[0]) : undefined;
            const max = values[1] ? parseInt(values[1]) : undefined;
            set({ yearRange: { min, max } });
          }
          break;
        case 'engineCapacityRange':
          if (values.length >= 1) {
            const min = values[0] ? parseFloat(values[0]) : undefined;
            const max = values[1] ? parseFloat(values[1]) : undefined;
            set({ engineCapacityRange: { min, max } });
          }
          break;
        case 'powerRange':
          if (values.length >= 1) {
            const min = values[0] ? parseInt(values[0]) : undefined;
            const max = values[1] ? parseInt(values[1]) : undefined;
            set({ powerRange: { min, max } });
          }
          break;
        case 'mileageRange':
          if (values.length >= 1) {
            const min = values[0] ? parseInt(values[0]) : undefined;
            const max = values[1] ? parseInt(values[1]) : undefined;
            set({ mileageRange: { min, max } });
          }
          break;
        default:
          break;
      }
    });
  },

  populateFromSubscriptionFilters: filters => {
    console.log(filters);
    // Reset filters first
    get().resetFilters();
    Object.entries(filters).forEach(([key, value]) => {
      switch (key) {
        case 'transmission':
          if (value && typeof value === 'object') {
            const values = Object.values(value as Record<string, string>);
            set({ transmission: values.map(v => ({ value: v, label: v })) });
          }
          break;
        case 'fuelType':
          if (value && typeof value === 'object') {
            const values = Object.values(value as Record<string, string>);
            set({ fuelType: values.map(v => ({ value: v, label: v })) });
          }
          break;
        case 'drivetrain':
          if (value && typeof value === 'object') {
            const values = Object.values(value as Record<string, string>);
            set({ drivetrain: values.map(v => ({ value: v, label: v })) });
          }
          break;
        case 'bodyType':
          if (value && typeof value === 'object') {
            const values = Object.values(value as Record<string, string>);
            set({ bodyType: values.map(v => ({ value: v, label: v })) });
          }
          break;
        case 'color':
          if (value && typeof value === 'object') {
            const values = Object.values(value as Record<string, string>);
            set({ color: values.map(v => ({ value: v, label: v })) });
          }
          break;
        case 'numberOfOwners':
          if (value && typeof value === 'object') {
            const values = Object.values(value as Record<string, string>);
            set({ numberOfOwners: values.map(v => ({ value: v, label: v })) });
          }
          break;
        case 'seller':
          if (value && typeof value === 'object') {
            const values = Object.values(value as Record<string, string>);
            set({ seller: values.map(v => ({ value: v, label: v })) });
          }
          break;
        case 'condition':
          if (value && typeof value === 'object') {
            const values = Object.values(value as Record<string, string>);
            const conditionValues = Object.values(value as Record<string, string>);
            if (conditionValues.includes('used')) set({ tab: 'old' });
            else if (conditionValues.includes('new')) set({ tab: 'new' });
            else set({ tab: 'all' });
          }
          break;
        case 'onlyUnsold':
          set({ onlyUnsold: value === 'true' });
          break;
        case 'onlyWithPhotos':
          set({ onlyWithPhotos: value === 'true' });
          break;
        case 'engineCapacity':
          if (value && typeof value === 'object' && 'from' in value && 'to' in value) {
            const min = value.from ? parseFloat(value.from) : undefined;
            const max = value.to ? parseFloat(value.to) : undefined;
            set({ engineCapacityRange: { min, max } });
          }
          break;
        case 'power':
          if (value && typeof value === 'object' && 'from' in value && 'to' in value) {
            const min = value.from ? parseInt(value.from) : undefined;
            const max = value.to ? parseInt(value.to) : undefined;
            set({ powerRange: { min, max } });
          }
          break;
        case 'mileage':
          if (value && typeof value === 'object' && 'from' in value && 'to' in value) {
            const min = value.from ? parseInt(value.from) : undefined;
            const max = value.to ? parseInt(value.to) : undefined;
            set({ mileageRange: { min, max } });
          }
          break;
        case 'year':
          if (value && typeof value === 'object' && 'from' in value && 'to' in value) {
            const min = value.from ? parseInt(value.from) : undefined;
            const max = value.to ? parseInt(value.to) : undefined;
            set({ yearRange: { min, max } });
          }
          break;
        case 'price':
          set({ priceRange: { min: value.from, max: value.to } });

          // if (value && typeof value === 'object' && 'from' in value && 'to' in value) {
          //     const min = value.from ? parseInt(value.from) : undefined;
          //     const max = value.to ? parseInt(value.to) : undefined;
          //   }
          break;
        case 'b':
          // Handle brands with models
          if (value && typeof value === 'object') {
            const brandsMap: Record<number, SimpleAutoBrand> = {};
            const modelsByBrand: Record<number, SimpleAutoModel[]> = {};
            Object.values(value as Record<string, any>).forEach((brandData: any) => {
              if (brandData.id && brandData.models) {
                brandsMap[brandData.id] = { id: brandData.id, name: '', orderNumber: 0, image: '', imageFilePath: '' };
                const models: SimpleAutoModel[] = Object.values(brandData.models as Record<string, number>).map((modelId: number) => ({
                  id: modelId,
                  name: '',
                  orderNumber: 0,
                }));
                modelsByBrand[brandData.id] = models;
              }
            });
            set({ selectedBrandsMap: brandsMap, selectedModelsByBrand: modelsByBrand });
          }
          break;
        case 'r':
          // Handle regions
          if (value && typeof value === 'object') {
            const regions: Region[] = Object.values(value as Record<string, string>).map((regionId: string) => ({
              id: parseInt(regionId),
              name: '',
            }));
            set({ selectedRegions: regions });
          }
          break;
        default:
          break;
      }
    });
  },
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
