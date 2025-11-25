import { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { TouchableHighlightRow } from '@/components/global/TouchableHighlightRow';
import React, { useCallback, useRef } from 'react';
import EngineCapacityCreateBottomSheet from './EngineCapacityCreateBottomSheet';

interface EngineCapacityControllerWrapperProps {
  value?: number;
  onChange: (value: number) => void;
  error?: string;
}

const Wrapper = ({ value, onChange, error }: EngineCapacityControllerWrapperProps) => {
  console.log('Rendering EngineCapacityCreateBottomSheet Wrapper');
  const engineCapacityModalRef = useRef<BottomSheetRef>(null);
  const handlePresentEngineCapacityModalPress = useCallback(() => {
    engineCapacityModalRef.current?.present();
  }, []);

  return (
    <>
      <TouchableHighlightRow
        variant="bordered"
        label={'Объем двигателя'}
        selectedValue={value ? value.toString() : undefined}
        onPress={handlePresentEngineCapacityModalPress}
        rightIcon="chevron-down"
        required
        error={error}
      />
      <EngineCapacityCreateBottomSheet
        ref={engineCapacityModalRef}
        onChange={engineCapacity => {
          console.log(engineCapacity);
          if (engineCapacity !== undefined) {
            onChange(engineCapacity);
          }
          engineCapacityModalRef.current?.close({ duration: 150 });
        }}
      />
    </>
  );
};

export const EngineCapacityCreateBottomSheetControllerWrapper = React.memo(Wrapper);
