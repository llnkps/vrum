import { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { TouchableHighlightRow } from '@/components/global/TouchableHighlightRow';
import React, { useCallback, useRef } from 'react';
import { NumberOfOwnersCreateBottomSheet, options } from './NumberOfOwnersCreateBottomSheet';

interface NumberOfOwnersControllerWrapperProps {
  value?: string;
  onChange: (value: string) => void;
  error?: string;
}

const Wrapper = ({ value, onChange, error }: NumberOfOwnersControllerWrapperProps) => {
  console.log('Rendering NumberOfOwnersCreateBottomSheet Wrapper');
  const numberOfOwnersModalRef = useRef<BottomSheetRef>(null);
  const handlePresentNumberOfOwnersModalPress = useCallback(() => {
    numberOfOwnersModalRef.current?.present();
  }, []);

  // Find the label for the current value
  const selectedLabel = React.useMemo(() => {
    return options.find(opt => opt.value === value)?.label;
  }, [value]);

  return (
    <>
      <TouchableHighlightRow
        variant="bordered"
        label={'Количество владельцев'}
        selectedValue={selectedLabel}
        onPress={handlePresentNumberOfOwnersModalPress}
        rightIcon="chevron-down"
        required
        error={error}
      />
      <NumberOfOwnersCreateBottomSheet
        ref={numberOfOwnersModalRef}
        onChange={(numberOfOwners) => {
          onChange(numberOfOwners?.value || '');
          numberOfOwnersModalRef.current?.close({ duration: 150 });
        }}
      />
    </>
  );
};

export const NumberOfOwnersCreateBottomSheetControllerWrapper = React.memo(Wrapper);