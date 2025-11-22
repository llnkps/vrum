import { useNavigation, useRouter } from 'expo-router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, RefreshControl, Text, View } from 'react-native';

import { PriceFilterController } from '@/components/filters/PriceFilterBottomSheet';
import { RegionFilterController } from '@/components/filters/RegionBottomSheet';
import { YearFilterController } from '@/components/filters/YearFilterBottomSheet';
import { AdvertisementCard } from '@/components/global/AdvertisementCard/AdvertisementCard';
import { HeaderBackSaveFilter } from '@/components/global/header';
import { SelectedBrandsSection } from '@/components/global/SelectedBrandsSection';
import { SelectedRegionsBadges } from '@/components/global/SelectedItemsBadges';
import { SimpleAutoSortBottomSheet } from '@/components/global/SortBottomSheet/SimpleAutoSortBottomSheet';
import { TouchableHighlightRow } from '@/components/global/TouchableHighlightRow';
import { useSimpleGetCollectionPagination } from '@/hooks/api/useSimpleGetCollectionPagination';
import { useImagePrefetch } from '@/hooks/useImagePrefetch';
import { AuthenticationException, createAuthenticatedApiCall } from '@/openapi/auth-utils';
import { UserSubscriptionFilterApi } from '@/openapi/client';
import { createAuthenticatedConfiguration } from '@/openapi/configurations';
import { useFilterConfigs } from '@/shared/filter';
import {
  getActiveFiltersCount,
  selectSelectedBrands,
  selectSelectedGenerations,
  selectSelectedModels,
  useSimpleAutoFilterStore,
} from '@/state/search-screen/useSimpleAutoFilterStore';
import { useSearchedFiltersStore } from '@/state/search-screen/useSearchedFiltersStore';
import { BACKEND_FILTERS, SelectFilterType } from '@/types/filter';
import { showImmediateNotification } from '@/utils/notifications';
import { createFilterFormatCallback, formatRangeFilterValue } from '@/utils/useTranslateRangeFilter';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SimpleAutoModal() {
  const { t } = useTranslation();
  const router = useRouter();
  const navigation = useNavigation();

  const simpleAutoFilterStore = useSimpleAutoFilterStore();
  console.log(simpleAutoFilterStore.yearRange);
  // Hook to save searched filters
  const saveCurrentFiltersToSearched = useSaveSearchedFilters();
  const { setCurrentSessionId, currentSessionId } = useSearchedFiltersStore();
  console.log('Current Session ID in Modal: ', currentSessionId);
  const selectedBrands = selectSelectedBrands(simpleAutoFilterStore);
  const selectedModels = selectSelectedModels(simpleAutoFilterStore);
  // console.log("selected Brands: ", selectedBrands)

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch, isRefetching, isSuccess } = useSimpleGetCollectionPagination({
    brands: selectedBrands,
    models: simpleAutoFilterStore.selectedModelsByBrand,
    pageSize: '10',
    tab: simpleAutoFilterStore.tab,
    selectedRegions: simpleAutoFilterStore.selectedRegions,
    onlyUnsold: simpleAutoFilterStore.onlyUnsold,
    onlyWithPhotos: simpleAutoFilterStore.onlyWithPhotos,
    transmission: simpleAutoFilterStore.transmission,
    fuelType: simpleAutoFilterStore.fuelType,
    drivetrain: simpleAutoFilterStore.drivetrain,
    bodyType: simpleAutoFilterStore.bodyType,
    color: simpleAutoFilterStore.color,
    numberOfOwners: simpleAutoFilterStore.numberOfOwners,
    seller: simpleAutoFilterStore.seller,
    priceRange: simpleAutoFilterStore.priceRange,
    yearRange: simpleAutoFilterStore.yearRange,
    engineCapacityRange: simpleAutoFilterStore.engineCapacityRange,
    powerRange: simpleAutoFilterStore.powerRange,
    mileageRange: simpleAutoFilterStore.mileageRange,
    sortMethod: simpleAutoFilterStore.sortMethod,
  });

  const flattenedData = useMemo(() => {
    return data?.pages?.flatMap(page => page.data) || [];
  }, [data]);

  const { onViewableItemsChanged } = useImagePrefetch(flattenedData);

  const hasSavedFiltersRef = useRef(false);

  const [isBrandSectionCollapsed, setIsBrandSectionCollapsed] = useState(true);
  const selectedGenerations = selectSelectedGenerations(simpleAutoFilterStore);

  // Create a key that changes when filters change to reset the save session
  const filterKey = useMemo(() => {
    return JSON.stringify({
      selectedBrands,
      selectedModels,
      tab: simpleAutoFilterStore.tab,
      selectedRegions: simpleAutoFilterStore.selectedRegions,
      onlyUnsold: simpleAutoFilterStore.onlyUnsold,
      onlyWithPhotos: simpleAutoFilterStore.onlyWithPhotos,
      transmission: simpleAutoFilterStore.transmission,
      fuelType: simpleAutoFilterStore.fuelType,
      drivetrain: simpleAutoFilterStore.drivetrain,
      bodyType: simpleAutoFilterStore.bodyType,
      color: simpleAutoFilterStore.color,
      numberOfOwners: simpleAutoFilterStore.numberOfOwners,
      seller: simpleAutoFilterStore.seller,
      priceRange: simpleAutoFilterStore.priceRange,
      yearRange: simpleAutoFilterStore.yearRange,
      engineCapacityRange: simpleAutoFilterStore.engineCapacityRange,
      powerRange: simpleAutoFilterStore.powerRange,
      mileageRange: simpleAutoFilterStore.mileageRange,
      sortMethod: simpleAutoFilterStore.sortMethod,
    });
  }, [
    selectedBrands,
    selectedModels,
    simpleAutoFilterStore.tab,
    simpleAutoFilterStore.selectedRegions,
    simpleAutoFilterStore.onlyUnsold,
    simpleAutoFilterStore.onlyWithPhotos,
    simpleAutoFilterStore.transmission,
    simpleAutoFilterStore.fuelType,
    simpleAutoFilterStore.drivetrain,
    simpleAutoFilterStore.bodyType,
    simpleAutoFilterStore.color,
    simpleAutoFilterStore.numberOfOwners,
    simpleAutoFilterStore.seller,
    simpleAutoFilterStore.priceRange,
    simpleAutoFilterStore.yearRange,
    simpleAutoFilterStore.engineCapacityRange,
    simpleAutoFilterStore.powerRange,
    simpleAutoFilterStore.mileageRange,
    simpleAutoFilterStore.sortMethod,
  ]);

  // Reset save session when filters change
  useEffect(() => {
    hasSavedFiltersRef.current = false;
    // Start a new session for this filter set
    if (!currentSessionId) {
      const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      console.log('New session ID:', newSessionId);
      setCurrentSessionId(newSessionId);
    }
  }, [filterKey, setCurrentSessionId]);

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
      await createAuthenticatedApiCall(
        async () =>
          await userSubscriptionApi.createUserSubscriptionFilter({
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
      // Show success notification
      await showImmediateNotification('Subscription Created', 'Your subscription has been saved successfully!');
    } catch (error) {
      console.log('ERRRRRRRRRRRRR HERE');
      console.log(error);
      if (error instanceof AuthenticationException) {
        router.push('/sign-in');
      }
    }

    // TODO: show success message
  };

  // Handle back navigation (button and gesture)
  // useFocusEffect(
  //   useCallback(() => {
  //     const unsubscribe = navigation.addListener('beforeRemove', e => {
  //       console.log("hello eorld")
  //       e.preventDefault();
  //       router.push('/search-tab');
  //     });

  //     return unsubscribe;
  //   }, [navigation, simpleAutoFilterStore, router])
  // );

  // // Reset store when navigating away from this screen (for forward navigation)
  // useFocusEffect(
  //   useCallback(() => {
  //     // Store the current route index when screen gains focus
  //     const currentState = navigation.getState();
  //     if (currentState) {
  //       routeIndexRef.current = currentState.index;
  //     }

  //     return () => {
  //       // This cleanup function runs when the screen loses focus
  //       const currentState = navigation.getState();
  //       const previousIndex = routeIndexRef.current;

  //       // // Only clear store if navigating back (index decreased)
  //       if (currentState && previousIndex !== null && currentState.index < previousIndex) {
  //         console.log('CLEAR STATE SIMPLE AUTO MODAL - Going back');
  //         simpleAutoFilterStore.clearSelections();
  //       }
  //     };
  //   }, [navigation, simpleAutoFilterStore])
  // );

  // useEffect(() => {
  //   console.log("call again")
  //   if (isSuccess && !hasSavedFiltersRef.current) {
  //     console.log('Data fetched successfully in SimpleAutoModal. Total items:', flattenedData.length);
  //     // Save current filters to searched filters only once per session
  //     saveCurrentFiltersToSearched();
  //     hasSavedFiltersRef.current = true;
  //   }
  // }, [isSuccess, saveCurrentFiltersToSearched, flattenedData.length]);

  useEffect(() => {
    if (isSuccess && !hasSavedFiltersRef.current) {
      console.log('Data fetched successfully in SimpleAutoModal. Total items:', flattenedData.length);
      // Save current filters to searched filters only once per session
      saveCurrentFiltersToSearched();
      hasSavedFiltersRef.current = true;
    }
  }, [isSuccess, saveCurrentFiltersToSearched, flattenedData.length]);

  // Reset session when component unmounts (user leaves modal)
  // useEffect(() => {
  //   return () => {
  //     console.log('BYE');
  //     hasSavedFiltersRef.current = false;
  //     setCurrentSessionId(null);
  //   };
  // }, [setCurrentSessionId]);


  useEffect(() => {
    const sub = navigation.addListener('beforeRemove', e => {
      console.log("hello world")
      e.preventDefault();
      sub(); // Remove the listener immediately to prevent further calls
      router.replace('/search-tab');
    });

    return sub;
  }, []);

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
                  label={t('searchScreen.simpleAuto.brandModelGeneration')}
                  onPress={() => router.navigate('/(app)/search-screen/simple-auto-screen/brand-auto-filter')}
                  showRightArrow
                />
                <SelectedBrandsSection
                  selectedBrands={selectedBrands}
                  getSelectedModelsByBrand={simpleAutoFilterStore.getSelectedModelsByBrand}
                  selectedGenerations={selectedGenerations}
                  isCollapsed={isBrandSectionCollapsed}
                  onToggleCollapse={() => setIsBrandSectionCollapsed(!isBrandSectionCollapsed)}
                  onPressModel={() => router.navigate('/(app)/search-screen/simple-auto-screen/model-filter?from=settings')}
                  onPressGeneration={() => router.navigate('/(app)/search-screen/simple-auto-screen/generation-filter?from=settings')}
                />
              </View>

              <View className={'flex flex-row gap-1'}>
                <YearFilterController
                  value={simpleAutoFilterStore.yearRange}
                  onChange={yearRange => {
                    simpleAutoFilterStore.setYearRange(yearRange);
                  }}
                  selectedValueMode="replace"
                />
                <PriceFilterController
                  value={simpleAutoFilterStore.priceRange}
                  onChange={priceRange => {
                    simpleAutoFilterStore.setPriceRange(priceRange);
                  }}
                  selectedValueMode="replace"
                />
                <TouchableHighlightRow
                  variant="button"
                  label={
                    t('searchScreen.simpleAuto.parameters') +
                    (getActiveFiltersCount(simpleAutoFilterStore) > 0 ? ` (${getActiveFiltersCount(simpleAutoFilterStore)})` : '')
                  }
                  onPress={() => router.navigate('/(app)/search-screen/simple-auto-screen/settings')}
                  showRightArrow={false}
                  icon={<Ionicons name="options-sharp" size={20} color="white" />}
                  fullWidth
                />
              </View>

              <RegionFilterController
                value={simpleAutoFilterStore.selectedRegions}
                onChange={regions => {
                  simpleAutoFilterStore.setSelectedRegions(regions);
                }}
              />

              {simpleAutoFilterStore.selectedRegions?.length > 0 && (
                <SelectedRegionsBadges
                  selectedRegions={simpleAutoFilterStore.selectedRegions}
                  onRemove={region => {
                    const updatedRegions = simpleAutoFilterStore.selectedRegions.filter(r => r.id !== region.id);
                    simpleAutoFilterStore.setSelectedRegions(updatedRegions);
                  }}
                />
              )}
              <SimpleAutoSortBottomSheet sortMethod={simpleAutoFilterStore.sortMethod} setSortMethod={simpleAutoFilterStore.setSortMethod} />
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
                router.push(`/(app)/advertisement-info/simple-auto/${item.id}`);
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
    </SafeAreaView>
  );
}

