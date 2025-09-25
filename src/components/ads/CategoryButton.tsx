import React from 'react';
import {Text, TouchableOpacity, useColorScheme} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface AddAdButtonProps {
  title: string;
  icon: string;
  onPress: () => void;
}

export const CategoryButton: React.FC<AddAdButtonProps> = ({
                                                          title,
                                                          icon,
                                                          onPress
                                                        }) => {
  const scheme = useColorScheme();

  const iconColor = scheme === "dark" ? "#E9F2FE" : "#FFFFFF" ;

  return (
  <TouchableOpacity
    className='flex-1 flex-row items-center justify-center bg-background-brand-bold dark:bg-background-brand-bold-dark py-4 mx-1 rounded-lg active:bg-background-brand-bold-pressed dark:active:bg-background-brand-bold-dark-pressed'
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Ionicons
      name={icon as any}
      size={20}
      color={iconColor}
      style={{ marginRight: 8 }}
    />
    <Text className='text-center text-white font-medium'>
      {title}
    </Text>
  </TouchableOpacity>
)};