import { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { TouchableHighlightRow } from '@/components/global/TouchableHighlightRow';
import React, { useCallback, useRef } from 'react';
import { CurrencyCreateBottomSheet, options } from './CurrencyCreateBottomSheet';

interface CurrencyControllerWrapperProps {
  value?: string;
  onChange: (value: string) => void;
  error?: string;
}

const Wrapper = ({ value, onChange, error }: CurrencyControllerWrapperProps) => {
  console.log('Rendering CurrencyCreateBottomSheet Wrapper');
  const currencyModalRef = useRef<BottomSheetRef>(null);
  const handlePresentCurrencyModalPress = useCallback(() => {
    currencyModalRef.current?.present();
  }, []);

    // Find the label for the current value
  const selectedLabel = React.useMemo(() => {
    return options.find(opt => opt.value === value)?.label;
  }, [value]);

  return (
    <>
      <TouchableHighlightRow
        variant="bordered"
        label={'Валюта'}
        selectedValue={selectedLabel}
        onPress={handlePresentCurrencyModalPress}
        rightIcon="chevron-down"
        required
        error={error}
      />
      <CurrencyCreateBottomSheet
        ref={currencyModalRef}
        onChange={(currency) => {
          onChange(currency?.value || '');
          currencyModalRef.current?.close({ duration: 150 });
        }}
      />
    </>
  );
};

export const CurrencyCreateBottomSheetControllerWrapper = React.memo(Wrapper);