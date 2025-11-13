import CustomBottomSheetModal, { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { CheckboxRectButton } from '@/components/global/CheckboxRectButton';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef } from 'react';
import { useFilterConfigs, FilterOption } from '@/shared/filter';
import { BACKEND_FILTERS } from '@/shared/filter';

type FuelTypeFilterBottomSheetProps = {
  onChange: (values: FilterOption[]) => void;
};

export const FuelTypeFilterBottomSheet = forwardRef<BottomSheetRef, FuelTypeFilterBottomSheetProps>(({ onChange }, ref) => {
  const filterConfigs = useFilterConfigs();
  const fuelTypeConfig = filterConfigs[BACKEND_FILTERS.FUEL_TYPE];
  const options = fuelTypeConfig?.options || [];
  const [selectedFuelTypes, setSelectedFuelTypes] = React.useState<FilterOption[]>([]);

  const handleToggle = (option: FilterOption) => {
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
});
FuelTypeFilterBottomSheet.displayName = 'FuelTypeFilterBottomSheet';
