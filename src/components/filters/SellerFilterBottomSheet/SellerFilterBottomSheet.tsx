import CustomBottomSheetModal, { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { CheckboxRectButton } from '@/components/global/CheckboxRectButton';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef } from 'react';
import { useFilterConfigs, FilterOption } from '@/shared/filter';
import { BACKEND_FILTERS } from '@/shared/filter';

type SellerFilterBottomSheetProps = {
  onChange: (values: FilterOption[]) => void;
};

export const SellerFilterBottomSheet = forwardRef<BottomSheetRef, SellerFilterBottomSheetProps>(({ onChange }, ref) => {
  const filterConfigs = useFilterConfigs();
  const sellerConfig = filterConfigs[BACKEND_FILTERS.SELLER];
  const options = sellerConfig?.options || [];
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
      snapPoints={['35%']}
      enableContentPanningGesture={true}
      title={sellerConfig.label}
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
SellerFilterBottomSheet.displayName = 'SellerFilterBottomSheet';
