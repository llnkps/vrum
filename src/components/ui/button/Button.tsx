import { CustomTheme } from '@/theme';
import { useTheme } from '@react-navigation/native';
import React, { PropsWithChildren } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableHighlight, TouchableHighlightProps, View, ViewStyle } from 'react-native';

type Props = PropsWithChildren<
  TouchableHighlightProps & {
    loading?: boolean;
    title?: string;
    appearance?: 'default' | 'subtle';
    isSelected?: boolean;
    buttonStyle?: ViewStyle;
  }
>;

export const Button = ({
  disabled,
  loading,
  title,
  onPress,
  onPressIn,
  style,
  buttonStyle,
  children,
  appearance = 'default',
  isSelected = false,
}: Props) => {
  const theme = useTheme() as CustomTheme;

  const styles = StyleSheet.create({
    // default
    default: {
      backgroundColor: theme.colors.button.subtlePressed, // TODO: change it
      borderColor: 'transparent',
    },

    // TODO: update to selected colors
    defaultPressed: {
      backgroundColor: '#0056b3',
      borderColor: '#0056b3',
    },

    // Subtle
    subtle: {
      backgroundColor: theme.colors.button.subtle,
      borderColor: 'transparent',
    },
    subtlePressed: {
      backgroundColor: theme.colors.button.subtlePressed,
      borderColor: 'transparent',
    },

    container: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 6,
      paddingHorizontal: 20,
      borderRadius: 8,
      borderWidth: 2,
    },
    disabledButton: {
      // backgroundColor: Colors.disabled,
    },
    label: {
      color: '#ffffff',
      fontWeight: '700',
    },
  });

  return (
    <View style={[styles.container, style]}>
      <TouchableHighlight
        style={[
          styles.button,
          appearance === 'default' && (isSelected ? styles.defaultPressed : styles.default),
          appearance === 'subtle' && (isSelected ? styles.subtlePressed : styles.subtle),
          disabled && styles.disabledButton,
          buttonStyle,
        ]}
        disabled={disabled || loading}
        onPressIn={onPressIn}
        onPress={onPress}
        underlayColor={'#5944ed'}
      >
        {children || (loading ? <ActivityIndicator size="small" color="white" /> : <Text style={styles.label}>{title}</Text>)}
      </TouchableHighlight>
    </View>
  );
};
