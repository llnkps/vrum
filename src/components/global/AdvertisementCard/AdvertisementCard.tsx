import React, { FC, memo, useState } from 'react';
import { Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Image } from 'expo-image';

import {
  DefaultConfig,
  GetSimpleAutoCollectionPagination200ResponseItemsInner,
} from '@/openapi/client';
import { Ionicons } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';
import { CustomTheme } from '@/theme';
import { useTheme } from '@react-navigation/native';
// Optimized Image Item Component
const ImageItem: FC<{ imageUri: string }> = memo(({ imageUri }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <View
      style={{
        width: 192,
        height: 128,
        marginRight: 8,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#f3f4f6',
      }}
    >
      {isLoading && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f3f4f6',
            borderRadius: 8,
          }}
        >
          <Ionicons name="image-outline" size={24} color="#9CA3AF" />
        </View>
      )}
      <Image
        source={{
          uri: imageUri,
        }}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 8,
        }}
        contentFit="cover"
        cachePolicy="memory-disk"
        onLoad={() => setIsLoading(false)}
        onError={() => setIsLoading(false)}
      />
    </View>
  );
});

ImageItem.displayName = 'ImageItem';

type props = {
  item: GetSimpleAutoCollectionPagination200ResponseItemsInner;
  onPress: () => void;
  onToggleFavorite?: () => void;
  isFavorite?: boolean;
};

export const AdvertisementCard: FC<props> = memo(
  ({ item, onPress, onToggleFavorite, isFavorite = false }) => {

    const theme = useTheme() as CustomTheme;

    // Форматирование цены
    const getFormattedPrice = () => {
      if (!item.price) return 'Цена не указана';
      const price = parseFloat(item.price);
      const currencySymbol = item.currency === 'usd' ? '$' : 'mdl';
      return `${price.toLocaleString('ru-RU')} ${currencySymbol}`;
    };

    // Форматирование даты создания
    const getFormattedDate = () => {
      if (!item.createdAt) return '';
      const date = new Date(item.createdAt);
      return date.toLocaleDateString('ru-RU');
    };

    return (
      <RectButton
        style={{
          backgroundColor: theme.colors.card,
          borderRadius: 12,
          marginBottom: 16,
          overflow: 'hidden',
          shadowOpacity: 0.1,
          shadowRadius: 4,
          shadowOffset: { width: 0, height: 2 },
          borderWidth: 1,
        }}
        onPress={onPress}
        rippleColor={theme.colors.button.subtlePressed}
      >
        <View style={{ position: 'relative' }}>
          {/* Pressable area for the main content */}
          <View
            style={{
              paddingHorizontal: 16,
              paddingTop: 16,
              paddingBottom: 12,
            }}
          >
            {/* Title: Brand, Model, Year with Favorite Asterisk */}
            <View className="flex-row items-center justify-between">
              <Text
                className="flex-1 text-lg font-semibold leading-tight text-font dark:text-font-dark"
                numberOfLines={1}
              >
                {item.brand} {item.model}, {item.releaseYear}
              </Text>
              <RectButton
                onPress={() => {
                  onToggleFavorite?.();
                }}
                style={{ marginLeft: 8, padding: 4 }}
                rippleColor="transparent"
              >
                <Ionicons
                  name={isFavorite ? 'heart' : 'heart-outline'}
                  size={20}
                  color={isFavorite ? '#ef4444' : '#9CA3AF'}
                />
              </RectButton>
            </View>

            {/* Generation */}
            {/* {item.generation && (
            <View className="pt-1">
              <Text className="text-font-subtlest dark:text-font-subtlest-dark text-sm">{item.generation}</Text>
            </View>
          )} */}

            {/* Price */}
            <View className="pt-2">
              <Text className="text-xl font-bold text-font dark:text-font-dark">
                {getFormattedPrice()}
              </Text>
            </View>
          </View>

          {/* Images Horizontal FlashList - positioned within the card */}
          {item.images && item.images.length > 0 && (
            <View className="px-4 pb-3">
              <FlashList
                horizontal
                data={item.images.slice(0, 5)}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingRight: 16 }}
                renderItem={({ item: image, index }) => (
                  <ImageItem imageUri={DefaultConfig.basePath + image} />
                )}
              />
            </View>
          )}

          {/* Additional Parameters */}
          {/* {item.parameters && item.parameters.length > 0 && (
          <View className="px-4 pt-3">
            <View className="flex-row flex-wrap gap-2">
              {item.parameters.slice(0, 4).map((param, index) => (
                <View
                  key={index}
                  className={`px-2 py-1 rounded-full ${
                    param.highlighted ? "bg-primary dark:bg-primary-dark" : "bg-surface-2 dark:bg-surface-2-dark"
                  }`}
                >
                  <Text
                    className={`text-xs font-medium ${
                      param.highlighted ? "text-font-on-primary dark:text-font-on-primary-dark" : "text-font dark:text-font-dark"
                    }`}
                  >
                    {param.label}: {param.value}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )} */}

          {/* Region and Created Date */}
          <View className="flex-row items-center justify-between px-4 py-3">
            {item.region && (
              <View className="flex-row items-center">
                <Ionicons name="location-outline" size={14} color="#9CA3AF" />
                <Text className="ml-1 text-sm text-font-subtlest dark:text-font-subtlest-dark">
                  {item.region}
                </Text>
              </View>
            )}
            {item.createdAt && (
              <Text className="text-xs text-font-subtlest dark:text-font-subtlest-dark">
                {getFormattedDate()}
              </Text>
            )}
          </View>
        </View>
      </RectButton>
    );
  }
);

AdvertisementCard.displayName = 'AdvertisementCard';

// Export as CarCard for backward compatibility
export const CarCard = AdvertisementCard;
