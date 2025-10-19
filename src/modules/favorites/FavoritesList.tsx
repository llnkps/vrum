import React, { useCallback } from 'react';
import { FlatList, View } from 'react-native';

import { CarCard } from '@/components/global/AdvertisementCard/AdvertisementCard';
import { FavoriteItem } from './types';
import EmptyState from './EmptyState';

interface ProductData {
  imageUri?: string;
  name?: string;
  description?: string;
  brand: string;
  model: string;
  price: string;
  currency: string;
  region: string;
  releaseYear: number;
  parameters?: { label: string; value: string; highlighted?: boolean }[];
}

const convertFavoriteToProduct = (item: FavoriteItem): ProductData => {
  // Разбираем title на brand и model
  const [brand, ...modelParts] = item.title.split(' ');
  const model = modelParts.join(' ');

  // Извлекаем год из subtitle
  const yearMatch = item.subtitle?.match(/(\d{4})\s*г/);
  const releaseYear = yearMatch ? parseInt(yearMatch[1]) : new Date().getFullYear();

  // Определяем валюту (простая логика)
  const currency = item.price.includes('$') ? 'usd' : 'rub';

  // Очищаем цену от символов
  const cleanPrice = item.price.replace(/[^\d]/g, '');

  return {
    imageUri: item.images?.[0],
    name: item.title,
    description: item.description,
    brand,
    model,
    price: cleanPrice,
    currency,
    region: item.location || '',
    releaseYear,
  };
};

type FavoritesListProps = {
  data: FavoriteItem[];
  onItemPress?: (item: FavoriteItem) => void;
  onToggleFavorite?: (id: string) => void;
  onSearchPress?: () => void;
};

const FavoritesList = ({ data, onItemPress, onToggleFavorite, onSearchPress }: FavoritesListProps) => {
  const renderItem = useCallback(
    ({ item }: { item: FavoriteItem }) => {
      const productData = convertFavoriteToProduct(item);
      return <CarCard item={productData} onPress={() => onItemPress?.(item)} onToggleFavorite={() => onToggleFavorite?.(item.id)} />;
    },
    [onItemPress, onToggleFavorite]
  );

  const keyExtractor = useCallback((item: FavoriteItem) => item.id, []);

  if (data.length === 0) {
    return (
      <View className="flex-1 bg-background-page px-4 py-6 dark:bg-background-page-dark">
        <EmptyState type="favorites" onActionPress={onSearchPress} />
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ padding: 16 }}
      removeClippedSubviews={true}
      maxToRenderPerBatch={10}
      windowSize={10}
      initialNumToRender={5}
      getItemLayout={(_, index) => ({
        length: 200, // Примерная высота карточки
        offset: 200 * index,
        index,
      })}
      // фон списка + поддержка dark
      className="bg-background-page dark:bg-background-page-dark"
    />
  );
};

export default FavoritesList;
