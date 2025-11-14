import { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { TouchableHighlightRow } from '@/components/global/TouchableHighlightRow';
import React, { useCallback, useRef } from 'react';
import { TransmissionCreateBottomSheet, options } from './TransmissionCreateBottomSheet';

interface TransmissionControllerWrapperProps {
  value?: string;
  onChange: (value: string) => void;
  error?: string;
}

const Wrapper = ({ value, onChange, error }: TransmissionControllerWrapperProps) => {
  console.log('Rendering TransmissionCreateBottomSheet Wrapper');
  const transmissionModalRef = useRef<BottomSheetRef>(null);
  const handlePresentTransmissionModalPress = useCallback(() => {
    transmissionModalRef.current?.present();
  }, []);

  // Find the label for the current value
  const selectedLabel = React.useMemo(() => {
    return options.find(opt => opt.value === value)?.label;
  }, [value]);

  return (
    <>
      <TouchableHighlightRow
        variant="bordered"
        label={'Коробка передач'}
        selectedValue={selectedLabel}
        onPress={handlePresentTransmissionModalPress}
        rightIcon="chevron-down"
        required
        error={error}
      />
      <TransmissionCreateBottomSheet
        ref={transmissionModalRef}
        onChange={transmission => {
          onChange(transmission?.value || '');
          transmissionModalRef.current?.close({ duration: 150 });
        }}
      />
    </>
  );
};

export const TransmissionCreateBottomSheetControllerWrapper = React.memo(Wrapper);
