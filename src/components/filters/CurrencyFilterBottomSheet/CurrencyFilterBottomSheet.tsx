import CustomBottomSheetModal, { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { CustomRectButton } from '@/components/ui/button';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef } from 'react';

type CurrencyOption = (typeof options)[number];

type CurrencyFilterBottomSheetProps = {
  onSelect: (value: CurrencyOption) => void;
};

const options = [
  { label: 'MDL', value: 'mdl' },
  { label: 'USD', value: 'usd' },
  { label: 'EUR', value: 'eur' },
];

export const CurrencyFilterBottomSheet = forwardRef<BottomSheetRef, CurrencyFilterBottomSheetProps>(({ onSelect }, ref) => {
  const [selectedCurrency, setSelectedCurrency] = React.useState<string | undefined>(undefined);

  return (
    <CustomBottomSheetModal ref={ref} snapPoints={['30%']} enableContentPanningGesture={true} title="Валюта">
      <BottomSheetView className="flex-col">
        {options.map(opt => (
          <CustomRectButton
            key={opt.value}
            onPress={() => {
              onSelect(opt);
              setSelectedCurrency(opt.value);
            }}
            title={opt.label}
            isSelected={selectedCurrency === opt.value}
          />
        ))}
      </BottomSheetView>
    </CustomBottomSheetModal>
  );
});
CurrencyFilterBottomSheet.displayName = 'CurrencyFilterBottomSheet';
