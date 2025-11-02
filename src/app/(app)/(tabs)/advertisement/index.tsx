import HeaderAuto from '@/assets/images/header-auto-icon.svg';
import HeaderBreak from '@/assets/images/header-break-icon.svg';
import HeaderMoto from '@/assets/images/header-moto-icon.svg';
import HeaderSpecAuto from '@/assets/images/header-specauto-icon.svg';
import { AdvertisementCard } from '@/components/global/AdvertisementCard/AdvertisementCard';
import CustomBottomSheetModal from '@/components/global/CustomBottomSheetModal';
import { useAuthContext } from '@/context/AuthContext';
import { createAuthenticatedApiCall } from '@/openapi/auth-utils';
import { UserAdvertisementApi } from '@/openapi/client/apis/UserAdvertisementApi';
import { createAuthenticatedConfiguration } from '@/openapi/configurations';
import { CustomTheme } from '@/theme';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useFocusEffect, useTheme } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { useInfiniteQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { useRouter } from 'expo-router';
import React, { useRef } from 'react';
import { ActivityIndicator, RefreshControl, Text, TouchableHighlight, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AdvertisementScreen() {
  const router = useRouter();
  const { isAuthenticated } = useAuthContext();
  const theme = useTheme() as CustomTheme;
  const tabBarHeight = useBottomTabBarHeight();
  const [tab, setTab] = React.useState<'actual' | 'archived'>('actual');

  // Fetch user advertisements
  const { data, isLoading, isRefetching, refetch, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['user-advertisements', tab],
    queryFn: async ({ pageParam = 1 }: { pageParam?: number }) => {
      const api = new UserAdvertisementApi(createAuthenticatedConfiguration());

      const response = createAuthenticatedApiCall(async () => {
        return await api.getUserAdvertisements({
          page: pageParam,
          limit: 20,
        });
      });

      return response;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, pages: any[]) => {
      // Assuming the API returns pagination info
      if (lastPage.data && lastPage.data.length === 20) {
        return pages.length + 1;
      }
      return undefined;
    },
    enabled: isAuthenticated,
  });

  // Flatten the paginated data
  const flattenedData = React.useMemo(() => {
    return data?.pages?.flatMap((page: any) => page.items || []) || [];
  }, [data]);

  const onViewableItemsChanged = React.useCallback(() => {
    // Handle viewable items changed if needed
  }, []);

  const renderItem = React.useCallback(
    ({ item }: { item: any }) => (
      <AdvertisementCard
        item={item}
        showFavoriteIcon={false}
        isInVerification={true}
        onPress={() => {
          // Navigate to advertisement details
          router.push(`/(app)/advertisement-info/simple-auto/${item.id}`);
        }}
      />
    ),
    [router]
  );

  const loadMore = React.useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const refBottomSheet = useRef<React.ElementRef<typeof CustomBottomSheetModal>>(null);
  useFocusEffect(
    React.useCallback(() => {
      // On focus, present the bottom sheet
      const timer = setTimeout(() => {
        refBottomSheet.current?.present(1);
      }, 200);
      return () => {
        clearTimeout(timer);
        // On blur, close the bottom sheet
        refBottomSheet.current?.close();
      };
    }, [])
  );

  if (!isAuthenticated) {
    return (
      <SafeAreaView className="flex-1">
        <View className="flex-1 items-center justify-center">
          <Ionicons name="log-in-outline" size={64} className="mb-4" color={theme.colors.icon} />
          <Text className="mx-10 text-center" style={{ color: theme.colors.text }}>
            Пожалуйста, войдите в систему, чтобы просмотреть свои объявления
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: theme.colors.background }}>
      <View className="flex-1">
        {/* Content */}
        <View className="flex-1">
          {isLoading ? (
            <View className="flex-1 items-center justify-center">
              <ActivityIndicator size="large" color={theme.colors.primary} />
              <Text className="mt-4" style={{ color: theme.colors.text }}>
                Загрузка объявлений...
              </Text>
            </View>
          ) : (
            <>
              <FlashList
                data={flattenedData}
                renderItem={renderItem}
                keyExtractor={(item: any) => item.id?.toString() || Math.random().toString()}
                onEndReached={loadMore}
                onEndReachedThreshold={0.5}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={{
                  itemVisiblePercentThreshold: 50,
                }}
                contentContainerStyle={{
                  paddingBottom: tabBarHeight + 20,
                }}
                refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} tintColor={theme.colors.primary} />}
                ListEmptyComponent={
                  <View className="items-center justify-center">
                    <Ionicons name="document-text-outline" size={64} className="mb-4" color={theme.colors.icon} />
                    <Text className="mx-10 text-center" style={{ color: theme.colors.text }}>
                      {tab === 'actual' ? 'У вас нет активных объявлений' : 'У вас нет архивных объявлений'}
                    </Text>
                  </View>
                }
                ListHeaderComponent={
                  <>
                    {/* Header */}
                    <View className="px-4 pb-6 pt-5">
                      <Text className="text-2xl font-bold" style={{ color: theme.colors.text }}>
                        Мои объявления
                      </Text>
                    </View>

                    {/* Tab selector */}
                    {/* <View className="flex-row rounded-lg bg-surface dark:bg-surface-dark">
                      <SelectableButton appearance="subtle" title="Актуальные" isSelected={tab === 'actual'} onPress={() => setTab('actual')} />
                      <SelectableButton appearance="subtle" title="Архив" isSelected={tab === 'archived'} onPress={() => setTab('archived')} />
                    </View> */}
                  </>
                }
                ListFooterComponent={
                  isFetchingNextPage ? (
                    <View className="py-4">
                      <ActivityIndicator size="small" color={theme.colors.primary} />
                    </View>
                  ) : null
                }
              />
            </>
          )}
          <CustomBottomSheetModal
            ref={refBottomSheet}
            enablePanDownToClose={false}
            snapPoints={['7%', '20%']}
            backdropComponent={null}
            bottomInset={tabBarHeight + 16}
            title={'Добавить объявление'}
            showCloseButton={false}
          >
            <BottomSheetView className="flex-1 p-4">
              <View className="flex-1 flex-row justify-center gap-x-3">
                <TouchableHighlight
                  className={clsx('rounded-md p-2')}
                  style={{ backgroundColor: theme.colors.backgroundNeutral }}
                  onPress={() => {
                    if (isAuthenticated) {
                      router.push('/(app)/advertisement/simple-auto');
                    } else {
                      router.replace('/sign-in');
                    }
                  }}
                  activeOpacity={0.6}
                  underlayColor="#DDDDDD"
                >
                  <View className="flex-col items-center justify-center">
                    <HeaderAuto />
                    <Text style={{ color: theme.colors.text }}>Автомобили</Text>
                  </View>
                </TouchableHighlight>

                <TouchableHighlight
                  className={clsx('rounded-md p-2')}
                  style={{ backgroundColor: theme.colors.backgroundNeutral }}
                  onPress={() => router.push('/(app)/advertisement/spec-auto')}
                >
                  <View className="flex-col items-center justify-center">
                    <HeaderSpecAuto />
                    <Text style={{ color: theme.colors.text }}>Спецтехника</Text>
                  </View>
                </TouchableHighlight>

                <TouchableHighlight
                  className={clsx('rounded-md p-2')}
                  style={{ backgroundColor: theme.colors.backgroundNeutral }}
                  onPress={() => router.push('/(app)/advertisement/motorbike')}
                >
                  <View className="flex-col items-center justify-center">
                    <HeaderMoto />
                    <Text style={{ color: theme.colors.text }}>Мототехника</Text>
                  </View>
                </TouchableHighlight>

                <TouchableHighlight
                  className={clsx('rounded-md p-2')}
                  style={{ backgroundColor: theme.colors.backgroundNeutral }}
                  onPress={() => router.push('/(app)/advertisement/details')}
                >
                  <View className="flex-col items-center justify-center">
                    <HeaderBreak />
                    <Text style={{ color: theme.colors.text }}>Запчасти</Text>
                  </View>
                </TouchableHighlight>
              </View>
            </BottomSheetView>
          </CustomBottomSheetModal>
        </View>
      </View>
    </SafeAreaView>
  );
}
