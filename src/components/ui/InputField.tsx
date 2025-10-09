import { CustomTheme } from "@/theme";
import { useTheme } from "@react-navigation/native";
import React from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";

type InputFieldProps = TextInputProps & {
  label?: string;
  isTextArea?: boolean;
  onChange?: (...event: any[]) => void;
  value?: string | number;
  Icon?: React.ReactElement;
  ref?: any;
  required?: boolean;
};
export const InputField = ({
  label,
  onChange,
  isTextArea,
  value,
  Icon,
  ref,
  required = false,
  ...props
}: InputFieldProps) => {
  const theme = useTheme() as CustomTheme;

  return (
    <View className="gap-y-1">
      {label && (
        <Text className="text-font dark:text-font-dark">
          {label}
          {required && <Text className="text-font-danger">*</Text>}
        </Text>
      )}

      <View className="flex-row items-center border border-border dark:border-border-dark rounded-xl px-2 bg-background-input dark:bg-background-input-dark">
        {Icon && Icon}
        <TextInput
          {...props}
          ref={ref}
          className="flex-1 ml-2 text-base text-font dark:text-font-dark placeholder:text-font dark:placeholder:text-font-dark"
          onChangeText={onChange}
          value={value}
          placeholderTextColor={theme.colors.input.placeholderColor}
        />
      </View>
    </View>
  );
};
