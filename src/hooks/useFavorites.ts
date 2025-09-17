import {useState} from "react";
import {FavoriteItem, SubscriptionItem} from "@/components/favorites/types";
import {mockFavoritesData, mockSubscriptionsData} from "@/data/mockData";
import {FavoritesTab} from "@/constants/navigation";

export const useFavorites = () => {
  const [tab, setTab] = useState<FavoritesTab>(FavoritesTab.FAVORITES);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [favoritesData, setFavoritesData] = useState<FavoriteItem[]>(mockFavoritesData);
  const [subscriptionsData, setSubscriptionsData] = useState<SubscriptionItem[]>(mockSubscriptionsData);

  // Обработчики для избранного
  const handleFavoriteItemPress = (item: FavoriteItem) => {
    console.log('Открыть объявление:', item.title);
  };

  const handleToggleFavorite = (id: string) => {
    setFavoritesData(prev => prev.filter(item => item.id !== id));
    console.log('Удалить из избранного:', id);
  };

  const handleSearchPress = () => {
    console.log('Перейти к поиску объявлений');
  };

  // Обработчики для подписок
  const handleSubscriptionItemPress = (item: SubscriptionItem) => {
    console.log('Открыть подписку:', item.brand);
  };

  const handleDeleteSubscription = (id: string) => {
    setSubscriptionsData(prev => prev.filter(item => item.id !== id));
    console.log('Удалить подписку:', id);
  };

  const handleEditSubscription = (id: string) => {
    console.log('Редактировать подписку:', id);
  };

  return {
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
  };
};