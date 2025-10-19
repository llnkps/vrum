import CustomBottomSheetModal, { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { CustomRectButton } from '@/components/ui/button';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef } from 'react';

type TradeAllowOption = (typeof options)[number];

type TradeAllowCreateBottomSheetProps = {
  onChange: (value: TradeAllowOption | undefined) => void;
};

const options = [
  { label: 'Торг возможен', value: 'trade_allow' },
  { label: 'Без торга', value: 'trade_disallow' },
];

export const TradeAllowCreateBottomSheet = forwardRef<BottomSheetRef, TradeAllowCreateBottomSheetProps>(({ onChange }, ref) => {
  const [selectedValue, setSelectedValue] = React.useState<TradeAllowOption | undefined>(undefined);

  const handleToggle = (option: TradeAllowOption) => {
    setSelectedValue(option);
  };

  const handleConfirm = () => {
    onChange(selectedValue);
  };

  return (
    <CustomBottomSheetModal
      ref={ref}
      snapPoints={['30%']}
      enableContentPanningGesture={true}
      title="Торг"
      footerProps={{
        onConfirm: handleConfirm,
      }}
    >
      <BottomSheetView className="flex-col">
        {options.map(opt => (
          <CustomRectButton key={opt.value} title={opt.label} isSelected={selectedValue?.value === opt.value} onPress={() => handleToggle(opt)} />
        ))}
      </BottomSheetView>
    </CustomBottomSheetModal>
  );
});
TradeAllowCreateBottomSheet.displayName = 'TradeAllowCreateBottomSheet';
