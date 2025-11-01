import { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { TouchableHighlightRow } from '@/components/global/TouchableHighlightRow';
import React, { useCallback, useRef } from 'react';
import { Controller, Control } from 'react-hook-form';
import { CurrencyCreateBottomSheet } from './CurrencyCreateBottomSheet';

interface CurrencyControllerWrapperProps {
  control: Control<any>;
}

const Wrapper = ({ control }: CurrencyControllerWrapperProps) => {
  const [selectedCurrency, setSelectedCurrency] = React.useState<string | undefined>(undefined);
  console.log('Rendering CurrencyCreateBottomSheet Wrapper');
  const currencyModalRef = useRef<BottomSheetRef>(null);
  const handlePresentCurrencyModalPress = useCallback(() => {
    currencyModalRef.current?.present();
  }, []);

  return (
    <>
      <Controller
        control={control}
        name="currency"
        rules={{
          required: 'Выберите валюту'
        }}
        render={({ field: _field, fieldState: { error } }) => (
          <>
            <TouchableHighlightRow
              variant="bordered"
              label={'Валюта'}
              selectedValue={selectedCurrency ?? undefined}
              onPress={handlePresentCurrencyModalPress}
              rightIcon="chevron-down"
              required
              error={error?.message}
            />
            <CurrencyCreateBottomSheet
              ref={currencyModalRef}
              onChange={(currency) => {
                _field.onChange(currency?.value || '');
                setSelectedCurrency(currency?.label || '');
                currencyModalRef.current?.close({ duration: 150 });
              }}
            />
          </>
        )}
      />
    </>
  );
};

export const CurrencyCreateBottomSheetControllerWrapper = React.memo(Wrapper);