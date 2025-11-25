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
import { CustomTheme } from '@/theme';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import { CustomRectButton } from '@/components/ui/button';

export const AutoHeaderScreen = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const store = useSimpleAutoFilterStore();
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
    console.log('CLICK press');
    loadSearchedFilters(searchedItem);
    router.push('/(app)/search-screen/simple-auto-screen/simple-auto-modal');
  };
  // < -- Searched Filters Handlers ---

  useEffect(() => {
    router.prefetch('/(app)/search-screen/simple-auto-screen/simple-auto-modal');
    router.prefetch('/(app)/search-screen/simple-auto-screen/brand-auto-filter');
  }, []);

  return (
    <>
      <View className="gap-y-4 px-4 py-3">
        <View>
          <TouchableHighlightRow
            label={t('searchScreen.simpleAuto.brandModelGeneration')}
            onPress={() => router.navigate('/(app)/search-screen/simple-auto-screen/brand-auto-filter')}
            appearance="primary"
            showRightArrow={false}
            containerStyle={{
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
            }}
          />
          <View className={'flex-row gap-1'}>
            <YearFilterController
              onChange={yearRange => {
                // TODO: check on prod build if this works without issues
                // sometimes yearRange can be undefined when user clicks confirm
                store.setYearRange(yearRange);
                router.navigate('/(app)/search-screen/simple-auto-screen/simple-auto-modal');
              }}
              appearance="primary"
            />

            <PriceFilterController
              onChange={priceRange => {
                store.setPriceRange(priceRange);
                router.push('/(app)/search-screen/simple-auto-screen/simple-auto-modal');
              }}
              appearance="primary"
            />

            <TouchableHighlightRow
              label={t('searchScreen.simpleAuto.parameters')}
              onPress={() => router.navigate('/(app)/search-screen/simple-auto-screen/settings')}
              icon={<Ionicons name="options-sharp" size={20} color={theme.colors.icon} />}
              showRightArrow={false}
              fullWidth
              appearance="primary"
            />
          </View>
          <RegionFilterController
            value={localRegions}
            onChange={regions => {
              setLocalRegions(regions);
              store.setSelectedRegions(regions);
            }}
            appearance="primary"
            containerStyle={{
              borderBottomLeftRadius: 8,
              borderBottomRightRadius: 8,
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
          appearance="primary"
          showRightArrow={false}
          centerText={true}
          containerStyle={{ borderRadius: 8 }}
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
                <CustomRectButton
                  title={filter.label}
                  key={index}
                  onPress={() => handleQuickFilterPress(filter)}
                  appearance={isSelected ? 'primary' : 'subtle'}
                  size="small"
                />
              );
            })}
          </ScrollView>
        </View>
      </View>
    </>
  );
};
