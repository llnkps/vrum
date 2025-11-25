import CustomBottomSheetModal, { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { CustomRectButton } from '@/components/ui/button';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef } from 'react';
import { FilterOptionType } from '@/types/filter';

type TradeAllowFilterBottomSheetProps = {
  onSelect: (value: FilterOption) => void;
  options: readonly FilterOptionType[];
  title: string;
};

export const TradeAllowFilterBottomSheet = forwardRef<BottomSheetRef, TradeAllowFilterBottomSheetProps>(({ onSelect, options, title }, ref) => {
  const [selectedValue, setSelectedValue] = React.useState<string | number | undefined>(undefined);

  return (
    <CustomBottomSheetModal ref={ref} snapPoints={['35%']} enableContentPanningGesture={true} title={title}>
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
