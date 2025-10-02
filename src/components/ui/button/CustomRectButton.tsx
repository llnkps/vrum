import { CustomTheme } from "@/theme";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import React, { PropsWithChildren } from "react";
import { ActivityIndicator, StyleSheet, Text, View, ViewStyle } from "react-native";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";

type Props = PropsWithChildren<
  RectButtonProps & {
    loading?: boolean;
    title?: string;
    appearance?: "default" | "subtle";
    isSelected?: boolean;
    buttonStyle?: ViewStyle;
  }
>;

export const CustomRectButton = ({
  loading,
  title,
  style,
  buttonStyle,
  children,
  onPress,
  appearance = "default",
  isSelected = false,
}: Props) => {
  const theme = useTheme() as CustomTheme;

  const styles = StyleSheet.create({
    button: {
      paddingVertical: 12,
      paddingHorizontal: 24,
    },
    text: {
      color: theme.colors.text,
      fontSize: 16,
    },
  });

  return (
    <RectButton
      style={[styles.button, style, buttonStyle]}
      borderless={false}
      onPress={onPress}
      rippleColor={theme.colors.button.subtlePressed}
    >
      {children ||
        (loading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <>
            <View className="flex-row justify-between items-center">
              <Text style={styles.text}>{title}</Text>
              {isSelected && (
                <Feather name="check" size={18} color={theme.colors.icon} />
              )}
            </View>
          </>
        ))}
    </RectButton>
  );
};
