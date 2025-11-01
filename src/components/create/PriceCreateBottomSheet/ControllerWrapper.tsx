import { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { TouchableHighlightRow } from '@/components/global/TouchableHighlightRow';
import React, { useCallback, useRef } from 'react';
import { Controller, Control } from 'react-hook-form';
import { PriceCreateBottomSheet } from './PriceCreateBottomSheet';

interface PriceControllerWrapperProps {
  control: Control<any>;
}

const Wrapper = ({ control }: PriceControllerWrapperProps) => {
  const [selectedPrice, setSelectedPrice] = React.useState<string | undefined>(undefined);
  console.log('Rendering PriceCreateBottomSheet Wrapper');
  const priceModalRef = useRef<BottomSheetRef>(null);
  const handlePresentPriceModalPress = useCallback(() => {
    priceModalRef.current?.present();
  }, []);

  return (
    <>
      <Controller
        control={control}
        name="price"
        rules={{
          required: 'Введите цену'
        }}
        render={({ field: _field, fieldState: { error } }) => (
          <>
            <TouchableHighlightRow
              variant="bordered"
              label={'Цена'}
              selectedValue={selectedPrice ?? undefined}
              onPress={handlePresentPriceModalPress}
              rightIcon="chevron-down"
              required
              error={error?.message}
            />
            <PriceCreateBottomSheet
              ref={priceModalRef}
              onChange={(price) => {
                _field.onChange(price);
                setSelectedPrice(price?.toString() || '');
                priceModalRef.current?.close({ duration: 150 });
              }}
            />
          </>
        )}
      />
    </>
  );
};

export const PriceCreateBottomSheetControllerWrapper = React.memo(Wrapper);