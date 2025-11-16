import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, TouchableWithoutFeedback, View } from 'react-native';

import { PriceFilterController } from '@/components/filters/PriceFilterBottomSheet/PriceFilterController';
import { RegionFilterController } from '@/components/filters/RegionBottomSheet/RegionFilterController';
import { YearFilterController } from '@/components/filters/YearFilterBottomSheet/YearFilterController';
import { SelectedRegionsBadges } from '@/components/global/SelectedItemsBadges';
import { TouchableHighlightRow } from '@/components/global/TouchableHighlightRow';
import { useSearchTab } from '@/modules/search-screen/SearchTabProvider';
import { isArrayFilter, isBooleanFilter, isRangeFilter } from '@/shared/filter';
import { QuickFilter, useQuickFilters } from '@/shared/quick-filters';
import { useAutoSelectStore } from '@/state/search-screen/useAutoSelectStore';
import { SearchedItem, useSearchedFiltersStore } from '@/state/search-screen/useSearchedFiltersStore';
import { Ionicons } from '@expo/vector-icons';
import FilterBadge from '@/components/global/FilterBadge';
import { BACKEND_FILTERS } from '@/types/filter';
import { createFilterFormatCallback, formatRangeFilterValue } from '@/utils/useTranslateRangeFilter';

export const AutoHeaderScreen = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const store = useAutoSelectStore();
  const searchedFiltersStore = useSearchedFiltersStore();

  const { updateRequestParams } = useSearchTab();

  const quickFilters = useQuickFilters();
  const [selectedQuickFilter, setSelectedQuickFilter] = useState<string | null>('recommended');

  // Apply default recommended filter on mount
  // useEffect(() => {
  //   if (updateRequestParams) {
  //     // updateRequestParams({ recommended: true });
  //   }
  // }, [updateRequestParams]);

  // Memoize searched filters to avoid calling methods during render
  // const searchedFilters = useMemo(() => {
  //   const now = Date.now();
  //   return searchedFiltersStore.searchedFilters.filter(f => {
  //     const expirationTime = f.timestamp + (f.ttl || 7 * 24 * 60 * 60 * 1000);
  //     return now < expirationTime;
  //   });
  // }, [searchedFiltersStore.searchedFilters]);

  const handleQuickFilterPress = useCallback(
    (filter: QuickFilter) => {
      // If this filter is not already selected, select it
      if (selectedQuickFilter !== filter.type) {
        setSelectedQuickFilter(filter.type);

        // Clear all existing quick filter params first
        if (updateRequestParams) {
          updateRequestParams({
            price: undefined,
            releaseYear: undefined,
            recommended: undefined,
            seller: undefined,
          });
        }

        // Call onSelect function and update request params
        if (updateRequestParams && filter.onSelect) {
          const params = filter.onSelect();
          updateRequestParams(params);
        }
      }
      // If already selected, do nothing (no deselection allowed)
    },
    [selectedQuickFilter, updateRequestParams]
  );

  const handleSearchedFilterPress = useCallback(
    (searchedItem: SearchedItem) => {
      console.log(searchedItem);
      return null;
      // Convert searched item filters to the format expected by populateFromFilterValues
      const filterValues: Array<{ slug: string; values: string[] }> = [];

      // Map backend filter keys to the keys expected by populateFromFilterValues
      const backendToPopulateKeyMapping: Record<string, string> = {
        [BACKEND_FILTERS.TRANSMISSION]: 'transmission',
        [BACKEND_FILTERS.FUEL_TYPE]: 'fuelType',
        [BACKEND_FILTERS.DRIVETRAIN_TYPE]: 'drivetrain',
        [BACKEND_FILTERS.FRAME_TYPE]: 'bodyType',
        [BACKEND_FILTERS.COLOR]: 'color',
        [BACKEND_FILTERS.CONDITION]: 'condition',
        [BACKEND_FILTERS.SELLER]: 'seller',
        [BACKEND_FILTERS.DOCUMENT_TYPE]: 'documentsOk',
        [BACKEND_FILTERS.NUMBER_OF_OWNER]: 'numberOfOwners',
        [BACKEND_FILTERS.TRADE_ALLOW]: 'tradeAllow',
        [BACKEND_FILTERS.YEAR]: 'year',
        [BACKEND_FILTERS.PRICE]: 'price',
        [BACKEND_FILTERS.ENGINE_CAPACITY]: 'engineCapacityRange',
        [BACKEND_FILTERS.POWER]: 'powerRange',
        [BACKEND_FILTERS.MILEAGE]: 'mileageRange',
        [BACKEND_FILTERS.UNSOLD]: 'unsold',
        [BACKEND_FILTERS.WITH_IMAGE]: 'with_image',
      };

      // Process each filter in the searched item's filters object
      Object.entries(searchedItem.filters).forEach(([backendKey, value]) => {
        const populateKey = backendToPopulateKeyMapping[backendKey];

        if (populateKey && value !== undefined && value !== null) {
          if (isRangeFilter(backendKey as any)) {
            // Handle range filters (year, price, engine_capacity, power, mileage)
            if (value && typeof value === 'object' && 'min' in value && 'max' in value) {
              const { min, max } = value as { min?: number; max?: number };
              filterValues.push({
                slug: populateKey,
                values: [min?.toString() || '', max?.toString() || ''],
              });
            }
          } else if (isArrayFilter(backendKey as any)) {
            // Handle array filters (transmission, fuel_type, etc.)
            if (Array.isArray(value)) {
              filterValues.push({
                slug: populateKey,
                values: value.map(v => v?.toString() || ''),
              });
            } else {
              // Single value array filter
              filterValues.push({
                slug: populateKey,
                values: [value.toString()],
              });
            }
          } else if (isBooleanFilter(backendKey as any)) {
            // Handle boolean filters
            if (typeof value === 'boolean') {
              filterValues.push({
                slug: populateKey,
                values: [value.toString()],
              });
            }
          }
        }
      });

      if (filterValues.length > 0) {
        // Populate the store with filter values
        store.populateFromFilterValues(filterValues);
        // Navigate to the modal
        router.push('/(app)/search-screen/simple-auto-screen/(modals)/simple-auto-modal');
      }
    },
    [store, router]
  );

  return (
    <>
      <View className="gap-y-4 px-4 py-3">
        <View className={'gap-y-1'}>
          <TouchableHighlightRow
            label={t('searchScreen.simpleAuto.brandModelGeneration')}
            onPress={() => router.navigate('/(app)/search-screen/simple-auto-screen/(modals)/brand-auto-filter')}
            variant="button"
            showRightArrow={false}
          />
          <View className={'flex-row gap-1'}>
            <YearFilterController
              // value={store.yearRange}
              onChange={yearRange => {
                store.setYearRange(yearRange);
                if (yearRange) {
                  searchedFiltersStore.addSearchedItem({
                    filters: {
                      [BACKEND_FILTERS.YEAR]: formatRangeFilterValue(BACKEND_FILTERS.YEAR, yearRange, t, createFilterFormatCallback(BACKEND_FILTERS.YEAR)),
                    },
                  });
                }
                router.push('/(app)/search-screen/simple-auto-screen/(modals)/simple-auto-modal');
              }}
            />

            <PriceFilterController
              value={store.priceRange}
              onChange={priceRange => {
                store.setPriceRange(priceRange);
                if (priceRange) {
                  searchedFiltersStore.addSearchedItem({
                    filters: {
                      [BACKEND_FILTERS.PRICE]: formatRangeFilterValue(BACKEND_FILTERS.PRICE, priceRange, t, createFilterFormatCallback(BACKEND_FILTERS.PRICE)),
                    },
                  });
                }
                router.push('/(app)/search-screen/simple-auto-screen/(modals)/simple-auto-modal');
              }}
            />

            <TouchableHighlightRow
              label={t('searchScreen.simpleAuto.parameters')}
              onPress={() => router.push('/(app)/search-screen/simple-auto-screen/(modals)/settings')}
              variant="button"
              icon={<Ionicons name="options-sharp" size={20} color="white" />}
              showRightArrow={false}
              fullWidth
            />
          </View>
          <RegionFilterController
            value={store.selectedRegions}
            onChange={regions => {
              store.setSelectedRegions(regions);
            }}
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
        </View>

        <TouchableHighlightRow
          label={t('searchScreen.simpleAuto.searchPlaceholder')}
          onPress={() => router.push('/(app)/search-screen/simple-auto-screen/(modals)/simple-auto-modal')}
          variant="button"
          showRightArrow={false}
          centerText={true}
        />

        {/* Searched Filters */}
        {searchedFiltersStore.searchedItems.length > 0 && (
          <View className="gap-y-1">
            <Text className="text-sm font-medium text-font dark:text-font-dark">{t('searchScreen.simpleAuto.searchedFilters')}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
              {searchedFiltersStore.searchedItems.map(searchedItem => (
                <TouchableWithoutFeedback key={searchedItem.id} onPress={() => handleSearchedFilterPress(searchedItem)}>
                  <FilterBadge label={searchedItem.name} onRemove={() => searchedFiltersStore.removeSearchedFilter(searchedItem.id)} />
                </TouchableWithoutFeedback>
              ))}
            </ScrollView>
          </View>
        )}

        {/** Quick Filters */}
        <View className="gap-y-1">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12, paddingVertical: 10 }}>
            {quickFilters.map((filter, index) => {
              const isSelected = selectedQuickFilter === filter.type;

              return (
                <TouchableWithoutFeedback key={index} onPress={() => handleQuickFilterPress(filter)}>
                  <Text
                    className={`text-lg font-bold ${
                      isSelected ? 'text-font dark:text-font-dark' : 'text-font-subtlest dark:text-font-subtlest-dark'
                    }`}
                  >
                    {filter.label}
                  </Text>
                </TouchableWithoutFeedback>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </>
  );
};
