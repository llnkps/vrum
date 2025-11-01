import { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { TouchableHighlightRow } from '@/components/global/TouchableHighlightRow';
import React, { useCallback, useRef } from 'react';
import { Controller, Control } from 'react-hook-form';
import { ConditionCreateBottomSheet } from './ConditionCreateBottomSheet';

interface ConditionControllerWrapperProps {
  control: Control<any>;
}

const Wrapper = ({ control }: ConditionControllerWrapperProps) => {
  const [selectedCondition, setSelectedCondition] = React.useState<string | undefined>(undefined);
  console.log('Rendering ConditionCreateBottomSheet Wrapper');
  const conditionModalRef = useRef<BottomSheetRef>(null);
  const handlePresentConditionModalPress = useCallback(() => {
    conditionModalRef.current?.present();
  }, []);

  return (
    <>
      <Controller
        control={control}
        name="condition"
        rules={{
          required: 'Выберите состояние'
        }}
        render={({ field: _field, fieldState: { error } }) => (
          <>
            <TouchableHighlightRow
              variant="bordered"
              label={'Состояние'}
              selectedValue={selectedCondition ?? undefined}
              onPress={handlePresentConditionModalPress}
              rightIcon="chevron-down"
              required
              error={error?.message}
            />
            <ConditionCreateBottomSheet
              ref={conditionModalRef}
              onChange={(condition) => {
                _field.onChange(condition?.value || '');
                setSelectedCondition(condition?.label || '');
                conditionModalRef.current?.close({ duration: 150 });
              }}
            />
          </>
        )}
      />
    </>
  );
};

export const ConditionCreateBottomSheetControllerWrapper = React.memo(Wrapper);