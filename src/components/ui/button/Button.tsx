import { FC, ReactNode } from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";
import { Pressable } from "react-native-gesture-handler";

// use Pressable from react-native-gesture-handler package
// to use the button inside components like bottomsheet

type ButtonProps = {
  title?: string;
  onPress?: () => void;
  children?: ReactNode; // allows icons or custom content
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export const Button: FC<ButtonProps> = ({
  title,
  onPress,
  children,
  style,
  textStyle,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        pressed ? styles.pressed : styles.normal,
        style,
      ]}
    >
      {title ? <Text style={[styles.text, textStyle]}>{title}</Text> : children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  normal: {
    backgroundColor: "#007bff",
  },
  pressed: {
    backgroundColor: "#0056b3",
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
