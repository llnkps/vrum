import { useRef, useState } from 'react';
import { Animated, Button, Image, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import TextInputIcon from '@/components/ui/TextInputIcon';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';


const DATA = Array.from({ length: 30 }, (_, i) => `Item ${i + 1}`);

export default function ModalModelItem() {
  const [text, setText] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const items = ["Apple", "Banana", "Orange"];

  const router = useRouter();




  const params = useLocalSearchParams();
  console.log(params)

  return (
    <>
      <SafeAreaView className="flex-1 px-3 gap-y-4">
        <TouchableOpacity
          onPress={() => router.dismiss()}
          className="p-2"
        >
          <Ionicons name="arrow-back-outline" size={22} color="white" />
        </TouchableOpacity>

        <View className="gap-y-3">
          <Text className="text-3xl font-bold text-font dark:text-font-dark">
            {params.item}
          </Text>
          <TextInputIcon />
        </View>

        <View className="mt-2 gap-y-2">
          {items.map((item) => (
            <TouchableOpacity
              key={item}
              onPress={() => setSelected(item)}
              className={"p-2 border-b border-border dark:border-border-dark"}
            >
              <View className="flex-row gap-x-4">
                <Ionicons name="car-sport-outline" size={32} color="gold" />
                <Text className="text-xl text-font dark:text-font-dark">{item}</Text>
              </View>
            </TouchableOpacity>
          ))}

          {/* ✅ Show button only after user picks something */}
          {selected && (
            <Button
              title="Confirm"
              onPress={() => setModalVisible(false)}
            />
          )}
        </View>
        <View className="px-4 py-3">
          <Pressable
            onPress={() => console.log('Показать результаты Pressed')}
            className={"px-4 py-3 flex flex-row bg-button-primary dark:bg-button-primary-dark rounded-md justify-center"}
          >
            <Text className="text-white font-bold">Показать результаты</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </>
  )
}
