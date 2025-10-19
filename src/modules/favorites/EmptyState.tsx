import { Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type EmptyStateProps = {
  type: 'favorites' | 'subscriptions';
  onActionPress?: () => void;
};

const EmptyState = ({ type }: EmptyStateProps) => {
  const scheme = useColorScheme();
  const isFavorites = type === 'favorites';
  const router = useRouter();

  const iconColor = scheme === 'dark' ? '#96999E' : '#6B6E76';

  return (
    <View className="flex-1 items-center justify-center px-6">
      <Ionicons name={isFavorites ? 'star-outline' : 'notifications-outline'} size={64} color={iconColor} style={{ marginBottom: 20 }} />
      <Text className="mb-3 text-center text-lg font-semibold text-font dark:text-font-dark">
        {isFavorites ? 'Избранное пусто' : 'Нет активных подписок'}
      </Text>

      <Text className="text-center text-base leading-6 text-font-subtle dark:text-font-subtle-dark">
        {isFavorites
          ? 'Вы можете сохранить интересные объявления, добавив их в избранное'
          : 'Сохраняйте поисковые запросы - как только появится подходящее объявление, вы сразу же получите уведомление!'}
      </Text>

      {isFavorites && (
        <TouchableOpacity
          className="mt-4 rounded-lg bg-background-brand-bold px-4 py-3 active:bg-background-brand-bold-pressed dark:bg-background-brand-bold-dark dark:active:bg-background-brand-bold-dark-pressed"
          activeOpacity={0.8}
          onPress={() => router.push('/(app)/(tabs)/search-tab')}
        >
          <Text className="font-semibold text-white">Смотреть объявления</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default EmptyState;
