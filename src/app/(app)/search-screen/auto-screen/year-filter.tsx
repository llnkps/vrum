import { useRouter } from 'expo-router';
import { Image, Pressable, Text, TouchableOpacity, View } from 'react-native';

import { CustomTheme } from '@/theme';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';

export default function YearFilter() {
  console.log("YEAR FILTER")
  const router = useRouter();
  const theme = useTheme() as CustomTheme;

  return (
    <>
      <View className="bg-surface dark:bg-surface-dark">
        <View className="flex flex-row">
          <Text className="text-lg font-bold text-font-brand dark:text-font-brand-dark">
            Год
          </Text>
          <TouchableOpacity
            onPress={() => router.dismiss()}
            className="p-2"
          >
            <Ionicons name="close" size={22} color={theme.colors.icon} />
          </TouchableOpacity>
        </View>
        <View className="px-4 py-3">
          <Pressable
            onPress={() => console.log('Показать результаты Pressed')}
            className={"px-4 py-3 flex flex-row bg-button-primary dark:bg-button-primary-dark rounded-md justify-center"}
          >
            <Text className="text-white font-bold">Показать результаты</Text>
          </Pressable>
        </View>
      </View>
    </>
  )
}
