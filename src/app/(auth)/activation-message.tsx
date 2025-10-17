import { useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ActivationMessage() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-surface px-4 dark:bg-surface-dark">
      <View className="mx-auto max-w-md text-center">
        <Text className="mb-4 text-2xl font-bold text-font dark:text-font-dark">Success!</Text>
        <Text className="mb-6 text-lg text-font dark:text-font-dark">
          Now you need to activate your account. Check out your email for the activation link.
        </Text>
        <TouchableOpacity
          className="rounded-lg bg-blue-500 px-6 py-3"
          onPress={() => router.replace('/sign-in')}
        >
          <Text className="text-center font-semibold text-white">Go to Sign In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
