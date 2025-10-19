import { useNavigation, useRouter, useSegments } from 'expo-router';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, RefreshControl, Text, View } from 'react-native';

import { PriceBottomSheet } from '@/components/filters/PriceFilterBottomSheet';
import { RegionBottomSheet } from '@/components/filters/RegionBottomSheet';
import { YearBottomSheet } from '@/components/filters/YearFilterBottomSheet';
import { SelectedRegionsBadges } from '@/components/global/SelectedItemsBadges';
import { AdvertisementCard } from '@/components/global/AdvertisementCard/AdvertisementCard';
import { HeaderBackSaveFilter } from '@/components/global/header';
import { SelectedBrandsSection } from '@/components/global/SelectedBrandsSection';
import { TouchableHighlightRow } from '@/components/global/TouchableHighlightRow';
import { useSimpleGetCollectionPagination } from '@/hooks/api/useSimpleGetCollectionPagination';
import { useImagePrefetch } from '@/hooks/useImagePrefetch';
import {
  getPriceDisplayValue,
  getYearDisplayValue,
  selectSelectedBrands,
  selectSelectedGenerations,
  selectSelectedModels,
  useAutoSelectStore,
  getActiveFiltersCount,
} from '@/state/search-screen/useAutoSelectStore';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { FlashList } from '@shopify/flash-list';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigationState } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import React from 'react';

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
            <HeaderBackSaveFilter />

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
