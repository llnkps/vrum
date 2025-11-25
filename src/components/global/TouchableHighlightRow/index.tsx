import { CustomTheme } from '@/theme';
import Entypo from '@expo/vector-icons/Entypo';
import { useTheme } from '@react-navigation/native';
import { FC, ReactNode } from 'react';
import { ActivityIndicator, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

export const getTouchableHighlightRowStyles = (appearance: 'default' | 'primary' | 'subtle', theme: CustomTheme): ViewStyle => {
  switch (appearance) {
    case 'primary':
      return { backgroundColor: theme.colors.button.neutral };
    case 'subtle':
      return { backgroundColor: theme.colors.card };
    case 'default':
    default:
      return { borderWidth: 1, borderColor: theme.colors.border, backgroundColor: 'transparent' };
  }
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonCenter: {
    justifyContent: 'center',
  },
  buttonSpaceBetween: {
    justifyContent: 'space-between',
  },
  containerBase: {
    marginVertical: 2,
  },
  containerFullWidth: {
    flex: 1,
  },
  containerBordered: {
    borderBottomWidth: 1,
  },
  containerDefault: {
    backgroundColor: 'transparent', // Will be overridden by theme
    borderRadius: 8,
  },
  containerButton: {
    backgroundColor: 'transparent', // Will be overridden by theme
    borderWidth: 1,
    borderRadius: 8,
  },
  iconContainer: {
    marginRight: 2,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtitle: {
    marginTop: 2,
  },
  error: {
    marginTop: 2,
  },
  // Text styles
  selectedValueReplace: {
    fontSize: 14, // text-sm
    fontWeight: 'bold',
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4, // gap-1
  },
  label: {
    fontWeight: 'bold',
  },
  required: {
    color: 'transparent', // Will be overridden by theme
  },
  subtitleText: {
    fontSize: 14, // text-sm
  },
  selectedValueUnder: {
    // Will be combined with theme colors
  },
  errorText: {
    fontSize: 14, // text-sm
  },
});

export type TouchableHighlightRowProps = {
  label: string;
  selectedValue?: string;
  onPress: () => void;
  icon?: ReactNode;
  rightIcon?: keyof typeof Entypo.glyphMap;
  showRightArrow?: boolean;
  appearance?: 'default' | 'primary' | 'subtle';
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
  appearance = 'default',
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

  const getContainerStyle = () => {
    const baseStyle: ViewStyle = {
      ...styles.containerBase,
      ...(fullWidth ? styles.containerFullWidth : {}),
    };

    const appearanceStyle = getTouchableHighlightRowStyles(appearance, theme);

    return StyleSheet.flatten([baseStyle, appearanceStyle, containerStyle]);
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
        style={StyleSheet.flatten([styles.button, centerText ? styles.buttonCenter : styles.buttonSpaceBetween])}
        rippleColor={theme.colors.border}
        enabled={!disabled}
      >
        <View style={styles.contentContainer}>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          <View>
            {selectedValue && selectedValueMode === 'replace' ? (
              <Text style={StyleSheet.flatten([styles.selectedValueReplace, { color: theme.colors.textSubtle }, selectedValueStyle])}>
                {selectedValue}
              </Text>
            ) : (
              <>
                <View style={styles.labelContainer}>
                  <Text
                    style={StyleSheet.flatten([
                      styles.label,
                      {
                        color: disabled ? theme.colors.tabBarInactiveTintColor : theme.colors.textSubtle,
                      },
                      labelStyle,
                    ])}
                  >
                    {label}
                  </Text>
                  {required && <Text style={StyleSheet.flatten([styles.required, { color: theme.colors.textDanger }])}>*</Text>}
                </View>

                {subtitle && (
                  <Text style={StyleSheet.flatten([styles.subtitleText, styles.subtitle, { color: theme.colors.textSubtle }])}>{subtitle}</Text>
                )}
                {selectedValue && selectedValueMode === 'under' && (
                  <Text style={StyleSheet.flatten([styles.selectedValueUnder, { color: theme.colors.textSubtle }, selectedValueStyle])}>
                    {selectedValue}
                  </Text>
                )}
                {error && <Text style={StyleSheet.flatten([styles.errorText, styles.error, { color: theme.colors.textDanger }])}>{error}</Text>}
              </>
            )}
          </View>
        </View>

        {!centerText && (
          <View style={styles.rightContainer}>
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
