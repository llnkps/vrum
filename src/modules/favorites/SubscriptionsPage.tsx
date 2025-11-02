import { useCallback, useMemo } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import { useTheme } from '@react-navigation/native';
import { CustomTheme } from '@/theme';
import { useAuthStore } from '@/state/auth/useAuthStore';
import { useSubscriptionsStore } from '@/state/subscriptions/useSubscriptionsStore';
import SubscriptionCard from './SubscriptionCard';
import EmptyState from './EmptyState';

interface ExtendedUserSubscriptionFilter {
  id: number;
  name: string;
  filters: { [slug: string]: string[] };
  createdAt?: string;
  lastUsed?: string;
  isDefault?: boolean;
  isActive?: boolean;
  newAdsCount?: number;
}

const SubscriptionsPage = () => {
  const router = useRouter();
  const theme = useTheme() as CustomTheme;
  const { isAuthenticated } = useAuthStore();

  // Используем store для состояния подписок
  const { subscriptions, isLoading, error, fetchSubscriptions, retry, toggleSubscription } = useSubscriptionsStore();

  // Обработчики с useCallback для производительности
  const handleApply = useCallback(
    (item: ExtendedUserSubscriptionFilter) => {
      router.push({ pathname: '/(app)/(tabs)/search-tab', params: { filterId: item.id } });
    },
    [router]
  );

  const handleEdit = useCallback(
    (item: ExtendedUserSubscriptionFilter) => {
      router.push({ pathname: '/(app)/edit-filter', params: { filterId: item.id } });
    },
    [router]
  );

  const handleDelete = useCallback((item: ExtendedUserSubscriptionFilter) => {
    Alert.alert('Удалить фильтр', 'Вы уверены?', [
      { text: 'Отмена' },
      {
        text: 'Удалить',
        style: 'destructive',
        onPress: async () => {
          // TODO: API вызов для удаления
          console.log('Delete filter:', item.id);
          // После удаления обновите store: fetchSubscriptions();
        },
      },
    ]);
  }, []);

  const handleToggle = useCallback(
    (item: ExtendedUserSubscriptionFilter, isActive: boolean) => {
      // Toggle через store
      toggleSubscription(item.id, isActive);
    },
    [toggleSubscription]
  );

  // renderItem с useCallback
  const renderItem = useCallback(
    ({ item }: { item: ExtendedUserSubscriptionFilter }) => (
      <SubscriptionCard
        item={item}
        onPress={() => handleApply(item)}
        onEdit={() => handleEdit(item)}
        onDelete={() => handleDelete(item)}
        onToggle={isActive => handleToggle(item, isActive)}
      />
    ),
    [handleApply, handleEdit, handleDelete, handleToggle]
  );

  // keyExtractor с useCallback
  const keyExtractor = useCallback((item: ExtendedUserSubscriptionFilter) => item.id.toString(), []);

  // EmptyState с onActionPress
  const emptyState = useMemo(() => <EmptyState type="subscriptions" onActionPress={() => router.push('/(app)/create-filter')} />, [router]);

  // Если не аутентифицирован, перенаправляем
  if (!isAuthenticated) {
    router.replace('/sign-in');
    return null;
  }

  // Загрузка
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background }}>
        <Text style={{ color: theme.colors.text }}>Загрузка подписок...</Text>
      </View>
    );
  }

  // Ошибка с retry
  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background, padding: 16 }}>
        <Text style={{ color: theme.colors.text, marginBottom: 16, textAlign: 'center' }}>{error}. Проверьте интернет и попробуйте снова.</Text>
        <TouchableOpacity
          style={{
            paddingHorizontal: 16,
            paddingVertical: 8,
            backgroundColor: theme.colors.button.primary,
            borderRadius: 8,
          }}
          onPress={retry}
        >
          <Text style={{ color: 'white', fontWeight: '600' }}>Попробовать снова</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <FlashList
      data={subscriptions}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ListEmptyComponent={emptyState}
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingBottom: 16,
        paddingTop: subscriptions && subscriptions.length > 0 ? 0 : 16,
        flexGrow: 1,
        backgroundColor: theme.colors.background,
      }}
      showsVerticalScrollIndicator={false}
      estimatedItemSize={120} // Оценка размера карточки для FlashList
    />
  );
};

export default SubscriptionsPage;
