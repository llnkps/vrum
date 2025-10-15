import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ActivationMessage() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-surface dark:bg-surface-dark justify-center items-center px-4">
      <View className="max-w-md mx-auto text-center">
        <Text className="text-2xl font-bold text-font dark:text-font-dark mb-4">
          Success!
        </Text>
        <Text className="text-lg text-font dark:text-font-dark mb-6">
          Now you need to activate your account. Check out your email for the activation link.
        </Text>
        <TouchableOpacity
          className="bg-blue-500 py-3 px-6 rounded-lg"
          onPress={() => router.replace("/sign-in")}
        >
          <Text className="text-white text-center font-semibold">Go to Sign In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}