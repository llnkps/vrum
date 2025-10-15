import React from 'react';
import { View, Text, TouchableOpacity, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import {FavoriteItem} from "@/components/favorites/types";

type FavoriteCardProps = {
  item: FavoriteItem;
  onPress?: () => void;
  onToggleFavorite?: () => void;
};

export const CarCard = ({ item, onPress, onToggleFavorite }: FavoriteCardProps) => {
  return (
    <Pressable
      className="bg-surface dark:bg-surface-dark rounded-xl mb-4 overflow-hidden shadow-sm border border-border dark:border-border-dark"
      onPress={onPress}
      android_ripple={{ color: '#f3f4f6' }}
    >
      {/* Header */}
      <View className="flex-row justify-between items-start px-4 pt-4">
        <View className="flex-1 pr-3">
          <Text className="text-font dark:text-font-dark text-lg font-semibold leading-tight" numberOfLines={2}>
            {item.title}
          </Text>
          {item.subtitle && (
            <Text className="text-font-subtlest dark:text-font-subtlest-dark  text-sm mt-1" numberOfLines={1}>
              {item.subtitle}
            </Text>
          )}
        </View>

        <TouchableOpacity
          onPress={onToggleFavorite}
          className="p-2 -mr-2 -mt-2"
          activeOpacity={0.7}
        >
          <Ionicons name="star" size={22} color="#EF4444" />
        </TouchableOpacity>
      </View>

      {/* Price and Tag */}
      <View className="flex-row items-center px-4 mt-3">
        <Text className="text-font dark:text-font-dark text-xl font-bold mr-3">
          {item.price}
        </Text>
        {item.tag && (
          <View className="bg-background-warning dark:bg-background-warning-dark rounded-full px-3 py-1">
            <Text className="text-font-warning dark:text-font-warning-dark text-xs font-medium">
              {item.tag}
            </Text>
          </View>
        )}
      </View>

      {/* Images */}
      {item.images && item.images.length > 0 && (
        <View className="flex-row mt-4">
          {item.images.slice(0, 2).map((imageUri, index) => (
            <Image
              key={index}
              source={item.images}
              style={{
                height: 128,
                width: item.images!.length === 1 ? '100%' : '75%',
              }}
              contentFit="cover"
              transition={200}
            />
          ))}
          {item.images.length > 2 && (
            <View className="absolute bottom-2 right-2 bg-black/70 rounded-full px-2 py-1">
              <Text className="text-white text-xs font-medium">
                +{item.images.length - 2}
              </Text>
            </View>
          )}
        </View>
      )}

      {/* Description and Location */}
      <View className="px-4 py-4">
        {item.description && (
          <Text className="text-font-subtle dark:text-font-subtle-dark text-sm leading-5 mb-2" numberOfLines={2}>
            {item.description}
          </Text>
        )}
        {item.location && (
          <View className="flex-row items-center">
            <Ionicons name="location-outline" size={14} color="#9CA3AF" />
            <Text className="text-font-subtlest dark:text-font-subtlest-dark text-sm ml-1">
              {item.location}
            </Text>
          </View>
        )}
      </View>
    </Pressable>
  );
};