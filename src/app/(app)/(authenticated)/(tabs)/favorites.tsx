import {useState} from "react";
import {Text, TouchableOpacity, View} from "react-native";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {Ionicons} from '@expo/vector-icons';
import FavoritesList from "@/screens/favorites-screen/FavoritesList";
import SubscriptionsList from "@/screens/favorites-screen/SubscriptionsList";
import {FavoriteItem, SubscriptionItem} from "@/components/favorites-screen/types";

const TAB_OPTIONS = {
  SUBSCRIPTIONS: "subscriptions",
  FAVORITES: "favorites"
} as const;

type TabType = typeof TAB_OPTIONS[keyof typeof TAB_OPTIONS];

const TabButton = ({title, isActive, onPress, icon}:
                   { title: string; isActive: boolean; onPress: () => void; icon?: string }) => (
  <TouchableOpacity
    className={`flex-1 py-3 rounded-lg ${isActive ? "bg-neutral-700" : ""}`}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View className="flex-row items-center justify-center">
      {icon && (
        <Ionicons
          name={icon as any}
          size={18}
          color="white"
          style={{marginRight: 6}}
        />
      )}
      <Text className="text-center text-white font-medium">
        {title}
      </Text>
    </View>
  </TouchableOpacity>
);

const Page = () => {
  const [tab, setTab] = useState<TabType>(TAB_OPTIONS.FAVORITES);

  // Данные для избранного
  const [favoritesData, setFavoritesData] = useState<FavoriteItem[]>([
    {
      id: "1",
      title: "BMW 3-Series, 2020",
      subtitle: "320d AT xDrive M Sport",
      price: "4 700 000 ₽",
      tag: "высокая цена",
      description: "2.0 л, 190 л.с., дизель, АКПП, 4WD, 21 тыс.км",
      location: "Москва, 10 сент",
      images: [
        "https://cdn.bmwblog.com/wp-content/uploads/2020/01/BMW-G20-3-Series.jpg",
        "https://cdn.bmwblog.com/wp-content/uploads/2019/12/BMW-G20-3-Series-front.jpg",
      ],
    },{
      id: "2",
      title: "BMW 3-Series, 2020",
      subtitle: "320d AT xDrive M Sport",
      price: "4 700 000 ₽",
      tag: "высокая цена",
      description: "2.0 л, 190 л.с., дизель, АКПП, 4WD, 21 тыс.км",
      location: "Москва, 10 сент",
      images: [
        "https://cdn.bmwblog.com/wp-content/uploads/2020/01/BMW-G20-3-Series.jpg",
        "https://cdn.bmwblog.com/wp-content/uploads/2019/12/BMW-G20-3-Series-front.jpg",
      ],
    },{
      id: "3",
      title: "BMW 3-Series, 2020",
      subtitle: "320d AT xDrive M Sport",
      price: "4 700 000 ₽",
      tag: "высокая цена",
      description: "2.0 л, 190 л.с., дизель, АКПП, 4WD, 21 тыс.км",
      location: "Москва, 10 сент",
      images: [
        "https://cdn.bmwblog.com/wp-content/uploads/2020/01/BMW-G20-3-Series.jpg",
        "https://cdn.bmwblog.com/wp-content/uploads/2019/12/BMW-G20-3-Series-front.jpg",
      ],
    },{
      id: "1",
      title: "BMW 3-Series, 2020",
      subtitle: "320d AT xDrive M Sport",
      price: "4 700 000 ₽",
      tag: "высокая цена",
      description: "2.0 л, 190 л.с., дизель, АКПП, 4WD, 21 тыс.км",
      location: "Москва, 10 сент",
      images: [
        "https://cdn.bmwblog.com/wp-content/uploads/2020/01/BMW-G20-3-Series.jpg",
        "https://cdn.bmwblog.com/wp-content/uploads/2019/12/BMW-G20-3-Series-front.jpg",
      ],
    },
  ]);

  // Данные для подписок
  const [subscriptionsData, setSubscriptionsData] = useState<SubscriptionItem[]>([
    {
      id: "1",
      brand: "Audi",
      model: "A4 (5 поколение: 2019–…)",
      info: "легковые; все регионы",
      count: "~31 объявление в месяц",
      logo: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Audi_logo_detail.svg",
    },{
      id: "2",
      brand: "Audi",
      model: "A4 (5 поколение: 2019–…)",
      info: "легковые; все регионы",
      count: "~31 объявление в месяц",
      logo: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Audi_logo_detail.svg",
    },{
      id: "3",
      brand: "Audi",
      model: "A4 (5 поколение: 2019–…)",
      info: "легковые; все регионы",
      count: "~31 объявление в месяц",
      logo: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Audi_logo_detail.svg",
    },
  ]);

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

  const renderContent = () => {
    if (tab === TAB_OPTIONS.FAVORITES) {
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
          <View className="flex-row justify-center bg-neutral-400 rounded-lg mx-4 mb-8 p-1">
            <TabButton
              title="Избранное"
              isActive={tab === TAB_OPTIONS.FAVORITES}
              onPress={() => setTab(TAB_OPTIONS.FAVORITES)}
              icon="star-outline"
            />
            <TabButton
              title="Подписки"
              isActive={tab === TAB_OPTIONS.SUBSCRIPTIONS}
              onPress={() => setTab(TAB_OPTIONS.SUBSCRIPTIONS)}
              icon="notifications-outline"
            />
          </View>

          {/* Main content */}
          <View className="flex-1">
            {renderContent()}
          </View>


          <View className="px-4 py-6 bg-gray-50 mx-4 rounded-lg mb-16">
            <View className="flex-row items-start">
              <Ionicons
                name="information-circle-outline"
                size={20}
                color="#6B7280"
                style={{marginTop: 2, marginRight: 8}}
              />
              <View className="flex-1">
                <Text className="text-gray-700 text-sm font-medium mb-1">
                  Как это работает?
                </Text>
                <Text className="text-gray-600 text-sm leading-5">
                  {tab === TAB_OPTIONS.SUBSCRIPTIONS
                    ? "Создавайте подписки с нужными параметрами поиска. Мы уведомим вас о новых объявлениях, которые соответствуют вашим критериям."
                    : "Нажимайте на звездочку в объявлениях, чтобы сохранить их в избранном. Все сохраненные объявления будут доступны здесь."
                  }
                </Text>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default Page;