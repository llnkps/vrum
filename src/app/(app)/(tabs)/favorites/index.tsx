import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { SegmentedButton } from '@/components/ui/button';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { FavoritesTab } from '@/constants/navigation';
import FavoritesPage from '@/modules/favorites/FavoritesPage';
import SubscriptionsPage from '@/modules/favorites/SubscriptionsPage';

const tabs = [
  { key: FavoritesTab.FAVORITES, title: 'Избранное', icon: 'star-outline' },
  {
    key: FavoritesTab.SUBSCRIPTIONS,
    title: 'Подписки',
    icon: 'notifications-outline',
  },
] as const;

const Page = () => {
  const [tab, setTab] = useState<FavoritesTab>(FavoritesTab.FAVORITES);

  const renderContent = () => {
    if (tab === FavoritesTab.FAVORITES) {
      return <FavoritesPage />;
    } else {
      return <SubscriptionsPage />;
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
