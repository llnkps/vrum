import { AdvertisementWithFiltersResponse } from '@/openapi/client';
import { CustomTheme } from '@/theme';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { memo } from 'react';
import { Text, View } from 'react-native';

interface TitleAndPriceProps {
  data: AdvertisementWithFiltersResponse;
  formattedPrice: string;
}

const TitleAndPrice = memo(({ data, formattedPrice }: TitleAndPriceProps) => {
  const theme = useTheme() as CustomTheme;

  return (
    <View className="p-4">
      <Text
        className="mb-2 text-xl font-semibold"
        style={{ color: theme.colors.text }}
        accessibilityLabel={`Название автомобиля: ${data.brand} ${data.model}, год ${data.releaseYear}`}
      >{`${data.brand} ${data.model}, ${data.releaseYear}`}</Text>
      <Text className="mb-1 text-4xl font-bold" style={{ color: theme.colors.text }} accessibilityLabel={`Цена: ${formattedPrice}`}>
        {formattedPrice}
      </Text>
      <View className="flex-row justify-between">
        <Text
          className="text-sm"
          style={{ color: theme.colors.textSubtle, textAlign: 'center' }}
          accessibilityLabel={`Регион: ${data.region}, дата публикации: ${data.createdAt.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}`}
        >
          {data.createdAt.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}, {data.region}
        </Text>
        <View className=" flex-row items-center justify-center gap-1">
          <Ionicons name="eye-outline" size={14} color={theme.colors.icon} />
          <Text className="text-sm" style={{ color: theme.colors.textSubtle }} accessibilityLabel={`Количество просмотров:`}>
            {/* TODO: добавить кол-во просмотров */}? (? сегодня)
          </Text>
        </View>
      </View>
    </View>
  );
});

TitleAndPrice.displayName = 'TitleAndPrice';

export default TitleAndPrice;
