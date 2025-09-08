import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import {useState} from "react";
import {Ionicons} from "@expo/vector-icons";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";

const Page = () => {
  const [tab, setTab] = useState<"active" | "archive">("active");

  return (
    <SafeAreaProvider >
      <SafeAreaView className="flex-1 pt-5">
        <ScrollView
          className="flex-1 mb-40"
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <Text className="text-black text-2xl font-bold px-4 mb-4">
            Мои объявления
          </Text>

          <View className="flex-row justify-center bg-neutral-400 rounded-lg mx-4">
            <TouchableOpacity
              className={`flex-1 py-2 rounded-lg ${tab === "active" ? "bg-neutral-700" : ""}` }
              onPress={() => setTab("active")}
            >
              <Text className="text-center text-white">Актуальные</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`flex-1 py-2 rounded-lg ${tab === "archive" ? "bg-neutral-700" : ""}` }
              onPress={() => setTab("archive")}
            >
              <Text className="text-center text-white">Архив</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-1 justify-center items-center">
            {tab === "active" ? (
              <>
                <Ionicons name="newspaper-outline" size={64} className="mb-4" />
                <Text className="text-black text-center mx-10">
                  У вас нет активных объявлений
                </Text>
              </>
            ) : (
              <>
                <Ionicons name="newspaper-outline" size={64} className="mb-4" />
                <Text className="text-black text-center mx-10">
                  У вас нет архивных сообщений
                </Text>
              </>
            )}
          </View>
        </ScrollView>

        <View className="absolute bottom-16 left-0 right-0 bg-neutral-300 rounded-t-3xl px-4 pt-6 pb-10">
          <Text className="text-black text-lg font-bold mb-4">
            Добавить объявление
          </Text>

          <View className="flex-row justify-between">
            <TouchableOpacity className="flex-1 items-center bg-neutral-700 py-4 mx-1 rounded-lg">
              <Text className="text-center text-white">
                Автомобили
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 items-center bg-neutral-700 py-4 mx-1 rounded-lg">
              <Text className="text-center text-white">
                Автомобили
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 items-center bg-neutral-700 py-4 mx-1 rounded-lg">
              <Text className="text-center text-white">
                Автомобили
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>

  )
}

export default Page;