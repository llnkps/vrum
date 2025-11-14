import { CustomTheme } from '@/theme';
import { useTheme } from '@react-navigation/native';
import { FC, ReactNode } from 'react';
import { Text, View, ViewStyle, TextStyle, ActivityIndicator, StyleSheet } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Entypo from '@expo/vector-icons/Entypo';

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
    fontSize: 18, // text-lg
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

  const getContainerStyle = () => {
    const baseStyle: ViewStyle = {
      ...styles.containerBase,
      ...(fullWidth ? styles.containerFullWidth : {}),
    };

    switch (variant) {
      case 'bordered':
        return StyleSheet.flatten([
          baseStyle,
          styles.containerBordered,
          { borderBottomColor: theme.colors.border },
          containerStyle,
        ]);
      case 'plain':
        return StyleSheet.flatten([baseStyle, containerStyle]);
      case 'button':
        return StyleSheet.flatten([
          baseStyle,
          styles.containerButton,
          {
            backgroundColor: theme.colors.button.neutral,
            borderColor: theme.colors.border,
          },
          containerStyle,
        ]);
      default:
        return StyleSheet.flatten([
          baseStyle,
          styles.containerDefault,
          { backgroundColor: theme.colors.background },
          containerStyle,
        ]);
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
        style={StyleSheet.flatten([
          styles.button,
          centerText ? styles.buttonCenter : styles.buttonSpaceBetween,
        ])}
        rippleColor={theme.colors.border}
        enabled={!disabled}
      >
        <View style={styles.contentContainer}>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          <View>
            {selectedValue && selectedValueMode === 'replace' ? (
              <Text
                style={StyleSheet.flatten([
                  styles.selectedValueReplace,
                  { color: theme.colors.text },
                  selectedValueStyle,
                ])}
              >
                {selectedValue}
              </Text>
            ) : (
              <>
                <View style={styles.labelContainer}>
                  <Text
                    style={StyleSheet.flatten([
                      styles.label,
                      {
                        color: disabled
                          ? theme.colors.tabBarInactiveTintColor
                          : theme.colors.text,
                      },
                      labelStyle,
                    ])}
                  >
                    {label}
                  </Text>
                  {required && (
                    <Text style={StyleSheet.flatten([styles.required, { color: theme.colors.textDanger }])}>
                      *
                    </Text>
                  )}
                </View>

                {subtitle && (
                  <Text
                    style={StyleSheet.flatten([
                      styles.subtitleText,
                      styles.subtitle,
                      { color: theme.colors.tabBarInactiveTintColor },
                    ])}
                  >
                    {subtitle}
                  </Text>
                )}
                {selectedValue && selectedValueMode === 'under' && (
                  <Text
                    style={StyleSheet.flatten([
                      styles.selectedValueUnder,
                      { color: theme.colors.tabBarInactiveTintColor },
                      selectedValueStyle,
                    ])}
                  >
                    {selectedValue}
                  </Text>
                )}
                {error && (
                  <Text
                    style={StyleSheet.flatten([
                      styles.errorText,
                      styles.error,
                      { color: theme.colors.textDanger },
                    ])}
                  >
                    {error}
                  </Text>
                )}
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
