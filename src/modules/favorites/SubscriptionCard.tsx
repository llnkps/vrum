import { UserSubscriptionFilter } from '@/openapi/client';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, Text, TouchableOpacity, useColorScheme, View } from 'react-native';

interface SubscriptionCardProps {
  item: UserSubscriptionFilter;
  onPress?: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
}

const SubscriptionCard = ({ item, onPress, onDelete, onEdit }: SubscriptionCardProps) => {
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
        {/* Content */}
        <View className="flex-1">
          <Text className="text-base font-semibold leading-tight text-font dark:text-font-dark" numberOfLines={1}>
            {item.name}
          </Text>
          <Text className="mt-1 text-sm text-font-subtle dark:text-font-subtle-dark">
            {item.filters.length} active filters
          </Text>

          {/* Filter Summary - item.filters is an object: { [slug]: string[] } */}
          <View className="mt-2 flex-row flex-wrap">
            {Object.entries(item.filters || {})
              .map(([slug, values]) => ({ slug, values }))
              .slice(0, 3)
              .map((filter) => (
                <View key={filter.slug} className="mr-2 mb-1 rounded-full bg-background-neutral px-2 py-1 dark:bg-background-neutral-dark">
                  <Text className="text-xs text-font dark:text-font-dark">
                    {filter.slug}
                  </Text>
                </View>
              ))}

            {Object.keys(item.filters || {}).length > 3 && (
              <View className="rounded-full bg-background-neutral px-2 py-1 dark:bg-background-neutral-dark">
                <Text className="text-xs text-font dark:text-font-dark">+{Object.keys(item.filters || {}).length - 3} more</Text>
              </View>
            )}
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

export default SubscriptionCard;
