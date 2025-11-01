import { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { TouchableHighlightRow } from '@/components/global/TouchableHighlightRow';
import React, { useCallback, useRef } from 'react';
import { Controller, Control } from 'react-hook-form';
import EngineCapacityCreateBottomSheet from './EngineCapacityCreateBottomSheet';

interface EngineCapacityControllerWrapperProps {
  control: Control<any>;
}

const Wrapper = ({ control }: EngineCapacityControllerWrapperProps) => {
  const [selectedEngineCapacity, setSelectedEngineCapacity] = React.useState<string | undefined>(undefined);
  console.log('Rendering EngineCapacityCreateBottomSheet Wrapper');
  const engineCapacityModalRef = useRef<BottomSheetRef>(null);
  const handlePresentEngineCapacityModalPress = useCallback(() => {
    engineCapacityModalRef.current?.present();
  }, []);

  return (
    <>
      <Controller
        control={control}
        name="engine_capacity"
        rules={{
          required: 'Выберите объем двигателя'
        }}
        render={({ field: _field, fieldState: { error } }) => (
          <>
            <TouchableHighlightRow
              variant="bordered"
              label={'Объем двигателя'}
              selectedValue={selectedEngineCapacity ?? undefined}
              onPress={handlePresentEngineCapacityModalPress}
              rightIcon="chevron-down"
              required
              error={error?.message}
            />
            <EngineCapacityCreateBottomSheet
              ref={engineCapacityModalRef}
              onChange={(engineCapacity) => {
                console.log(engineCapacity)
                _field.onChange(engineCapacity);
                setSelectedEngineCapacity(engineCapacity?.toString() || '');
                engineCapacityModalRef.current?.close({ duration: 150 });
              }}
            />
          </>
        )}
      />
    </>
  );
};

export const EngineCapacityCreateBottomSheetControllerWrapper = React.memo(Wrapper);