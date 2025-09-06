import { View, ActivityIndicator, Text } from 'react-native';

const Page = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-black">
      <View className="mb-10 justify-center items-center">
        <Text className="text-4xl font-bold">We're not yet open to the public</Text>
        <Text className="text-sm text-gray-500">
          Please join the waitlist to get early access to the app
        </Text>
      </View>
      
    </View>
  );
};
export default Page;
