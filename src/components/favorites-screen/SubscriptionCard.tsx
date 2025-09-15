import React from 'react';
import { View, Text, TouchableOpacity, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import type { SubscriptionItem } from './types';

type SubscriptionCardProps = {
  item: SubscriptionItem;
  onPress?: () => void;
  onToggle?: () => void;
};

export const SubscriptionCard = ({ item, onPress, onToggle }: SubscriptionCardProps) => {
  return (
    <Pressable
      className="flex-row items-center bg-white rounded-xl p-4 mb-3 shadow-sm border border-gray-100"
      onPress={onPress}
      android_ripple={{ color: '#f3f4f6' }}
    >
      {/* Brand Logo */}
      <View className="w-12 h-12 bg-gray-100 rounded-lg items-center justify-center mr-4">
        <Image
          source={{ uri: item.logo }}
          className="w-8 h-8"
          contentFit="contain"
          transition={200}
        />
      </View>

      {/* Content */}
      <View className="flex-1">
        <Text className="text-gray-900 font-semibold text-base leading-tight" numberOfLines={1}>
          {item.brand}
        </Text>
        <Text className="text-gray-700 text-sm mt-1" numberOfLines={1}>
          {item.model}
        </Text>
        <Text className="text-gray-500 text-xs mt-1">
          {item.info}
        </Text>
        <View className="flex-row items-center mt-2">
          <View className="bg-green-100 rounded-full px-2 py-1">
            <Text className="text-green-700 text-xs font-medium">
              {item.count}
            </Text>
          </View>
        </View>
      </View>

      {/* Toggle Button */}
      <TouchableOpacity
        onPress={onToggle}
        className="p-2 -mr-2"
        activeOpacity={0.7}
      >
        <Ionicons name="notifications" size={20} color="#3B82F6" />
      </TouchableOpacity>
    </Pressable>
  );
};