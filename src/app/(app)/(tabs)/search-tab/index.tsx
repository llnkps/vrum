import React, { useMemo, useState } from 'react';
import { ActivityIndicator, RefreshControl, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { HeaderBrand } from '@/components/global/header';
import { useSimpleGetCollectionPagination } from '@/hooks/api/useSimpleGetCollectionPagination';
import { AutoDetailHeaderScreen, AutoDetailItemScreen } from '@/modules/search-screen/(components-tabs)/details-screen';
import { MotoHeaderScreen, MotoItemScreen } from '@/modules/search-screen/(components-tabs)/moto-screen';
import { SpecAutoHeaderScreen, SpecAutoItemScreen } from '@/modules/search-screen/(components-tabs)/spec_auto-screen';
import { HeaderCategory } from '@/modules/search-screen/HeaderCategory';
import { AutoHeaderScreen, AutoItemScreen } from '@/modules/search-screen/simple-auto-tab/auto-screen';
import { ActiveScreen } from '@/modules/search-screen/types';
import { DefaultConfig } from '@/openapi/client';
import { selectSelectedBrands, selectSelectedModels, useAutoSelectStore } from '@/state/search-screen/useAutoSelectStore';
import { FlashList } from '@shopify/flash-list';
import { Image } from 'expo-image';

const SCREEN_CONFIGS: Record<ActiveScreen, { header: React.ComponentType; item: React.ComponentType<{ item: any }> } | null> = {
  auto: {
    header: AutoHeaderScreen,
    item: AutoItemScreen,
  },
  auto_detail: {
    header: AutoDetailHeaderScreen,
    item: AutoDetailItemScreen,
  },
  spec_auto: {
    header: SpecAutoHeaderScreen,
    item: SpecAutoItemScreen,
  },
  moto: {
    header: MotoHeaderScreen,
    item: MotoItemScreen,
  },
};

const renderContent = (activeScreen: ActiveScreen) => SCREEN_CONFIGS[activeScreen];

export default function SearchScreen() {
  const [activeSreen, setActiveSreen] = useState<ActiveScreen>('auto');
  const { header: HeaderScreen } = renderContent(activeSreen) || {};

  const store = useAutoSelectStore();
  const selectedBrands = selectSelectedBrands(store);
  const selectedModels = selectSelectedModels(store);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch, isRefetching } = useSimpleGetCollectionPagination({
    brands: selectedBrands.length > 0 ? selectedBrands : undefined,
    models: selectedModels.length > 0 ? selectedModels : undefined,
    releaseYear: store.yearRange?.min,
    price: store.priceRange ? `${store.priceRange.min || ''}-${store.priceRange.max || ''}` : undefined,
    pageSize: '10',
  });

  // Flatten the infinite query data
  const flattenedData = useMemo(() => {
    return data?.pages?.flatMap(page => page.data) || [];
  }, [data]);

  return (
    <SafeAreaView className="flex-1">
      <FlashList
        numColumns={2}
        data={flattenedData}
        ListHeaderComponent={
          <>
            <HeaderBrand />
            <HeaderCategory activeScreen={activeSreen} setActiveScreen={setActiveSreen} />
            {HeaderScreen && <HeaderScreen />}
          </>
        }
        keyExtractor={item => item.id?.toString() || `item-${Math.random()}`}
        refreshControl={<RefreshControl tintColor={'blue'} refreshing={isRefetching} onRefresh={refetch} />}
        ListEmptyComponent={<Text className="p-4 text-center">No data available</Text>}
        renderItem={({ item }) => {
          return <MiniAdvertisementCard item={item} />;
        }}
        onEndReachedThreshold={0.2}
        onEndReached={() => hasNextPage && !isFetchingNextPage && fetchNextPage()}
        ListFooterComponent={isFetchingNextPage ? <ActivityIndicator color="blue" size="small" style={{ marginBottom: 5 }} /> : null}
      />
    </SafeAreaView>
  );
}

const MiniAdvertisementCard = ({ item }: { item: any }) => {
  return (
    <View className="p-4">
      {item.images && item.images.length > 0 ? (
        <Image
          source={{
            uri: DefaultConfig.basePath + '/' + item.images[0],
          }}
          style={{ width: '100%', height: 150, borderRadius: 8 }}
          contentFit="cover"
        />
      ) : (
        <View style={{ width: '100%', height: 150, borderRadius: 8, backgroundColor: '#ccc' }} />
      )}
      <Text className="text-lg font-bold text-font dark:text-font-dark">
        {item.brand} {item.model}, {item.releaseYear}
      </Text>
      <Text className="text-font-subtle dark:text-font-subtle-dark">
        {item.price} {item.currency}
      </Text>
      {item.region && <Text className="text-font-subtlest dark:text-font-subtlest-dark">{item.region}</Text>}
    </View>
  );
};
