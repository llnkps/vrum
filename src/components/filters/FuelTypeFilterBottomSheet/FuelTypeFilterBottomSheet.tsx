import { CheckboxRectButton } from '@/components/global/CheckboxRectButton';
import CustomBottomSheetModal, { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { FilterOptionType } from '@/types/filter';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import React, { forwardRef } from 'react';

type FuelTypeFilterBottomSheetProps = {
  onChange: (values: FilterOptionType[]) => void;
  options: readonly FilterOptionType[];
  title: string;
  selectedOptions?: FilterOptionType[];
};

export const FuelTypeFilterBottomSheet = forwardRef<BottomSheetRef, FuelTypeFilterBottomSheetProps>(
  ({ onChange, options, title, selectedOptions = [] }, ref) => {
    const [selectedFuelTypes, setSelectedFuelTypes] = React.useState<FilterOptionType[]>(selectedOptions);

    React.useEffect(() => {
      setSelectedFuelTypes(selectedOptions);
    }, [selectedOptions]);

    const handleToggle = (option: FilterOptionType) => {
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
        snapPoints={['40%']}
        enableContentPanningGesture={true}
        title={title}
        footerProps={{
          onConfirm: handleConfirm,
        }}
      >
        <BottomSheetScrollView className="flex-col" enableFooterMarginAdjustment={true}>
          {options.map(opt => (
            <CheckboxRectButton
              key={opt.value}
              label={opt.label}
              value={selectedFuelTypes.some(t => t.value === opt.value)}
              onPress={() => handleToggle(opt)}
            />
          ))}
        </BottomSheetScrollView>
      </CustomBottomSheetModal>
    );
  }
);
FuelTypeFilterBottomSheet.displayName = 'FuelTypeFilterBottomSheet';
