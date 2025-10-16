import { Text, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import CloseIcon from "../../CloseIcon";

export const HeaderBackSaveFilter = () => {
  const router = useRouter();

  return (
    <View className="flex-row items-center justify-between">
      <View className="flex-row items-center gap-2">
        <CloseIcon onPress={() => router.back()} />
        <View className="flex-row gap-1">
          <Ionicons name="heart-outline" size={22} color="red" />
          <Text className="text-font dark:text-font-dark text-lg font-bold">VRUM</Text>
        </View>
      </View>
      <View className="">
        <Text className="text-font-brand dark:text-font-brand-dark font-bold text-lg">Подписаться</Text>
      </View>
    </View>
  );
};
