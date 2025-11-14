import CustomBottomSheetModal, { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { CustomRectButton } from '@/components/ui/button';
import { useFilterConfigs } from '@/shared/filter';
import { BACKEND_FILTERS, FilterOptionType } from '@/types/filter';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef } from 'react';

type ConditionFilterBottomSheetProps = {
  onSelect: (value: FilterOptionType) => void;
};

export const ConditionFilterBottomSheet = forwardRef<BottomSheetRef, ConditionFilterBottomSheetProps>(({ onSelect }, ref) => {
  const filterConfigs = useFilterConfigs();
  const conditionConfig = filterConfigs[BACKEND_FILTERS.CONDITION];
  const options = conditionConfig?.options || [];
  const [selectedCondition, setSelectedCondition] = React.useState<string | number | undefined>(undefined);

  return (
    <CustomBottomSheetModal ref={ref} snapPoints={['30%']} enableContentPanningGesture={true} title={conditionConfig.label}>
      <BottomSheetView className="flex-col">
        {options.map(opt => (
          <CustomRectButton
            key={opt.value}
            onPress={() => {
              onSelect(opt);
              setSelectedCondition(opt.value);
            }}
            title={opt.label}
            isSelected={selectedCondition === opt.value}
          />
        ))}
      </BottomSheetView>
    </CustomBottomSheetModal>
  );
});
ConditionFilterBottomSheet.displayName = 'ConditionFilterBottomSheet';
