import { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { TouchableHighlightRow } from '@/components/global/TouchableHighlightRow';
import React, { useCallback, useRef } from 'react';
import { DrivetrainCreateBottomSheet, options } from './DrivetrainCreateBottomSheet';

interface DrivetrainControllerWrapperProps {
  value?: string;
  onChange: (value: string) => void;
  error?: string;
}

const Wrapper = ({ value, onChange, error }: DrivetrainControllerWrapperProps) => {
  console.log('Rendering DrivetrainCreateBottomSheet Wrapper');
  const drivetrainModalRef = useRef<BottomSheetRef>(null);
  const handlePresentDrivetrainModalPress = useCallback(() => {
    drivetrainModalRef.current?.present();
  }, []);

  // Find the label for the current value
  const selectedLabel = React.useMemo(() => {
    return options.find(opt => opt.value === value)?.label;
  }, [value]);

  return (
    <>
      <TouchableHighlightRow
        variant="bordered"
        label={'Привод'}
        selectedValue={selectedLabel}
        onPress={handlePresentDrivetrainModalPress}
        rightIcon="chevron-down"
        required
        error={error}
      />
      <DrivetrainCreateBottomSheet
        ref={drivetrainModalRef}
        onChange={(drivetrain) => {
          onChange(drivetrain?.value || '');
          drivetrainModalRef.current?.close({ duration: 150 });
        }}
      />
    </>
  );
};

export const DrivetrainCreateBottomSheetControllerWrapper = React.memo(Wrapper);