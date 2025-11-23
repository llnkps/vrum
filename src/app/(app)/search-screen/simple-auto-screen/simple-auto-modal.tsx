import { useFocusEffect, useNavigation, useRouter } from 'expo-router';
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
import { useSaveSearchedFilters, useSearchedFiltersStore } from '@/state/search-screen/useSearchedFiltersStore';
import {
  getActiveFiltersCount,
  selectSelectedBrands,
  selectSelectedGenerations,
  selectSelectedModels,
  useSimpleAutoFilterStore,
} from '@/state/search-screen/useSimpleAutoFilterStore';
import { useSubscriptionsStore } from '@/state/subscriptions/useSubscriptionsStore';
import { Ionicons } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SimpleAutoModal() {
  const { t } = useTranslation();
  const router = useRouter();
  const navigation = useNavigation();

  const simpleAutoFilterStore = useSimpleAutoFilterStore();
  const selectedBrands = selectSelectedBrands(simpleAutoFilterStore);
  const selectedModels = selectSelectedModels(simpleAutoFilterStore);

  const {
    priceRange,
    yearRange,
    selectedRegions,
    transmission,
    fuelType,
    drivetrain,
    bodyType,
    color,
    numberOfOwners,
    seller,
    onlyUnsold,
    onlyWithPhotos,
    engineCapacityRange,
    powerRange,
    mileageRange,
    tab,
    selectedModelsByBrand,
  } = simpleAutoFilterStore;

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

  const [isBrandSectionCollapsed, setIsBrandSectionCollapsed] = useState(true);
  const selectedGenerations = selectSelectedGenerations(simpleAutoFilterStore);

  // > --- Back Navigation ---
  const routeIndexRef = useRef<number | null>(null);
  const isGoingBackRef = useRef(false);
  // Handle back navigation (button and gesture)
  useFocusEffect(
    useCallback(() => {
      const unsubscribe = navigation.addListener('beforeRemove', e => {
        console.log('hello eorld');
        isGoingBackRef.current = true;
        e.preventDefault();
        router.push('/search-tab');
      });

      return unsubscribe;
    }, [navigation, simpleAutoFilterStore, router])
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

        console.log(currentState, previousIndex);

        // Only clear store if navigating back (index decreased or flagged as back)
        if (isGoingBackRef.current || (currentState && previousIndex !== null && currentState.index < previousIndex)) {
          console.log('CLEAR STATE SIMPLE AUTO MODAL - Going back');
          simpleAutoFilterStore.clearSelections();
        }
        // Reset the flag
        isGoingBackRef.current = false;
      };
    }, [navigation, simpleAutoFilterStore])
  );
  // < --- Back Navigation ---


// > --- Subscribe ---
  const { createSubscriptionFromSimpleAutoFilters } = useSubscriptionsStore();
  const handleSubscribe = async () => {
    await createSubscriptionFromSimpleAutoFilters({
      selectedBrands,
      selectedModels,
      priceRange,
      yearRange,
      selectedRegions,
      transmission,
      fuelType,
      drivetrain,
      bodyType,
      color,
      numberOfOwners,
      seller,
      onlyUnsold,
      onlyWithPhotos,
      engineCapacityRange,
      powerRange,
      mileageRange,
      tab,
      selectedModelsByBrand,
      onAuthError: () => router.push('/sign-in'),
    });
  };
  // < --- Subscribe ---


  // > --- Search Filters ---
  const { setCurrentSessionId, currentSessionId } = useSearchedFiltersStore();
  const saveCurrentFiltersToSearched = useSaveSearchedFilters();
  const hasSavedFiltersRef = useRef(false);

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

  useEffect(() => {
    console.log('call again');
    if (isSuccess && !hasSavedFiltersRef.current) {
      console.log('Data fetched successfully in SimpleAutoModal. Total items:', flattenedData.length);
      // Save current filters to searched filters only once per session
      saveCurrentFiltersToSearched();
      hasSavedFiltersRef.current = true;
    }
  }, [isSuccess, saveCurrentFiltersToSearched, flattenedData.length]);
  // < --- Search Filters ---

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
