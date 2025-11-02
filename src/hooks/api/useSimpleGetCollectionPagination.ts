import { Region, SimpleAutoApi, SimpleAutoBrand, SimpleAutoModel } from '@/openapi/client';
import { useInfiniteQuery } from '@tanstack/react-query';
import { ARRAY_FILTERS, BOOLEAN_FILTERS, RANGE_FILTERS } from '../../utils/filters';

type BottomSheetOptionType = {
  value: string;
  label: string;
};

// SimpleAutoBrand

type props = {
  brands?: SimpleAutoBrand[];
  models?: Record<number, SimpleAutoModel[]>;
  releaseYear?: number;
  price?: string;
  page?: string;
  pageSize?: string;
  tab?: 'all' | 'old' | 'new';
  selectedRegions?: Region[];
  onlyUnsold?: boolean;
  onlyWithPhotos?: boolean;
  transmission?: BottomSheetOptionType[];
  fuelType?: BottomSheetOptionType[];
  drivetrain?: BottomSheetOptionType[];
  bodyType?: BottomSheetOptionType[];
  color?: BottomSheetOptionType[];
  numberOfOwners?: BottomSheetOptionType[];
  seller?: BottomSheetOptionType[];
  priceRange?: { min?: number; max?: number };
  yearRange?: { min?: number; max?: number };
  engineCapacityRange?: { min?: number; max?: number };
  powerRange?: { min?: number; max?: number };
  mileageRange?: { min?: number; max?: number };
};

