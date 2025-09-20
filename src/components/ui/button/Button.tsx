import { CustomTheme } from "@/theme";
import { useTheme } from "@react-navigation/native";
import React, { FC, ReactNode } from "react";
import {
  Pressable as RNPressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";
import { Pressable as RNGHPressable } from "react-native-gesture-handler";

type ButtonProps = {
  title?: string;
  onPress?: () => void;
  children?: ReactNode; // allows icons or custom content
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  appearance?: "solid" | "outline" | "subtle";
  isSelected?: boolean;

  useNativePressable?: boolean; // force RN Pressable
};

export const Button: FC<ButtonProps> = ({
  title,
  onPress,
  children,
  style,
  textStyle,
  appearance = "solid",
  isSelected = false,
  useNativePressable = false,
}) => {
  const PressableComponent = useNativePressable ? RNPressable : RNGHPressable;

  const theme = useTheme() as CustomTheme;

  const styles = StyleSheet.create({
    base: {
      flex: 1,
      paddingVertical: 6,
      paddingHorizontal: 20,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 2,
    },
    // 🔹 Solid
    solid: {
      backgroundColor: "#007bff",
      borderColor: "#007bff",
    },
    solidPressed: {
      backgroundColor: "#0056b3",
      borderColor: "#0056b3",
    },

    // 🔹 Outline
    outline: {
      backgroundColor: "transparent",
      borderColor: "#007bff",
    },
    outlinePressed: {
      backgroundColor: "rgba(0, 123, 255, 0.1)",
      borderColor: "#0056b3",
    },

    // 🔹 Subtle
    subtle: {
      backgroundColor: theme.colors.button.subtle,
      borderColor: "transparent",
    },
    subtlePressed: {
      backgroundColor: theme.colors.button.subtlePressed,
      borderColor: "transparent",
    },

    // 🔹 Text
    text: {
      fontSize: 14,
      fontWeight: "600",
      color: theme.colors.text,
    },
  });

  return (
    <PressableComponent
      onPress={onPress}
      
      style={[
        styles.base,
          appearance === "solid" && styles.solid,
          appearance === "outline" && styles.outline,
          appearance === "subtle" &&
            (isSelected ? styles.subtlePressed : styles.subtle),
      ]}

      // TODO: return back after it will be fixed in the gesture package
      //   ({ pressed }: { pressed: boolean }) => {
      //   return [
          
      //     pressed &&
      //       (appearance === "solid"
      //         ? styles.solidPressed
      //         : appearance === "outline"
      //         ? styles.outlinePressed
      //         : styles.subtlePressed),
      //     style,
      //   ];
      // }}
    >
      {title ? <Text style={[styles.text, textStyle]}>{title}</Text> : children}
    </PressableComponent>
  );
};
