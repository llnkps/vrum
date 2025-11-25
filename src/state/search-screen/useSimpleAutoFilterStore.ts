import { Region, SimpleAutoBrand, SimpleAutoGeneration, SimpleAutoModel } from '@/openapi/client';
import { FilterOptionType, RangeFilterType, SelectFilterType } from '@/types/filter';
import { SortMethod } from '@/types/sort';
import { create } from 'zustand';

// Utility function to convert FilterOptionType[] to SelectFilterType
const convertFilterOptionsToSelectFilter = (options: FilterOptionType[] | undefined): SelectFilterType | undefined => {
  if (!options) return undefined;
  return options.reduce((acc, option, index) => {
    acc[index] = option.value;
    return acc;
  }, {} as SelectFilterType);
};

// Utility function to convert subscription filter object to SelectFilterType
const convertSubscriptionFilterToSelectFilter = (value: any): SelectFilterType | undefined => {
  if (!value || typeof value !== 'object') return undefined;
  return value as SelectFilterType;
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
  transmission?: SelectFilterType;
  fuelType?: SelectFilterType;
  drivetrain?: SelectFilterType;
  bodyType?: SelectFilterType;
  color?: SelectFilterType;
  condition?: SelectFilterType;
  documentsOk?: SelectFilterType;
  numberOfOwners?: SelectFilterType;
  seller?: SelectFilterType;
  tradeAllow?: SelectFilterType;
  currency?: SelectFilterType;
  priceRange?: RangeFilterType;
  yearRange?: RangeFilterType;
  engineCapacityRange?: RangeFilterType;
  powerRange?: RangeFilterType;
  mileageRange?: RangeFilterType;

  addSelectedBrand: (item: SimpleAutoBrand) => void;
  addSelectedModel: (items: SimpleAutoModel[]) => void;
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

  setTransmission: (value: FilterOptionType[] | undefined) => void;
  setFuelType: (value: FilterOptionType[] | undefined) => void;
  setDrivetrain: (value: FilterOptionType[] | undefined) => void;
  setBodyType: (value: FilterOptionType[] | undefined) => void;
  setColor: (value: FilterOptionType[] | undefined) => void;
  setCondition: (value: FilterOptionType[] | undefined) => void;
  setDocumentsOk: (value: FilterOptionType[] | undefined) => void;
  setNumberOfOwners: (value: FilterOptionType[] | undefined) => void;
  setSeller: (value: FilterOptionType[] | undefined) => void;
  setTradeAllow: (value: FilterOptionType[] | undefined) => void;
  setCurrency: (value: FilterOptionType[] | undefined) => void;
  setPriceRange: (range: RangeFilterType | undefined) => void;
  setYearRange: (range: RangeFilterType | undefined) => void;
  setEngineCapacityRange: (range: RangeFilterType | undefined) => void;
  setPowerRange: (range: RangeFilterType | undefined) => void;
  setMileageRange: (range: RangeFilterType | undefined) => void;

  resetFilters: () => void;

  currentBrand: SimpleAutoBrand | null;
  setCurrentBrand: (brand: SimpleAutoBrand | null) => void;

  clearSelections: () => void;
  populateFromFilterValues: (filterValues: Array<{ slug: string; values: string[] }>) => void;
  populateFromSubscriptionFilters: (filters: { [key: string]: any }) => void;

  sortMethod?: SortMethod;
  setSortMethod: (method: SortMethod) => void;
};

