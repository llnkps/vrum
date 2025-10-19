import React from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { SegmentedButton } from '@/components/ui/button';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useFavorites } from '@/hooks/useFavorites';
import { FavoritesTab } from '@/constants/navigation';
import FavoritesList from '@/modules/favorites/FavoritesList';
import SubscriptionsList from '@/modules/favorites/SubscriptionsList';

const tabs = [
  { key: FavoritesTab.FAVORITES, title: 'Избранное', icon: 'star-outline' },
  {
    key: FavoritesTab.SUBSCRIPTIONS,
    title: 'Подписки',
    icon: 'notifications-outline',
  },
] as const;

const Page = () => {
  const {
    tab,
    setTab,
    favoritesData,
    subscriptionsData,
    loading,
    error,
    handlers: {
      handleFavoriteItemPress,
      handleToggleFavorite,
      handleSearchPress,
      handleSubscriptionItemPress,
      handleDeleteSubscription,
      handleEditSubscription,
    },
  } = useFavorites();

  const renderContent = () => {
    if (loading) {
      return (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#00A86B" />
          <Text className="mt-4 text-font dark:text-font-dark">Загрузка...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View className="flex-1 items-center justify-center px-4">
          <Text className="mb-4 text-center text-font dark:text-font-dark">{error}</Text>
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

    if (tab === FavoritesTab.FAVORITES) {
      return (
        <FavoritesList
          data={favoritesData || []}
          onItemPress={handleFavoriteItemPress}
          onToggleFavorite={handleToggleFavorite}
          onSearchPress={handleSearchPress}
        />
      );
    } else {
      return (
        <SubscriptionsList
          onItemPress={handleSubscriptionItemPress}
          onDeleteSubscription={handleDeleteSubscription}
          onEditSubscription={handleEditSubscription}
        />
      );
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-background-page dark:bg-background-page-dark">
        <View className="flex-1">
          {/* Title */}
          <View className="px-4 pb-6 pt-5">
            <Text className="text-2xl font-bold text-font dark:text-font-dark">Избранное</Text>
          </View>

          {/* Tabs */}
          <View className="mx-4 mb-2 flex-row justify-center rounded-lg bg-background-neutral p-1 dark:bg-background-neutral-dark">
            {tabs.map(({ key, title, icon }) => (
              <SegmentedButton key={key} title={title} isActive={tab === key} onPress={() => setTab(key)} icon={icon} />
            ))}
          </View>
          {/* Main content с анимацией */}
          <View className="flex-1">
            <Animated.View key={tab} entering={FadeIn} exiting={FadeOut} style={{ flex: 1 }}>
              {renderContent()}
            </Animated.View>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Page;
