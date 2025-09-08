import {useState} from "react";
import {Text, TouchableOpacity, View} from "react-native";

import { Ionicons } from '@expo/vector-icons';
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";


const Page = () => {
  const [tab, setTab] = useState<"subscriptions" | "favorites">("subscriptions");

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 pt-5">
        <View className="flex-row justify-center bg-neutral-400 rounded-lg mx-4">
          <TouchableOpacity
            className={`flex-1 py-2 rounded-lg ${tab === "subscriptions" ? "bg-neutral-700" : ""}` }
            onPress={() => setTab("subscriptions")}
          >
            <Text className="text-center text-white">Подписки</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 py-2 rounded-lg ${tab === "favorites" ? "bg-neutral-700" : ""}` }
            onPress={() => setTab("favorites")}
          >
            <Text className="text-center text-white">Избранное</Text>
          </TouchableOpacity>
        </View>
ч
        <View className="flex-1 justify-center items-center">
          {tab === "subscriptions" ? (
            <>
              <Ionicons name="star-outline" size={64} className="mb-4" />
              <Text className="text-black text-center mx-10">
                Вы можете сохранить интересные объявления, добавив их в избранное
              </Text>
            </>
          ) : (
            <>
              <Text className="text-black text-center mx-10">
                Сохраняйте поисковые запросы - как только появится оъявление, вы сразу же получите объявление!
              </Text>
            </>
          )}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default Page;