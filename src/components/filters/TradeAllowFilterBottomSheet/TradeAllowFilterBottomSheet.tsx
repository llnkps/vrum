import CustomBottomSheetModal, { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { CustomRectButton } from '@/components/ui/button';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef } from 'react';

type TradeAllowOption = (typeof options)[number];

type TradeAllowFilterBottomSheetProps = {
  onSelect: (value: TradeAllowOption) => void;
};

const options = [
  { label: 'Торг возможен', value: 'trade_allow' },
  { label: 'Без торга', value: 'trade_disallow' },
];

export const TradeAllowFilterBottomSheet = forwardRef<
  BottomSheetRef,
  TradeAllowFilterBottomSheetProps
>(({ onSelect }, ref) => {
  const [selectedValue, setSelectedValue] = React.useState<string | undefined>(undefined);

  return (
    <CustomBottomSheetModal
      ref={ref}
      snapPoints={['35%']}
      enableContentPanningGesture={true}
      title="Торг"
    >
      <BottomSheetView className="flex-col">
        {options.map(opt => (
          <CustomRectButton
            key={opt.value}
            onPress={() => {
              onSelect(opt);
              setSelectedValue(opt.value);
            }}
            title={opt.label}
            isSelected={selectedValue === opt.value}
          />
        ))}
      </BottomSheetView>
    </CustomBottomSheetModal>
  );
});
TradeAllowFilterBottomSheet.displayName = 'TradeAllowFilterBottomSheet';
