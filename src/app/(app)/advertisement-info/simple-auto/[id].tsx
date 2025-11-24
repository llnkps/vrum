import React, { useCallback, useMemo, useState } from 'react'; // React импорты
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native'; // Native импорты
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { createAuthenticatedApiCall } from '@/openapi/auth-utils';
import { SimpleAutoApi } from '@/openapi/client/apis/SimpleAutoApi';
import { AdvertisementWithFiltersResponse } from '@/openapi/client/models/AdvertisementWithFiltersResponse';
import { createAuthenticatedConfiguration } from '@/openapi/configurations';
import { CustomTheme } from '@/theme';
import { formatPrice } from '@/utils/formatPrice';
import ContactButtons from '@/components/advertisement/ContactButtons';
import Description from '@/components/advertisement/Description';
import FullScreenModal from '@/components/advertisement/FullScreenModal';
import Header from '@/components/advertisement/Header';
import ImageGallery from '@/components/advertisement/ImageGallery';
import Recommendations from '@/components/advertisement/Recommendations';
import SellerInfo from '@/components/advertisement/SellerInfo';
import Specifications from '@/components/advertisement/Specifications';
import TitleAndPrice from '@/components/advertisement/TitleAndPrice';

export default function SimpleAutoInfoScreen() {
  const params = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const theme = useTheme() as CustomTheme;
  const { width } = useWindowDimensions();
  const [scrollY, setScrollY] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFullScreen, setShowFullScreen] = useState(false);
  const [fullScreenImageIndex, setFullScreenImageIndex] = useState(0);

  const advertisementId = parseInt(params.id || '0');

  const { data, isLoading, error, refetch } = useQuery<AdvertisementWithFiltersResponse>({
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

  const formattedPrice = useMemo(() => formatPrice(data?.price || '0', data?.currency || 'usd'), [data]);

  const displaySpecs = useMemo(() => data?.filterParameters || [], [data?.filterParameters]);

  const isFavorite = false; // TODO: get from store

  const handleToggleFavorite = (isFavorite: boolean) => {
    // TODO: Реализовать добавление/удаление из избранного
    console.log('Toggle favorite:', isFavorite);
  };

  const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setScrollY(event.nativeEvent.contentOffset.y);
  }, []);

  const handleImageScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const slideSize = width;
      const index = Math.round(event.nativeEvent.contentOffset.x / slideSize);
      setCurrentImageIndex(index);
    },
    [width]
  );

  const handleOpenFullScreen = useCallback((index: number) => {
    setFullScreenImageIndex(index);
    setShowFullScreen(true);
  }, []);

  const handleCloseFullScreen = useCallback(() => {
    setShowFullScreen(false);
  }, []);

  const handleFullScreenImageScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const slideSize = width;
      const index = Math.round(event.nativeEvent.contentOffset.x / slideSize);
      setFullScreenImageIndex(index);
    },
    [width]
  );

  const handleRefresh = useCallback(async () => {
    await refetch();
  }, [refetch]);

  const handleToggleFavoriteMemo = useCallback(() => {
    handleToggleFavorite(!isFavorite);
  }, [isFavorite]);

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center" style={{ backgroundColor: theme.colors.background }}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </SafeAreaView>
    );
  }

  if (error || !data) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center px-4" style={{ backgroundColor: theme.colors.background }}>
        <Text className="mb-4 text-center" style={{ color: theme.colors.text }}>
          {error ? 'Ошибка загрузки объявления' : 'Объявление не найдено'}
        </Text>
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
      <SafeAreaView className="flex-1" style={{ backgroundColor: theme.colors.background }}>
        {/* Header */}
        <Header
          data={data}
          formattedPrice={formattedPrice}
          scrollY={scrollY}
          onToggleFavorite={handleToggleFavoriteMemo}
          onShare={() => console.log('share')}
        />

        {/* Main content */}
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          contentContainerStyle={{ paddingBottom: 100 }}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} colors={[theme.colors.primary]} tintColor={theme.colors.primary} />
          }
        >
          {/* Images */}
          <ImageGallery
            data={data}
            width={width}
            currentImageIndex={currentImageIndex}
            onImageScroll={handleImageScroll}
            onOpenFullScreen={handleOpenFullScreen}
          />

          {/* Title and Price */}
          <TitleAndPrice data={data} formattedPrice={formattedPrice} />

          {/* Specifications */}
          <Specifications displaySpecs={displaySpecs} advertisementId={advertisementId} />

          {/* Description */}
          {data.description && <Description description={data.description} />}

          {/* Seller info */}
          <SellerInfo
            sellerName="Администратор"
            sellerType="Частное лицо"
            onSellerPress={() => console.log('sellerInfo')}
            onLocationPress={() => console.log('location')}
          />

          {/* Recommendations */}
          <Recommendations />
        </ScrollView>
      </SafeAreaView>

      {/* Contact Buttons */}
      <ContactButtons />

      {/* Full Screen Image Modal */}
      <FullScreenModal
        showFullScreen={showFullScreen}
        onClose={handleCloseFullScreen}
        data={data}
        width={width}
        fullScreenImageIndex={fullScreenImageIndex}
        onImageScroll={handleFullScreenImageScroll}
      />
    </>
  );
}