export const useSimpleAutoFilterStore = create<SelectionStore>((set, get) => ({
  selectedBrandsMap: {},
  selectedModelsByBrand: {},
  selectedGenerationsByModel: {},
  // Filter states
  tab: 'all',
  selectedRegions: [],
  onlyUnsold: false,
  onlyWithPhotos: false,
  currentBrand: null,
  sortMethod: { fieldName: 'createdAt', direction: 3 },

  // priceRange: {},

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
  addSelectedModel: selectedModels =>
    set(state => {
      const brand = state.currentBrand;
      if (!brand?.id || !selectedModels || selectedModels.length === 0) {
        return state;
      }

      const brandId = brand.id;
      const existingModels = state.selectedModelsByBrand[brandId] || [];

      const mergedModelsMap = new Map<number, SimpleAutoModel>();
      existingModels.forEach(model => {
        if (model?.id !== undefined) {
          mergedModelsMap.set(model.id, model);
        }
      });

      selectedModels.forEach(model => {
        if (model?.id !== undefined) {
          mergedModelsMap.set(model.id, model);
        }
      });

      const mergedModels = Array.from(mergedModelsMap.values());

      const updatedSelectedModelsByBrand = { ...state.selectedModelsByBrand };
      const updatedSelectedBrandsMap = { ...state.selectedBrandsMap };

      if (mergedModels.length > 0) {
        updatedSelectedModelsByBrand[brandId] = mergedModels;
        updatedSelectedBrandsMap[brandId] = brand;
      } else {
        delete updatedSelectedModelsByBrand[brandId];
        delete updatedSelectedBrandsMap[brandId];
      }

      return {
        selectedModelsByBrand: updatedSelectedModelsByBrand,
        selectedBrandsMap: updatedSelectedBrandsMap,
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

  setTransmission: values => set({ transmission: convertFilterOptionsToSelectFilter(values) }),
  setFuelType: values => set({ fuelType: convertFilterOptionsToSelectFilter(values) }),
  setDrivetrain: values => set({ drivetrain: convertFilterOptionsToSelectFilter(values) }),
  setBodyType: values => set({ bodyType: convertFilterOptionsToSelectFilter(values) }),
  setColor: values => set({ color: convertFilterOptionsToSelectFilter(values) }),
  setCondition: value => set({ condition: convertFilterOptionsToSelectFilter(value) }),
  setDocumentsOk: value => set({ documentsOk: convertFilterOptionsToSelectFilter(value) }),
  setNumberOfOwners: value => set({ numberOfOwners: convertFilterOptionsToSelectFilter(value) }),
  setSeller: value => set({ seller: convertFilterOptionsToSelectFilter(value) }),
  setTradeAllow: value => set({ tradeAllow: convertFilterOptionsToSelectFilter(value) }),
  setCurrency: value => set({ currency: convertFilterOptionsToSelectFilter(value) }),
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
      sortMethod: { fieldName: 'createdAt', direction: 3 },
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
      sortMethod: { fieldName: 'createdAt', direction: 3 },
      currentBrand: null,
    }),

  populateFromFilterValues: filterValues => {
    // Reset filters first
    get().resetFilters();
    filterValues.forEach(({ slug, values }) => {
      const mappedValues = values.map(v => ({ value: v, label: v }));
      switch (slug) {
        case 'transmission':
          set({ transmission: convertFilterOptionsToSelectFilter(mappedValues) });
          break;
        case 'fuelType':
          set({ fuelType: convertFilterOptionsToSelectFilter(mappedValues) });
          break;
        case 'drivetrain':
          set({ drivetrain: convertFilterOptionsToSelectFilter(mappedValues) });
          break;
        case 'bodyType':
          set({ bodyType: convertFilterOptionsToSelectFilter(mappedValues) });
          break;
        case 'color':
          set({ color: convertFilterOptionsToSelectFilter(mappedValues) });
          break;
        case 'condition':
          set({ condition: convertFilterOptionsToSelectFilter(mappedValues) });
          break;
        case 'documentsOk':
          set({ documentsOk: convertFilterOptionsToSelectFilter(mappedValues) });
          break;
        case 'numberOfOwners':
          set({ numberOfOwners: convertFilterOptionsToSelectFilter(mappedValues) });
          break;
        case 'seller':
          set({ seller: convertFilterOptionsToSelectFilter(mappedValues) });
          break;
        case 'tradeAllow':
          set({ tradeAllow: convertFilterOptionsToSelectFilter(mappedValues) });
          break;
        case 'currency':
          set({ currency: convertFilterOptionsToSelectFilter(mappedValues) });
          break;
        case 'unsold':
          set({ onlyUnsold: values[0] === 'true' });
          break;
        case 'with_image':
          set({ onlyWithPhotos: values[0] === 'true' });
          break;
        case 'price':
          if (values.length >= 1) {
            const from = values[0] ? parseInt(values[0]) : undefined;
            const to = values[1] ? parseInt(values[1]) : undefined;
            set({ priceRange: { from, to } });
          }
          break;
        case 'year':
          if (values.length >= 1) {
            const from = values[0] ? parseInt(values[0]) : undefined;
            const to = values[1] ? parseInt(values[1]) : undefined;
            set({ yearRange: { from, to } });
          }
          break;
        case 'engineCapacityRange':
          if (values.length >= 1) {
            const from = values[0] ? parseFloat(values[0]) : undefined;
            const to = values[1] ? parseFloat(values[1]) : undefined;
            set({ engineCapacityRange: { from, to } });
          }
          break;
        case 'powerRange':
          if (values.length >= 1) {
            const from = values[0] ? parseInt(values[0]) : undefined;
            const to = values[1] ? parseInt(values[1]) : undefined;
            set({ powerRange: { from, to } });
          }
          break;
        case 'mileageRange':
          if (values.length >= 1) {
            const from = values[0] ? parseInt(values[0]) : undefined;
            const to = values[1] ? parseInt(values[1]) : undefined;
            set({ mileageRange: { from, to } });
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
          set({ transmission: convertSubscriptionFilterToSelectFilter(value) });
          break;
        case 'fuelType':
          set({ fuelType: convertSubscriptionFilterToSelectFilter(value) });
          break;
        case 'drivetrain':
          set({ drivetrain: convertSubscriptionFilterToSelectFilter(value) });
          break;
        case 'bodyType':
          set({ bodyType: convertSubscriptionFilterToSelectFilter(value) });
          break;
        case 'color':
          set({ color: convertSubscriptionFilterToSelectFilter(value) });
          break;
        case 'numberOfOwners':
          set({ numberOfOwners: convertSubscriptionFilterToSelectFilter(value) });
          break;
        case 'seller':
          set({ seller: convertSubscriptionFilterToSelectFilter(value) });
          break;
        case 'condition':
          if (value && typeof value === 'object') {
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
            const from = value.from ? parseFloat(value.from) : undefined;
            const to = value.to ? parseFloat(value.to) : undefined;
            set({ engineCapacityRange: { from, to } });
          }
          break;
        case 'power':
          if (value && typeof value === 'object' && 'from' in value && 'to' in value) {
            const from = value.from ? parseInt(value.from) : undefined;
            const to = value.to ? parseInt(value.to) : undefined;
            set({ powerRange: { from, to } });
          }
          break;
        case 'mileage':
          if (value && typeof value === 'object' && 'from' in value && 'to' in value) {
            const from = value.from ? parseInt(value.from) : undefined;
            const to = value.to ? parseInt(value.to) : undefined;
            set({ mileageRange: { from, to } });
          }
          break;
        case 'year':
          if (value && typeof value === 'object' && 'from' in value && 'to' in value) {
            const from = value.from ? parseInt(value.from) : undefined;
            const to = value.to ? parseInt(value.to) : undefined;
            set({ yearRange: { from, to } });
          }
          break;
        case 'price':
          set({ priceRange: { from: value.from, to: value.to } });

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
              slug: '',
              orderNumber: 0,
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

export const getActiveFiltersCount = (state: SelectionStore) => {
  let count = 0;

  // Count select filters (SelectFilterType objects)
  if (state.transmission && Object.keys(state.transmission).length > 0) count++;
  if (state.fuelType && Object.keys(state.fuelType).length > 0) count++;
  if (state.drivetrain && Object.keys(state.drivetrain).length > 0) count++;
  if (state.bodyType && Object.keys(state.bodyType).length > 0) count++;
  if (state.color && Object.keys(state.color).length > 0) count++;
  if (state.condition && Object.keys(state.condition).length > 0) count++;
  if (state.currency && Object.keys(state.currency).length > 0) count++;
  if (state.documentsOk && Object.keys(state.documentsOk).length > 0) count++;
  if (state.numberOfOwners && Object.keys(state.numberOfOwners).length > 0) count++;
  if (state.seller && Object.keys(state.seller).length > 0) count++;
  if (state.tradeAllow && Object.keys(state.tradeAllow).length > 0) count++;
  if (state.selectedRegions && state.selectedRegions.length > 0) count++;

  // Count range filters
  if (state.priceRange && (state.priceRange.from !== undefined || state.priceRange.to !== undefined)) count++;
  if (state.yearRange && (state.yearRange.from !== undefined || state.yearRange.to !== undefined)) count++;
  if (state.engineCapacityRange && (state.engineCapacityRange.from !== undefined || state.engineCapacityRange.to !== undefined)) count++;
  if (state.powerRange && (state.powerRange.from !== undefined || state.powerRange.to !== undefined)) count++;
  if (state.mileageRange && (state.mileageRange.from !== undefined || state.mileageRange.to !== undefined)) count++;

  // Count boolean filters
  if (state.onlyUnsold) count++;
  if (state.onlyWithPhotos) count++;

  return count;
};
