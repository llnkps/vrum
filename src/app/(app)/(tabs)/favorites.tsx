import React from "react";
import {Text, View} from "react-native";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import FavoritesList from "@/components/favorites/FavoritesList";
import SubscriptionsList from "@/components/favorites/SubscriptionsList";
import {SegmentedButton} from "@/components/ui/button";
import {useFavorites} from "@/hooks/useFavorites";
import {FavoritesTab} from "@/constants/navigation";

const Page = () => {
  const {
    tab,
    setTab,
    favoritesData,
    subscriptionsData,
    handlers: {
      handleFavoriteItemPress,
      handleToggleFavorite,
      handleSearchPress,
      handleSubscriptionItemPress,
      handleDeleteSubscription,
      handleEditSubscription,
    }
  } = useFavorites();

  const renderContent = () => {
    if (tab === FavoritesTab.FAVORITES) {
      return (
        <FavoritesList
          data={favoritesData}
          onItemPress={handleFavoriteItemPress}
          onToggleFavorite={handleToggleFavorite}
          onSearchPress={handleSearchPress}
        />
      );
    } else {
      return (
        <SubscriptionsList
          data={subscriptionsData}
          onItemPress={handleSubscriptionItemPress}
          onDeleteSubscription={handleDeleteSubscription}
          onEditSubscription={handleEditSubscription}
        />
      );
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1">
        <View className="flex-1">
          {/* Title */}
          <View className="px-4 pt-5 pb-6">
            <Text className="text-black text-2xl font-bold">
              Избранное
            </Text>
          </View>

          {/* Tabs */}
          <View className="flex-row justify-center bg-neutral-400 rounded-lg mx-4 mb-2 p-1">
            <SegmentedButton
              title="Избранное"
              isActive={tab === FavoritesTab.FAVORITES}
              onPress={() => setTab(FavoritesTab.FAVORITES)}
              icon="star-outline"
            />
            <SegmentedButton
              title="Подписки"
              isActive={tab === FavoritesTab.SUBSCRIPTIONS}
              onPress={() => setTab(FavoritesTab.SUBSCRIPTIONS)}
              icon="notifications-outline"
            />
          </View>

          {/* Main content */}
          <View className="flex-1">
            {renderContent()}
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Page;