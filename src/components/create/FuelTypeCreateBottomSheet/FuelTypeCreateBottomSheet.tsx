import CustomBottomSheetModal, { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { CustomRectButton } from '@/components/ui/button';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef } from 'react';

type FuelTypeOption = (typeof options)[number];

type FuelTypeCreateBottomSheetProps = {
  onChange: (value: FuelTypeOption | undefined) => void;
};

const options = [
  { label: 'Бензин', value: 'petrol' },
  { label: 'Дизель', value: 'diesel' },
  { label: 'Электро', value: 'electric' },
  { label: 'Гибрид', value: 'hybrid' },
  { label: 'Газ', value: 'gas' },
];

export const FuelTypeCreateBottomSheet = forwardRef<BottomSheetRef, FuelTypeCreateBottomSheetProps>(({ onChange }, ref) => {
  const [selectedFuelType, setSelectedFuelType] = React.useState<FuelTypeOption | undefined>(undefined);

  const handleToggle = (option: FuelTypeOption) => {
    setSelectedFuelType(option);
  };
  const handleConfirm = () => {
    onChange(selectedFuelType);
  };

  return (
    <CustomBottomSheetModal
      ref={ref}
      snapPoints={['35%']}
      enableContentPanningGesture={true}
      title={'Тип топлива'}
      footerProps={{
        onConfirm: handleConfirm,
      }}
    >
      <BottomSheetView className="flex-col">
        {options.map(opt => (
          <CustomRectButton key={opt.value} title={opt.label} isSelected={selectedFuelType?.value === opt.value} onPress={() => handleToggle(opt)} />
        ))}
      </BottomSheetView>
    </CustomBottomSheetModal>
  );
});
FuelTypeCreateBottomSheet.displayName = 'FuelTypeCreateBottomSheet';
