import { CustomRectButton } from '@/components/ui/button';
import { createAuthenticatedApiCall } from '@/openapi/auth-utils';
import { SimpleAutoApi } from '@/openapi/client/apis/SimpleAutoApi';
import { AdvertisementWithFiltersResponse } from '@/openapi/client/models/AdvertisementWithFiltersResponse';
import { DefaultConfig } from '@/openapi/client/runtime';
import { createAuthenticatedConfiguration } from '@/openapi/configurations';
import { CustomTheme } from '@/theme';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { memo, useCallback, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Modal,
  RefreshControl,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Компонент спецификации (мемоизирован для оптимизации)
const SpecificationRow = memo<{
  filterNameTranslated: string;
  valueTranslated: string;
}>(({ filterNameTranslated, valueTranslated }) => (
  <View className="flex-row items-center justify-between py-1">
    <Text className="flex-1 text-base text-font-subtle dark:text-font-subtle-dark">{filterNameTranslated}</Text>
    <Text className={`flex-1 text-right text-base text-font dark:text-font-dark`}>{valueTranslated}</Text>
  </View>
));

SpecificationRow.displayName = 'SpecificationRow';

export default function SimpleAutoInfoScreen() {
  const params = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const theme = useTheme() as CustomTheme;
  const { width } = useWindowDimensions();
  const [showAllSpecs, setShowAllSpecs] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFullScreen, setShowFullScreen] = useState(false);
  const [fullScreenImageIndex, setFullScreenImageIndex] = useState(0);

  const advertisementId = parseInt(params.id || '0');

  // Fetch advertisement data
  const {
    data: apiData,
    isLoading,
    error,
    refetch,
  } = useQuery<AdvertisementWithFiltersResponse>({
    queryKey: ['advertisement', advertisementId],
    queryFn: async () => {
      const api = new SimpleAutoApi(createAuthenticatedConfiguration());
      return await createAuthenticatedApiCall(async () => {
        return await api.getSimpleAutoAdvertisement({
          advertismentId: advertisementId,
          locale: 'ru',
        });
      });
    },
    enabled: advertisementId > 0,
  });

  const formattedPrice = useMemo(() => {
    if (!apiData) return '';
    const price = parseFloat(apiData.price);
    const currencySymbol = apiData.currency === 'usd' ? '$' : 'mdl';
    return `${price.toLocaleString('ru-RU')} ${currencySymbol}`;
  }, [apiData]);

  const { mainSpecs, additionalSpecs } = useMemo(() => {
    const params = apiData?.filterParameters || [];
    const main = params.slice(0, 7);
    const additional = params.slice(7);
    return { mainSpecs: main, additionalSpecs: additional };
  }, [apiData?.filterParameters]);

  const displaySpecs = showAllSpecs ? [...mainSpecs, ...additionalSpecs] : mainSpecs;
  const showHeaderInfo = scrollY > 200;

  const isFavorite = false; // TODO: get from store

  const handleToggleFavorite = (isFavorite: boolean) => {
    // TODO: Реализовать добавление/удаление из избранного
    console.log('Toggle favorite:', isFavorite);
  };

  // Мемоизированный обработчик скролла
  const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setScrollY(event.nativeEvent.contentOffset.y);
  }, []);

  // Обработчик скролла изображений
  const handleImageScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const slideSize = width;
      const index = Math.round(event.nativeEvent.contentOffset.x / slideSize);
      setCurrentImageIndex(index);
    },
    [width]
  );

  // Обработчик открытия полноэкранного режима
  const handleOpenFullScreen = useCallback((index: number) => {
    setFullScreenImageIndex(index);
    setShowFullScreen(true);
  }, []);

  // Обработчик закрытия полноэкранного режима
  const handleCloseFullScreen = useCallback(() => {
    setShowFullScreen(false);
  }, []);

  // Обработчик скролла изображений в полноэкранном режиме
  const handleFullScreenImageScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const slideSize = width;
      const index = Math.round(event.nativeEvent.contentOffset.x / slideSize);
      setFullScreenImageIndex(index);
    },
    [width]
  );

  // Обработчик обновления данных
  const handleRefresh = useCallback(async () => {
    await refetch();
  }, [refetch]);

  // Мемоизированный обработчик переключения избранного
  const handleToggleFavoriteMemo = useCallback(() => {
    handleToggleFavorite(!isFavorite);
  }, [isFavorite]);

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-background-page dark:bg-background-page-dark">
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </SafeAreaView>
    );
  }

  if (error || !apiData) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-background-page px-4 dark:bg-background-page-dark">
        <Text className="mb-4 text-center text-font dark:text-font-dark">{error ? 'Ошибка загрузки объявления' : 'Объявление не найдено'}</Text>
        <TouchableOpacity
          className="rounded-xl bg-background-success-bold px-6 py-3 dark:bg-background-success-bold-dark"
          onPress={() => router.back()}
        >
          <Text className="text-base font-medium text-white">Назад</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <>
      <SafeAreaView className="flex-1 bg-background-page dark:bg-background-page-dark">
        {/* Header */}
        <View className="flex-row items-center justify-between px-4 pb-3">
          <View className="flex-row items-center gap-3">
            <TouchableOpacity className="p-1 active:opacity-70" onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
            </TouchableOpacity>
          </View>

          <View className="flex-1 items-center justify-center px-2">
            {showHeaderInfo && (
              <View className="items-center">
                <Text className="text-sm font-semibold text-font dark:text-font-dark" numberOfLines={1}>
                  {apiData.brand} {apiData.model}, {apiData.releaseYear}
                </Text>
                <Text className="text-base font-bold text-font-dark">{formattedPrice}</Text>
              </View>
            )}
          </View>

          <View className="flex-row items-center gap-3">
            <TouchableOpacity className="p-1" onPress={handleToggleFavoriteMemo}>
              <Ionicons name={isFavorite ? 'heart' : 'heart-outline'} size={24} color={theme.colors.text} />
            </TouchableOpacity>
            <TouchableOpacity className="p-1">
              <Ionicons name="ellipsis-horizontal" size={24} color={theme.colors.text} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Main content */}
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} colors={[theme.colors.primary]} tintColor={theme.colors.primary} />
          }
        >
          {/* Images */}
          <View className="relative" style={{ height: 300 }}>
            {apiData.images && apiData.images.length > 0 ? (
              <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleImageScroll}
                scrollEventThrottle={16}
                className="flex-1"
              >
                {apiData.images.map((imageUri, index) => (
                  <CustomRectButton key={index} size="small" style={{ width }} onPress={() => handleOpenFullScreen(index)}>
                    <Image source={{ uri: DefaultConfig.basePath + imageUri }} className="h-full w-full" resizeMode="cover" />
                  </CustomRectButton>
                ))}
              </ScrollView>
            ) : (
              <View className="h-full w-full items-center justify-center bg-gray-200 dark:bg-gray-700">
                <Ionicons name="car-outline" size={64} color="#9CA3AF" />
              </View>
            )}

            {/* Pagination Dots */}
            {apiData.images && apiData.images.length > 1 && (
              <View className="absolute bottom-4 left-0 right-0 flex-row justify-center">
                <View className="flex-row gap-2 rounded-full bg-black/50 px-3 py-2">
                  {apiData.images.map((_, index) => (
                    <View key={index} className={`h-2 w-2 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'}`} />
                  ))}
                </View>
              </View>
            )}
          </View>

          {/* Title and Price */}
          <View className="p-4">
            <Text className="mb-2 text-xl font-semibold text-font dark:text-font-dark">
              {`${apiData.brand} ${apiData.model}, ${apiData.releaseYear}`}
            </Text>
            <Text className="mb-1 text-4xl font-bold text-font-brand dark:text-font-brand-dark">{formattedPrice}</Text>
            <Text className="text-sm text-font-subtlest dark:text-font-subtlest-dark">{apiData.region}</Text>
          </View>

          {/* Specifications */}
          {displaySpecs.length > 0 && (
            <View className="mx-4 mt-2 rounded-2xl bg-surface p-5 dark:bg-surface-dark">
              <Text className="mb-4 text-xl font-semibold text-font dark:text-font-dark">Характеристики</Text>

              <View className="gap-3">
                {displaySpecs.map((spec, index) => (
                  <SpecificationRow
                    key={`${spec.filterName}-${index}`}
                    filterNameTranslated={spec.filterNameTranslated}
                    valueTranslated={spec.valueTranslated}
                  />
                ))}
              </View>

              {!showAllSpecs && additionalSpecs.length > 0 && (
                <TouchableOpacity
                  className="pressed:bg-background-neutral-subtle-pressed mt-4 items-center rounded-xl bg-background-neutral-subtle py-3.5 active:opacity-80 dark:bg-background-neutral-subtle-dark"
                  onPress={() => setShowAllSpecs(true)}
                >
                  <Text className="text-base font-medium text-font dark:text-font-dark">Все характеристики</Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          <View className="h-24" />
        </ScrollView>
      </SafeAreaView>

      <View className="absolute bottom-0 left-0 right-0 flex-row gap-3 border-t border-border/10 bg-surface p-4 dark:border-border-dark/10 dark:bg-surface-dark">
        <TouchableOpacity
          className="flex-1 items-center justify-center rounded-2xl bg-background-success-bold py-4 active:opacity-80 dark:bg-background-success-bold-dark"
          onPress={() => console.log('call')}
        >
          <Text className="text-base font-semibold text-white">Позвонить</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="h-16 w-16 items-center justify-center rounded-2xl bg-background-success-bold active:opacity-80 dark:bg-background-success-bold-dark"
          onPress={() => console.log('chat')}
        >
          <Ionicons name="chatbubble-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Full Screen Image Modal */}
      <Modal visible={showFullScreen} transparent={false} animationType="fade" onRequestClose={handleCloseFullScreen}>
        <StatusBar hidden />
        <View className="flex-1 bg-black">
          {/* Close Button */}
          <TouchableOpacity className="absolute right-4 top-12 z-10 rounded-full bg-black/50 p-2" onPress={handleCloseFullScreen}>
            <Ionicons name="close" size={24} color="white" />
          </TouchableOpacity>

          {/* Full Screen Images */}
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleFullScreenImageScroll}
            scrollEventThrottle={16}
            className="flex-1"
          >
            {apiData.images?.map((imageUri, index) => (
              <View key={index} style={{ width }}>
                <Image source={{ uri: DefaultConfig.basePath + imageUri }} className="h-full w-full" resizeMode="contain" />
              </View>
            ))}
          </ScrollView>

          {/* Pagination Dots for Full Screen */}
          {apiData.images && apiData.images.length > 1 && (
            <View className="absolute bottom-8 left-0 right-0 flex-row justify-center">
              <View className="flex-row gap-2 rounded-full bg-black/50 px-3 py-2">
                {apiData.images.map((_, index) => (
                  <View key={index} className={`h-2 w-2 rounded-full ${index === fullScreenImageIndex ? 'bg-white' : 'bg-white/50'}`} />
                ))}
              </View>
            </View>
          )}
        </View>
      </Modal>
    </>
  );
}
