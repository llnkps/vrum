import { Redirect } from 'expo-router';

export default function Index() {
  return <Redirect href="/(app)/(tabs)/search-tab" />;
  // const { expoPushToken, error, retryPermissions } = useNotification();

  // const openSettings = () => {
  //   Linking.openSettings();
  // };

  // const handleRetry = () => {
  //   retryPermissions();
  // };

  // if (error) {
  //   return (
  //     <View className="flex-1 items-center justify-center p-4">
  //       <Text className="text-lg text-center mb-4 text-font dark:text-font-dark">
  //         Notifications are disabled. To receive updates, please enable notifications in settings.
  //       </Text>
  //       <TouchableOpacity
  //         onPress={openSettings}
  //         className="bg-blue-500 px-4 py-2 rounded-lg mb-2"
  //       >
  //         <Text className="text-white text-center">Open Settings</Text>
  //       </TouchableOpacity>
  //       <TouchableOpacity
  //         onPress={handleRetry}
  //         className="bg-gray-500 px-4 py-2 rounded-lg"
  //       >
  //         <Text className="text-white text-center">Retry</Text>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // }

  // if (expoPushToken) {
  //   return <Redirect href="/(app)/(tabs)/search-tab" />;
  // }

  // return (
  //   <View className="flex-1 items-center justify-center">
  //     <Text className="text-font dark:text-font-dark">Loading notifications...</Text>
  //   </View>
  // );
}
