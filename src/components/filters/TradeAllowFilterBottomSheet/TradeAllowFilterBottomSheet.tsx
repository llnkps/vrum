import CustomBottomSheetModal, { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { CustomRectButton } from '@/components/ui/button';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef } from 'react';
import { useFilterConfigs, FilterOption } from '@/shared/filter';
import { BACKEND_FILTERS } from '@/shared/filter';

type TradeAllowFilterBottomSheetProps = {
  onSelect: (value: FilterOption) => void;
};

export const TradeAllowFilterBottomSheet = forwardRef<BottomSheetRef, TradeAllowFilterBottomSheetProps>(({ onSelect }, ref) => {
  const filterConfigs = useFilterConfigs();
  const tradeAllowConfig = filterConfigs[BACKEND_FILTERS.TRADE_ALLOW];
  const options = tradeAllowConfig?.options || [];
  const [selectedValue, setSelectedValue] = React.useState<string | number | undefined>(undefined);

  return (
    <CustomBottomSheetModal ref={ref} snapPoints={['35%']} enableContentPanningGesture={true} title={tradeAllowConfig.label}>
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
