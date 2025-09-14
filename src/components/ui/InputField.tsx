import React from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';

type InputFieldProps = Omit<TextInputProps, 'ref'> & {
  label?: string;
  isTextArea?: boolean;
  onChange?: (...event: any[]) => void;
  value?: string;
  Icon?: React.ReactElement;
};
export const InputField = ({
  label,
  onChange,
  isTextArea,
  value,
  Icon,
  ...props
}: InputFieldProps) => {
  return (
    <View>
      {label && (
        <Text className="text-font dark:text-font-dark">
          {label}
        </Text>
      )}

      <View className="flex-row items-center border border-border dark:border-border-dark rounded-xl px-2 bg-background-input dark:bg-background-input-dark">

        {Icon && Icon}
        <TextInput
          {...props}
          className="flex-1 ml-2 text-base text-font dark:text-font-dark"
          onChangeText={onChange}
          value={value}
        />
      </View>
    </View>

  );
};