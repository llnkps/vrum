import { memo } from 'react';
import { Text, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { CustomTheme } from '@/theme';
import { FlashList } from '@shopify/flash-list';
import MiniAdvertisementCard from '@/components/global/MiniAdvertisementCard/MiniAdvertisementCard';

interface Recommendation {
  id: string;
  brand: string;
  model: string;
  releaseYear: number;
  price: string;
  currency: string;
  images: string[];
  region?: string;
}

interface RecommendationsProps {
  recommendations?: Recommendation[];
  onRecommendationPress?: (id: string) => void;
}

const Recommendations = memo(({ recommendations = [], onRecommendationPress }: RecommendationsProps) => {
  const theme = useTheme() as CustomTheme;

  const renderItem = ({ item }: { item: Recommendation }) => (
    <View className="mr-4">
      <MiniAdvertisementCard item={item} onPress={() => onRecommendationPress?.(item.id)} />
    </View>
  );

  return (
    <View className="mt-2 rounded-2xl p-4" style={{ backgroundColor: theme.colors.backgroundNeutral }}>
      <Text className="mb-3 text-xl font-bold" style={{ color: theme.colors.text }} accessibilityLabel="Похожие объявления">
        Похожие объявления
      </Text>
      {recommendations.length > 0 ? (
        <FlashList
          data={recommendations.slice(0, 10)}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingVertical: 8 }}
        />
      ) : (
        <Text style={{ color: theme.colors.text }}>Нет похожих объявлений</Text>
      )}
    </View>
  );
});

Recommendations.displayName = 'Recommendations';

export default Recommendations;
