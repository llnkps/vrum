import React, { useCallback } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {SubscriptionItem} from "@/components/favorites-screen/types";
import EmptyState from "@/components/favorites-screen/EmptyState";


type SubscriptionsListProps = {
  data: SubscriptionItem[];
  onItemPress?: (item: SubscriptionItem) => void;
  onDeleteSubscription?: (id: string) => void;
  onEditSubscription?: (id: string) => void;
};


// Карточка подписки
const SubscriptionCard = ({
                            item,
                            onPress,
                            onDelete,
                            onEdit
                          }: {
  item: SubscriptionItem;
  onPress?: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
}) => (
  <Pressable
    className="bg-white rounded-xl mb-4 overflow-hidden shadow-sm border border-gray-100"
    onPress={onPress}
    android_ripple={{ color: '#f3f4f6' }}
  >
    <View className="flex-row items-center p-4">
      {/* Logo */}
      <View className="w-12 h-12 bg-gray-100 rounded-lg items-center justify-center mr-4">
        <Image
          source={{ uri: item.logo }}
          className="w-8 h-8"
          resizeMode="contain"
        />
      </View>

      {/* Content */}
      <View className="flex-1">
        <Text className="text-gray-900 font-semibold text-base leading-tight" numberOfLines={1}>
          {item.brand}
        </Text>
        <Text className="text-gray-700 text-sm mt-1" numberOfLines={2}>
          {item.model}
        </Text>
        <Text className="text-gray-500 text-xs mt-1">
          {item.info}
        </Text>

        {/* Статистика */}
        <View className="flex-row items-center mt-2">
          <View className="bg-green-100 rounded-full px-3 py-1">
            <Text className="text-green-700 text-xs font-medium">
              {item.count}
            </Text>
          </View>
          <View className="bg-blue-100 rounded-full px-3 py-1 ml-2">
            <Text className="text-blue-700 text-xs font-medium">
              Активна
            </Text>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View className="flex-row items-center">
        {onEdit && (
          <TouchableOpacity
            onPress={onEdit}
            className="p-2"
            activeOpacity={0.7}
          >
            <Ionicons name="pencil" size={18} color="#6B7280" />
          </TouchableOpacity>
        )}

        {onDelete && (
          <TouchableOpacity
            onPress={onDelete}
            className="p-2 ml-1"
            activeOpacity={0.7}
          >
            <Ionicons name="trash-outline" size={18} color="#EF4444" />
          </TouchableOpacity>
        )}

        <View className="ml-2">
          <Ionicons name="notifications" size={20} color="#3B82F6" />
        </View>
      </View>
    </View>
  </Pressable>
);

const SubscriptionsList = ({
                             data,
                             onItemPress,
                             onDeleteSubscription,
                             onEditSubscription
                           }: SubscriptionsListProps) => {
  const renderItem = useCallback(({ item }: { item: SubscriptionItem }) => (
    <SubscriptionCard
      item={item}
      onPress={() => onItemPress?.(item)}
      onDelete={() => onDeleteSubscription?.(item.id)}
      onEdit={() => onEditSubscription?.(item.id)}
    />
  ), [onItemPress, onDeleteSubscription, onEditSubscription]);

  const keyExtractor = useCallback((item: SubscriptionItem) => item.id, []);

  if (data.length === 0) {
    return <EmptyState type="subscriptions" />;
  }

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ padding: 16 }}
      removeClippedSubviews={true}
      maxToRenderPerBatch={8}
      windowSize={8}
      initialNumToRender={4}
      getItemLayout={(_, index) => ({
        length: 120, // Обновленная высота карточки
        offset: 120 * index,
        index,
      })}
    />
  );
};

export default SubscriptionsList;