import { useCallback, useMemo, useState } from 'react';
import { Alert, RefreshControl, Text, TouchableOpacity, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import { useTheme } from '@react-navigation/native';
import { CustomTheme } from '@/theme';

import { useUserSubscriptionFiltersApi } from '@/hooks/api/useUserSubscriptionFiltersApi';
import { useAutoSelectStore } from '@/state/search-screen/useAutoSelectStore';
import { useSubscriptionsStore } from '@/state/subscriptions/useSubscriptionsStore';
import SubscriptionCard from './SubscriptionCard';
import EmptyState from './EmptyState';

import { UserSubscriptionFilter } from '@/openapi/client';
import { useAuthContext } from '@/context/AuthContext';

const SubscriptionsPage = () => {
  const router = useRouter();
  const theme = useTheme() as CustomTheme;
  const { isAuthenticated } = useAuthContext();

  const { data: apiSubscriptions, isLoading: apiLoading, error: apiError, refetch: apiRefetch } = useUserSubscriptionFiltersApi();

  const { subscriptions: storeSubscriptions, fetchSubscriptions: storeFetch } = useSubscriptionsStore();

  const mockData: UserSubscriptionFilter[] = [
    {
      id: 1,
      name: 'BMW от 2016 года',
      filters: { brand: ['BMW'], year: ['2016', '2017', '2018'], price: ['до 20000'] },
    },
    {
      id: 2,
      name: 'SUV до 20 000€',
      filters: { bodyType: ['SUV'], price: ['до 20000'], region: ['Молдова'] },
    },
  ];

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
      router.push('/(app)/search-screen/simple-auto-screen/(modals)/simple-auto-modal');
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
      data={mockData}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ListEmptyComponent={emptyState}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[theme.colors.button.primary]} />}
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingBottom: 16,
        paddingTop: subscriptions && subscriptions.length > 0 ? 0 : 16,
        flexGrow: 1,
        backgroundColor: theme.colors.background,
      }}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default SubscriptionsPage;
