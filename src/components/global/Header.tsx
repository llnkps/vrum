import { Text, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

export const Header = () => {
  return (
    <View className="flex-row items-center justify-center gap-1">
      <Ionicons name="heart-outline" size={22} color="red" />
      <Text className="text-font dark:text-font-dark text-lg font-bold">VRUM</Text>
    </View>
  );
}
