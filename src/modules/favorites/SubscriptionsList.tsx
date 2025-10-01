import React, {useCallback} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View, Pressable, useColorScheme} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {SubscriptionItem} from "@/components/favorites/types";
import EmptyState from "@/components/favorites/EmptyState";


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
}) => {
  const scheme = useColorScheme();

  const editColor = scheme === "dark" ? "#96999E" : "#6B6E76"; // font.subtlest
  const deleteColor = scheme === "dark" ? "#F15B50" : "#E2483D"; // border.danger
  const notifyColor = scheme === "dark" ? "#669DF1" : "#1868DB"; // font.selected/brand

  return (
    <Pressable
      className="bg-surface dark:bg-surface-dark rounded-xl mb-4 overflow-hidden shadow-sm border border-border dark:border-border-dark"
      onPress={onPress}
      android_ripple={{color: '#f3f4f6'}}
    >
      <View className="flex-row items-center p-4">
        {/* Logo */}
        <View
          className="w-12 h-12 bg-background-neutral dark:bg-background-neutral-dark rounded-lg items-center justify-center mr-4">
          <Image
            source={{uri: item.logo}}
            className="w-8 h-8"
            resizeMode="contain"
          />
        </View>

        {/* Content */}
        <View className="flex-1">
          <Text className="text-font dark:text-font-dark font-semibold text-base leading-tight" numberOfLines={1}>
            {item.brand}
          </Text>
          <Text className="text-font-subtle dark:text-font-subtle-dark text-sm mt-1" numberOfLines={2}>
            {item.model}
          </Text>
          <Text className="text-font-subtlest dark:text-font-subtlest-dark text-xs mt-1">
            {item.info}
          </Text>

          {/* Статистика */}
          <View className="flex-row items-center mt-2">
            <View className="bg-background-success dark:bg-background-success-dark rounded-full px-3 py-1">
              <Text className="text-font dark:text-font-dark text-xs font-medium">
                {item.count}
              </Text>
            </View>
            <View
              className="bg-background-brand-subtlest dark:bg-background-brand-subtlest-dark rounded-full px-3 py-1 ml-2">
              <Text className="text-font-brand dark:text-font-brand-dark text-xs font-medium">
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
              <Ionicons name="pencil" size={18} color={editColor}/>
            </TouchableOpacity>
          )}

          {onDelete && (
            <TouchableOpacity
              onPress={onDelete}
              className="p-2 ml-1"
              activeOpacity={0.7}
            >
              <Ionicons name="trash-outline" size={18} color={deleteColor}/>
            </TouchableOpacity>
          )}

          <View className="ml-2">
            <Ionicons name="notifications" size={20} color={notifyColor}/>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const SubscriptionsList = ({
                             data,
                             onItemPress,
                             onDeleteSubscription,
                             onEditSubscription
                           }: SubscriptionsListProps) => {
  const renderItem = useCallback(({item}: { item: SubscriptionItem }) => (
    <SubscriptionCard
      item={item}
      onPress={() => onItemPress?.(item)}
      onDelete={() => onDeleteSubscription?.(item.id)}
      onEdit={() => onEditSubscription?.(item.id)}
    />
  ), [onItemPress, onDeleteSubscription, onEditSubscription]);

  const keyExtractor = useCallback((item: SubscriptionItem) => item.id, []);

  if (data.length === 0) {
    return <EmptyState type="subscriptions"/>;
  }

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{padding: 16}}
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