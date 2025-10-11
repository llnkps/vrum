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
  error?: string;
};
export const InputField = ({
  label,
  onChange,
  isTextArea,
  value,
  Icon,
  ref,
  required = false,
  error,
  ...props
}: InputFieldProps) => {
  const theme = useTheme() as CustomTheme;

  return (
    <View className="gap-y-1 flex-1">
      {label && (
        <Text className="text-font dark:text-font-dark font-bold">
          {label}
          {required && <Text className="text-font-danger">*</Text>}
        </Text>
      )}

      <View className={`flex-row items-center border rounded-xl px-2 bg-background-input dark:bg-background-input-dark ${error ? 'border-font-danger' : 'border-border dark:border-border-dark'}`}>
        {Icon && Icon}
        <TextInput
          {...props}
          ref={ref}
          className="flex-1 ml-2 text-base text-font dark:text-font-dark placeholder:text-font dark:placeholder:text-font-dark py-2"
          onChangeText={onChange}
          value={value}
          placeholderTextColor={theme.colors.input.placeholderColor}
        />
      </View>
      {error && (
        <Text className="text-font-danger text-sm mt-1">
          {error}
        </Text>
      )}
    </View>
  );
};
