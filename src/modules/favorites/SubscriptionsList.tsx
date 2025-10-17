import React, { useCallback } from 'react';
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  Pressable,
  useColorScheme,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SubscriptionItem } from './types';
import EmptyState from './EmptyState';

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
  onEdit,
}: {
  item: SubscriptionItem;
  onPress?: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
}) => {
  const scheme = useColorScheme();

  const editColor = scheme === 'dark' ? '#96999E' : '#6B6E76'; // font.subtlest
  const deleteColor = scheme === 'dark' ? '#F15B50' : '#E2483D'; // border.danger
  const notifyColor = scheme === 'dark' ? '#669DF1' : '#1868DB'; // font.selected/brand

  return (
    <Pressable
      className="mb-4 overflow-hidden rounded-xl border border-border bg-surface shadow-sm dark:border-border-dark dark:bg-surface-dark"
      onPress={onPress}
      android_ripple={{ color: '#f3f4f6' }}
    >
      <View className="flex-row items-center p-4">
        {/* Logo */}
        <View className="mr-4 h-12 w-12 items-center justify-center rounded-lg bg-background-neutral dark:bg-background-neutral-dark">
          <Image source={{ uri: item.logo }} className="h-8 w-8" resizeMode="contain" />
        </View>

        {/* Content */}
        <View className="flex-1">
          <Text
            className="text-base font-semibold leading-tight text-font dark:text-font-dark"
            numberOfLines={1}
          >
            {item.brand}
          </Text>
          <Text
            className="mt-1 text-sm text-font-subtle dark:text-font-subtle-dark"
            numberOfLines={2}
          >
            {item.model}
          </Text>
          <Text className="mt-1 text-xs text-font-subtlest dark:text-font-subtlest-dark">
            {item.info}
          </Text>

          {/* Статистика */}
          <View className="mt-2 flex-row items-center">
            <View className="rounded-full bg-background-success px-3 py-1 dark:bg-background-success-dark">
              <Text className="text-xs font-medium text-font dark:text-font-dark">
                {item.count}
              </Text>
            </View>
            <View className="ml-2 rounded-full bg-background-brand-subtlest px-3 py-1 dark:bg-background-brand-subtlest-dark">
              <Text className="text-xs font-medium text-font-brand dark:text-font-brand-dark">
                Активна
              </Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="flex-row items-center">
          {onEdit && (
            <TouchableOpacity onPress={onEdit} className="p-2" activeOpacity={0.7}>
              <Ionicons name="pencil" size={18} color={editColor} />
            </TouchableOpacity>
          )}

          {onDelete && (
            <TouchableOpacity onPress={onDelete} className="ml-1 p-2" activeOpacity={0.7}>
              <Ionicons name="trash-outline" size={18} color={deleteColor} />
            </TouchableOpacity>
          )}

          <View className="ml-2">
            <Ionicons name="notifications" size={20} color={notifyColor} />
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const SubscriptionsList = ({
  data,
  onItemPress,
  onDeleteSubscription,
  onEditSubscription,
}: SubscriptionsListProps) => {
  const renderItem = useCallback(
    ({ item }: { item: SubscriptionItem }) => (
      <SubscriptionCard
        item={item}
        onPress={() => onItemPress?.(item)}
        onDelete={() => onDeleteSubscription?.(item.id)}
        onEdit={() => onEditSubscription?.(item.id)}
      />
    ),
    [onItemPress, onDeleteSubscription, onEditSubscription]
  );

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
