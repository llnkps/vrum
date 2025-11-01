import { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { TouchableHighlightRow } from '@/components/global/TouchableHighlightRow';
import React, { useCallback, useRef } from 'react';
import { Controller, Control } from 'react-hook-form';
import { DrivetrainCreateBottomSheet } from './DrivetrainCreateBottomSheet';

interface DrivetrainControllerWrapperProps {
  control: Control<any>;
}

const Wrapper = ({ control }: DrivetrainControllerWrapperProps) => {
  const [selectedDrivetrain, setSelectedDrivetrain] = React.useState<string | undefined>(undefined);
  console.log('Rendering DrivetrainCreateBottomSheet Wrapper');
  const drivetrainModalRef = useRef<BottomSheetRef>(null);
  const handlePresentDrivetrainModalPress = useCallback(() => {
    drivetrainModalRef.current?.present();
  }, []);

  return (
    <>
      <Controller
        control={control}
        name="drivetrain"
        rules={{
          required: 'Выберите привод'
        }}
        render={({ field: _field, fieldState: { error } }) => (
          <>
            <TouchableHighlightRow
              variant="bordered"
              label={'Привод'}
              selectedValue={selectedDrivetrain ?? undefined}
              onPress={handlePresentDrivetrainModalPress}
              rightIcon="chevron-down"
              required
              error={error?.message}
            />
            <DrivetrainCreateBottomSheet
              ref={drivetrainModalRef}
              onChange={(drivetrain) => {
                _field.onChange(drivetrain?.value || '');
                setSelectedDrivetrain(drivetrain?.label || '');
                drivetrainModalRef.current?.close({ duration: 150 });
              }}
            />
          </>
        )}
      />
    </>
  );
};

export const DrivetrainCreateBottomSheetControllerWrapper = React.memo(Wrapper);