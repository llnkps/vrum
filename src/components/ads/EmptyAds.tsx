import React from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {AdsTab} from "@/constants/navigation";

interface EmptyStateProps {
  tab: AdsTab;
}

export const EmptyAds: React.FC<EmptyStateProps> = ({ tab }) => {
  const getEmptyStateContent = () => {
    if (tab === AdsTab.ACTIVE) {
      return {
        icon: 'newspaper-outline' as const,
        text: 'У вас нет активных объявлений'
      };
    } else {
      return {
        icon: 'newspaper-outline' as const,
        text: 'У вас нет архивных сообщений'
      };
    }
  };

  const { icon, text } = getEmptyStateContent();

  return (
    <View className='flex-1 justify-center items-center'>
      <Ionicons name={icon} size={64} className='mb-4' />
      <Text className='text-black text-center mx-10'>
        {text}
      </Text>
    </View>
  );
};