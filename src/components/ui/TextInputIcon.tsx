import React from "react";
import { View, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function TextInputIcon() {
  return (
    <View className="flex-row items-center border border-gray-300 rounded-xl px-3 py-2 bg-white">
      <Ionicons name="search" size={20} color="gray" />
      <TextInput
        placeholder="Search"
        className="flex-1 ml-2 text-base text-black"
        placeholderTextColor="#9ca3af"
      />
    </View>
  );
}
