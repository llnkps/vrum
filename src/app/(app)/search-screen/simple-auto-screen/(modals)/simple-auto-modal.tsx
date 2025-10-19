import { useNavigation, useRouter } from 'expo-router';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, RefreshControl, Text, View } from 'react-native';

import { PriceBottomSheet } from '@/components/filters/PriceFilterBottomSheet';
import { RegionBottomSheet } from '@/components/filters/RegionBottomSheet';
import { YearBottomSheet } from '@/components/filters/YearFilterBottomSheet';
import { AdvertisementCard } from '@/components/global/AdvertisementCard/AdvertisementCard';
import { HeaderBackSaveFilter } from '@/components/global/header';
import { SelectedBrandsSection } from '@/components/global/SelectedBrandsSection';
import { SelectedRegionsBadges } from '@/components/global/SelectedItemsBadges';
import { TouchableHighlightRow } from '@/components/global/TouchableHighlightRow';
import { useSimpleGetCollectionPagination } from '@/hooks/api/useSimpleGetCollectionPagination';
import { useImagePrefetch } from '@/hooks/useImagePrefetch';
import { AuthenticationException, createAuthenticatedApiCall } from '@/openapi/auth-utils';
import { UserSubscriptionFilterApi } from '@/openapi/client';
import { createAuthenticatedConfiguration } from '@/openapi/configurations';
import {
  getActiveFiltersCount,
  getPriceDisplayValue,
  getYearDisplayValue,
  selectSelectedBrands,
  selectSelectedGenerations,
  selectSelectedModels,
  useAutoSelectStore,
} from '@/state/search-screen/useAutoSelectStore';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useFocusEffect } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const ARRAY_FILTERS = {
  TRANSMISSION: 'transmission',
  FUEL_TYPE: 'fuelType',
  DRIVETRAIN_TYPE: 'drivetrain',
  FRAME_TYPE: 'bodyType',
  COLOR: 'color',
  NUMBER_OF_OWNER: 'numberOfOwners',
  SELLER: 'seller',
  CONDITION: 'condition',
};

const BOOLEAN_FILTERS = {
  UNSOLD: 'onlyUnsold',
  WITH_IMAGE: 'onlyWithPhotos',
};

const RANGE_FILTERS = {
  ENGINE_CAPACITY: 'engineCapacity',
  POWER: 'power',
  MILEAGE: 'mileage',
  YEAR: 'year',
  PRICE: 'price',
};

