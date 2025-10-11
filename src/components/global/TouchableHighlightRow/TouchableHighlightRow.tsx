import { CustomTheme } from "@/theme";
import { useTheme } from "@react-navigation/native";
import { FC, ReactNode } from "react";
import { Text, View, ViewStyle, TextStyle } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Entypo from "@expo/vector-icons/Entypo";

type TouchableHighlightRowProps = {
  label: string;
  selectedValue?: string;
  onPress: () => void;
  icon?: ReactNode;
  rightIcon?: keyof typeof Entypo.glyphMap;
  showRightArrow?: boolean;
  variant?: "default" | "bordered" | "plain";
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  selectedValueStyle?: TextStyle;
  disabled?: boolean;
  subtitle?: string;
};

export const TouchableHighlightRow: FC<TouchableHighlightRowProps> = ({
  label,
  selectedValue,
  onPress,
  icon,
  rightIcon,
  showRightArrow = true,
  variant = "default",
  containerStyle,
  labelStyle,
  selectedValueStyle,
  disabled = false,
  subtitle,
}) => {
  const theme = useTheme() as CustomTheme;

  const getButtonStyle = () => {
    return {
      paddingVertical: 12,
      paddingHorizontal: 16,
    };
  };

  const getContainerStyle = () => {
    const baseStyle: ViewStyle = {
      flex: 1,
    };

    switch (variant) {
      case "bordered":
        return {
          ...baseStyle,
          borderBottomColor: theme.colors.border,
          borderBottomWidth: 1,
          ...containerStyle,
        };
      case "plain":
        return {
          ...baseStyle,
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
    if (!disabled) {
      onPress();
    }
  };

  return (
    <View style={getContainerStyle()}>
      <RectButton
        onPress={handlePress}
        style={{ ...getButtonStyle(), flex: 1, flexDirection: "row", alignItems: "center" }}
        rippleColor={theme.colors.border}
        enabled={!disabled}
      >
        <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
          {icon && <View style={{ marginRight: 12 }}>{icon}</View>}
          <View style={{ flex: 1 }}>
            <Text
              className="text-font dark:text-font-dark font-bold"
              style={labelStyle}
            >
              {label}
            </Text>
            {subtitle && (
              <Text
                className="text-font-subtle dark:text-font-subtle-dark text-sm"
                style={{ marginTop: 2 }}
              >
                {subtitle}
              </Text>
            )}
            {selectedValue && (
              <Text
                className="text-font-subtle dark:text-font-subtle-dark"
                style={selectedValueStyle}
              >
                {selectedValue}
              </Text>
            )}
          </View>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {rightIcon && (
            <Entypo
              name={rightIcon}
              size={20}
              color={disabled ? theme.colors.icon + "80" : theme.colors.icon}
            />
          )}
          {showRightArrow && !rightIcon && (
            <Entypo
              name="chevron-right"
              size={20}
              color={disabled ? theme.colors.icon + "80" : theme.colors.icon}
            />
          )}
        </View>
      </RectButton>
    </View>
  );
};
