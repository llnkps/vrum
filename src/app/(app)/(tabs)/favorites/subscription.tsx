import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/ui/button";
import { useRouter } from "expo-router";

export const SubscriptionScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-background-page dark:bg-background-page-dark">
      <View className="flex-1">
        {/* Title */}
        <View className="px-4 pt-5 pb-6">
          <Text className="text-font dark:text-font-dark text-2xl font-bold">
            Избранное
          </Text>
        </View>

        {/* Tabs */}
        <View className="flex-row justify-between bg-surface dark:bg-surface-dark rounded-lg">
          <Button
            useNativePressable
            appearance="subtle"
            title="Избранное"
            isSelected={false}
            onPress={() => router.push("/(app)/(tabs)/favorites")}
          />
          <Button
            useNativePressable
            appearance="subtle"
            title="Подписки"
            isSelected={true}
          />
        </View>

        {/* Main content */}
        <View className="flex-1">
          <Text>Dasdas</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
