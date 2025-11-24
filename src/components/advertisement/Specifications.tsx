import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { memo } from 'react';
import { Text, View } from 'react-native';
import { TouchableHighlightRow } from '../global/TouchableHighlightRow';
import { useTheme } from '@react-navigation/native';
import { AdvertisementFilterParameterResponse } from '@/openapi/client/models/AdvertisementFilterParameterResponse';
import { CustomTheme } from '@/theme';

interface SpecificationProps {
  displaySpecs: AdvertisementFilterParameterResponse[];
  advertisementId: number;
}

// TODO: Найти и поменять иконки на более подходящие
const getIconForSpec = (filterName: string) => {
  switch (filterName) {
    case 'Mileage':
      return 'speedometer-outline';
    case 'Engine':
      return 'cog-outline';
    case 'Transmission':
      return 'settings-outline';
    case 'Color':
      return 'color-palette-outline';
    case 'Drive':
      return 'car-outline';
    default:
      return 'information-circle-outline';
  }
};

const Specifications = memo(({ displaySpecs, advertisementId }: SpecificationProps) => {
  const theme = useTheme() as CustomTheme;
  const router = useRouter();

  return (
    <View className="rounded-2xl p-4" style={{ backgroundColor: theme.colors.backgroundNeutral }}>
      <Text className="mb-3 text-xl font-bold" style={{ color: theme.colors.text }} accessibilityLabel="Характеристики автомобиля">
        Характеристики
      </Text>

      <View className="flex-row flex-wrap gap-4">
        {displaySpecs.slice(0, 6).map((spec, index) => (
          <View className="min-w-[45%] flex-1 flex-row items-center gap-2" key={`${spec.filterName}-${index}`}>
            <Ionicons name={getIconForSpec(spec.filterName)} size={24} color={theme.colors.icon} />
            <View className="flex-1">
              <Text
                className="text-sm"
                style={{ color: theme.colors.textSubtle }}
                accessibilityLabel={`Название характеристики: ${spec.filterNameTranslated || spec.filterName}`}
              >
                {spec.filterNameTranslated || spec.filterName}
              </Text>
              <Text
                className="text-base font-medium"
                style={{ color: theme.colors.text }}
                accessibilityLabel={`Значение характеристики: ${spec.valueTranslated || spec.value}`}
              >
                {spec.valueTranslated || spec.value}
              </Text>
            </View>
          </View>
        ))}
      </View>
      <TouchableHighlightRow
        label="Подробнее"
        // onPress={() => router.push(`/advertisement-info/simple-auto/specifications?id=${data.id}`)}
        onPress={() => router.push(`/advertisement-info/simple-auto/specs?id=${advertisementId}`)}
        variant="button"
        showRightArrow={false}
        noBorder={true}
        centerText={true}
        containerStyle={{ marginTop: 8 }}
      />
    </View>
  );
});

Specifications.displayName = 'Specifications';

export default Specifications;
