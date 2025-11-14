import { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { TouchableHighlightRow } from '@/components/global/TouchableHighlightRow';
import React, { useCallback, useRef } from 'react';
import { ConditionCreateBottomSheet, options } from './ConditionCreateBottomSheet';

interface ConditionControllerWrapperProps {
  value?: string;
  onChange: (value: string) => void;
  error?: string;
}

const Wrapper = ({ value, onChange, error }: ConditionControllerWrapperProps) => {
  console.log('Rendering ConditionCreateBottomSheet Wrapper');
  const conditionModalRef = useRef<BottomSheetRef>(null);
  const handlePresentConditionModalPress = useCallback(() => {
    conditionModalRef.current?.present();
  }, []);

  // Find the label for the current value
  const selectedLabel = React.useMemo(() => {
    return options.find(opt => opt.value === value)?.label;
  }, [value]);

  return (
    <>
      <TouchableHighlightRow
        variant="bordered"
        label={'Состояние'}
        selectedValue={selectedLabel}
        onPress={handlePresentConditionModalPress}
        rightIcon="chevron-down"
        required
        error={error}
      />
      <ConditionCreateBottomSheet
        ref={conditionModalRef}
        onChange={condition => {
          onChange(condition?.value || '');
          conditionModalRef.current?.close({ duration: 150 });
        }}
      />
    </>
  );
};

export const ConditionCreateBottomSheetControllerWrapper = React.memo(Wrapper);
