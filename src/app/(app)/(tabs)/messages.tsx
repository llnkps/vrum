import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import {useState} from "react";
import {Ionicons} from "@expo/vector-icons";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";

const Page = () => {
  const [tab, setTab] = useState<"messages" | "events">("messages");

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1">
        <View className="flex-row justify-center">
          <TouchableOpacity
            className={`flex-1 py-2 ${tab === "messages" ? "border-b-2 border-neutral-700" : ""}` }
            onPress={() => setTab("messages")}
          >
            <Text className="text-center text-neutral-700">Сообщения</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 py-2 ${tab === "events" ? "border-b-2 border-neutral-700" : ""}` }
            onPress={() => setTab("events")}
          >
            <Text className="text-center text-neutral-700">События</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="flex-1" contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: 100,
          paddingTop: 50
        }}>
          {tab === "messages" ? (
            <>
              <Ionicons name="newspaper-outline" size={64} className="mb-4" />
              <Text className="text-black text-center mx-10 mb-4">
                Нет сообщений
              </Text>
              <Text className="mx-12">
                Общайтесь с продавцами и покупателями, уточняйте интересующую информацию о товарах и услугах.
              </Text>
            </>
          ) : (
            <>
              <Ionicons name="newspaper-outline" size={64} className="mb-4" />
              <Text className="text-black text-center mx-10">

              </Text>
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default Page;