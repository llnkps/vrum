import { CustomTheme } from '@/theme';
import { useTheme } from '@react-navigation/native';
import { FC, ReactNode } from 'react';
import { Text, View, ViewStyle, TextStyle, ActivityIndicator } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Entypo from '@expo/vector-icons/Entypo';

import clsx from 'clsx';

type TouchableHighlightRowProps = {
  label: string;
  selectedValue?: string;
  onPress: () => void;
  icon?: ReactNode;
  rightIcon?: keyof typeof Entypo.glyphMap;
  showRightArrow?: boolean;
  variant?: 'default' | 'bordered' | 'plain' | 'button';
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  selectedValueStyle?: TextStyle;
  disabled?: boolean;
  subtitle?: string;
  loading?: boolean;
  fullWidth?: boolean;
  centerText?: boolean;
  selectedValueMode?: 'under' | 'replace';
  required?: boolean;
  error?: string;
};

export const TouchableHighlightRow: FC<TouchableHighlightRowProps> = ({
  label,
  selectedValue,
  onPress,
  icon,
  rightIcon,
  showRightArrow = true,
  variant = 'default',
  containerStyle,
  labelStyle,
  selectedValueStyle,
  disabled = false,
  subtitle,
  loading = false,
  fullWidth = false,
  centerText = false,
  selectedValueMode = 'under',
  required = false,
  error,
}) => {
  const theme = useTheme() as CustomTheme;

  const getButtonStyle = () => {
    return {
      paddingVertical: 12,
      paddingHorizontal: 14,
    };
  };

  const getContainerStyle = () => {
    const baseStyle: ViewStyle = {
      flex: fullWidth ? 1 : undefined,
    };

    switch (variant) {
      case 'bordered':
        return {
          ...baseStyle,
          borderBottomColor: theme.colors.border,
          borderBottomWidth: 1,
          ...containerStyle,
        };
      case 'plain':
        return {
          ...baseStyle,
          ...containerStyle,
        };
      case 'button':
        return {
          ...baseStyle,
          backgroundColor: theme.colors.button.neutral,
          borderColor: theme.colors.border,
          borderWidth: 1,
          borderRadius: 8,
          marginVertical: 2,
          ...containerStyle,
        };
      default:
        return {
          ...baseStyle,
          backgroundColor: theme.colors.background,
          borderRadius: 8,
          marginVertical: 2,
          ...containerStyle,
        };
    }
  };

  const handlePress = () => {
    if (!disabled && !loading) {
      onPress();
    }
  };
  return (
    <View style={getContainerStyle()}>
      <RectButton
        onPress={handlePress}
        style={{
          ...getButtonStyle(),
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: centerText ? 'center' : 'space-between',
        }}
        rippleColor={theme.colors.border}
        enabled={!disabled}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {icon && <View style={{ marginRight: 2 }}>{icon}</View>}
          <View>
            {selectedValue && selectedValueMode === 'replace' ? (
              <Text className="text-lg font-bold  text-font-subtle dark:text-font-subtle-dark" style={selectedValueStyle}>
                {selectedValue}
              </Text>
            ) : (
              <>
                <View className="align-items-center flex-row gap-1">
                  <Text
                    className={clsx('font-bold text-font dark:text-font-dark', {
                      'text-font dark:text-font-dark': !disabled,
                      'text-font-disabled dark:text-font-disabled-dark': disabled,
                    })}
                    style={labelStyle}
                  >
                    {label}
                  </Text>
                  <View>{required && <Text className="text-red-500">*</Text>}</View>
                </View>

                {subtitle && (
                  <Text className={clsx('text-sm text-font-subtle dark:text-font-subtle-dark')} style={{ marginTop: 2 }}>
                    {subtitle}
                  </Text>
                )}
                {selectedValue && selectedValueMode === 'under' && (
                  <Text className="text-font-subtle dark:text-font-subtle-dark" style={selectedValueStyle}>
                    {selectedValue}
                  </Text>
                )}
                {error && (
                  <Text className="text-sm text-red-500" style={{ marginTop: 2 }}>
                    {error}
                  </Text>
                )}
              </>
            )}
          </View>
        </View>

        {!centerText && (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {loading ? (
              <ActivityIndicator size="small" color={theme.colors.icon} />
            ) : (
              <>
                {rightIcon && <Entypo name={rightIcon} size={20} color={disabled ? theme.colors.icon + '80' : theme.colors.icon} />}
                {showRightArrow && !rightIcon && (
                  <Entypo name="chevron-right" size={20} color={disabled ? theme.colors.icon + '80' : theme.colors.icon} />
                )}
              </>
            )}
          </View>
        )}
      </RectButton>
    </View>
  );
};
