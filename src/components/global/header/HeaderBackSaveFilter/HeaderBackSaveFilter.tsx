// It's not so generic to be here.

import { Text, TouchableOpacity, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import CloseIcon from '../../CloseIcon';

export const HeaderBackSaveFilter = ({ onSubscribe }: { onSubscribe?: () => void }) => {
  const router = useRouter();

  return (
    <View className="flex-row items-center justify-between">
      <View className="flex-row items-center gap-2">
        <CloseIcon onPress={() => router.back()} iconName="arrow-back" />
        <View className="flex-row gap-1">
          <Ionicons name="heart-outline" size={22} color="red" />
          <Text className="text-lg font-bold text-font dark:text-font-dark">VRUM</Text>
        </View>
      </View>
      <TouchableOpacity onPress={onSubscribe}>
        <Text className="text-lg font-bold text-font-brand dark:text-font-brand-dark">Подписаться</Text>
      </TouchableOpacity>
    </View>
  );
};
