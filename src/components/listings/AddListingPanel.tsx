import React from 'react';
import {Text, View} from 'react-native';
import {CategoryButton} from './CategoryButton';
import {ListingCategory} from '@/constants/navigation';

interface BottomBarProps {
  onAddAd: (category: ListingCategory) => void;
}

export const AddListingPanel: React.FC<BottomBarProps> = ({ onAddAd }) => {
  return (
    <View className='absolute bottom-16 left-0 right-0 bg-white rounded-t-3xl px-4 pt-6 pb-10 shadow-lg'>
      <Text className='text-black text-lg font-bold mb-4'>
        Добавить объявление
      </Text>

      <View className='flex-row justify-between'>
        <CategoryButton
          title='Автомобили'
          icon='car-outline'
          onPress={() => onAddAd(ListingCategory.CARS)}
        />
        <CategoryButton
          title='Мотоциклы'
          icon='bicycle-outline'
          onPress={() => onAddAd(ListingCategory.MOTORCYCLES)}
        />
        <CategoryButton
          title='Запчасти'
          icon='settings-outline'
          onPress={() => onAddAd(ListingCategory.PARTS)}
        />
      </View>
    </View>
  );
};