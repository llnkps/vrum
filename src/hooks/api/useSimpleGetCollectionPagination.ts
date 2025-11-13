import { Region, SimpleAutoApi, SimpleAutoBrand, SimpleAutoModel } from '@/openapi/client';
import { useInfiniteQuery } from '@tanstack/react-query';
import { BACKEND_FILTERS } from '@/shared/filter';
import { SortMethod } from '@/types/sort';

type BottomSheetOptionType = {
  value: string;
  label: string;
};

type props = {
  brands?: SimpleAutoBrand[];
  models?: Record<number, SimpleAutoModel[]>;
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
  sortMethod?: SortMethod;
};

export const useSimpleGetCollectionPagination = ({
  brands,
  models,
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
  sortMethod,
}: Omit<props, 'page'>) => {
  const simpleAutoApi = new SimpleAutoApi();

  return useInfiniteQuery({
    gcTime: 0,
    staleTime: 0,

    queryKey: [
      'advertisement-simple-auto-pagination',
      brands,
      models,
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
      sortMethod,
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
        filterParameters[BACKEND_FILTERS.TRANSMISSION] = transmissionObj;
      }
      if (fuelType && fuelType.length > 0) {
        const fuelTypeObj: { [key: string]: string } = {};
        fuelType.forEach((t, index) => {
          fuelTypeObj[index.toString()] = t.value;
        });
        filterParameters[BACKEND_FILTERS.FUEL_TYPE] = fuelTypeObj;
      }
      if (drivetrain && drivetrain.length > 0) {
        const drivetrainObj: { [key: string]: string } = {};
        drivetrain.forEach((t, index) => {
          drivetrainObj[index.toString()] = t.value;
        });
        filterParameters[BACKEND_FILTERS.DRIVETRAIN_TYPE] = drivetrainObj;
      }
      if (bodyType && bodyType.length > 0) {
        const bodyTypeObj: { [key: string]: string } = {};
        bodyType.forEach((t, index) => {
          bodyTypeObj[index.toString()] = t.value;
        });
        filterParameters[BACKEND_FILTERS.FRAME_TYPE] = bodyTypeObj;
      }
      if (color && color.length > 0) {
        const colorObj: { [key: string]: string } = {};
        color.forEach((c, index) => {
          colorObj[index.toString()] = c.value;
        });
        filterParameters[BACKEND_FILTERS.COLOR] = colorObj;
      }
      if (numberOfOwners && numberOfOwners.length > 0) {
        const numberOfOwnersObj: { [key: string]: string } = {};
        numberOfOwners.forEach((t, index) => {
          numberOfOwnersObj[index.toString()] = t.value;
        });
        filterParameters[BACKEND_FILTERS.NUMBER_OF_OWNER] = numberOfOwnersObj;
      }
      if (seller && seller.length > 0) {
        const sellerObj: { [key: string]: string } = {};
        seller.forEach((s, index) => {
          sellerObj[index.toString()] = s.value;
        });
        filterParameters[BACKEND_FILTERS.SELLER] = sellerObj;
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
        filterParameters[BACKEND_FILTERS.UNSOLD] = 'true';
      }
      if (onlyWithPhotos) {
        filterParameters[BACKEND_FILTERS.WITH_IMAGE] = 'true';
      }
      if (tab === 'old') {
        filterParameters[BACKEND_FILTERS.CONDITION] = { '0': 'used' };
      }
      if (tab === 'new') {
        filterParameters[BACKEND_FILTERS.CONDITION] = { '0': 'new' };
      }
      if (engineCapacityRange) {
        filterParameters[BACKEND_FILTERS.ENGINE_CAPACITY] = {};
        if (engineCapacityRange.min !== undefined) filterParameters[BACKEND_FILTERS.ENGINE_CAPACITY]['from'] = engineCapacityRange.min.toString();
        if (engineCapacityRange.max !== undefined) filterParameters[BACKEND_FILTERS.ENGINE_CAPACITY]['to'] = engineCapacityRange.max.toString();
      }
      if (powerRange) {
        filterParameters[BACKEND_FILTERS.POWER] = {};
        if (powerRange.min !== undefined) filterParameters[BACKEND_FILTERS.POWER]['from'] = powerRange.min.toString();
        if (powerRange.max !== undefined) filterParameters[BACKEND_FILTERS.POWER]['to'] = powerRange.max.toString();
      }
      if (mileageRange) {
        filterParameters[BACKEND_FILTERS.MILEAGE] = {};
        if (mileageRange.min !== undefined) filterParameters[BACKEND_FILTERS.MILEAGE]['from'] = mileageRange.min.toString();
        if (mileageRange.max !== undefined) filterParameters[BACKEND_FILTERS.MILEAGE]['to'] = mileageRange.max.toString();
      }
      if (yearRange) {
        filterParameters[BACKEND_FILTERS.YEAR] = {};
        if (yearRange.min !== undefined) filterParameters[BACKEND_FILTERS.YEAR]['from'] = yearRange.min.toString();
        if (yearRange.max !== undefined) filterParameters[BACKEND_FILTERS.YEAR]['to'] = yearRange.max.toString();
      }
      if (priceRange) {
        filterParameters[BACKEND_FILTERS.PRICE] = {};
        if (priceRange.min !== undefined) filterParameters[BACKEND_FILTERS.PRICE]['from'] = priceRange.min.toString();
        if (priceRange.max !== undefined) filterParameters[BACKEND_FILTERS.PRICE]['to'] = priceRange.max.toString();
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

      console.log("sorting: ",sortMethod)
      const sorting = sortMethod ? { [sortMethod.fieldName]: sortMethod.direction } : undefined;

      const response = await simpleAutoApi.getSimpleAutoCollectionPagination({
        page: pageParam.toString(),
        limit: pageSize || '20',
        b: brandsWithModels,
        f: Object.keys(filterParameters).length > 0 ? filterParameters : undefined,
        sort: sorting
      });

      return {
        data: response.items || [],
        currentPage: response.currentPage || pageParam,
        total: response.total || 0,
        perPage: response.perPage || parseInt(pageSize || '20'),
        hasNextPage: (response.currentPage || pageParam) * (response.perPage || parseInt(pageSize || '20')) < (response.total || 0),
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
