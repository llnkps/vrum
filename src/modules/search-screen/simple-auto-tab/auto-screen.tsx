import { useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, TouchableWithoutFeedback, View } from 'react-native';

import { PriceFilterController } from '@/components/filters/PriceFilterBottomSheet/PriceFilterController';
import { RegionFilterController } from '@/components/filters/RegionBottomSheet/RegionFilterController';
import { YearFilterController } from '@/components/filters/YearFilterBottomSheet/YearFilterController';
import FilterBadge from '@/components/global/FilterBadge';
import { SelectedRegionsBadges } from '@/components/global/SelectedItemsBadges';
import { TouchableHighlightRow } from '@/components/global/TouchableHighlightRow';
import { useSearchTab } from '@/modules/search-screen/SearchTabProvider';
import { QuickFilter, useQuickFilters } from '@/shared/quick-filters';
import { SearchedItem, useLoadSearchedFilters, useSearchedFiltersStore } from '@/state/search-screen/useSearchedFiltersStore';
import { useSimpleAutoFilterStore } from '@/state/search-screen/useSimpleAutoFilterStore';
import { Ionicons } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useTheme } from '@react-navigation/native';
import { CustomTheme } from '@/theme';

export const AutoHeaderScreen = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const store = useAutoSelectStore();
  const theme = useTheme() as CustomTheme;

  const { updateRequestParams } = useSearchTab();

  // Local states for filters
  const [localRegions, setLocalRegions] = useState(store.selectedRegions);

  // > -- Quick Filters State and Handlers ---
  const quickFilters = useQuickFilters();
  const [selectedQuickFilter, setSelectedQuickFilter] = useState<string | null>('recommended');

  // Apply default recommended filter on mount
  // useEffect(() => {
  //   if (updateRequestParams) {
  //     // updateRequestParams({ recommended: true });
  //   }
  // }, [updateRequestParams]);

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
  // < -- Quick Filters State and Handlers ---

  // > -- Searched Filters Handlers ---
  const searchedFiltersStore = useSearchedFiltersStore();

  const loadSearchedFilters = useLoadSearchedFilters();

  const handlePressSearchedFilter = (searchedItem: SearchedItem) => {
    console.log("CLICK press")
    loadSearchedFilters(searchedItem);
    router.push('/(app)/search-screen/simple-auto-screen/simple-auto-modal');
  }
  // < -- Searched Filters Handlers ---

  useEffect(() => {
    router.prefetch('/(app)/search-screen/simple-auto-screen/simple-auto-modal');
    router.prefetch('/(app)/search-screen/simple-auto-screen/brand-auto-filter');
  }, []);

  return (
    <>
      <View className="gap-y-4 px-4 py-3">
        <View className={'gap-y-1'}>
          <TouchableHighlightRow
            label={t('searchScreen.simpleAuto.brandModelGeneration')}
            onPress={() => router.navigate('/(app)/search-screen/simple-auto-screen/brand-auto-filter')}
            variant="button"
            showRightArrow={false}
          />
          <View className={'flex-row gap-1'}>
            <YearFilterController
              onChange={yearRange => {
                // TODO: check on prod build if this works without issues
                // sometimes yearRange can be undefined when user clicks confirm
                store.setYearRange(yearRange);
                router.navigate('/(app)/search-screen/simple-auto-screen/simple-auto-modal');
              }}
            />

            <PriceFilterController
              onChange={priceRange => {
                store.setPriceRange(priceRange);
                router.push('/(app)/search-screen/simple-auto-screen/simple-auto-modal');
              }}
            />

            <TouchableHighlightRow
              label={t('searchScreen.simpleAuto.parameters')}
              onPress={() => router.navigate('/(app)/search-screen/simple-auto-screen/settings')}
              variant="button"
              icon={<Ionicons name="options-sharp" size={20} color={theme.colors.icon} />}
              showRightArrow={false}
              fullWidth
            />
          </View>
          <RegionFilterController
            value={localRegions}
            onChange={regions => {
              setLocalRegions(regions);
              store.setSelectedRegions(regions);
            }}
          />

          {localRegions?.length > 0 && (
            <SelectedRegionsBadges
              selectedRegions={localRegions}
              onRemove={region => {
                const updatedRegions = localRegions.filter(r => r.id !== region.id);
                setLocalRegions(updatedRegions);
              }}
            />
          )}
        </View>

        <TouchableHighlightRow
          label={t('searchScreen.simpleAuto.searchPlaceholder')}
          onPress={() => router.push('/(app)/search-screen/simple-auto-screen/simple-auto-modal')}
          variant="button"
          showRightArrow={false}
          centerText={true}
          noBorder={true}
        />

        {/* Searched Filters */}
        {searchedFiltersStore.searchedItems.length > 0 && (
          <View className="gap-y-1">
            <Text className="text-sm font-medium text-font dark:text-font-dark">{t('searchScreen.simpleAuto.searchedFilters')}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
              {searchedFiltersStore.searchedItems.map(searchedItem => (
                <RectButton key={searchedItem.id} onPress={() => handlePressSearchedFilter(searchedItem)}>
                  <FilterBadge label={searchedItem.name} onRemove={() => searchedFiltersStore.removeSearchedFilter(searchedItem.id)} />
                </RectButton>
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
