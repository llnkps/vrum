import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '@react-navigation/native';
import { CustomTheme } from '@/theme';

type EmptyStateProps = {
  type: 'favorites' | 'subscriptions';
  onActionPress?: () => void;
};

const EmptyState = ({ type }: EmptyStateProps) => {
  const isFavorites = type === 'favorites';
  const router = useRouter();
  const theme = useTheme() as CustomTheme;

  return (
    <View className="flex-1 items-center justify-center px-6">
      <Ionicons name={isFavorites ? 'star-outline' : 'notifications-outline'} size={64} color={theme.colors.icon} style={{ marginBottom: 20 }} />
      <Text className="mb-3 text-center text-lg font-semibold" style={{ color: theme.colors.text }}>
        {isFavorites ? 'Избранное пусто' : 'Нет активных подписок'}
      </Text>

      <Text className="text-center text-base leading-6" style={{ color: theme.colors.textSubtle }}>
        {isFavorites
          ? 'Вы можете сохранить интересные объявления, добавив их в избранное'
          : 'Сохраняйте поисковые запросы - как только появится подходящее объявление, вы сразу же получите уведомление!'}
      </Text>

      {isFavorites && (
        <TouchableOpacity
          className="mt-4 rounded-2xl px-4 py-3"
          style={{ backgroundColor: theme.colors.backgroundNeutral }}
          activeOpacity={0.8}
          onPress={() => router.push('/(app)/(tabs)/search-tab')}
        >
          <Text className="font-semibold" style={{ color: theme.colors.text }}>
            Смотреть объявления
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default EmptyState;
