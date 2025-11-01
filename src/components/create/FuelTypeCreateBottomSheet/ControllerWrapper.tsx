import { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { TouchableHighlightRow } from '@/components/global/TouchableHighlightRow';
import React, { useCallback, useRef } from 'react';
import { Controller, Control } from 'react-hook-form';
import { FuelTypeCreateBottomSheet } from './FuelTypeCreateBottomSheet';

interface FuelTypeControllerWrapperProps {
  control: Control<any>;
}

const Wrapper = ({ control }: FuelTypeControllerWrapperProps) => {
  const [selectedFuelType, setSelectedFuelType] = React.useState<string | undefined>(undefined);
  console.log('Rendering FuelTypeCreateBottomSheet Wrapper');
  const fuelTypeModalRef = useRef<BottomSheetRef>(null);
  const handlePresentFuelTypeModalPress = useCallback(() => {
    fuelTypeModalRef.current?.present();
  }, []);

  return (
    <>
      <Controller
        control={control}
        name="fuel_type"
        rules={{
          required: 'Выберите тип топлива',
        }}
        render={({ field: _field, fieldState: { error } }) => (
          <>
            <TouchableHighlightRow
              variant="bordered"
              label={'Тип топлива'}
              onPress={handlePresentFuelTypeModalPress}
              selectedValue={selectedFuelType ?? undefined}
              rightIcon="chevron-down"
              error={error?.message}
            />
            <FuelTypeCreateBottomSheet
              ref={fuelTypeModalRef}
              onChange={fuelType => {
                // setValue('fuel_type', fuelType?.value || '');

                _field.onChange(fuelType?.value || '');
                setSelectedFuelType(fuelType?.label || '');
                fuelTypeModalRef.current?.close({ duration: 150 });
              }}
            />
          </>
        )}
      />
    </>
  );
};

export const FuelTypeCreateBottomSheetControllerWrapper = React.memo(Wrapper);
