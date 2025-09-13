import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  console.log("SIGN UP PAGE")

  return (
    <SafeAreaView className="flex-1 bg-surface dark:bg-surface-dark">
      <View className="flex-1 justify-center">
        <Text>SING UP</Text>
      </View>
    </SafeAreaView>
  );
}
