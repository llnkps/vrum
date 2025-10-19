import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import type { KeyboardTypeOptions, TextInputProps } from 'react-native';

import { forwardRef } from 'react';
import { TextInput } from 'react-native-gesture-handler';

export interface BottomSheetFieldProps extends Omit<TextInputProps, 'onChangeText'> {
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
  placeholder?: string;
  autoFocus?: boolean;
  disabled?: boolean;
}

export const BottomSheetField = forwardRef<TextInput, BottomSheetFieldProps>(
  ({ value, onChangeText, keyboardType = 'default', placeholder, autoFocus = false, disabled = false, className, ...rest }, ref) => {
    return (
      <BottomSheetTextInput
        ref={ref}
        className={`rounded-md bg-background-input p-3 text-font dark:bg-background-input-dark dark:text-font-dark ${className || ''}`}
        keyboardType={keyboardType}
        placeholder={placeholder}
        placeholderTextColor="#6B6E76"
        autoFocus={autoFocus}
        value={value}
        onChangeText={onChangeText}
        editable={!disabled}
        {...rest}
      />
    );
  }
);

BottomSheetField.displayName = 'BottomSheetField';
