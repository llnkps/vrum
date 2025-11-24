import { ActivityIndicator, NativeScrollEvent, NativeSyntheticEvent, ScrollView, View, Image } from 'react-native';
import { CustomRectButton } from '../ui/button';
import { Ionicons } from '@expo/vector-icons';
import { AdvertisementWithFiltersResponse } from '@/openapi/client';
import { memo, useState } from 'react';
import { useTheme } from '@react-navigation/native';
import { CustomTheme } from '@/theme';
import { DefaultConfig } from '@/openapi/client/runtime';

interface ImageGalleryProps {
  data: AdvertisementWithFiltersResponse;
  width: number;
  currentImageIndex: number;
  onImageScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onOpenFullScreen: (index: number) => void;
}

const ImageGallery = memo(({ data, width, currentImageIndex, onImageScroll, onOpenFullScreen }: ImageGalleryProps) => {
  const theme = useTheme() as CustomTheme;
  const [loading, setLoading] = useState<Record<number, boolean>>({});

  return (
    <View className="relative px-4" style={{ height: 300 }}>
      {data.images && data.images.length > 0 ? (
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={onImageScroll}
          scrollEventThrottle={16}
          className="flex-1"
        >
          {data.images.map((imageUri, index) => (
            <CustomRectButton
              key={index}
              size="small"
              style={{ width }}
              onPress={() => onOpenFullScreen(index)}
              accessibilityLabel={`Открыть изображение ${index + 1} в полноэкранном режиме`}
            >
              {loading[index] && (
                <View className="absolute inset-0 items-center justify-center">
                  <ActivityIndicator size="large" color={theme.colors.primary} />
                </View>
              )}
              <Image
                source={{ uri: DefaultConfig.basePath + imageUri }}
                className="h-full w-full"
                resizeMode="cover"
                onLoadStart={() => setLoading(prev => ({ ...prev, [index]: true }))}
                onLoadEnd={() => setLoading(prev => ({ ...prev, [index]: false }))}
                accessibilityLabel={`Изображение автомобиля ${index + 1}`}
              />
            </CustomRectButton>
          ))}
        </ScrollView>
      ) : (
        <View className="h-full w-full items-center justify-center rounded-2xl" style={{ backgroundColor: theme.colors.backgroundNeutral }}>
          <Ionicons name="car-outline" size={64} color={theme.colors.icon} />
        </View>
      )}

      {/* Pagination Dots */}
      {data.images && data.images.length > 1 && (
        <View className="absolute bottom-4 left-0 right-0 flex-row justify-center">
          <View className="flex-row gap-2 rounded-full bg-black/50 px-3 py-2">
            {data.images.map((_, index) => (
              <View key={index} className={`h-2 w-2 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'}`} />
            ))}
          </View>
        </View>
      )}
    </View>
  );
});

ImageGallery.displayName = 'ImageGallery';

export default ImageGallery;
