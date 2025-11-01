import { CustomTheme } from '@/theme';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Text, TextInput, TextInputProps, View, ViewStyle } from 'react-native';

type InputFieldProps = TextInputProps & {
  label?: string;
  onChange?: (...event: any[]) => void;
  value?: string | number;
  Icon?: React.ReactElement;
  ref?: any;
  required?: boolean;
  error?: string;
  wrapperStyle?: ViewStyle;
};
export const InputField = ({ label, onChange, value, Icon, ref, required = false, error, wrapperStyle, ...props }: InputFieldProps) => {
  const theme = useTheme() as CustomTheme;

  return (
    <View className="gap-1" style={wrapperStyle}>
      {label && (
        <View className="flex-row gap-1">
          <Text className="font-bold text-font dark:text-font-dark">
            {label}
          </Text>
          {required && <Text className="text-font-danger">*</Text>}
        </View>
      )}

      <View
        className={`flex-row items-center rounded-xl border bg-background-input px-2 dark:bg-background-input-dark ${error ? 'border-font-danger' : 'border-border dark:border-border-dark'}`}
      >
        {Icon && Icon}
        <TextInput
          {...props}
          ref={ref}
          className="ml-2 flex-1 py-2 text-base text-font dark:text-font-dark"
          onChangeText={onChange}
          value={value}
          placeholderTextColor={theme.colors.input.placeholderColor}
        />
      </View>
      {error && <Text className="mt-1 text-sm text-font-danger">{error}</Text>}
    </View>
  );
};
