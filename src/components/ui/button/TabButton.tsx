// TODO: depreacted. Move functionality to CustomRectButton

import { CustomTheme } from '@/theme';
import { useTheme } from '@react-navigation/native';
import React, { PropsWithChildren } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

type Props = PropsWithChildren<
  RectButtonProps & {
    loading?: boolean;
    title?: string;
    isSelected?: boolean;
  }
>;

export const TabButton = ({ loading, title, style, children, onPress, isSelected = false }: Props) => {
  const theme = useTheme() as CustomTheme;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      borderBottomWidth: isSelected ? 2 : 0,
      borderBottomColor: isSelected ? theme.colors.primary : 'transparent',
    },
    button: {
      paddingVertical: 12,
      paddingHorizontal: 16,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: isSelected ? theme.colors.primary : theme.colors.text,
      fontSize: 16,
      fontWeight: isSelected ? '600' : '400',
    },
  });

  return (
    <View style={[styles.container, style]}>
      <RectButton style={styles.button} borderless={false} onPress={onPress} rippleColor={theme.colors.button.subtlePressed}>
        {children || (loading ? <ActivityIndicator size="small" color={theme.colors.primary} /> : <Text style={styles.text}>{title}</Text>)}
      </RectButton>
    </View>
  );
};
