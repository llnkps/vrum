import { AdvertisementWithFiltersResponse } from '@/openapi/client';
import { CustomTheme } from '@/theme';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { memo, useEffect, useRef } from 'react';
import { Animated, Easing, Text, TouchableOpacity, View } from 'react-native';

interface HeaderProps {
  data: AdvertisementWithFiltersResponse;
  formattedPrice: string;
  scrollY: number;
  onToggleFavorite: () => void;
  onShare: () => void;
}

const HEADER_SCROLL_THRESHOLD = 380;

const Header = memo(({ data, formattedPrice, scrollY, onToggleFavorite, onShare }: HeaderProps) => {
  const theme = useTheme() as CustomTheme;
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const showHeaderInfo = scrollY > HEADER_SCROLL_THRESHOLD;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: showHeaderInfo ? 1 : 0,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [showHeaderInfo, fadeAnim]);

  return (
    <View className="flex-row items-center justify-between px-4 py-2">
      <TouchableOpacity className="p-1 active:opacity-70" onPress={() => router.back()} accessibilityLabel="Вернуться назад">
        <Ionicons name="arrow-back-outline" size={24} color={theme.colors.icon} />
      </TouchableOpacity>

      <Animated.View className="flex-1 items-center justify-center" style={{ opacity: fadeAnim }}>
        {showHeaderInfo && (
          <View className="items-center justify-center">
            <Text className="text-sm font-semibold" style={{ color: theme.colors.text, textAlign: 'center' }} numberOfLines={1}>
              {data.brand} {data.model}, {data.releaseYear}
            </Text>
            <Text className="text-base font-bold" style={{ color: theme.colors.text, textAlign: 'center' }}>
              {formattedPrice}
            </Text>
          </View>
        )}
      </Animated.View>

      <View className="flex-row items-center gap-2">
        <TouchableOpacity onPress={onToggleFavorite}>
          <Ionicons name="heart-outline" size={24} color={theme.colors.icon} accessibilityLabel="Добавить в избранное" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onShare}>
          <Ionicons name="share-outline" size={24} color={theme.colors.icon} accessibilityLabel="Поделиться объявлением" />
        </TouchableOpacity>
      </View>
    </View>
  );
});

Header.displayName = 'Header';

export default Header;
