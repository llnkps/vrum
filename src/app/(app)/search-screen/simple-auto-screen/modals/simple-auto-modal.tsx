import { useNavigation, useRouter, useSegments } from 'expo-router';
import { useCallback, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, RefreshControl, Text, View } from 'react-native';

import { PriceBottomSheet } from '@/components/filters/PriceFilterBottomSheet';
import { RegionBottomSheet } from '@/components/filters/RegionBottomSheet';
import { YearBottomSheet } from '@/components/filters/YearFilterBottomSheet';
import { AdvertisementCard } from '@/components/global/AdvertisementCard/AdvertisementCard';
import { HeaderBackSaveFilter } from '@/components/global/header';
import { TouchableHighlightRow } from '@/components/global/TouchableHighlightRow';
import { useSimpleGetCollectionPagination } from '@/hooks/api/useSimpleGetCollectionPagination';
import { useImagePrefetch } from '@/hooks/useImagePrefetch';
import {
  selectSelectedBrands,
  selectSelectedModels,
  useAutoSelectStore,
} from '@/state/search-screen/useAutoSelectStore';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { FlashList } from '@shopify/flash-list';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigationState } from '@react-navigation/native';

export default function SimpleAutoModal() {
  const { t } = useTranslation();
  const router = useRouter();
  const navigation = useNavigation();
  const state = navigation.getState();
  // navigationState will contain an object with routes, index, etc.
  // The 'routes' array within navigationState represents the current stack.
  console.log('Segments in SimpleAutoModal: ');
  console.log(state?.routes);

  const store = useAutoSelectStore();
  const selectedBrands = selectSelectedBrands(store);
  const selectedModels = selectSelectedModels(store);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch, isRefetching } =
    useSimpleGetCollectionPagination({
      brand: selectedBrands?.map(brand => brand.id).join(',') || undefined,
      model: selectedModels?.map(model => model.id).join(',') || undefined,
      releaseYear: undefined,
      price: undefined,
      pageSize: '10',
    });

  const flattenedData = useMemo(() => {
    return data?.pages?.flatMap(page => page.data) || [];
  }, [data]);

  const { onViewableItemsChanged } = useImagePrefetch(flattenedData);

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

  return (
    <SafeAreaView className="flex-1">
      <FlashList
        numColumns={1}
        data={flattenedData}
        removeClippedSubviews={true}
        maxItemsInRecyclePool={10}
        ListHeaderComponent={
          <>
            {/* <HeaderBrand /> */}
            {/* <HeaderCategory activeScreen={activeSreen} setActiveScreen={setActiveSreen} /> */}
            {/* {HeaderScreen && <HeaderScreen />} */}

            <HeaderBackSaveFilter />

            <View className={'gap-y-1 px-4 py-3'}>
              <TouchableHighlightRow
                variant="button"
                label={'Марка, модель, поколение'}
                selectedValue={undefined}
                onPress={() =>
                  router.dismissTo(
                    '/(app)/search-screen/simple-auto-screen/modals/brand-auto-filter'
                  )
                }
                showRightArrow={false}
              />

              <View className={'flex flex-row gap-1'}>
                <TouchableHighlightRow
                  variant="button"
                  label={'Год'}
                  selectedValue={undefined}
                  onPress={() => handlePresentYearModalPress()}
                  showRightArrow={false}
                />
                <YearBottomSheet ref={yearModalRef} />

                <TouchableHighlightRow
                  variant="button"
                  label={'Цена'}
                  selectedValue={undefined}
                  onPress={() => handlePresentPriceModalPress()}
                  showRightArrow={false}
                />
                <PriceBottomSheet ref={priceModalRef} />

                <TouchableHighlightRow
                  variant="button"
                  label={'Параметры'}
                  selectedValue={undefined}
                  onPress={() =>
                    router.push('/(app)/search-screen/simple-auto-screen/modals/settings')
                  }
                  showRightArrow={false}
                  icon={<Ionicons name="options-sharp" size={20} color="white" />}
                />
              </View>

              <TouchableHighlightRow
                variant="button"
                label={'Все регионы'}
                selectedValue={undefined}
                onPress={handlePresentRegionModalPress}
                rightIcon="chevron-down"
              />

              {/** component for opening year modal */}
              {/** TODO: move them to shared between creating advertisement */}
              <RegionBottomSheet ref={regionModalRef} />

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
        refreshControl={
          <RefreshControl tintColor={'blue'} refreshing={isRefetching} onRefresh={refetch} />
        }
        ListEmptyComponent={<Text className="p-4 text-center">No data available</Text>}
        renderItem={({ item, index }) => {
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
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator color="blue" size="small" style={{ marginBottom: 5 }} />
          ) : null
        }
        viewabilityConfig={{
          itemVisiblePercentThreshold: 20,
        }}
        onViewableItemsChanged={onViewableItemsChanged}
      />
    </SafeAreaView>
  );
}
