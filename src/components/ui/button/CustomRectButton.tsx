import { CustomTheme } from '@/theme';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import React, { PropsWithChildren } from 'react';
import { ActivityIndicator, Text, TextStyle, View, ViewStyle } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

export const getCustomRectButtonStyles = (
  appearance: 'primary' | 'default' | 'subtle',
  theme: CustomTheme,
  size: 'small' | 'medium' | 'large'
) => {
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

  const baseButton: ViewStyle = {
    ...getPadding(),
    borderRadius: 8,
  };

  const baseText: TextStyle = {
    fontSize: getFontSize(),
  };

  switch (appearance) {
    case 'primary':
      return {
        button: { ...baseButton, backgroundColor: theme.colors.button.neutral },
        text: { ...baseText, color: theme.colors.textSubtle },
      };
    case 'subtle':
      return {
        button: { ...baseButton, backgroundColor: theme.colors.card },
        text: { ...baseText, color: theme.colors.text },
      };
    case 'default':
    default:
      return {
        button: { ...baseButton, borderColor: theme.colors.border, borderWidth: 1, backgroundColor: 'transparent' },
        text: { ...baseText, color: theme.colors.text },
      };
  }
};

type Props = PropsWithChildren<
  RectButtonProps & {
    loading?: boolean;
    title?: string;
    appearance?: 'primary' | 'default' | 'subtle';
    isSelected?: boolean;
    size?: 'small' | 'medium' | 'large';
  }
>;

export const CustomRectButton = ({
  loading,
  title,
  style,
  children,
  onPress,
  appearance = 'default',
  isSelected = false,
  size = 'medium',
}: Props) => {
  const theme = useTheme() as CustomTheme;

  const appearanceStyles = getCustomRectButtonStyles(appearance, theme, size);

  return (
    <RectButton
      style={[appearanceStyles.button, style]}
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
              <Text style={appearanceStyles.text}>{title}</Text>
              {isSelected && <Feather name="check" size={(appearanceStyles.text.fontSize || 16) - 2} color={theme.colors.icon} />}
            </View>
          </>
        ))}
    </RectButton>
  );
};
