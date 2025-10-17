import { SimpleAutoApi, GetRegionIndex200ResponseInner } from '@/openapi/client';
import { useInfiniteQuery } from '@tanstack/react-query';

type BottomSheetOptionType = {
  value: string;
  label: string;
};

type props = {
  brand?: string;
  model?: string;
  releaseYear?: number;
  price?: string;
  page?: string;
  pageSize?: string;
  tab?: 'all' | 'old' | 'new';
  selectedRegions?: GetRegionIndex200ResponseInner[];
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
  brand,
  model,
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
    queryKey: ['advertisement-simple-auto-pagination', brand, model, releaseYear, price, tab, selectedRegions, onlyUnsold, onlyWithPhotos, transmission, fuelType, drivetrain, bodyType, color, numberOfOwners, seller, priceRange, yearRange, engineCapacityRange, powerRange, mileageRange],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const filterParameters: { [key: string]: any } = {};

      // Build filterParameters from the filters
      if (transmission && transmission.length > 0) {
        const transmissionObj: { [key: string]: string } = {};
        transmission.forEach((t, index) => {
          transmissionObj[index.toString()] = t.value;
        });
        filterParameters['transmission'] = transmissionObj;
      }
      if (fuelType && fuelType.length > 0) {
        const fuelTypeObj: { [key: string]: string } = {};
        fuelType.forEach((t, index) => {
          fuelTypeObj[index.toString()] = t.value;
        });
        filterParameters['fuelType'] = fuelTypeObj;
      }
      if (drivetrain && drivetrain.length > 0) {
        const drivetrainObj: { [key: string]: string } = {};
        drivetrain.forEach((t, index) => {
          drivetrainObj[index.toString()] = t.value;
        });
        filterParameters['drivetrain'] = drivetrainObj;
      }
      if (bodyType && bodyType.length > 0) {
        const bodyTypeObj: { [key: string]: string } = {};
        bodyType.forEach((t, index) => {
          bodyTypeObj[index.toString()] = t.value;
        });
        filterParameters['bodyType'] = bodyTypeObj;
      }
      if (color && color.length > 0) {
        const colorObj: { [key: string]: string } = {};
        color.forEach((c, index) => {
          colorObj[index.toString()] = c.value;
        });
        filterParameters['color'] = colorObj;
      }
      if (numberOfOwners && numberOfOwners.length > 0) {
        const numberOfOwnersObj: { [key: string]: string } = {};
        numberOfOwners.forEach((t, index) => {
          numberOfOwnersObj[index.toString()] = t.value;
        });
        filterParameters['numberOfOwners'] = numberOfOwnersObj;
      }
      if (seller && seller.length > 0) {
        const sellerObj: { [key: string]: string } = {};
        seller.forEach((s, index) => {
          sellerObj[index.toString()] = s.value;
        });
        filterParameters['seller'] = sellerObj;
      }
      if (selectedRegions && selectedRegions.length > 0) {
        const regionObj: { [key: string]: string } = {};
        selectedRegions.filter(r => r.id !== undefined).forEach((r, index) => {
          regionObj[index.toString()] = r.id!.toString();
        });
        filterParameters['region'] = regionObj;
      }
      if (onlyUnsold) {
        filterParameters['onlyUnsold'] = 'true';
      }
      if (onlyWithPhotos) {
        filterParameters['onlyWithPhotos'] = 'true';
      }
      if (tab === 'old') {
        filterParameters['condition'] = 'used';
      }
      if (tab === 'new') {
        filterParameters['condition'] = 'new';
      }
      if (engineCapacityRange) {
        filterParameters['engineCapacity'] = {};
        if (engineCapacityRange.min !== undefined) filterParameters['engineCapacity']['from'] = engineCapacityRange.min.toString();
        if (engineCapacityRange.max !== undefined) filterParameters['engineCapacity']['to'] = engineCapacityRange.max.toString();
      }
      if (powerRange) {
        filterParameters['power'] = {};
        if (powerRange.min !== undefined) filterParameters['power']['from'] = powerRange.min.toString();
        if (powerRange.max !== undefined) filterParameters['power']['to'] = powerRange.max.toString();
      }
      if (mileageRange) {
        filterParameters['mileage'] = {};
        if (mileageRange.min !== undefined) filterParameters['mileage']['from'] = mileageRange.min.toString();
        if (mileageRange.max !== undefined) filterParameters['mileage']['to'] = mileageRange.max.toString();
      }
      if (yearRange) {
        filterParameters['year'] = {};
        if (yearRange.min !== undefined) filterParameters['year']['from'] = yearRange.min.toString();
        if (yearRange.max !== undefined) filterParameters['year']['to'] = yearRange.max.toString();
      }
      if (priceRange) {
        filterParameters['price'] = {};
        if (priceRange.min !== undefined) filterParameters['price']['from'] = priceRange.min.toString();
        if (priceRange.max !== undefined) filterParameters['price']['to'] = priceRange.max.toString();
      }

      // Update releaseYear and price from ranges if not set
      const finalReleaseYear = releaseYear || yearRange?.min;
      const finalPrice = price || (priceRange ? `${priceRange.min || ''}-${priceRange.max || ''}` : undefined);

      const response = await simpleAutoApi.getSimpleAutoCollectionPagination({
        page: pageParam.toString(),
        limit: pageSize || '10',
        brand: brand,
        model: model,
        releaseYear: finalReleaseYear,
        price: finalPrice,
        f: Object.keys(filterParameters).length > 0 ? filterParameters : undefined,
      });

      return {
        data: response.items || [],
        currentPage: response.currentPage || pageParam,
        total: response.total || 0,
        perPage: response.perPage || parseInt(pageSize || '10'),
        hasNextPage:
          (response.currentPage || pageParam) * (response.perPage || parseInt(pageSize || '10')) <
          (response.total || 0),
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
