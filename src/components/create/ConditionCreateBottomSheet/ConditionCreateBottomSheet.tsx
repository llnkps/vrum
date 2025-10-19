import CustomBottomSheetModal, { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { CustomRectButton } from '@/components/ui/button';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef } from 'react';

type ConditionOption = (typeof options)[number];

type ConditionCreateBottomSheetProps = {
  onChange: (value: ConditionOption | undefined) => void;
};

const options = [
  { label: 'Новый', value: 'new' },
  { label: 'Б/у', value: 'used' },
  { label: 'На запчасти', value: 'for_parts' },
];

export const ConditionCreateBottomSheet = forwardRef<BottomSheetRef, ConditionCreateBottomSheetProps>(({ onChange }, ref) => {
  const [selectedCondition, setSelectedCondition] = React.useState<ConditionOption | undefined>(undefined);

  const handleToggle = (option: ConditionOption) => {
    setSelectedCondition(option);
  };

  const handleConfirm = () => {
    onChange(selectedCondition);
  };

  return (
    <CustomBottomSheetModal
      ref={ref}
      snapPoints={['30%']}
      enableContentPanningGesture={true}
      title="Состояние"
      footerProps={{
        onConfirm: handleConfirm,
      }}
    >
      <BottomSheetView className="flex-col">
        {options.map(opt => (
          <CustomRectButton key={opt.value} title={opt.label} isSelected={selectedCondition?.value === opt.value} onPress={() => handleToggle(opt)} />
        ))}
      </BottomSheetView>
    </CustomBottomSheetModal>
  );
});
ConditionCreateBottomSheet.displayName = 'ConditionCreateBottomSheet';
