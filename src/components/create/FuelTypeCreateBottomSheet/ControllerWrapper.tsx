import { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { TouchableHighlightRow } from '@/components/global/TouchableHighlightRow';
import React, { useCallback, useRef } from 'react';
import { FuelTypeCreateBottomSheet, options } from './FuelTypeCreateBottomSheet';

interface FuelTypeControllerWrapperProps {
  value?: string;
  onChange: (value: string) => void;
  error?: string;
}

const Wrapper = ({ value, onChange, error }: FuelTypeControllerWrapperProps) => {
  console.log('Rendering FuelTypeCreateBottomSheet Wrapper');
  const fuelTypeModalRef = useRef<BottomSheetRef>(null);
  const handlePresentFuelTypeModalPress = useCallback(() => {
    fuelTypeModalRef.current?.present();
  }, []);

  // Find the label for the current value
  const selectedLabel = React.useMemo(() => {
    return options.find(opt => opt.value === value)?.label;
  }, [value]);

  return (
    <>
      <TouchableHighlightRow
        variant="bordered"
        label={'Тип топлива'}
        selectedValue={selectedLabel}
        onPress={handlePresentFuelTypeModalPress}
        rightIcon="chevron-down"
        error={error}
      />
      <FuelTypeCreateBottomSheet
        ref={fuelTypeModalRef}
        onChange={fuelType => {
          onChange(fuelType?.value || '');
          fuelTypeModalRef.current?.close({ duration: 150 });
        }}
      />
    </>
  );
};

export const FuelTypeCreateBottomSheetControllerWrapper = React.memo(Wrapper);
