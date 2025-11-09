import { useRouter } from 'expo-router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, TouchableWithoutFeedback, View } from 'react-native';

import { PriceFilterController } from '@/components/filters/PriceFilterBottomSheet/PriceFilterController';
import { RegionFilterController } from '@/components/filters/RegionBottomSheet/RegionFilterController';
import { YearFilterController } from '@/components/filters/YearFilterBottomSheet/YearFilterController';
import { SelectedRegionsBadges } from '@/components/global/SelectedItemsBadges';
import { TouchableHighlightRow } from '@/components/global/TouchableHighlightRow';
import { useSearchTab } from '@/modules/search-screen/SearchTabProvider';
import { QuickFilter, useQuickFilters } from '@/shared/quick-filters';
import { useAutoSelectStore } from '@/state/search-screen/useAutoSelectStore';
import { useSearchedFiltersStore } from '@/state/search-screen/useSearchedFiltersStore';
import { BACKEND_FILTERS, isRangeFilter, isArrayFilter, isBooleanFilter } from '@/shared/filter-registry';
import { Ionicons } from '@expo/vector-icons';

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
  const searchedFilters = useMemo(() => {
    const now = Date.now();
    return searchedFiltersStore.searchedFilters.filter(f => {
      const expirationTime = f.timestamp + (f.ttl || 7 * 24 * 60 * 60 * 1000);
      return now < expirationTime;
    });
  }, [searchedFiltersStore.searchedFilters]);

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
    (filter: (typeof searchedFilters)[0]) => {

      // Convert filter to the format expected by populateFromFilterValues
      const filterValues: Array<{ slug: string; values: string[] }> = [];

      // Special case for region since it's not in the registry
      if (filter.type === 'region') {
        if (filter.value && typeof filter.value === 'object' && 'id' in filter.value) {
          store.setSelectedRegions([filter.value]);
          router.push('/(app)/search-screen/simple-auto-screen/(modals)/simple-auto-modal');
          return;
        }
      }

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

      const populateKey = backendToPopulateKeyMapping[filter.type];

      if (populateKey) {
        if (isRangeFilter(filter.type as any)) {
          // Handle range filters (year, price, engine_capacity, power, mileage)
          if (filter.value && typeof filter.value === 'object' && 'min' in filter.value && 'max' in filter.value) {
            const { min, max } = filter.value;
            filterValues.push({
              slug: populateKey,
              values: [min?.toString() || '', max?.toString() || ''],
            });
          }
        } else if (isArrayFilter(filter.type as any)) {
          // Handle array filters (transmission, fuel_type, etc.)
          if (Array.isArray(filter.value)) {
            filterValues.push({
              slug: populateKey,
              values: filter.value.map(v => v?.toString() || ''),
            });
          } else if (filter.value !== undefined && filter.value !== null) {
            // Single value array filter
            filterValues.push({
              slug: populateKey,
              values: [filter.value.toString()],
            });
          }
        } else if (isBooleanFilter(filter.type as any)) {
          // Handle boolean filters - convert to array format expected by populateFromFilterValues
          if (typeof filter.value === 'boolean') {
            filterValues.push({
              slug: populateKey,
              values: [filter.value.toString()],
            });
          }
        }
      }

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
            onPress={() => router.push('/(app)/search-screen/simple-auto-screen/(modals)/brand-auto-filter')}
            variant="button"
            showRightArrow={false}
          />
          <View className={'flex-row gap-1'}>
            <YearFilterController
              value={store.yearRange}
              onChange={yearRange => {
                store.setYearRange(yearRange);
                if (yearRange) {
                  searchedFiltersStore.addSearchedFilter({
                    type: 'year',
                    label: `${t('searchScreen.simpleAuto.year')}: ${yearRange.min || ''}-${yearRange.max || ''}`,
                    value: yearRange,
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
                  searchedFiltersStore.addSearchedFilter({
                    type: 'price',
                    label: `${t('searchScreen.simpleAuto.price')}: ${priceRange.min || ''}-${priceRange.max || ''}`,
                    value: priceRange,
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

              // Add each selected region to searched filters
              regions.forEach(region => {
                searchedFiltersStore.addSearchedFilter({
                  type: 'region',
                  label: region.name,
                  value: region,
                });
              });
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
        {searchedFilters.length > 0 && (
          <View className="gap-y-1">
            <Text className="text-sm font-medium text-font dark:text-font-dark">{t('searchScreen.simpleAuto.searchedFilters')}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
              {searchedFilters.map(filter => (
                <TouchableWithoutFeedback key={filter.id} onPress={() => handleSearchedFilterPress(filter)}>
                  <View className="flex-row items-center rounded-full bg-gray-200 px-3 py-1 dark:bg-gray-700">
                    <Text className="mr-2 text-sm text-font dark:text-font-dark">{filter.label}</Text>
                    <TouchableWithoutFeedback onPress={() => searchedFiltersStore.removeSearchedFilter(filter.id)}>
                      <Ionicons name="close" size={16} color="#6b7280" />
                    </TouchableWithoutFeedback>
                  </View>
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
