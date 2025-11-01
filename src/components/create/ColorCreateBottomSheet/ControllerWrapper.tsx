import { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { TouchableHighlightRow } from '@/components/global/TouchableHighlightRow';
import React, { useCallback, useRef } from 'react';
import { Controller, Control } from 'react-hook-form';
import { ColorCreateBottomSheet } from './ColorCreateBottomSheet';

interface ColorControllerWrapperProps {
  control: Control<any>;
}

const Wrapper = ({ control }: ColorControllerWrapperProps) => {
  const [selectedColor, setSelectedColor] = React.useState<string | undefined>(undefined);
  console.log('Rendering ColorCreateBottomSheet Wrapper');
  const colorModalRef = useRef<BottomSheetRef>(null);
  const handlePresentColorModalPress = useCallback(() => {
    colorModalRef.current?.present();
  }, []);

  return (
    <>
      <Controller
        control={control}
        name="color"
        rules={{
          required: 'Выберите цвет'
        }}
        render={({ field: _field, fieldState: { error } }) => (
          <>
            <TouchableHighlightRow
              variant="bordered"
              label={'Цвет'}
              selectedValue={selectedColor ?? undefined}
              onPress={handlePresentColorModalPress}
              rightIcon="chevron-down"
              required
              error={error?.message}
            />
            <ColorCreateBottomSheet
              ref={colorModalRef}
              onChange={(color) => {
                _field.onChange(color?.value || '');
                setSelectedColor(color?.label || '');
                colorModalRef.current?.close({ duration: 150 });
              }}
            />
          </>
        )}
      />
    </>
  );
};

export const ColorCreateBottomSheetControllerWrapper = React.memo(Wrapper);