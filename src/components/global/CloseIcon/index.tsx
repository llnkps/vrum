import { FC } from "react";
import { GestureResponderEvent, TouchableOpacity } from "react-native";

import { CustomTheme } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

import clsx from "clsx";

type props = {
  onPress: (e: GestureResponderEvent) => void;
  className?: string;
  size?: number;
};

const CloseIcon: FC<props> = ({ onPress, className, size = 22 }) => {
  const theme = useTheme() as CustomTheme;

  return (
    <TouchableOpacity
      onPress={(e) => onPress(e)}
      className={clsx("p-1", className)}
    >
      <Ionicons name="close" size={size} color={theme.colors.icon} />
    </TouchableOpacity>
  );
};

export default CloseIcon;
