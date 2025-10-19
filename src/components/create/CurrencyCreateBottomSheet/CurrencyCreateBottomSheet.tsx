import CustomBottomSheetModal, { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { CustomRectButton } from '@/components/ui/button';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef } from 'react';

type CurrencyOption = (typeof options)[number];

type CurrencyCreateBottomSheetProps = {
  onChange: (value: CurrencyOption | undefined) => void;
};

const options = [
  { label: 'MDL', value: 'mdl' },
  { label: 'USD', value: 'usd' },
  { label: 'EUR', value: 'eur' },
];

export const CurrencyCreateBottomSheet = forwardRef<BottomSheetRef, CurrencyCreateBottomSheetProps>(({ onChange }, ref) => {
  const [selectedCurrency, setSelectedCurrency] = React.useState<CurrencyOption | undefined>(undefined);

  const handleToggle = (option: CurrencyOption) => {
    setSelectedCurrency(option);
  };
  const handleConfirm = () => {
    onChange(selectedCurrency);
  };

  return (
    <CustomBottomSheetModal
      ref={ref}
      snapPoints={['30%']}
      enableContentPanningGesture={true}
      title="Валюта"
      footerProps={{
        onConfirm: handleConfirm,
      }}
    >
      <BottomSheetView className="flex-col">
        {options.map(opt => (
          <CustomRectButton key={opt.value} title={opt.label} isSelected={selectedCurrency?.value === opt.value} onPress={() => handleToggle(opt)} />
        ))}
      </BottomSheetView>
    </CustomBottomSheetModal>
  );
});
CurrencyCreateBottomSheet.displayName = 'CurrencyCreateBottomSheet';
