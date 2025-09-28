import { CarCard } from "@/components/CarCard";
import EmptyState from "@/components/favorites/EmptyState";
import { Button } from "@/components/ui/button";
import { mockFavoritesData } from "@/data/mockData";
import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FavoriteScreen() {
  const router = useRouter();

  const [favoritesData, setFavoritesData] = useState(mockFavoritesData);

  const handleFavoriteItemPress = (item) => {
    console.log("Открыть объявление:", item.title);
  };

  const handleToggleFavorite = (id: string) => {
    setFavoritesData((prev) => prev.filter((item) => item.id !== id));
    console.log("Удалить из избранного:", id);
  };

  const keyExtractor = useCallback((item) => item.id, []);

  if (favoritesData.length === 0) {
    return <EmptyState type="favorites" />;
  }

  return (
    <SafeAreaView className="flex-1 bg-background-page dark:bg-background-page-dark">
      <View className="flex-1">
        {/* Title */}
        <View className="px-4 pt-5 pb-6">
          <Text className="text-font dark:text-font-dark text-2xl font-bold">
            Избранное
          </Text>
        </View>

        {/* Tabs */}
        <View className="flex-row justify-between bg-surface dark:bg-surface-dark rounded-lg">
          <Button
            useNativePressable
            appearance="subtle"
            title="Избранное"
            isSelected={true}
          />
          <Button
            useNativePressable
            appearance="subtle"
            title="Подписки"
            isSelected={false}
            onPress={() => router.push("/(app)/(tabs)/favorites/subscription")}
          />
        </View>

        {/* Main content */}
        <View className="flex-1">
          <FlatList
            data={favoritesData}
            renderItem={(item) => {
              return (
                <CarCard
                  item={item}
                  // onPress={() => onItemPress?.(item)}
                  // onToggleFavorite={() => onToggleFavorite?.(item.id)}
                />
              );
            }}
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
        </View>
      </View>
    </SafeAreaView>
  );
}
