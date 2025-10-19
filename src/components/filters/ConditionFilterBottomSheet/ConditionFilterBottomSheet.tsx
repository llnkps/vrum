import CustomBottomSheetModal, { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { CustomRectButton } from '@/components/ui/button';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef } from 'react';

type ConditionOption = (typeof options)[number];

type ConditionFilterBottomSheetProps = {
  onSelect: (value: ConditionOption) => void;
};

const options = [
  { label: 'Новый', value: 'new' },
  { label: 'Б/у', value: 'used' },
  { label: 'На запчасти', value: 'for_parts' },
];

export const ConditionFilterBottomSheet = forwardRef<BottomSheetRef, ConditionFilterBottomSheetProps>(({ onSelect }, ref) => {
  const [selectedCondition, setSelectedCondition] = React.useState<string | undefined>(undefined);

  return (
    <CustomBottomSheetModal ref={ref} snapPoints={['30%']} enableContentPanningGesture={true} title="Состояние">
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
