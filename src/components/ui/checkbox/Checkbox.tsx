import { FC } from 'react';

import { Checkbox as CheckboxExpo } from 'expo-checkbox';

type props = {
  value: boolean;
  onValueChange?: (newValue: boolean) => void;
  disabled?: boolean;
};

export const Checkbox: FC<props> = ({ value, onValueChange, disabled = false }) => {
  return <CheckboxExpo disabled={disabled} value={value} onValueChange={onValueChange} />;
};
