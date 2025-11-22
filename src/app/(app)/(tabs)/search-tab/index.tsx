import React, { useMemo } from 'react';
import { ActivityIndicator, RefreshControl, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { HeaderBrand } from '@/components/global/header';
import { HeaderCategory } from '@/modules/search-screen/HeaderCategory';
import { SearchTabProvider, useSearchTab } from '@/modules/search-screen/SearchTabProvider';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import CustomFlashList from '@/components/global/CustomFlashList/CustomFlashList';

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

  const MemoizedHeader = useMemo(
    () => (
      <>
        <HeaderBrand />
        <HeaderCategory activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
        {HeaderComponent && <HeaderComponent />}
      </>
    ),
    [activeScreen, setActiveScreen, HeaderComponent]
  );

  return (
    <SafeAreaView className="flex-1">
      <CustomFlashList
        numColumns={2}
        data={flattenedData}
        keyExtractor={(item: any) => item.id?.toString() || `item-${Math.random()}`}
        
        onRefresh={refetch}
        refreshing={isRefetching}

        onEndReachedThreshold={0.2}
        onEndReached={() => hasNextPage && !isFetchingNextPage && fetchNextPage()}
        ListFooterComponent={isFetchingNextPage ? <ActivityIndicator color="blue" size="small" style={{ marginBottom: 5 }} /> : null}
        contentContainerStyle={{ paddingBottom: tabBarHeight }}
        
        ListHeaderComponent={MemoizedHeader}

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
