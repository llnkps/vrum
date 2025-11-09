import { CustomTheme } from '@/theme';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import React, { PropsWithChildren } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

type Props = PropsWithChildren<
  RectButtonProps & {
    loading?: boolean;
    title?: string;
    appearance?: 'primary' | 'default' | 'subtle';
    isSelected?: boolean;
    size?: 'small' | 'medium' | 'large';
  }
>;

export const CustomRectButton = ({ loading, title, style, children, onPress, appearance = 'default', isSelected = false, size = 'medium' }: Props) => {
  const theme = useTheme() as CustomTheme;

  const getPadding = () => {
    switch (size) {
      case 'small':
        return { paddingVertical: 4, paddingHorizontal: 8 };
      case 'large':
        return { paddingVertical: 16, paddingHorizontal: 32 };
      default: // medium
        return { paddingVertical: 12, paddingHorizontal: 24 };
    }
  };

  const getFontSize = () => {
    switch (size) {
      case 'small':
        return 14;
      case 'large':
        return 18;
      default: // medium
        return 16;
    }
  };

  const styles = StyleSheet.create({
    button: {
      ...getPadding(),
      borderRadius: 8,
    },
    text: {
      color: theme.colors.text,
      fontSize: getFontSize(),
    },

    primary: {
      backgroundColor: '#1868DB',
      color: '#fff',
      borderColor: 'transparent',
    },

    default: {
      // backgroundColor: theme.colors.button.neutral,
      borderColor: theme.colors.border,
      borderWidth: 1,
    },
  });

  return (
    <RectButton
      style={[styles.button, appearance === 'primary' && styles.primary, appearance === 'default' && styles.default, style]}
      borderless={false}
      onPress={onPress}
      rippleColor={theme.colors.button.subtlePressed}
    >
      {children ||
        (loading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <>
            <View className="flex-row items-center justify-between">
              <Text style={styles.text}>{title}</Text>
              {isSelected && <Feather name="check" size={getFontSize() - 2} color={theme.colors.icon} />}
            </View>
          </>
        ))}
    </RectButton>
  );
};
