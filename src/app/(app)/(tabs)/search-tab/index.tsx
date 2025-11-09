import React from 'react';
import { ActivityIndicator, RefreshControl, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { HeaderBrand } from '@/components/global/header';
import { HeaderCategory } from '@/modules/search-screen/HeaderCategory';
import { SearchTabProvider, useSearchTab } from '@/modules/search-screen/SearchTabProvider';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';

export default function SearchScreen() {
  return (
    <SearchTabProvider>
      <SearchScreenContent />
    </SearchTabProvider>
  );
}

function SearchScreenContent() {
  const router = useRouter();
  const tabBarHeight = useBottomTabBarHeight();

  const {
    activeScreen,
    setActiveScreen,
    data: flattenedData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
    HeaderComponent,
    ItemComponent,
    getDetailUrl,
  } = useSearchTab();

  return (
    <SafeAreaView className="flex-1">
      <FlashList
        numColumns={2}
        data={flattenedData}
        keyExtractor={(item: any) => item.id?.toString() || `item-${Math.random()}`}
        refreshControl={<RefreshControl tintColor={'blue'} refreshing={isRefetching} onRefresh={refetch} />}
        onEndReachedThreshold={0.2}
        onEndReached={() => hasNextPage && !isFetchingNextPage && fetchNextPage()}
        ListEmptyComponent={<Text className="p-4 text-center">No data available</Text>}
        ListFooterComponent={isFetchingNextPage ? <ActivityIndicator color="blue" size="small" style={{ marginBottom: 5 }} /> : null}
        contentContainerStyle={{ paddingBottom: tabBarHeight }}
        ListHeaderComponent={
          <>
            <HeaderBrand />
            <HeaderCategory activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
            {HeaderComponent && <HeaderComponent />}
          </>
        }
        renderItem={({ item }) => {
          return ItemComponent ? (
            <ItemComponent
              item={item}
              onPress={() => {
                // Navigate to advertisement details using tab-specific URL
                router.push(getDetailUrl(item) as any);
              }}
            />
          ) : null;
        }}
      />
    </SafeAreaView>
  );
}
