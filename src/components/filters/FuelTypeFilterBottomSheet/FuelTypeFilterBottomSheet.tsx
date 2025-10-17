import CustomBottomSheetModal, { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { CheckboxRectButton } from '@/components/global/CheckboxRectButton';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef } from 'react';

type FuelTypeOption = (typeof options)[number];

type FuelTypeFilterBottomSheetProps = {
  onChange: (values: FuelTypeOption[]) => void;
};

const options = [
  { label: 'Бензин', value: 'petrol' },
  { label: 'Дизель', value: 'diesel' },
  { label: 'Электро', value: 'electric' },
  { label: 'Гибрид', value: 'hybrid' },
  { label: 'Газ', value: 'gas' },
];

export const FuelTypeFilterBottomSheet = forwardRef<BottomSheetRef, FuelTypeFilterBottomSheetProps>(
  ({ onChange }, ref) => {
    const [selectedFuelTypes, setSelectedFuelTypes] = React.useState<FuelTypeOption[]>([]);

    const handleToggle = (option: FuelTypeOption) => {
      const isSelected = selectedFuelTypes.some(t => t.value === option.value);
      if (isSelected) {
        setSelectedFuelTypes(selectedFuelTypes.filter(t => t.value !== option.value));
      } else {
        setSelectedFuelTypes([...selectedFuelTypes, option]);
      }
    };

    const handleConfirm = () => {
      onChange(selectedFuelTypes);
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
            <CheckboxRectButton
              key={opt.value}
              label={opt.label}
              value={selectedFuelTypes.some(t => t.value === opt.value)}
              onPress={() => handleToggle(opt)}
            />
          ))}
        </BottomSheetView>
      </CustomBottomSheetModal>
    );
  }
);
FuelTypeFilterBottomSheet.displayName = 'FuelTypeFilterBottomSheet';
