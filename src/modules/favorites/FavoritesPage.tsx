import React, { useCallback } from 'react';
import { Text, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { LoaderIndicator } from '@/components/global/LoaderIndicator';
import { FavoriteItem } from '@/modules/favorites/types';
// import { useUserFavoritesApi, useDeleteUserFavoriteApi } from '@/hooks/api/useUserFavoritesApi';
// import { GetUserFavorites200ResponseItemsInner } from '@/openapi/client';
import { CarCard } from '@/components/global/AdvertisementCard/AdvertisementCard';
import EmptyState from './EmptyState';
import { useFavoritesStore } from '@/state/favorites/useFavoritesStore';

const FavoritesPage = () => {
  // const { data: favoritesResponse, isLoading: apiLoading, error: apiError } = useUserFavoritesApi();
  // const deleteFavoriteMutation = useDeleteUserFavoriteApi();

  const {
    favorites: localFavorites,
    isLoading: storeLoading,
    error: storeError,
    toggleFavorite,
    // syncWithApi,
    // setLoading,
    // setError,
  } = useFavoritesStore();

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

  const handleFavoriteItemPress = (item: FavoriteItem) => {
    console.log('Открыть объявление:', item.title);
  };

  const handleToggleFavorite = (item: FavoriteItem) => {
    // Update local store immediately for instant UI feedback
    toggleFavorite(item);

    // If online, also update API
    // if (!apiError) {
    //   deleteFavoriteMutation.mutate(parseInt(item.id));
    // }
  };

  const handleSearchPress = () => {
    console.log('Перейти к поиску объявлений');
  };

  const renderItem = useCallback(
    ({ item }: { item: FavoriteItem }) => {
      // Convert FavoriteItem to the format expected by CarCard
      const productData = {
        imageUri: item.images?.[0],
        name: item.title,
        brand: item.title.split(' ')[0] || '',
        model: item.title.split(' ').slice(1).join(' ') || '',
        price: item.price.replace(/\s/g, ''), // Remove spaces from price
        currency: item.price.includes('₽') ? 'rub' : 'usd',
        region: item.location || '',
        releaseYear: item.subtitle ? parseInt(item.subtitle.match(/(\d{4})/)?.[1] || '0') : 0,
      };

      return (
        <CarCard
          item={productData}
          onPress={() => handleFavoriteItemPress(item)}
          onToggleFavorite={() => handleToggleFavorite(item)}
          isFavorite={true} // Since we're in favorites page, all items are favorites
        />
      );
    },
    []
  );

  const keyExtractor = useCallback((item: FavoriteItem) => item.id, []);

  const isLoading = storeLoading;
  const error = storeError;

  if (isLoading && localFavorites.length === 0) {
    return <LoaderIndicator />;
  }

  if (error && localFavorites.length === 0) {
    return (
      <View className="flex-1 items-center justify-center px-4">
        <Text className="mb-4 text-center text-font dark:text-font-dark">
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
      <View className="flex-1 bg-background-page px-4 py-6 dark:bg-background-page-dark">
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
      className="bg-background-page dark:bg-background-page-dark"
    />
  );
};

export default FavoritesPage;