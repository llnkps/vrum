import { CustomTheme } from '@/theme';
import { useTheme } from '@react-navigation/native';
import { FC, ReactNode } from 'react';
import { Text, View, ViewStyle, TextStyle, ActivityIndicator } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Entypo from '@expo/vector-icons/Entypo';

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
  noBorder?: boolean;
  borderRadiusTopLeft?: number;
  borderRadiusTopRight?: number;
  borderRadiusBottomLeft?: number;
  borderRadiusBottomRight?: number;
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
  noBorder = false,
  borderRadiusBottomLeft,
  borderRadiusBottomRight,
  borderRadiusTopLeft,
  borderRadiusTopRight,
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
      borderRadius: 8,
      marginVertical: 2,
      borderTopLeftRadius: borderRadiusTopLeft ?? 8,
      borderTopRightRadius: borderRadiusTopRight ?? 8,
      borderBottomLeftRadius: borderRadiusBottomLeft ?? 8,
      borderBottomRightRadius: borderRadiusBottomRight ?? 8,
    };

    if (!noBorder) {
      baseStyle.borderWidth = 1;
      baseStyle.borderColor = theme.colors.border;
    }

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
          ...containerStyle,
        };
      default:
        return {
          ...baseStyle,
          backgroundColor: theme.colors.background,
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
              <Text className="text-lg font-bold" style={[selectedValueStyle, { color: theme.colors.textSubtle }]}>
                {selectedValue}
              </Text>
            ) : (
              <>
                <View className="align-items-center flex-row gap-1">
                  <Text className="font-bold" style={[labelStyle, { color: disabled ? theme.colors.text + '80' : theme.colors.text }]}>
                    {label}
                  </Text>
                  <View>{required && <Text className="text-red-500">*</Text>}</View>
                </View>

                {subtitle && (
                  <Text className="text-sm" style={{ marginTop: 2, color: theme.colors.textSubtle }}>
                    {subtitle}
                  </Text>
                )}
                {selectedValue && selectedValueMode === 'under' && (
                  <Text style={[selectedValueStyle, { color: theme.colors.textSubtle }]}>{selectedValue}</Text>
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
