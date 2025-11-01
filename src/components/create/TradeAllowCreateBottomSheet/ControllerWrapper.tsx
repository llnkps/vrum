import { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { TouchableHighlightRow } from '@/components/global/TouchableHighlightRow';
import React, { useCallback, useRef } from 'react';
import { Controller, Control } from 'react-hook-form';
import { TradeAllowCreateBottomSheet } from './TradeAllowCreateBottomSheet';

interface TradeAllowControllerWrapperProps {
  control: Control<any>;
}

const Wrapper = ({ control }: TradeAllowControllerWrapperProps) => {
  const [selectedTradeAllow, setSelectedTradeAllow] = React.useState<string | undefined>(undefined);
  console.log('Rendering TradeAllowCreateBottomSheet Wrapper');
  const tradeAllowModalRef = useRef<BottomSheetRef>(null);
  const handlePresentTradeAllowModalPress = useCallback(() => {
    tradeAllowModalRef.current?.present();
  }, []);

  return (
    <>
      <Controller
        control={control}
        name="trade_allow"
        rules={{
          required: 'Выберите условия торга'
        }}
        render={({ field: _field, fieldState: { error } }) => (
          <>
            <TouchableHighlightRow
              variant="bordered"
              label={'Торг'}
              selectedValue={selectedTradeAllow ?? undefined}
              onPress={handlePresentTradeAllowModalPress}
              rightIcon="chevron-down"
              required
              error={error?.message}
            />
            <TradeAllowCreateBottomSheet
              ref={tradeAllowModalRef}
              onChange={(tradeAllow) => {
                _field.onChange(tradeAllow?.value || '');
                setSelectedTradeAllow(tradeAllow?.label || '');
                tradeAllowModalRef.current?.close({ duration: 150 });
              }}
            />
          </>
        )}
      />
    </>
  );
};

export const TradeAllowCreateBottomSheetControllerWrapper = React.memo(Wrapper);