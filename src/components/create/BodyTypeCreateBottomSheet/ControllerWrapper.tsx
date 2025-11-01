import { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { TouchableHighlightRow } from '@/components/global/TouchableHighlightRow';
import React, { useCallback, useRef } from 'react';
import { Control, Controller } from 'react-hook-form';
import { BodyTypeCreateBottomSheet } from './BodyTypeCreateBottomSheet';

interface BodyTypeControllerWrapperProps {
  control: Control<any>;
}

const Wrapper = ({ control }: BodyTypeControllerWrapperProps) => {
  const [selectedBodyType, setSelectedBodyType] = React.useState<string | undefined>(undefined);
  const bodyTypeModalRef = useRef<BottomSheetRef>(null);
  const handlePresentBodyTypeModalPress = useCallback(() => {
    bodyTypeModalRef.current?.present();
  }, []);

  return (
    <>
      <Controller
        control={control}
        name="body_type"
        rules={{
          required: 'Выберите тип кузова',
        }}
        render={({ field: _field, fieldState: { error } }) => (
          <>
            <TouchableHighlightRow
              variant="bordered"
              label={'Тип кузова'}
              selectedValue={selectedBodyType ?? undefined}
              onPress={handlePresentBodyTypeModalPress}
              rightIcon="chevron-down"
              required
              error={error?.message}
            />
            <BodyTypeCreateBottomSheet
              ref={bodyTypeModalRef}
              onChange={bodyType => {
                _field.onChange(bodyType?.value || '');
                setSelectedBodyType(bodyType?.label || '');
                bodyTypeModalRef.current?.close({ duration: 150 });
              }}
            />
          </>
        )}
      />
    </>
  );
};

export const BodyTypeCreateBottomSheetControllerWrapper = React.memo(Wrapper);
