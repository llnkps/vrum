import { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { TouchableHighlightRow } from '@/components/global/TouchableHighlightRow';
import React, { useCallback, useRef } from 'react';
import { Controller, Control } from 'react-hook-form';
import PowerCreateBottomSheet from './PowerCreateBottomSheet';

interface PowerControllerWrapperProps {
  control: Control<any>;
}

const Wrapper = ({ control }: PowerControllerWrapperProps) => {
  const [selectedPower, setSelectedPower] = React.useState<string | undefined>(undefined);
  console.log('Rendering PowerCreateBottomSheet Wrapper');
  const powerModalRef = useRef<BottomSheetRef>(null);
  const handlePresentPowerModalPress = useCallback(() => {
    powerModalRef.current?.present();
  }, []);

  return (
    <>
      <Controller
        control={control}
        name="power"
        rules={{
          required: 'Выберите мощность'
        }}
        render={({ field: _field, fieldState: { error } }) => (
          <>
            <TouchableHighlightRow
              variant="bordered"
              label={'Мощность'}
              selectedValue={selectedPower ?? undefined}
              onPress={handlePresentPowerModalPress}
              rightIcon="chevron-down"
              required
              error={error?.message}
            />
            <PowerCreateBottomSheet
              ref={powerModalRef}
              onChange={(power) => {
                if (!power) {
                  return;
                }
                _field.onChange(power);
                setSelectedPower(power?.toString() || '');
                powerModalRef.current?.close({ duration: 150 });
              }}
            />
          </>
        )}
      />
    </>
  );
};

export const PowerCreateBottomSheetControllerWrapper = React.memo(Wrapper);