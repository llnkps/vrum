import { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { TouchableHighlightRow } from '@/components/global/TouchableHighlightRow';
import React, { useCallback, useRef } from 'react';
import { Controller, Control } from 'react-hook-form';
import { TransmissionCreateBottomSheet } from './TransmissionCreateBottomSheet';

interface TransmissionControllerWrapperProps {
  control: Control<any>;
}

const Wrapper = ({ control }: TransmissionControllerWrapperProps) => {
  const [selectedTransmission, setSelectedTransmission] = React.useState<string | undefined>(undefined);
  console.log('Rendering TransmissionCreateBottomSheet Wrapper');
  const transmissionModalRef = useRef<BottomSheetRef>(null);
  const handlePresentTransmissionModalPress = useCallback(() => {
    transmissionModalRef.current?.present();
  }, []);

  return (
    <>
      <Controller
        control={control}
        name="transmission"
        rules={{
          required: 'Выберите коробку передач'
        }}
        render={({ field: _field, fieldState: { error } }) => (
          <>
            <TouchableHighlightRow
              variant="bordered"
              label={'Коробка передач'}
              selectedValue={selectedTransmission ?? undefined}
              onPress={handlePresentTransmissionModalPress}
              rightIcon="chevron-down"
              required
              error={error?.message}
            />
            <TransmissionCreateBottomSheet
              ref={transmissionModalRef}
              onChange={(transmission) => {
                _field.onChange(transmission?.value || '');
                setSelectedTransmission(transmission?.label || '');
                transmissionModalRef.current?.close({ duration: 150 });
              }}
            />
          </>
        )}
      />
    </>
  );
};

export const TransmissionCreateBottomSheetControllerWrapper = React.memo(Wrapper);