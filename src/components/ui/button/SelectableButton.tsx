import { CustomTheme } from '@/theme';
import { useTheme } from '@react-navigation/native';
import React, { PropsWithChildren } from 'react';
import { ActivityIndicator, StyleSheet, Text } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

type Props = PropsWithChildren<
  RectButtonProps & {
    loading?: boolean;
    title?: string;
    appearance?: 'primary' | 'default' | 'subtle';
    isSelected?: boolean;
  }
>;

export const SelectableButton = ({ loading, title, style, children, onPress, appearance = 'default', isSelected = false }: Props) => {
  const theme = useTheme() as CustomTheme;

  const styles = StyleSheet.create({
    button: {
      flex: 1,
      paddingVertical: 6,
      // paddingHorizontal: ,
      borderRadius: 8,
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: theme.colors.text,
      fontSize: 16,
      fontWeight: isSelected ? '600' : '400',
    },
    primary: {
      backgroundColor: isSelected ? '#1868DB' : '#1868DB',
      borderColor: isSelected ? '#1868DB' : '#1868DB',
    },
    subtle: {
      backgroundColor: isSelected ? theme.colors.button.subtlePressed : theme.colors.button.subtle,
      borderColor: 'transparent',
    },
  });

  return (
    <RectButton
      style={[styles.button, appearance === 'primary' && styles.primary, appearance === 'subtle' && styles.subtle, style]}
      borderless={false}
      onPress={onPress}
      rippleColor={theme.colors.button.subtlePressed}
    >
      {children ||
        (loading ? <ActivityIndicator size="small" color={isSelected ? 'white' : theme.colors.primary} /> : <Text style={styles.text}>{title}</Text>)}
    </RectButton>
  );
};
