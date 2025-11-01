import { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { TouchableHighlightRow } from '@/components/global/TouchableHighlightRow';
import React, { useCallback, useRef } from 'react';
import { Controller, Control } from 'react-hook-form';
import { NumberOfOwnersCreateBottomSheet } from './NumberOfOwnersCreateBottomSheet';

interface NumberOfOwnersControllerWrapperProps {
  control: Control<any>;
}

const Wrapper = ({ control }: NumberOfOwnersControllerWrapperProps) => {
  const [selectedNumberOfOwners, setSelectedNumberOfOwners] = React.useState<string | undefined>(undefined);
  console.log('Rendering NumberOfOwnersCreateBottomSheet Wrapper');
  const numberOfOwnersModalRef = useRef<BottomSheetRef>(null);
  const handlePresentNumberOfOwnersModalPress = useCallback(() => {
    numberOfOwnersModalRef.current?.present();
  }, []);

  return (
    <>
      <Controller
        control={control}
        name="number_of_owners"
        rules={{
          required: 'Выберите количество владельцев'
        }}
        render={({ field: _field, fieldState: { error } }) => (
          <>
            <TouchableHighlightRow
              variant="bordered"
              label={'Количество владельцев'}
              selectedValue={selectedNumberOfOwners ?? undefined}
              onPress={handlePresentNumberOfOwnersModalPress}
              rightIcon="chevron-down"
              required
              error={error?.message}
            />
            <NumberOfOwnersCreateBottomSheet
              ref={numberOfOwnersModalRef}
              onChange={(numberOfOwners) => {
                _field.onChange(numberOfOwners?.value || '');
                setSelectedNumberOfOwners(numberOfOwners?.label || '');
                numberOfOwnersModalRef.current?.close({ duration: 150 });
              }}
            />
          </>
        )}
      />
    </>
  );
};

export const NumberOfOwnersCreateBottomSheetControllerWrapper = React.memo(Wrapper);