import React, { useCallback } from 'react';
import { Text, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { LoaderIndicator } from '@/components/global/LoaderIndicator';
import { SubscriptionItem } from '@/modules/favorites/types';
import { useUserSubscriptionFiltersApi } from '@/hooks/api/useUserSubscriptionFiltersApi';
import EmptyState from './EmptyState';
import SubscriptionCard from './SubscriptionCard';

const SubscriptionsPage = () => {
  const { data, isLoading, error } = useUserSubscriptionFiltersApi();

  const subscriptionsData: SubscriptionItem[] =
    data?.map(item => ({
      id: item.id.toString(),
      brand: item.name,
      model: '',
      info: 'Активная подписка',
      count: '0', // TODO: Add count from API if available
      logo: 'https://via.placeholder.com/40x40?text=' + item.name.charAt(0),
    })) || [];

  const handleSubscriptionItemPress = (item: SubscriptionItem) => {
    console.log('Открыть подписку:', item.brand);
  };

  const handleDeleteSubscription = (id: string) => {
    console.log('Удалить подписку:', id);
    // TODO: Implement delete subscription API call
  };

  const handleEditSubscription = (id: string) => {
    console.log('Редактировать подписку:', id);
  };

  const renderItem = useCallback(
    ({ item }: { item: SubscriptionItem }) => (
      <SubscriptionCard
        item={item}
        onPress={() => handleSubscriptionItemPress(item)}
        onDelete={() => handleDeleteSubscription(item.id)}
        onEdit={() => handleEditSubscription(item.id)}
      />
    ),
    []
  );

  const keyExtractor = useCallback((item: SubscriptionItem) => item.id, []);

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

  if (!subscriptionsData || subscriptionsData.length === 0) {
    return <EmptyState type="subscriptions" />;
  }

  return (
    <FlashList
      data={subscriptionsData}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ padding: 16 }}
      className="bg-background-page dark:bg-background-page-dark"
    />
  );
};

export default SubscriptionsPage;