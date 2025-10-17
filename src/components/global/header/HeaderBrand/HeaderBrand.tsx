import { Text, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

export const HeaderBrand = () => {
  return (
    <View className="flex-row items-center justify-center gap-1">
      <Ionicons name="heart-outline" size={22} color="red" />
      <Text className="text-lg font-bold text-font dark:text-font-dark">VRUM</Text>
    </View>
  );
};
