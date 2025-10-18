import { useRouter } from 'expo-router';
import { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Text, View, ScrollView, TouchableOpacity } from 'react-native';

import { PriceBottomSheet } from '@/components/filters/PriceFilterBottomSheet';
import { RegionBottomSheet } from '@/components/filters/RegionBottomSheet';
import { YearBottomSheet } from '@/components/filters/YearFilterBottomSheet';
import { SelectedRegionsBadges } from '@/components/global/SelectedItemsBadges';
import { TouchableHighlightRow } from '@/components/global/TouchableHighlightRow';
import { getPriceDisplayValue, getYearDisplayValue, useAutoSelectStore } from '@/state/search-screen/useAutoSelectStore';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

export const AutoHeaderScreen = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const store = useAutoSelectStore();

  const yearModalRef = useRef<BottomSheetModal>(null);
  const priceModalRef = useRef<BottomSheetModal>(null);
  const regionModalRef = useRef<BottomSheetModal>(null);

  const handlePresentYearModalPress = useCallback(() => {
    yearModalRef.current?.present();
  }, []);

  const handlePresentPriceModalPress = useCallback(() => {
    priceModalRef.current?.present();
  }, []);

  const handlePresentRegionModalPress = useCallback(() => {
    regionModalRef.current?.present();
  }, []);

  const getRegionDisplayValue = () => {
    return store.selectedRegions?.map(region => region.name).join(', ');
  };

  const quickFilters = [
    { label: 'Рекомендации', type: 'recommended' },
    { label: 'От собственников', type: 'fromOwners' },
    { label: 'Новые', type: 'new' },
    { label: 'до $5к', type: 'price', value: 5000 },
    { label: 'до $10к', type: 'price', value: 10000 },
    { label: 'до $15к', type: 'price', value: 15000 },
  ];

  const handleQuickFilterPress = useCallback(
    (filter: (typeof quickFilters)[0]) => {
      if (filter.type === 'price') {
        // Set price filter with max value
        store.setPriceRange({ min: undefined, max: filter.value });
      } else if (filter.type === 'recommended') {
        // Handle recommended filter - you might need to add this to your store
        // For now, just clear other filters or set a special flag
      } else if (filter.type === 'fromOwners') {
        // Handle from owners filter
      } else if (filter.type === 'new') {
        // Handle new items filter - maybe set year to current year
        store.setYearRange({ min: new Date().getFullYear(), max: undefined });
      }
    },
    [store]
  );

  return (
    <>
      <View className={'gap-y-1 px-4 py-3'}>
        <TouchableHighlightRow
          label="Марка, модель, поколение"
          onPress={() =>
            router.push('/(app)/search-screen/simple-auto-screen/(modals)/brand-auto-filter')
          }
          variant="button"
          showRightArrow={false}
        />
        <View className={'flex-row gap-1'}>
          <TouchableHighlightRow
            label="Год"
            selectedValue={getYearDisplayValue(store)}
            onPress={handlePresentYearModalPress}
            variant="button"
            showRightArrow={false}
            selectedValueMode="replace"
          />

          <TouchableHighlightRow
            label="Цена"
            selectedValue={getPriceDisplayValue(store)}
            onPress={handlePresentPriceModalPress}
            variant="button"
            showRightArrow={false}
            selectedValueMode="replace"
          />

          <TouchableHighlightRow
            label="Параметры"
            onPress={() => router.push('/(app)/search-screen/simple-auto-screen/(modals)/settings')}
            variant="button"
            icon={<Ionicons name="options-sharp" size={20} color="white" />}
            showRightArrow={false}
            fullWidth
          />
        </View>
        <TouchableHighlightRow
          label="Все регионы"
          onPress={handlePresentRegionModalPress}
          variant="button"
          showRightArrow={false}
        />

        {store.selectedRegions?.length > 0 && (
          <SelectedRegionsBadges
            selectedRegions={store.selectedRegions}
            onRemove={(region) => {
              const updatedRegions = store.selectedRegions.filter(r => r.id !== region.id);
              store.setSelectedRegions(updatedRegions);
            }}
          />
        )}

        <YearBottomSheet
          ref={yearModalRef}
          onChange={yearRange => {
            store.setYearRange(yearRange)
            router.push('/(app)/search-screen/simple-auto-screen/(modals)/simple-auto-modal')
          }}
        />
        <PriceBottomSheet
          ref={priceModalRef}
          onChange={priceRange => {
            store.setPriceRange(priceRange)
            router.push('/(app)/search-screen/simple-auto-screen/(modals)/simple-auto-modal')
          }}
        />
        <RegionBottomSheet
          ref={regionModalRef}
          multiple
          selectedRegions={store.selectedRegions}
          onChange={regions => store.setSelectedRegions(Array.isArray(regions) ? regions : [regions])}
        />
      </View>

      <View className={'px-4 py-3'}>
        <TouchableHighlightRow
          label={t('searchScreen.auto.searchPlaceholder')}
          onPress={() =>
            router.push('/(app)/search-screen/simple-auto-screen/(modals)/simple-auto-modal')
          }
          variant="button"
          showRightArrow={false}
          centerText={true}
        />

        {/* Quick Filters */}
        <View className="mt-4">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row gap-2">
            {quickFilters.map((filter, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleQuickFilterPress(filter)}
                className="mr-2 rounded-full border border-border bg-surface px-4 py-2 dark:border-border-dark dark:bg-surface-dark"
              >
                <Text className="text-sm font-medium text-font dark:text-font-dark">
                  {filter.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </>
  );
};

export const AutoItemScreen = ({ item }: { item: any }) => {
  return (
    <View className="mx-2 rounded-2xl shadow-md">
      <Image source={item.image} className="h-48 w-full rounded-t-2xl" resizeMode="cover" />
      <View className="p-4">
        <Text className="text-lg font-bold text-font-brand dark:text-font-brand-dark">
          {item.title}
        </Text>
        <Text className="text-base text-font dark:text-font-dark">{item.price}</Text>
        <View className="mt-2 flex-row">
          <Text className="mr-2 text-xs text-font dark:text-font-dark">⭐ 5-star GNCAP</Text>
          <Text className="text-xs text-font dark:text-font-dark">🚗 More Mileage</Text>
        </View>
      </View>
    </View>
  );
};
