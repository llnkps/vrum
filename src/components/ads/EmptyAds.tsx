import React from 'react';
import {Text, useColorScheme, View} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {AdsTab} from "@/constants/navigation";

interface EmptyStateProps {
  tab: AdsTab;
}

export const EmptyAds: React.FC<EmptyStateProps> = ({ tab }) => {
  const scheme = useColorScheme();

  const iconColor = scheme === "dark" ? "#96999E" : "#6B6E76";

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
      <Ionicons name={icon} size={64} className='mb-4' color={iconColor}/>
      <Text className='text-font dark:text-font-dark text-center mx-10'>
        {text}
      </Text>
    </View>
  );
};