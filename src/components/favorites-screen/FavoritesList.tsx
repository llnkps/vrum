import React, { useCallback } from 'react';
import { FlatList } from 'react-native';
import {FavoriteItem} from "@/components/favorites-screen/types";
import {CarCard} from "@/components/CarCard";
import EmptyState from "@/components/favorites-screen/EmptyState";

type FavoritesListProps = {
  data: FavoriteItem[];
  onItemPress?: (item: FavoriteItem) => void;
  onToggleFavorite?: (id: string) => void;
  onSearchPress?: () => void;
};

const FavoritesList = ({
                         data,
                         onItemPress,
                         onToggleFavorite,
                         onSearchPress
                       }: FavoritesListProps) => {
  const renderItem = useCallback(({ item }: { item: FavoriteItem }) => (
    <CarCard
      item={item}
      onPress={() => onItemPress?.(item)}
      onToggleFavorite={() => onToggleFavorite?.(item.id)}
    />
  ), [onItemPress, onToggleFavorite]);

  const keyExtractor = useCallback((item: FavoriteItem) => item.id, []);

  if (data.length === 0) {
    return <EmptyState type="favorites" onActionPress={onSearchPress} />;
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
    />
  );
};

export default FavoritesList;