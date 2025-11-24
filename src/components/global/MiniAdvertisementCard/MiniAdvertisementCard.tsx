import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { memo } from 'react';
import { Image, Text, View } from 'react-native';
import { CustomRectButton } from '@/components/ui/button';
import { DefaultConfig } from '@/openapi/client/runtime';
import { CustomTheme } from '@/theme';

interface MiniAdvertisementCardProps {
  item: any;
  onPress: () => void;
}

const MiniAdvertisementCard = memo(({ item, onPress }: MiniAdvertisementCardProps) => {
  const theme = useTheme() as CustomTheme;

  return (
    <CustomRectButton onPress={onPress} size="small" accessibilityLabel={`Карточка объявления ${item.brand} ${item.model}`}>
      <View className="rounded-2xl p-2">
        {item.images && item.images.length > 0 ? (
          <Image
            source={{
              uri: DefaultConfig.basePath + '/' + item.images[0],
            }}
            style={{ width: '100%', height: 120, borderRadius: 8 }}
            contentFit="cover"
            // placeholder={require('@/assets/placeholder-car.png')}
          />
        ) : (
          <View
            className="flex items-center justify-center rounded-2xl "
            style={{ backgroundColor: theme.colors.backgroundNeutral, width: '100%', height: 120 }}
          >
            <Ionicons name="car-outline" size={40} color={theme.colors.icon} />
          </View>
        )}
        <Text className="mt-2" style={{ color: theme.colors.text }}>
          {item.brand} {item.model}, {item.releaseYear}
        </Text>
        <Text className="mt-1 font-bold" style={{ color: theme.colors.text }}>
          {item.price} {item.currency}
        </Text>
        {item.region && (
          <View className="mt-1 flex-row items-center">
            <Ionicons name="location-outline" size={14} color={theme.colors.icon} />
            <Text className="ml-1 text-xs" style={{ color: theme.colors.textSubtle }}>
              {item.region}
            </Text>
          </View>
        )}
      </View>
    </CustomRectButton>
  );
});

MiniAdvertisementCard.displayName = 'MiniAdvertisementCard';

export default MiniAdvertisementCard;