// Custom hook to save current filters to searched filters
const useSaveSearchedFilters = () => {
  console.log('UPDATE');
  console.log('UPDATE');
  console.log('UPDATE');
  const { t } = useTranslation();
  const { addSearchedItem } = useSearchedFiltersStore();
  const filterConfigs = useFilterConfigs();
  const {
    currentBrand,
    selectedModelsByBrand,
    selectedBrandsMap,
    onlyUnsold,
    onlyWithPhotos,
    transmission,
    fuelType,
    drivetrain,
    bodyType,
    color,
    condition,
    documentsOk,
    numberOfOwners,
    seller,
    tradeAllow,
    priceRange,
    yearRange,
    engineCapacityRange,
    powerRange,
    mileageRange,
  } = useSimpleAutoFilterStore();

  // Helper function to get labels for selected values from filter config
  const getLabelsForSelectedValues = (filterKey: string, selectedValues: SelectFilterType) => {
    const config = filterConfigs[filterKey as keyof typeof filterConfigs];
    if (!config || !config.options) return [];

    const selectedKeys = Object.values(selectedValues);
    return config.options.filter(option => selectedKeys.includes(String(option.value))).map(option => option.label);
  };

  const saveCurrentFiltersToSearched = () => {
    const filters: Record<string, any> = {};

    // Get selected brands and models
    const selectedBrands = Object.values(selectedBrandsMap);
    const selectedModels = selectedModelsByBrand[currentBrand?.id || 0] || [];

    // Logic for brand and model display:
    // 1. If one brand and one model: show both brand and model
    // 2. If multiple models: show only models (no brand)
    if (selectedBrands.length === 1 && selectedModels.length === 1) {
      // One brand and one model: show both
      filters[BACKEND_FILTERS.BRAND] = selectedBrands[0].name;
      filters[BACKEND_FILTERS.MODEL] = selectedModels[0].name;
    } else if (selectedModels.length > 1) {
      // Multiple models: show only models
      filters[BACKEND_FILTERS.MODEL] = selectedModels.map(m => m.name).join(', ');
    }

    // Add other filters - convert SelectFilterType to arrays of labels
    if (yearRange) {
      filters[BACKEND_FILTERS.YEAR] = formatRangeFilterValue(BACKEND_FILTERS.YEAR, yearRange, t, createFilterFormatCallback(BACKEND_FILTERS.YEAR));
    }
    if (priceRange) {
      filters[BACKEND_FILTERS.PRICE] = formatRangeFilterValue(
        BACKEND_FILTERS.PRICE,
        priceRange,
        t,
        createFilterFormatCallback(BACKEND_FILTERS.PRICE)
      );
    }
    if (transmission && Object.keys(transmission).length > 0) {
      filters[BACKEND_FILTERS.TRANSMISSION] = getLabelsForSelectedValues(BACKEND_FILTERS.TRANSMISSION, transmission);
    }
    if (fuelType && Object.keys(fuelType).length > 0) {
      filters[BACKEND_FILTERS.FUEL_TYPE] = getLabelsForSelectedValues(BACKEND_FILTERS.FUEL_TYPE, fuelType);
    }
    if (drivetrain && Object.keys(drivetrain).length > 0) {
      filters[BACKEND_FILTERS.DRIVETRAIN_TYPE] = getLabelsForSelectedValues(BACKEND_FILTERS.DRIVETRAIN_TYPE, drivetrain);
    }
    if (bodyType && Object.keys(bodyType).length > 0) {
      filters[BACKEND_FILTERS.FRAME_TYPE] = getLabelsForSelectedValues(BACKEND_FILTERS.FRAME_TYPE, bodyType);
    }
    if (color && Object.keys(color).length > 0) {
      filters[BACKEND_FILTERS.COLOR] = getLabelsForSelectedValues(BACKEND_FILTERS.COLOR, color);
    }
    if (condition && Object.keys(condition).length > 0) {
      filters[BACKEND_FILTERS.CONDITION] = getLabelsForSelectedValues(BACKEND_FILTERS.CONDITION, condition);
    }
    if (documentsOk && Object.keys(documentsOk).length > 0) {
      filters[BACKEND_FILTERS.DOCUMENT_TYPE] = getLabelsForSelectedValues(BACKEND_FILTERS.DOCUMENT_TYPE, documentsOk);
    }
    if (numberOfOwners && Object.keys(numberOfOwners).length > 0) {
      filters[BACKEND_FILTERS.NUMBER_OF_OWNER] = getLabelsForSelectedValues(BACKEND_FILTERS.NUMBER_OF_OWNER, numberOfOwners);
    }
    if (seller && Object.keys(seller).length > 0) {
      filters[BACKEND_FILTERS.SELLER] = getLabelsForSelectedValues(BACKEND_FILTERS.SELLER, seller);
    }
    if (tradeAllow && Object.keys(tradeAllow).length > 0) {
      filters[BACKEND_FILTERS.TRADE_ALLOW] = getLabelsForSelectedValues(BACKEND_FILTERS.TRADE_ALLOW, tradeAllow);
    }
    if (engineCapacityRange) {
      filters[BACKEND_FILTERS.ENGINE_CAPACITY] = formatRangeFilterValue(
        BACKEND_FILTERS.ENGINE_CAPACITY,
        engineCapacityRange,
        t,
        createFilterFormatCallback(BACKEND_FILTERS.ENGINE_CAPACITY)
      );
    }
    if (powerRange) {
      filters[BACKEND_FILTERS.POWER] = formatRangeFilterValue(
        BACKEND_FILTERS.POWER,
        powerRange,
        t,
        createFilterFormatCallback(BACKEND_FILTERS.POWER)
      );
    }
    if (mileageRange) {
      filters[BACKEND_FILTERS.MILEAGE] = formatRangeFilterValue(
        BACKEND_FILTERS.MILEAGE,
        mileageRange,
        t,
        createFilterFormatCallback(BACKEND_FILTERS.MILEAGE)
      );
    }
    if (onlyUnsold) {
      filters[BACKEND_FILTERS.UNSOLD] = true;
    }
    if (onlyWithPhotos) {
      filters[BACKEND_FILTERS.WITH_IMAGE] = true;
    }

    // Only save if there are actual filters
    if (Object.keys(filters).length > 0) {
      addSearchedItem({ filters });
    }
  };

  return saveCurrentFiltersToSearched;
};
