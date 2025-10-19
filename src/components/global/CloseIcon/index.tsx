import { FC } from 'react';
import { ViewStyle, TextStyle } from 'react-native';

import { CustomTheme } from '@/theme';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';

import { RectButton } from 'react-native-gesture-handler';

type CloseIconProps = {
  onPress?: (pointerInside: boolean) => void;
  size?: number;
  color?: string;
  containerStyle?: ViewStyle;
  iconStyle?: TextStyle;
  disabled?: boolean;
  iconName?: 'close' | 'arrow-back';
};

const CloseIcon: FC<CloseIconProps> = ({ onPress, size = 22, color, containerStyle, iconStyle, disabled = false, iconName = 'close' }) => {
  const theme = useTheme() as CustomTheme;

  const iconColor = color || theme.colors.icon;

  const defaultContainerStyle: ViewStyle = {
    borderRadius: 9999,
    padding: 8,
  };

  return (
    <RectButton onPress={onPress} style={[defaultContainerStyle, containerStyle]} enabled={!disabled} rippleColor={theme.colors.button.subtlePressed}>
      <Ionicons name={iconName} size={size} color={iconColor} style={iconStyle} />
    </RectButton>
  );
};

export default CloseIcon;
