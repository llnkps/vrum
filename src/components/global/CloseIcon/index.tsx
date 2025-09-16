import { FC } from 'react';
import { GestureResponderEvent, TouchableOpacity } from 'react-native';

import { CustomTheme } from '@/theme';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';

import clsx from "clsx";

type props = {
  onPress: (e: GestureResponderEvent) => void;
  className?: string;
}

const CloseIcon: FC<props> = ({ onPress, className }) => {
  const theme = useTheme() as CustomTheme;

  return (
    <TouchableOpacity
      onPress={(e) => onPress(e)}
      className={clsx("p-2", className)}
    >
      <Ionicons name="close" size={22} color={theme.colors.icon} />
    </TouchableOpacity>
  )
}

export default CloseIcon;