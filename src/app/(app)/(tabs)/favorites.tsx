import { useState } from "react";
import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';

const TAB_OPTIONS = {
  SUBSCRIPTIONS: "subscriptions",
  FAVORITES: "favorites"
} as const;

type TabType = typeof TAB_OPTIONS[keyof typeof TAB_OPTIONS];

const EmptyStateContent = ({ tab }: {tab: TabType}) => {
  const isSubscriptions = tab === TAB_OPTIONS.SUBSCRIPTIONS;

  return (
    <View className="items-center px-6">
      <Ionicons
        name={isSubscriptions ? "notifications-outline" : "star-outline"}
        size={64}
        color="#9CA3AF"
        style={{ marginBottom: 20 }}
      />
      <Text className="text-gray-800 text-center text-lg font-semibold mb-3">
        {isSubscriptions ? "Нет активных подписок" : "Избранное пусто"}
      </Text>

      <Text className="text-gray-600 text-center text-base leading-6">
        {isSubscriptions
          ? "Сохраняйте поисковые запросы - как только появится подходящее объявление, вы сразу же получите уведомление!"
          : "Вы можете сохранить интересные объявления, добавив их в избранное"
        }
      </Text>

      {!isSubscriptions && (
        <TouchableOpacity
          className="bg-amber-600 px-6 py-3 rounded-lg mt-6"
          activeOpacity={0.8}
          onPress={() => console.log('Перейти к объявлениям')}
        >
          <Text className="text-white font-semobild">
            Смотреть объявления
          </Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

const TabButton = ({title, isActive, onPress, icon}:
                   {title: string; isActive: boolean; onPress: () => void; icon?: string}) => (
  <TouchableOpacity
    className={`flex-1 py-3 rounded-lg ${isActive ? "bg-neutral-700" : "" }` }
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View className="flex-row items-center justify-center">
      {icon && (
        <Ionicons
          name={icon as any}
          size={18}
          color="white"
          style={{ marginRight: 6 }}
        />
      )}
      <Text className="text-center text-white font-medium">
        {title}
      </Text>
    </View>
  </TouchableOpacity>
);


const Page = () => {
  const [tab, setTab] = useState<TabType>(TAB_OPTIONS.SUBSCRIPTIONS);

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1">
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >

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
          <View className="flex-1 justify-center">
            <EmptyStateContent tab={tab} />
          </View>

          {/* Info section */}
          <View className="px-4 py-6 bg-gray-50 mx-4 rounded-lg mb-16">
            <View className="flex-row items-start">
              <Ionicons
                name="information-circle-outline"
                size={20}
                color="#6B7280"
                style={{ marginTop: 2, marginRight: 8 }}
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
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default Page;