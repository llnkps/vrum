import { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { TouchableHighlightRow } from '@/components/global/TouchableHighlightRow';
import React, { useCallback, useRef } from 'react';
import { PriceCreateBottomSheet } from './PriceCreateBottomSheet';

interface PriceControllerWrapperProps {
  value?: number;
  onChange: (value: number) => void;
  error?: string;
}

const Wrapper = ({ value, onChange, error }: PriceControllerWrapperProps) => {
  console.log('Rendering PriceCreateBottomSheet Wrapper');
  const priceModalRef = useRef<BottomSheetRef>(null);
  const handlePresentPriceModalPress = useCallback(() => {
    priceModalRef.current?.present();
  }, []);

  // Format the price value for display
  const selectedLabel = React.useMemo(() => {
    if (value === undefined || value === null) return undefined;
    return `${value.toLocaleString()} ₽`;
  }, [value]);

  return (
    <>
      <TouchableHighlightRow
        variant="bordered"
        label={'Цена'}
        selectedValue={selectedLabel}
        onPress={handlePresentPriceModalPress}
        rightIcon="chevron-down"
        required
        error={error}
      />
      <PriceCreateBottomSheet
        ref={priceModalRef}
        onChange={price => {
          if (price !== undefined) {
            onChange(price);
          }
          priceModalRef.current?.close({ duration: 150 });
        }}
      />
    </>
  );
};

export const PriceCreateBottomSheetControllerWrapper = React.memo(Wrapper);
