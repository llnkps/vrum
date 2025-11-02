import { LoaderIndicator } from '@/components/global/LoaderIndicator';
import { FlashList } from '@shopify/flash-list';
import React, { useCallback } from 'react';
import { Text, View } from 'react-native';
// import { useUserFavoritesApi, useDeleteUserFavoriteApi } from '@/hooks/api/useUserFavoritesApi';
// import { GetUserFavorites200ResponseItemsInner } from '@/openapi/client';
import { AdvertisementCard } from '@/components/global/AdvertisementCard/AdvertisementCard';
import { useFavoritesStore } from '@/state/favorites/useFavoritesStore';
import EmptyState from './EmptyState';
import { AdvertisementItemResponse } from '@/openapi/client/models/SimpleAutoAdvertisement';
import { useTheme } from '@react-navigation/native';
import { CustomTheme } from '@/theme';

const FavoritesPage = () => {
  // const { data: favoritesResponse, isLoading: apiLoading, error: apiError } = useUserFavoritesApi();
  // const deleteFavoriteMutation = useDeleteUserFavoriteApi();

  const {
    favorites: localFavorites,
    isLoading: storeLoading,
    error: storeError,
    // toggleFavorite,
    // syncWithApi,
    // setLoading,
    // setError,
  } = useFavoritesStore();

  const theme = useTheme() as CustomTheme;

  // Sync with API when data is available
  // useEffect(() => {
  //   if (favoritesResponse?.items && !apiLoading) {
  //     const apiFavorites: FavoriteItem[] = favoritesResponse.items.map((item: GetUserFavorites200ResponseItemsInner) => ({
  //       id: item.id?.toString() || '',
  //       title: `${item.brand} ${item.model}`,
  //       subtitle: item.releaseYear ? `${item.releaseYear} г.` : '',
  //       price: item.price ? `${item.price} ${item.currency?.toUpperCase()}` : '',
  //       location: item.region || '',
  //       images: item.images || [],
  //     }));

  //     syncWithApi(apiFavorites);
  //     setLoading(false);
  //     setError(null);
  //   }
  // }, [favoritesResponse, apiLoading, syncWithApi, setLoading, setError]);

  // Handle API errors
  // useEffect(() => {
  //   if (apiError) {
  //     setError(apiError.message);
  //     setLoading(false);
  //   }
  // }, [apiError, setError, setLoading]);

  const handleSearchPress = () => {
    console.log('Перейти к поиску объявлений');
  };

  const renderItem = useCallback(({ item }: { item: AdvertisementItemResponse }) => {
    return (
      <AdvertisementCard
        item={item}
        onPress={() => console.log('PRESS')}
        isFavorite={true} // Since we're in favorites page, all items are favorites
      />
    );
  }, []);

  const keyExtractor = useCallback((item: AdvertisementItemResponse) => item.id.toString(), []);

  const isLoading = storeLoading;
  const error = storeError;

  if (isLoading && localFavorites.length === 0) {
    return <LoaderIndicator />;
  }

  if (error && localFavorites.length === 0) {
    return (
      <View className="flex-1 items-center justify-center px-4">
        <Text className="mb-4 text-center" style={{ color: theme.colors.text }}>
          {typeof error === 'string' ? error : 'Unknown error'}
        </Text>
        <Text
          className="text-font-brand dark:text-font-brand-dark"
          onPress={() => {
            // TODO: Повторная загрузка
          }}
        >
          Попробовать снова
        </Text>
      </View>
    );
  }

  if (localFavorites.length === 0) {
    return (
      <View className="flex-1 px-4 py-6">
        <EmptyState type="favorites" onActionPress={handleSearchPress} />
      </View>
    );
  }

  return (
    <FlashList
      data={localFavorites}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ padding: 16 }}
    />
  );
};

export default FavoritesPage;
