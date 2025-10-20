import { LoaderIndicator } from '@/components/global/LoaderIndicator';
import { useUserSubscriptionFiltersApi } from '@/hooks/api/useUserSubscriptionFiltersApi';
import { UserSubscriptionFilter } from '@/openapi/client/models/UserSubscriptionFilter';
import { useAutoSelectStore } from '@/state/search-screen/useAutoSelectStore';
import { FlashList } from '@shopify/flash-list';
import { router } from 'expo-router';
import React, { useCallback } from 'react';
import { Text, View } from 'react-native';
import EmptyState from './EmptyState';
import SubscriptionCard from './SubscriptionCard';

const SubscriptionsPage = () => {
  const { data, isLoading, error } = useUserSubscriptionFiltersApi();
  console.log('SubscriptionsPage render', { data });
  const populateFromSubscriptionFilters = useAutoSelectStore(state => state.populateFromSubscriptionFilters);

  const handleSubscriptionItemPress = (item: UserSubscriptionFilter) => {
    populateFromSubscriptionFilters(item.filters);
    router.push('/(app)/search-screen/simple-auto-screen/(modals)/simple-auto-modal');
  };

  const handleDeleteSubscription = (id: number) => {
    console.log('Удалить подписку:', id);
    // TODO: Implement delete subscription API call
  };

  const handleEditSubscription = (id: number) => {
    console.log('Редактировать подписку:', id);
  };

  const renderItem = useCallback(({ item }: { item: UserSubscriptionFilter }) => (
    <SubscriptionCard
      item={item}
      onPress={() => handleSubscriptionItemPress(item)}
      onDelete={() => handleDeleteSubscription(item.id)}
      onEdit={() => handleEditSubscription(item.id)}
    />
  ), []);

  const keyExtractor = useCallback((item: UserSubscriptionFilter) => item.id.toString(), []);

  if (isLoading) {
    return <LoaderIndicator />;
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center px-4">
        <Text className="mb-4 text-center text-font dark:text-font-dark">{error.message}</Text>
        <Text
          className="text-font-brand dark:text-font-brand-dark"
          onPress={() => {
            // TODO: Повторная загрузка
          }}
        >
          Попробовать снова
        </Text>
      </View>
    );
  }

  if (!data || data.length === 0) {
    return <EmptyState type="subscriptions" />;
  }

  return (
    <FlashList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ padding: 16 }}
      className="bg-background-page dark:bg-background-page-dark"
    />
  );
};

export default SubscriptionsPage;