export default function SimpleAutoModal() {
  const { t } = useTranslation();
  const router = useRouter();
  const navigation = useNavigation();
  const state = navigation.getState();
  // navigationState will contain an object with routes, index, etc.
  // The 'routes' array within navigationState represents the current stack.
  // console.log('Segments in SimpleAutoModal: ');
  // console.log(state?.routes);

  const store = useAutoSelectStore();
  const selectedBrands = selectSelectedBrands(store);
  const selectedModels = selectSelectedModels(store);
  // console.log("selected Brands: ", selectedBrands)
  const {
    selectedModelsByBrand,
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
    setYearRange,
    setPriceRange,
  } = store;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch, isRefetching } = useSimpleGetCollectionPagination({
    brands: selectedBrands,
    models: selectedModelsByBrand,
    releaseYear: undefined,
    price: undefined,
    pageSize: '10',
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
  });

  const flattenedData = useMemo(() => {
    return data?.pages?.flatMap(page => page.data) || [];
  }, [data]);

  const { onViewableItemsChanged } = useImagePrefetch(flattenedData);

  const yearModalRef = useRef<BottomSheetModal>(null);
  const priceModalRef = useRef<BottomSheetModal>(null);
  const regionModalRef = useRef<BottomSheetModal>(null);
  const routeIndexRef = useRef<number | null>(null);

  const handlePresentYearModalPress = useCallback(() => {
    yearModalRef.current?.present();
  }, []);

  const handlePresentPriceModalPress = useCallback(() => {
    priceModalRef.current?.present();
  }, []);

  const handlePresentRegionModalPress = useCallback(() => {
    regionModalRef.current?.present();
  }, []);
  const [isBrandSectionCollapsed, setIsBrandSectionCollapsed] = useState(true);
  const selectedGenerations = selectSelectedGenerations(store);

  const handleSubscribe = async () => {
    // Build name
    const nameParts = [];
    if (selectedBrands.length > 0) {
      nameParts.push(selectedBrands.map(b => b.name).join(', '));
    }
    if (selectedModels.length > 0) {
      nameParts.push(selectedModels.map(m => m.name).join(', '));
    }
    if (priceRange?.min) nameParts.push(`от ${priceRange.min}`);
    if (priceRange?.max) nameParts.push(`до ${priceRange.max}`);
    if (yearRange?.min) nameParts.push(`год от ${yearRange.min}`);
    if (yearRange?.max) nameParts.push(`год до ${yearRange.max}`);
    if (selectedRegions.length > 0) {
      nameParts.push(`регионы: ${selectedRegions.map(r => r.name).join(', ')}`);
    }
    if (transmission?.length) nameParts.push(`трансмиссия: ${transmission.map(t => t.label).join(', ')}`);
    if (fuelType?.length) nameParts.push(`топливо: ${fuelType.map(t => t.label).join(', ')}`);
    if (drivetrain?.length) nameParts.push(`привод: ${drivetrain.map(t => t.label).join(', ')}`);
    if (bodyType?.length) nameParts.push(`кузов: ${bodyType.map(t => t.label).join(', ')}`);
    if (color?.length) nameParts.push(`цвет: ${color.map(t => t.label).join(', ')}`);
    if (numberOfOwners?.length) nameParts.push(`владельцы: ${numberOfOwners.map(t => t.label).join(', ')}`);
    if (seller?.length) nameParts.push(`продавец: ${seller.map(t => t.label).join(', ')}`);
    if (onlyUnsold) nameParts.push('только не проданные');
    if (onlyWithPhotos) nameParts.push('только с фото');
    if (engineCapacityRange?.min) nameParts.push(`объем от ${engineCapacityRange.min}`);
    if (engineCapacityRange?.max) nameParts.push(`объем до ${engineCapacityRange.max}`);
    if (powerRange?.min) nameParts.push(`мощность от ${powerRange.min}`);
    if (powerRange?.max) nameParts.push(`мощность до ${powerRange.max}`);
    if (mileageRange?.min) nameParts.push(`пробег от ${mileageRange.min}`);
    if (mileageRange?.max) nameParts.push(`пробег до ${mileageRange.max}`);

    const name = nameParts.join(' ') || 'Фильтр подписки';

    // Build filterParameters
    const filterParameters: { [key: string]: any } = {};

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

    // Build brandsWithModels
    const brandsWithModels = selectedBrands?.reduce(
      (acc, b, brandIndex) => {
        if (b.id) {
          let brandModels: Record<string, number> = {};
          if (selectedModelsByBrand) {
            brandModels = (selectedModelsByBrand[b.id] || []).reduce(
              (acc, model, modelIndex) => {
                acc[modelIndex.toString()] = model.id;
                return acc;
              },
              {} as Record<string, number>
            );
          }

          acc[brandIndex.toString()] = {
            id: b.id,
            models: brandModels,
          };
        }

        return acc;
      },
      {} as Record<string, any>
    );

    const userSubscriptionApi = new UserSubscriptionFilterApi(createAuthenticatedConfiguration());
    try {
      await createAuthenticatedApiCall(() =>
        userSubscriptionApi.createUserSubscriptionFilter({
          createUserSubscriptionFilterRequest: {
            name,
            sourceType: 'simple-auto',
            b: brandsWithModels,
            r: selectedRegions.reduce(
              (acc, r, index) => {
                if (r.id !== undefined) {
                  acc[index.toString()] = r.id!.toString();
                }
                return acc;
              },
              {} as Record<string, string>
            ),
            filterParameters: Object.keys(filterParameters).length > 0 ? filterParameters : undefined,
          },
        })
      );
    } catch (error) {
      if (error instanceof AuthenticationException) {
        router.push('/sign-in');
      }
    }

    // TODO: show success message
  };

  // Handle back navigation (button and gesture)
  useFocusEffect(
    useCallback(() => {
      const unsubscribe = navigation.addListener('beforeRemove', e => {
        // Prevent default back behavior
        e.preventDefault();
        // Clear store and navigate to search tab
        store.clearSelections();
        router.push('/search-tab');
      });

      return unsubscribe;
    }, [navigation, store, router])
  );

  // Reset store when navigating away from this screen (for forward navigation)
  useFocusEffect(
    useCallback(() => {
      // Store the current route index when screen gains focus
      const currentState = navigation.getState();
      if (currentState) {
        routeIndexRef.current = currentState.index;
      }

      return () => {
        // This cleanup function runs when the screen loses focus
        const currentState = navigation.getState();
        const previousIndex = routeIndexRef.current;

        // Only clear store if navigating back (index decreased)
        if (currentState && previousIndex !== null && currentState.index < previousIndex) {
          console.log('CLEAR STATE SIMPLE AUTO MODAL - Going back');
          store.clearSelections();
        }
      };
    }, [navigation, store])
  );

  return (
    <SafeAreaView className="flex-1">
      <FlashList
        numColumns={1}
        data={flattenedData}
        removeClippedSubviews={true}
        maxItemsInRecyclePool={10}
        ListHeaderComponent={
          <>
            <HeaderBackSaveFilter onSubscribe={handleSubscribe} />

            <View className={'gap-y-1 py-3'}>
              <View className="gap-y-1">
                <TouchableHighlightRow
                  variant="button"
                  label="Марка, модель, поколение"
                  onPress={() => router.push('/(app)/search-screen/simple-auto-screen/(modals)/brand-auto-filter')}
                  showRightArrow
                />
                <SelectedBrandsSection
                  selectedBrands={selectedBrands}
                  getSelectedModelsByBrand={store.getSelectedModelsByBrand}
                  selectedGenerations={selectedGenerations}
                  isCollapsed={isBrandSectionCollapsed}
                  onToggleCollapse={() => setIsBrandSectionCollapsed(!isBrandSectionCollapsed)}
                  onPressModel={() => router.push('/(app)/search-screen/simple-auto-screen/(modals)/model-filter?from=settings')}
                  onPressGeneration={() => router.push('/(app)/search-screen/simple-auto-screen/(modals)/generation-filter?from=settings')}
                />
              </View>

              <View className={'flex flex-row gap-1'}>
                <TouchableHighlightRow
                  variant="button"
                  label={'Год'}
                  selectedValue={getYearDisplayValue(store)}
                  onPress={() => handlePresentYearModalPress()}
                  showRightArrow={false}
                  selectedValueMode="replace"
                />
                <YearBottomSheet ref={yearModalRef} />

                <TouchableHighlightRow
                  variant="button"
                  label={'Цена'}
                  selectedValue={getPriceDisplayValue(store)}
                  onPress={() => handlePresentPriceModalPress()}
                  showRightArrow={false}
                  selectedValueMode="replace"
                />
                <PriceBottomSheet ref={priceModalRef} />

                <TouchableHighlightRow
                  variant="button"
                  label={'Параметры' + (getActiveFiltersCount(store) > 0 ? ` (${getActiveFiltersCount(store)})` : '')}
                  onPress={() => router.push('/(app)/search-screen/simple-auto-screen/(modals)/settings')}
                  showRightArrow={false}
                  icon={<Ionicons name="options-sharp" size={20} color="white" />}
                  fullWidth
                />
              </View>

              <TouchableHighlightRow
                variant="button"
                label={'Все регионы'}
                selectedValue={undefined}
                onPress={handlePresentRegionModalPress}
                rightIcon="chevron-down"
              />

              {store.selectedRegions?.length > 0 && (
                <SelectedRegionsBadges
                  selectedRegions={store.selectedRegions}
                  onRemove={region => {
                    const updatedRegions = store.selectedRegions.filter(r => r.id !== region.id);
                    store.setSelectedRegions(updatedRegions);
                  }}
                />
              )}

              {/** component for opening year modal */}

              {/* Quick Filters */}
              {/* <View className="mt-4">
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row gap-2">
                  {quickFilters.map((filter, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handleQuickFilterPress(filter)}
                      className="bg-surface dark:bg-surface-dark px-4 py-2 rounded-full border border-border dark:border-border-dark"
                    >
                      <Text className="text-font dark:text-font-dark text-sm font-medium">{filter.label}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View> */}
            </View>
          </>
        }
        keyExtractor={item => item.id?.toString() || `item-${Math.random()}`}
        refreshControl={<RefreshControl tintColor={'blue'} refreshing={isRefetching} onRefresh={refetch} />}
        ListEmptyComponent={<Text className="p-4 text-center">No data available</Text>}
        renderItem={({ item }) => {
          return (
            <AdvertisementCard
              item={item}
              onPress={() => {
                const params = new URLSearchParams();
                params.set('data', JSON.stringify(item));
                router.push(`/car-details?${params.toString()}`);
              }}
            />
          );
        }}
        onEndReachedThreshold={0.2}
        onEndReached={() => hasNextPage && !isFetchingNextPage && fetchNextPage()}
        ListFooterComponent={isFetchingNextPage ? <ActivityIndicator color="blue" size="small" style={{ marginBottom: 5 }} /> : null}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 20,
        }}
        onViewableItemsChanged={onViewableItemsChanged}
      />

      <YearBottomSheet ref={yearModalRef} onChange={yearRange => setYearRange(yearRange)} />
      <PriceBottomSheet ref={priceModalRef} onChange={priceRange => setPriceRange(priceRange)} />
      <RegionBottomSheet
        ref={regionModalRef}
        multiple
        selectedRegions={store.selectedRegions}
        onChange={regions => store.setSelectedRegions(Array.isArray(regions) ? regions : [regions])}
      />
    </SafeAreaView>
  );
}
