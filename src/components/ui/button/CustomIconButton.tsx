import { CustomTheme } from '@/theme';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

type IconComponent = React.ComponentType<any>;

type Props = RectButtonProps & {
  loading?: boolean;
  iconName: string;
  iconComponent?: IconComponent;
  iconSize?: number;
  appearance?: 'primary' | 'default' | 'subtle';
  size?: 'small' | 'medium' | 'large';
};

export const CustomIconButton = ({
  loading,
  iconName,
  iconComponent: IconComp = Ionicons,
  iconSize,
  style,
  onPress,
  appearance = 'default',
  size = 'medium',
}: Props) => {
  const theme = useTheme() as CustomTheme;

  const getSize = () => {
    switch (size) {
      case 'small':
        return 32;
      case 'large':
        return 56;
      default: // medium
        return 44;
    }
  };

  const getIconSize = () => {
    if (iconSize) return iconSize;
    switch (size) {
      case 'small':
        return 16;
      case 'large':
        return 24;
      default: // medium
        return 20;
    }
  };

  const styles = StyleSheet.create({
    button: {
      width: getSize(),
      height: getSize(),
      borderRadius: getSize() / 2, // Full round
      justifyContent: 'center',
      alignItems: 'center',
    },

    primary: {
      backgroundColor: '#1868DB',
    },

    default: {
      borderColor: theme.colors.border,
      borderWidth: 1,
    },

    subtle: {
      backgroundColor: theme.colors.button.subtle,
    },
  });

  const getIconColor = () => {
    switch (appearance) {
      case 'primary':
        return '#fff';
      case 'subtle':
        return theme.colors.icon;
      default: // default
        return theme.colors.icon;
    }
  };

  return (
    <RectButton
      style={[
        styles.button,
        appearance === 'primary' && styles.primary,
        appearance === 'default' && styles.default,
        appearance === 'subtle' && styles.subtle,
        style,
      ]}
      borderless={false}
      onPress={onPress}
      rippleColor={theme.colors.button.subtlePressed}
    >
      {loading ? <ActivityIndicator size="small" color={getIconColor()} /> : <IconComp name={iconName} size={getIconSize()} color={getIconColor()} />}
    </RectButton>
  );
};
