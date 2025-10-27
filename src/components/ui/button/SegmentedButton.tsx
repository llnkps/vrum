import { CustomTheme } from '@/theme';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface TabButtonProps {
  title: string;
  isActive: boolean;
  onPress: () => void;
  icon?: string;
}

export const SegmentedButton: React.FC<TabButtonProps> = ({ title, isActive, onPress, icon }) => {
  const theme = useTheme() as CustomTheme;

  return (
    <TouchableOpacity
      className="flex-1 rounded-lg py-3"
      style={{ backgroundColor: isActive ? theme.colors.button.neutral : '' }}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View className="flex-row items-center justify-center">
        {icon && <Ionicons name={icon as any} size={18} color={theme.colors.icon} style={{ marginRight: 6 }} />}
        <Text className="text-base font-medium" style={{ color: theme.colors.text }}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
