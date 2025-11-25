import { useCallback, useMemo, useState } from 'react';
import { Alert, RefreshControl, Text, TouchableOpacity, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import { useTheme } from '@react-navigation/native';
import { CustomTheme } from '@/theme';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import { useUserSubscriptionFiltersApi } from '@/hooks/api/useUserSubscriptionFiltersApi';
import { useSimpleAutoFilterStore } from '@/state/search-screen/useSimpleAutoFilterStore';
import { useSubscriptionsStore } from '@/state/subscriptions/useSubscriptionsStore';
import SubscriptionCard from './SubscriptionCard';
import EmptyState from './EmptyState';

import { UserSubscriptionFilter } from '@/openapi/client';
import { useAuthContext } from '@/context/AuthContext';

const SubscriptionsPage = () => {
  const router = useRouter();
  const theme = useTheme() as CustomTheme;
  const { isAuthenticated } = useAuthContext();
  const tabBarHeight = useBottomTabBarHeight();

  const { data: apiSubscriptions, isLoading: apiLoading, error: apiError, refetch: apiRefetch } = useUserSubscriptionFiltersApi();

  const { subscriptions: storeSubscriptions, fetchSubscriptions: storeFetch } = useSubscriptionsStore();

  const subscriptions = isAuthenticated ? apiSubscriptions : storeSubscriptions;
  const isLoading = isAuthenticated ? apiLoading : false;
  const error = isAuthenticated ? apiError : null;

  console.log('SubscriptionsPage render', { data: subscriptions });

  const populateFromSubscriptionFilters = useAutoSelectStore(state => state.populateFromSubscriptionFilters);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    if (isAuthenticated) {
      await apiRefetch();
    } else {
      await storeFetch();
    }
    setRefreshing(false);
  }, [isAuthenticated, apiRefetch, storeFetch]);

  const handleSubscriptionItemPress = useCallback(
    (item: UserSubscriptionFilter) => {
      populateFromSubscriptionFilters(item.filters);
      router.push('/(app)/search-screen/simple-auto-screen/simple-auto-modal');
    },
    [populateFromSubscriptionFilters, router]
  );

  const handleEdit = useCallback(
    (item: UserSubscriptionFilter) => {
      // router.push({ pathname: '/(app)/edit-filter', params: { filterId: item.id } });
      console.log('Edit filter:', item.id); // Временная замена для тестирования
    },
    [router]
  );

  const handleDelete = useCallback((item: UserSubscriptionFilter) => {
    Alert.alert('Удалить фильтр', 'Вы уверены?', [
      { text: 'Отмена' },
      {
        text: 'Удалить',
        style: 'destructive',
        onPress: async () => {
          // TODO: API вызов для удаления
          console.log('Delete filter:', item.id);
          // После удаления обновите: refetch();
        },
      },
    ]);
  }, []);

  const handleToggle = useCallback((item: UserSubscriptionFilter, isActive: boolean) => {
    console.log('Toggle subscription:', item.id, isActive);
    // toggleSubscription(item.id, isActive);
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: UserSubscriptionFilter }) => (
      <SubscriptionCard
        item={item}
        onPress={() => handleSubscriptionItemPress(item)}
        onEdit={() => handleEdit(item)}
        onDelete={() => handleDelete(item)}
        onToggle={isActive => handleToggle(item, isActive)}
      />
    ),
    [handleSubscriptionItemPress, handleEdit, handleDelete, handleToggle]
  );

  const keyExtractor = useCallback((item: UserSubscriptionFilter) => item.id.toString(), []);

  const emptyState = useMemo(
    () => (
      <EmptyState
        type="subscriptions"
        onActionPress={() => {
          // router.push('/(app)/create-filter')
          console.log('Navigate to create filter');
        }}
      />
    ),
    [router]
  );

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background }}>
        <Text style={{ color: theme.colors.text }}>Загрузка подписок...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background, padding: 16 }}>
        <Text style={{ color: theme.colors.text, marginBottom: 16, textAlign: 'center' }}>
          {typeof error === 'string' ? error : error?.message || 'Неизвестная ошибка'}. Проверьте интернет и попробуйте снова.
        </Text>
        <TouchableOpacity
          style={{
            paddingHorizontal: 16,
            paddingVertical: 8,
            backgroundColor: theme.colors.button.primary,
            borderRadius: 8,
          }}
          onPress={() => apiRefetch()}
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
      scrollEnabled={subscriptions && subscriptions.length > 0}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[theme.colors.button.primary]} />}
      contentContainerStyle={{
        padding: 16,
        paddingBottom: tabBarHeight,
        flexGrow: subscriptions && subscriptions.length === 0 ? 1 : 0,
      }}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default SubscriptionsPage;