export const useSimpleGetCollectionPagination = ({
  brands,
  models,
  releaseYear,
  price,
  pageSize,
  tab,
  selectedRegions,
  onlyUnsold,
  onlyWithPhotos,
  transmission,
  fuelType,
  drivetrain,
  bodyType,
  color,
  numberOfOwners,
  seller,
  priceRange,
  yearRange,
  engineCapacityRange,
  powerRange,
  mileageRange,
}: Omit<props, 'page'>) => {
  const simpleAutoApi = new SimpleAutoApi();

  return useInfiniteQuery({
    gcTime: 0,
    staleTime: 0,

    queryKey: [
      'advertisement-simple-auto-pagination',
      brands,
      models,
      releaseYear,
      price,
      tab,
      selectedRegions,
      onlyUnsold,
      onlyWithPhotos,
      transmission,
      fuelType,
      drivetrain,
      bodyType,
      color,
      numberOfOwners,
      seller,
      priceRange,
      yearRange,
      engineCapacityRange,
      powerRange,
      mileageRange,
    ],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const filterParameters: { [key: string]: any } = {};

      // Build filterParameters from the filters
      if (transmission && transmission.length > 0) {
        const transmissionObj: { [key: string]: string } = {};
        transmission.forEach((t, index) => {
          transmissionObj[index.toString()] = t.value;
        });
        filterParameters[ARRAY_FILTERS.TRANSMISSION] = transmissionObj;
      }
      if (fuelType && fuelType.length > 0) {
        const fuelTypeObj: { [key: string]: string } = {};
        fuelType.forEach((t, index) => {
          fuelTypeObj[index.toString()] = t.value;
        });
        filterParameters[ARRAY_FILTERS.FUEL_TYPE] = fuelTypeObj;
      }
      if (drivetrain && drivetrain.length > 0) {
        const drivetrainObj: { [key: string]: string } = {};
        drivetrain.forEach((t, index) => {
          drivetrainObj[index.toString()] = t.value;
        });
        filterParameters[ARRAY_FILTERS.DRIVETRAIN_TYPE] = drivetrainObj;
      }
      if (bodyType && bodyType.length > 0) {
        const bodyTypeObj: { [key: string]: string } = {};
        bodyType.forEach((t, index) => {
          bodyTypeObj[index.toString()] = t.value;
        });
        filterParameters[ARRAY_FILTERS.FRAME_TYPE] = bodyTypeObj;
      }
      if (color && color.length > 0) {
        const colorObj: { [key: string]: string } = {};
        color.forEach((c, index) => {
          colorObj[index.toString()] = c.value;
        });
        filterParameters[ARRAY_FILTERS.COLOR] = colorObj;
      }
      if (numberOfOwners && numberOfOwners.length > 0) {
        const numberOfOwnersObj: { [key: string]: string } = {};
        numberOfOwners.forEach((t, index) => {
          numberOfOwnersObj[index.toString()] = t.value;
        });
        filterParameters[ARRAY_FILTERS.NUMBER_OF_OWNER] = numberOfOwnersObj;
      }
      if (seller && seller.length > 0) {
        const sellerObj: { [key: string]: string } = {};
        seller.forEach((s, index) => {
          sellerObj[index.toString()] = s.value;
        });
        filterParameters[ARRAY_FILTERS.SELLER] = sellerObj;
      }
      if (selectedRegions && selectedRegions.length > 0) {
        const regionObj: { [key: string]: string } = {};
        selectedRegions
          .filter(r => r.id !== undefined)
          .forEach((r, index) => {
            regionObj[index.toString()] = r.id!.toString();
          });
        filterParameters['regions'] = regionObj;
      }
      if (onlyUnsold) {
        filterParameters[BOOLEAN_FILTERS.UNSOLD] = 'true';
      }
      if (onlyWithPhotos) {
        filterParameters[BOOLEAN_FILTERS.WITH_IMAGE] = 'true';
      }
      if (tab === 'old') {
        filterParameters[ARRAY_FILTERS.CONDITION] = { '0': 'used' };
      }
      if (tab === 'new') {
        filterParameters[ARRAY_FILTERS.CONDITION] = { '0': 'new' };
      }
      if (engineCapacityRange) {
        filterParameters[RANGE_FILTERS.ENGINE_CAPACITY] = {};
        if (engineCapacityRange.min !== undefined) filterParameters[RANGE_FILTERS.ENGINE_CAPACITY]['from'] = engineCapacityRange.min.toString();
        if (engineCapacityRange.max !== undefined) filterParameters[RANGE_FILTERS.ENGINE_CAPACITY]['to'] = engineCapacityRange.max.toString();
      }
      if (powerRange) {
        filterParameters[RANGE_FILTERS.POWER] = {};
        if (powerRange.min !== undefined) filterParameters[RANGE_FILTERS.POWER]['from'] = powerRange.min.toString();
        if (powerRange.max !== undefined) filterParameters[RANGE_FILTERS.POWER]['to'] = powerRange.max.toString();
      }
      if (mileageRange) {
        filterParameters[RANGE_FILTERS.MILEAGE] = {};
        if (mileageRange.min !== undefined) filterParameters[RANGE_FILTERS.MILEAGE]['from'] = mileageRange.min.toString();
        if (mileageRange.max !== undefined) filterParameters[RANGE_FILTERS.MILEAGE]['to'] = mileageRange.max.toString();
      }
      if (yearRange) {
        filterParameters[RANGE_FILTERS.YEAR] = {};
        if (yearRange.min !== undefined) filterParameters[RANGE_FILTERS.YEAR]['from'] = yearRange.min.toString();
        if (yearRange.max !== undefined) filterParameters[RANGE_FILTERS.YEAR]['to'] = yearRange.max.toString();
      }
      if (priceRange) {
        filterParameters[RANGE_FILTERS.PRICE] = {};
        if (priceRange.min !== undefined) filterParameters[RANGE_FILTERS.PRICE]['from'] = priceRange.min.toString();
        if (priceRange.max !== undefined) filterParameters[RANGE_FILTERS.PRICE]['to'] = priceRange.max.toString();
      }

      const brandsWithModels = brands?.reduce(
        (acc, b, brandIndex) => {
          if (b.id) {
            let brandModels: Record<string, number> = {};
            if (models) {
              brandModels = (models[b.id] || []).reduce(
                (acc, model, modelIndex) => {
                  acc[modelIndex.toString()] = model.id;
                  return acc;
                },
                {} as Record<string, number>
              );
            }

            // acc[brandIndex.toString()]['id'] = b.id;
            acc[brandIndex.toString()] = {
              id: b.id,
              models: brandModels,
            };
          }

          return acc;
        },
        {} as Record<string, any>
      );

      const response = await simpleAutoApi.getSimpleAutoCollectionPagination({
        page: pageParam.toString(),
        limit: pageSize || '10',
        b: brandsWithModels,
        f: Object.keys(filterParameters).length > 0 ? filterParameters : undefined,
      });

      return {
        data: response.items || [],
        currentPage: response.currentPage || pageParam,
        total: response.total || 0,
        perPage: response.perPage || parseInt(pageSize || '10'),
        hasNextPage: (response.currentPage || pageParam) * (response.perPage || parseInt(pageSize || '10')) < (response.total || 0),
      };
    },
    getNextPageParam: lastPage => {
      if (lastPage.hasNextPage) {
        return lastPage.currentPage + 1;
      }
      return undefined;
    },
  });
};
