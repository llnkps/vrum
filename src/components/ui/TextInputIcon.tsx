import React from "react";
import { View, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function TextInputIcon() {
  return (
    <View className="flex-row items-center border border-border dark:border-border-dark rounded-xl px-2 bg-background-input dark:bg-background-input-dark">
      <Ionicons name="search" size={20} color="gray" />
      <TextInput
        placeholder="Search"
        className="flex-1 ml-2 text-base text-font dark:text-font-dark"
        placeholderTextColor="#9ca3af"
      />
    </View>
  );
}
