import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '@react-navigation/native';
import { CustomTheme } from '@/theme';
import { CustomRectButton } from '@/components/ui/button';

type EmptyStateProps = {
  type: 'favorites' | 'subscriptions';
  onActionPress?: () => void;
};

const EmptyState = ({ type, onActionPress }: EmptyStateProps) => {
  const isFavorites = type === 'favorites';
  const router = useRouter();
  const theme = useTheme() as CustomTheme;

  const handleActionPress = () => {
    if (onActionPress) {
      onActionPress();
    } else {
      router.push('/(app)/(tabs)/search-tab');
    }
  };

  return (
    <View className="flex-1 items-center justify-center px-6">
      <Ionicons name={isFavorites ? 'star-outline' : 'notifications-outline'} size={64} color={theme.colors.icon} style={{ marginBottom: 20 }} />
      <Text className="mb-3 text-center text-lg font-semibold" style={{ color: theme.colors.text }}>
        {isFavorites ? 'Избранное пусто' : 'Нет активных подписок'}
      </Text>

      <Text className="mb-4 text-center text-base leading-6" style={{ color: theme.colors.textSubtle }}>
        {isFavorites ? 'Вы можете сохранить интересные объявления, добавив их в избранное' : 'Создайте фильтр, чтобы быстро искать нужные автомобили'}
      </Text>

      <CustomRectButton appearance="primary" onPress={handleActionPress}>
        <Text className="font-semibold" style={{ color: theme.colors.text }}>
          {isFavorites ? 'Перейти к поиску авто' : 'Создать фильтр'}
        </Text>
      </CustomRectButton>
    </View>
  );
};

export default EmptyState;
