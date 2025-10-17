import { View, Text } from 'react-native';

const Page = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white p-4 dark:bg-black">
      <View className="max-w-md">
        <Text className="mb-4 text-center text-4xl font-bold">Thanks for joining!</Text>
        <Text className="mb-8 text-center text-lg text-gray-600 dark:text-gray-300">
          We've added you to our waitlist and will notify you as soon as we're ready to welcome you
          to the app.
        </Text>
      </View>
    </View>
  );
};

export default Page;
