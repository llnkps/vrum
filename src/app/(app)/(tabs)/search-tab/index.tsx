import React, { useMemo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import CustomFlashList from '@/components/global/CustomFlashList/CustomFlashList';
import { HeaderBrand } from '@/components/global/header';
import { LoaderIndicator } from '@/components/global/LoaderIndicator';
import { HeaderCategory } from '@/modules/search-screen/HeaderCategory';
import { SearchTabProvider, useSearchTab } from '@/modules/search-screen/SearchTabProvider';
import { CustomTheme } from '@/theme';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useTheme } from '@react-navigation/native';
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
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
    HeaderComponent,
    ItemComponent,
    getDetailUrl,
  } = useSearchTab();

  const theme = useTheme() as CustomTheme;

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
    <SafeAreaView className="flex-1" style={{ backgroundColor: theme.colors.backgroundNeutral }}>
      <CustomFlashList
        numColumns={2}
        data={data}
        keyExtractor={(item: any) => item.id?.toString() || `item-${Math.random()}`}
        onRefresh={refetch}
        refreshing={isRefetching}
        onEndReachedThreshold={0.2}
        onEndReached={() => hasNextPage && !isFetchingNextPage && fetchNextPage()}
        ListFooterComponent={isFetchingNextPage ? <LoaderIndicator /> : null}
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
