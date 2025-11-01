import { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { TouchableHighlightRow } from '@/components/global/TouchableHighlightRow';
import React, { useCallback, useRef } from 'react';
import { Controller, Control } from 'react-hook-form';
import MileageCreateBottomSheet from './MileageCreateBottomSheet';

interface MileageControllerWrapperProps {
  control: Control<any>;
}

const Wrapper = ({ control }: MileageControllerWrapperProps) => {
  const [selectedMileage, setSelectedMileage] = React.useState<string | undefined>(undefined);
  console.log('Rendering MileageCreateBottomSheet Wrapper');
  const mileageModalRef = useRef<BottomSheetRef>(null);
  const handlePresentMileageModalPress = useCallback(() => {
    mileageModalRef.current?.present();
  }, []);

  return (
    <>
      <Controller
        control={control}
        name="mileage"
        rules={{
          required: 'Выберите пробег'
        }}
        render={({ field: _field, fieldState: { error } }) => (
          <>
            <TouchableHighlightRow
              variant="bordered"
              label={'Пробег'}
              selectedValue={selectedMileage ?? undefined}
              onPress={handlePresentMileageModalPress}
              rightIcon="chevron-down"
              required
              error={error?.message}
            />
            <MileageCreateBottomSheet
              ref={mileageModalRef}
              onChange={(mileage) => {
                _field.onChange(mileage);
                setSelectedMileage(mileage?.toString() || '');
                mileageModalRef.current?.close({ duration: 150 });
              }}
            />
          </>
        )}
      />
    </>
  );
};

export const MileageCreateBottomSheetControllerWrapper = React.memo(Wrapper);