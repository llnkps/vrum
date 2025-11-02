import { SelectableButton } from '@/components/ui/button';
import { FavoritesTab } from '@/constants/navigation';
import FavoritesPage from '@/modules/favorites/FavoritesPage';
import SubscriptionsPage from '@/modules/favorites/SubscriptionsPage';
import { CustomTheme } from '@/theme';
import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

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
  const theme = useTheme() as CustomTheme;

  const renderContent = () => {
    if (tab === FavoritesTab.FAVORITES) {
      return <FavoritesPage />;
    } else {
      return <SubscriptionsPage />;
    }
  };

  return (
    <SafeAreaView className="flex-1">
      {/* Title */}
      <View className="mb-3 ml-3">
        <Text className="text-2xl font-bold" style={{ color: theme.colors.text }}>
          Избранное
        </Text>
      </View>

      {/* Tabs */}
      <View className="mx-4 mb-2 flex-row justify-center rounded-2xl p-1" style={{ backgroundColor: theme.colors.backgroundNeutral }}>
        <SelectableButton
          appearance="subtle"
          title="Избранное"
          isSelected={tab === FavoritesTab.FAVORITES}
          onPress={() => setTab(FavoritesTab.FAVORITES)}
        />
        <SelectableButton
          appearance="subtle"
          title="Подписки"
          isSelected={tab === FavoritesTab.SUBSCRIPTIONS}
          onPress={() => setTab(FavoritesTab.SUBSCRIPTIONS)}
        />
      </View>

      {/* Main content с анимацией */}
      <View className="flex-1">
        <Animated.View key={tab} entering={FadeIn} exiting={FadeOut} style={{ flex: 1 }}>
          {renderContent()}
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default Page;
