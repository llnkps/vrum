import { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { TouchableHighlightRow } from '@/components/global/TouchableHighlightRow';
import React, { useCallback, useRef } from 'react';
import { TradeAllowCreateBottomSheet, options } from './TradeAllowCreateBottomSheet';

interface TradeAllowControllerWrapperProps {
  value?: string;
  onChange: (value: string) => void;
  error?: string;
}

const Wrapper = ({ value, onChange, error }: TradeAllowControllerWrapperProps) => {
  console.log('Rendering TradeAllowCreateBottomSheet Wrapper');
  const tradeAllowModalRef = useRef<BottomSheetRef>(null);
  const handlePresentTradeAllowModalPress = useCallback(() => {
    tradeAllowModalRef.current?.present();
  }, []);

  // Find the label for the current value
  const selectedLabel = React.useMemo(() => {
    return options.find(opt => opt.value === value)?.label;
  }, [value]);

  return (
    <>
      <TouchableHighlightRow
        variant="bordered"
        label={'Торг'}
        selectedValue={selectedLabel}
        onPress={handlePresentTradeAllowModalPress}
        rightIcon="chevron-down"
        required
        error={error}
      />
      <TradeAllowCreateBottomSheet
        ref={tradeAllowModalRef}
        onChange={(tradeAllow) => {
          onChange(tradeAllow?.value || '');
          tradeAllowModalRef.current?.close({ duration: 150 });
        }}
      />
    </>
  );
};

export const TradeAllowCreateBottomSheetControllerWrapper = React.memo(Wrapper);