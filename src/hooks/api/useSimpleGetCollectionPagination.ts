import { Region, SimpleAutoApi, SimpleAutoBrand, SimpleAutoModel } from '@/openapi/client';
import { BACKEND_FILTERS, RangeFilterType, SelectFilterType } from '@/types/filter';
import { SortMethod } from '@/types/sort';
import { useInfiniteQuery } from '@tanstack/react-query';

type props = {
  brands?: SimpleAutoBrand[];
  models?: Record<number, SimpleAutoModel[]>;
  page?: string;
  pageSize?: string;
  tab?: 'all' | 'old' | 'new';
  selectedRegions?: Region[];
  onlyUnsold?: boolean;
  onlyWithPhotos?: boolean;
  transmission?: SelectFilterType;
  fuelType?: SelectFilterType;
  drivetrain?: SelectFilterType;
  bodyType?: SelectFilterType;
  color?: SelectFilterType;
  numberOfOwners?: SelectFilterType;
  seller?: SelectFilterType;
  priceRange?: RangeFilterType;
  yearRange?: RangeFilterType;
  engineCapacityRange?: RangeFilterType;
  powerRange?: RangeFilterType;
  mileageRange?: RangeFilterType;
  sortMethod?: SortMethod;
  onSuccess?: (data: any) => void;
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
      if (transmission) {
        filterParameters[BACKEND_FILTERS.TRANSMISSION] = transmission;
      }
      if (fuelType) {
        filterParameters[BACKEND_FILTERS.FUEL_TYPE] = fuelType;
      }
      if (drivetrain) {
        filterParameters[BACKEND_FILTERS.DRIVETRAIN_TYPE] = drivetrain;
      }
      if (bodyType) {
        filterParameters[BACKEND_FILTERS.FRAME_TYPE] = bodyType;
      }
      if (color) {
        filterParameters[BACKEND_FILTERS.COLOR] = color;
      }
      if (numberOfOwners) {
        filterParameters[BACKEND_FILTERS.NUMBER_OF_OWNER] = numberOfOwners;
      }
      if (seller) {
        filterParameters[BACKEND_FILTERS.SELLER] = seller;
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
        if (engineCapacityRange.from !== undefined) filterParameters[BACKEND_FILTERS.ENGINE_CAPACITY]['from'] = engineCapacityRange.from.toString();
        if (engineCapacityRange.to !== undefined) filterParameters[BACKEND_FILTERS.ENGINE_CAPACITY]['to'] = engineCapacityRange.to.toString();
      }
      if (powerRange) {
        filterParameters[BACKEND_FILTERS.POWER] = {};
        if (powerRange.from !== undefined) filterParameters[BACKEND_FILTERS.POWER]['from'] = powerRange.from.toString();
        if (powerRange.to !== undefined) filterParameters[BACKEND_FILTERS.POWER]['to'] = powerRange.to.toString();
      }
      if (mileageRange) {
        filterParameters[BACKEND_FILTERS.MILEAGE] = {};
        if (mileageRange.from !== undefined) filterParameters[BACKEND_FILTERS.MILEAGE]['from'] = mileageRange.from.toString();
        if (mileageRange.to !== undefined) filterParameters[BACKEND_FILTERS.MILEAGE]['to'] = mileageRange.to.toString();
      }
      if (yearRange) {
        filterParameters[BACKEND_FILTERS.YEAR] = {};
        if (yearRange.from !== undefined) filterParameters[BACKEND_FILTERS.YEAR]['from'] = yearRange.from.toString();
        if (yearRange.to !== undefined) filterParameters[BACKEND_FILTERS.YEAR]['to'] = yearRange.to.toString();
      }
      if (priceRange) {
        filterParameters[BACKEND_FILTERS.PRICE] = {};
        if (priceRange.from !== undefined) filterParameters[BACKEND_FILTERS.PRICE]['from'] = priceRange.from.toString();
        if (priceRange.to !== undefined) filterParameters[BACKEND_FILTERS.PRICE]['to'] = priceRange.to.toString();
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

      const sorting = sortMethod ? { [sortMethod.fieldName]: sortMethod.direction } : undefined;

      const response = await simpleAutoApi.getSimpleAutoCollectionPagination({
        page: pageParam.toString(),
        limit: pageSize || '20',
        b: brandsWithModels,
        f: Object.keys(filterParameters).length > 0 ? filterParameters : undefined,
        sort: sorting,
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
