import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
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
                                                        }) => (
  <TouchableOpacity
    className='flex-1 flex-row items-center justify-center bg-neutral-700 py-4 mx-1 rounded-lg'
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Ionicons
      name={icon as any}
      size={20}
      color='white'
      style={{ marginRight: 8 }}
    />
    <Text className='text-center text-white font-medium'>
      {title}
    </Text>
  </TouchableOpacity>
);