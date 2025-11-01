import { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { TouchableHighlightRow } from '@/components/global/TouchableHighlightRow';
import React, { useCallback, useRef } from 'react';
import MileageCreateBottomSheet from './MileageCreateBottomSheet';

interface MileageControllerWrapperProps {
  value?: number;
  onChange: (value: number) => void;
  error?: string;
}

const Wrapper = ({ value, onChange, error }: MileageControllerWrapperProps) => {
  console.log('Rendering MileageCreateBottomSheet Wrapper');
  const mileageModalRef = useRef<BottomSheetRef>(null);
  const handlePresentMileageModalPress = useCallback(() => {
    mileageModalRef.current?.present();
  }, []);

  // Format the mileage value for display
  const selectedLabel = React.useMemo(() => {
    if (value === undefined || value === null) return undefined;
    return `${value.toLocaleString()} км`;
  }, [value]);

  return (
    <>
      <TouchableHighlightRow
        variant="bordered"
        label={'Пробег'}
        selectedValue={selectedLabel}
        onPress={handlePresentMileageModalPress}
        rightIcon="chevron-down"
        required
        error={error}
      />
      <MileageCreateBottomSheet
        ref={mileageModalRef}
        onChange={(mileage) => {
          if (mileage !== undefined) {
            onChange(mileage);
          }
          mileageModalRef.current?.close({ duration: 150 });
        }}
      />
    </>
  );
};

export const MileageCreateBottomSheetControllerWrapper = React.memo(Wrapper);