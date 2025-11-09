import CustomBottomSheetModal, { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { CheckboxRectButton } from '@/components/global/CheckboxRectButton';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef } from 'react';
import { useFilterConfigs, FilterOption } from '@/shared/filter-registry';
import { BACKEND_FILTERS } from '@/shared/filter-registry';

type NumberOfOwnersFilterBottomSheetProps = {
  onChange: (values: FilterOption[]) => void;
};

export const NumberOfOwnersFilterBottomSheet = forwardRef<BottomSheetRef, NumberOfOwnersFilterBottomSheetProps>(({ onChange }, ref) => {
  const filterConfigs = useFilterConfigs();
  const numberOfOwnersConfig = filterConfigs[BACKEND_FILTERS.NUMBER_OF_OWNER];
  const options = numberOfOwnersConfig?.options || [];
  const [selectedValues, setSelectedValues] = React.useState<FilterOption[]>([]);

  const handleToggle = (option: FilterOption) => {
    const isSelected = selectedValues.some(v => v.value === option.value);
    if (isSelected) {
      setSelectedValues(selectedValues.filter(v => v.value !== option.value));
    } else {
      setSelectedValues([...selectedValues, option]);
    }
  };

  const handleConfirm = () => {
    onChange(selectedValues);
  };

  return (
    <CustomBottomSheetModal
      ref={ref}
      snapPoints={['33%']}
      enableContentPanningGesture={true}
      title={'Количество владельцев'}
      footerProps={{
        onConfirm: handleConfirm,
      }}
    >
      <BottomSheetView className="flex-col">
        {options.map(opt => (
          <CheckboxRectButton
            key={opt.value}
            label={opt.label}
            value={selectedValues.some(v => v.value === opt.value)}
            onPress={() => handleToggle(opt)}
          />
        ))}
      </BottomSheetView>
    </CustomBottomSheetModal>
  );
});
NumberOfOwnersFilterBottomSheet.displayName = 'NumberOfOwnersFilterBottomSheet';
