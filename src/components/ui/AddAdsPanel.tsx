import React from 'react';
import { Text, View } from 'react-native';
import { AdsCategory } from '@/constants/navigation';
import { useRouter } from 'expo-router';
import { CategoryButton } from './button/CategoryButton';

interface BottomBarProps {
  onAddAd: (category: AdsCategory) => void;
}

export const AddAdsPanel: React.FC<BottomBarProps> = () => {
  const router = useRouter();

  return (
    <View className="absolute bottom-16 left-0 right-0 rounded-t-3xl border-t border-border bg-surface px-4 pb-10 pt-6 shadow-lg dark:border-border-dark dark:bg-surface-dark">
      {/* Заголовок */}
      <Text className="mb-4 text-lg font-bold text-font dark:text-font-dark">Добавить объявление</Text>

      {/* Кнопки категорий */}
      <View className="flex-row justify-between">
        <CategoryButton title="Автомобили" icon="car-outline" onPress={() => router.push('/(app)/advertisement/simple-auto')} />
        <CategoryButton title="Мотоциклы" icon="bicycle-outline" onPress={() => console.log('Мотоциклы')} />
        <CategoryButton title="Запчасти" icon="settings-outline" onPress={() => console.log('Запчасти')} />
      </View>
    </View>
  );
};
