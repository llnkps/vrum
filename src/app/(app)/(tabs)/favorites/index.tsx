import { SegmentedButton } from '@/components/ui/button';
import { FavoritesTab } from '@/constants/navigation';
import FavoritesPage from '@/modules/favorites/FavoritesPage';
import SubscriptionsPage from '@/modules/favorites/SubscriptionsPage';
import { useAuthContext } from '@/context/AuthContext';
import { CustomTheme } from '@/theme';
import { useTheme } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
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
  const { isAuthenticated } = useAuthContext();
  console.log('=================');
  console.log('isAuthenticated', isAuthenticated);
  const router = useRouter();
  const theme = useTheme() as CustomTheme;

  useEffect(() => {
    if (tab === FavoritesTab.SUBSCRIPTIONS && !isAuthenticated) {
      router.replace('/sign-in');
    }
  }, [tab, isAuthenticated, router]);

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
        {tabs.map(({ key, title, icon }) => (
          <SegmentedButton
            key={key}
            title={title}
            isActive={tab === key}
            onPress={() => {
              setTab(key);
            }}
            icon={icon}
          />
        ))}
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
