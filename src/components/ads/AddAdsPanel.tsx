import React from 'react';
import {Text, View} from 'react-native';
import {CategoryButton} from './CategoryButton';
import {AdsCategory} from '@/constants/navigation';

interface BottomBarProps {
  onAddAd: (category: AdsCategory) => void;
}

export const AddAdsPanel: React.FC<BottomBarProps> = ({ onAddAd }) => {
  return (
    <View className='absolute bottom-16 left-0 right-0 bg-surface dark:bg-surface-dark rounded-t-3xl px-4 pt-6 pb-10 shadow-lg border-t border-border dark:border-border-dark'>
      <Text className='text-font dark:text-font-dark text-lg font-bold mb-4'>
        Добавить объявление
      </Text>

      <View className='flex-row justify-between'>
        <CategoryButton
          title='Автомобили'
          icon='car-outline'
          onPress={() => onAddAd(AdsCategory.CARS)}
        />
        <CategoryButton
          title='Мотоциклы'
          icon='bicycle-outline'
          onPress={() => onAddAd(AdsCategory.MOTORCYCLES)}
        />
        <CategoryButton
          title='Запчасти'
          icon='settings-outline'
          onPress={() => onAddAd(AdsCategory.PARTS)}
        />
      </View>
    </View>
  );
};