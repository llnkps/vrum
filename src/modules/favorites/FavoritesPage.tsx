import { LoaderIndicator } from '@/components/global/LoaderIndicator';
import { FlashList } from '@shopify/flash-list';
import React, { useCallback, useMemo, useRef } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
// import { useUserFavoritesApi, useDeleteUserFavoriteApi } from '@/hooks/api/useUserFavoritesApi';
// import { GetUserFavorites200ResponseItemsInner } from '@/openapi/client';
import { AdvertisementCard } from '@/components/global/AdvertisementCard/AdvertisementCard';
import { useFavoritesStore } from '@/state/favorites/useFavoritesStore';
import EmptyState from './EmptyState';
import { AdvertisementItemResponse } from '@/openapi/client/models/SimpleAutoAdvertisement';
import { useTheme } from '@react-navigation/native';
import { CustomTheme } from '@/theme';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import CustomBottomSheetModal from '@/components/global/CustomBottomSheetModal';

const FavoritesPage = () => {
  // const { data: favoritesResponse, isLoading: apiLoading, error: apiError } = useUserFavoritesApi();
  // const deleteFavoriteMutation = useDeleteUserFavoriteApi();

  const {
    favorites: localFavorites,
    sortMethod,
    setSortMethod,
    isLoading: storeLoading,
    error: storeError,
    // toggleFavorite,
    // syncWithApi,
    // setLoading,
    // setError,
  } = useFavoritesStore();

  const theme = useTheme() as CustomTheme;
  const tabBarHeight = useBottomTabBarHeight();

  const bottomSheetRef = useRef<any>(null);

  const dataToUse = localFavorites;

  const sortedData = useMemo(() => {
    const sorted = [...dataToUse];
    switch (sortMethod) {
      case 'Актульности':
        // Сортировка по updatedAt (новые сначала)
        sorted.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
        break;
      case 'Дате размещения':
        // Сортировка по createdAt (новые сначала)
        sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'Возрастанию цены':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'Убыванию цены':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'Году выпуска: новее':
        sorted.sort((a, b) => b.releaseYear - a.releaseYear);
        break;
      case 'Году выпуска: старее':
        sorted.sort((a, b) => a.releaseYear - b.releaseYear);
        break;
      case 'Пробегу':
        sorted.sort((a, b) => a.mileage - b.mileage);
        break;
      case 'Названию':
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'Отличной цене':
        // TODO: Implement special price sorting logic
        break;
      case 'Большему объему двигателя':
        sorted.sort((a, b) => (b.engineVolume || 0) - (a.engineVolume || 0));
        break;
      default:
        break;
    }
    return sorted;
  }, [dataToUse, sortMethod]);

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

  const handleSortChange = (method: string) => {
    setSortMethod(method);
    bottomSheetRef.current?.dismiss();
  };

  const sortMethods = [
    'Актульности',
    'Дате размещения',
    'Возрастанию цены',
    'Убыванию цены',
    'Году выпуска: новее',
    'Году выпуска: старее',
    'Пробегу',
    'Названию',
    'Отличной цене',
    'Большему объему двигателя',
  ];

  if (isLoading && dataToUse.length === 0) {
    return <LoaderIndicator />;
  }

  if (error && dataToUse.length === 0) {
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

  const emptyState = () => <EmptyState type="favorites" onActionPress={() => console.log('Navigate to search page')} />;

  return (
    <>
      <View style={{ flex: 1 }}>
        {sortedData.length > 0 && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 24,
              paddingTop: 16,
              paddingBottom: 12,
            }}
          >
            <Text style={{ fontSize: 16, color: theme.colors.text }}>Избранное ({sortedData.length})</Text>
            <TouchableOpacity onPress={() => bottomSheetRef.current?.present()}>
              <Ionicons name="funnel-outline" size={24} color={theme.colors.icon} />
            </TouchableOpacity>
          </View>
        )}
        <FlashList
          data={sortedData}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ListEmptyComponent={emptyState}
          scrollEnabled={sortedData && sortedData.length > 0}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: tabBarHeight, flexGrow: dataToUse && dataToUse.length === 0 ? 1 : 0 }}
        />
      </View>

      <CustomBottomSheetModal ref={bottomSheetRef} initialIndex={2} title="Сортировка по">
        <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
          {sortMethods.map(method => (
            <TouchableOpacity
              key={method}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 12,
                borderBottomWidth: 1,
                borderBottomColor: theme.colors.border,
              }}
              onPress={() => handleSortChange(method)}
            >
              <Text style={{ flex: 1, fontSize: 16, color: theme.colors.text }}>{method}</Text>
              {sortMethod === method && <Ionicons name="checkmark" size={24} color={theme.colors.icon} />}
            </TouchableOpacity>
          ))}
        </View>
      </CustomBottomSheetModal>
    </>
  );
};

export default FavoritesPage;
