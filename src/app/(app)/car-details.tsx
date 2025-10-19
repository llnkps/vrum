import React, { useMemo } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import CarDetailsScreen, { mockProductData } from '../../../src/modules/car-screen/CarDetailsScreen';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ProductData {
  imageUri?: string;
  name?: string;
  description?: string;
  brand: string;
  model: string;
  price: string;
  currency: string;
  region: string;
  releaseYear: number;
  parameters?: { label: string; value: string; highlighted?: boolean }[];
}

export default function CarDetailsPage() {
  const params = useLocalSearchParams();
  const router = useRouter();

  const mockProductData: ProductData = {
    imageUri:
      'https://motor.ru/thumb/1816x0/filters:quality(75):no_upscale()/imgs/2023/07/06/11/5974391/bd6439ef2f6dc0cc152386bfebb547ec4582bbfe.jpg',
    name: 'Porsche 911 Brabus 900 Rocket R',
    description:
      'Эксклюзивный тюнинг от Brabus. Автомобиль в идеальном состоянии, полная история обслуживания у официального дилера. Все ТО пройдены вовремя. Комплект оригинальных ключей, сервисная книжка, два комплекта колёс.',
    brand: 'Porsche',
    model: '911 Brabus 900',
    price: '89900000',
    currency: 'rub',
    region: 'Москва',
    releaseYear: 2023,
    parameters: [
      { label: 'Поколение', value: 'VIII (992)', highlighted: true },
      { label: 'Год выпуска', value: '2023' },
      { label: 'Пробег', value: '160000' },
      { label: 'Кузов', value: 'Купе' },
      { label: 'Цвет', value: 'Серый' },
      { label: 'Двигатель', value: '3.8 л / 900 л.с. / Бензин' },
      { label: 'КПП', value: 'Роботизированная' },
      { label: 'Привод', value: 'Полный' },
      { label: 'VIN', value: 'W09**************' },
      { label: 'Руль', value: 'Левый' },
      { label: 'Состояние', value: 'Новый' },
      { label: 'ПТС', value: 'Оригинал' },
    ],
  };

  const productData = useMemo(() => {
    try {
      if (params.data && typeof params.data === 'string') {
        return JSON.parse(params.data) as ProductData;
      }
    } catch (error) {
      console.error('Error parsing product data:', error);
    }
    return mockProductData;
  }, [params.data]);

  const handleBack = () => {
    router.back();
  };

  const handleCall = () => {
    // TODO: Реализовать звонок
    console.log('Call pressed');
  };

  const handleChat = () => {
    // TODO: Реализовать чат
    console.log('Chat pressed');
  };

  const handleToggleFavorite = (isFavorite: boolean) => {
    // TODO: Реализовать добавление/удаление из избранного
    console.log('Toggle favorite:', isFavorite);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-background-page dark:bg-background-page-dark">
        <CarDetailsScreen
          productData={mockProductData}
          onBack={handleBack}
          onCall={handleCall}
          onChat={handleChat}
          onToggleFavorite={handleToggleFavorite}
        />
      </SafeAreaView>

      <View className="absolute bottom-0 left-0 right-0 flex-row gap-3 border-t border-border/10 bg-surface p-4 dark:border-border-dark/10 dark:bg-surface-dark">
        <TouchableOpacity
          className="flex-1 items-center justify-center rounded-2xl bg-background-success-bold py-4 active:opacity-80 dark:bg-background-success-bold-dark"
          onPress={() => console.log('call')}
        >
          <Text className="text-base font-semibold text-white">Позвонить</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="h-16 w-16 items-center justify-center rounded-2xl bg-background-success-bold active:opacity-80 dark:bg-background-success-bold-dark"
          onPress={() => console.log('chat')}
        >
          <Ionicons name="chatbubble-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaProvider>
  );
}
