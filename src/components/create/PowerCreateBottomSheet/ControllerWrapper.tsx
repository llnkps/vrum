import { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { TouchableHighlightRow } from '@/components/global/TouchableHighlightRow';
import React, { useCallback, useRef } from 'react';
import PowerCreateBottomSheet from './PowerCreateBottomSheet';

interface PowerControllerWrapperProps {
  value?: number;
  onChange: (value: number) => void;
  error?: string;
}

const Wrapper = ({ value, onChange, error }: PowerControllerWrapperProps) => {
  console.log('Rendering PowerCreateBottomSheet Wrapper');
  const powerModalRef = useRef<BottomSheetRef>(null);
  const handlePresentPowerModalPress = useCallback(() => {
    powerModalRef.current?.present();
  }, []);

  return (
    <>
      <TouchableHighlightRow
        variant="bordered"
        label={'Мощность'}
        selectedValue={value ? value.toString() : undefined}
        onPress={handlePresentPowerModalPress}
        rightIcon="chevron-down"
        required
        error={error}
      />
      <PowerCreateBottomSheet
        ref={powerModalRef}
        onChange={power => {
          if (!power) {
            return;
          }
          onChange(power);
          powerModalRef.current?.close({ duration: 150 });
        }}
      />
    </>
  );
};

export const PowerCreateBottomSheetControllerWrapper = React.memo(Wrapper);
