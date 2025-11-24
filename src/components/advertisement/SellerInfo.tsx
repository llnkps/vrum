import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { memo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { CustomTheme } from '@/theme';

interface SellerInfoProps {
  sellerName: string;
  sellerType: string;
  region?: string;
  onSellerPress: () => void;
  onLocationPress: () => void;
}

const SellerInfo = memo(
  ({ sellerName = 'Не указано', sellerType = 'Частное лицо', region = 'Не указано', onSellerPress, onLocationPress }: SellerInfoProps) => {
    const theme = useTheme() as CustomTheme;
    return (
      <View className="mt-2 rounded-2xl p-4" style={{ backgroundColor: theme.colors.backgroundNeutral }}>
        <TouchableOpacity
          onPress={onSellerPress}
          className="flex-row items-center justify-between"
          accessibilityLabel={`Информация о продавце: ${sellerType}`}
        >
          <View>
            <Text className="mb-3 text-xl font-bold" style={{ color: theme.colors.text }}>
              {sellerName}
            </Text>
            <Text style={{ color: theme.colors.textSubtle }}>{sellerType}</Text>
          </View>
          <View>
            <Ionicons name="person-circle-outline" size={36} color={theme.colors.icon} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={onLocationPress} className="mt-6 flex-row items-center justify-between">
          <Text className="font-medium" style={{ color: theme.colors.text }} accessibilityLabel={`Локация: ${region}`}>
            {region}
          </Text>
          <View className="mr-1">
            <Ionicons name="location-outline" size={16} color={theme.colors.icon} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
);

SellerInfo.displayName = 'SellerInfo';

export default SellerInfo;
