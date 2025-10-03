import { FC } from "react";

type props = {
  disabled: boolean;
  value: boolean;
  onValueChange: (newValue: boolean) => void;
}

export const Checkbox: FC<props> = ({disabled, value, onValueChange}) => {
  return (
    <Checkbox
      disabled={false}
      value={value}
      onValueChange={onValueChange}
    />
  );
};
