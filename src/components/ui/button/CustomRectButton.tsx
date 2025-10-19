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
  }
>;

export const CustomRectButton = ({ loading, title, style, children, onPress, appearance = 'default', isSelected = false }: Props) => {
  const theme = useTheme() as CustomTheme;

  const styles = StyleSheet.create({
    button: {
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
    },
    text: {
      color: theme.colors.text,
      fontSize: 16,
    },

    primary: {
      backgroundColor: '#1868DB',
      color: '#fff',
      borderColor: 'transparent',
    },
  });

  return (
    <RectButton
      style={[styles.button, appearance === 'primary' && styles.primary, style]}
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
              {isSelected && <Feather name="check" size={18} color={theme.colors.icon} />}
            </View>
          </>
        ))}
    </RectButton>
  );
};
