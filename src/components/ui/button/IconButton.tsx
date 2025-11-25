// TODO: depreacted

import { CustomTheme } from '@/theme';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = TouchableOpacityProps & {
  loading?: boolean;
  iconName: keyof typeof Ionicons.glyphMap;
  iconSize?: number;
  appearance?: 'primary' | 'secondary' | 'subtle';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
};

export const IconButton = ({
  loading,
  iconName,
  iconSize = 20,
  onPress,
  style,
  appearance = 'primary',
  size = 'medium',
  disabled = false,
  ...props
}: Props) => {
  const theme = useTheme() as CustomTheme;

  const styles = StyleSheet.create({
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 50, // Circular
    },
    small: {
      width: 32,
      height: 32,
    },
    medium: {
      width: 40,
      height: 40,
    },
    large: {
      width: 48,
      height: 48,
    },
    primary: {
      backgroundColor: theme.colors.primary,
    },
    secondary: {
      backgroundColor: theme.colors.button.subtle,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    subtle: {
      backgroundColor: 'transparent',
    },
    disabled: {
      opacity: 0.5,
    },
  });

  const getButtonStyle = () => {
    return [
      styles.button,
      size === 'small' && styles.small,
      size === 'medium' && styles.medium,
      size === 'large' && styles.large,
      appearance === 'primary' && styles.primary,
      appearance === 'secondary' && styles.secondary,
      appearance === 'subtle' && styles.subtle,
      (disabled || loading) && styles.disabled,
    ].filter(Boolean);
  };

  const getIconColor = () => {
    if (disabled || loading) {
      return theme.colors.text + '80'; // Semi-transparent
    }

    switch (appearance) {
      case 'primary':
        return '#FFFFFF';
      case 'secondary':
        return theme.colors.primary;
      case 'subtle':
        return theme.colors.primary;
      default:
        return '#FFFFFF';
    }
  };

  return (
    <TouchableOpacity style={[getButtonStyle(), style]} onPress={onPress} disabled={disabled || loading} {...props}>
      {loading ? <ActivityIndicator size="small" color={getIconColor()} /> : <Ionicons name={iconName} size={iconSize} color={getIconColor()} />}
    </TouchableOpacity>
  );
};
