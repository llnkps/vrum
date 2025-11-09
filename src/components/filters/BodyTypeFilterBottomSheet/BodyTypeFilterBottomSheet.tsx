import CustomBottomSheetModal, { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { CheckboxRectButton } from '@/components/global/CheckboxRectButton';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef } from 'react';
import { useFilterConfigs, FilterOption } from '@/shared/filter-registry';
import { BACKEND_FILTERS } from '@/shared/filter-registry';

type BodyTypeFilterBottomSheetProps = {
  onChange: (values: FilterOption[]) => void;
};

export const BodyTypeFilterBottomSheet = forwardRef<BottomSheetRef, BodyTypeFilterBottomSheetProps>(({ onChange }, ref) => {
  const filterConfigs = useFilterConfigs();
  const bodyTypeConfig = filterConfigs[BACKEND_FILTERS.FRAME_TYPE];
  const options = bodyTypeConfig?.options || [];
  const [selectedBodyTypes, setSelectedBodyTypes] = React.useState<FilterOption[]>([]);

  const handleToggle = (option: FilterOption) => {
    const isSelected = selectedBodyTypes.some(t => t.value === option.value);
    if (isSelected) {
      setSelectedBodyTypes(selectedBodyTypes.filter(t => t.value !== option.value));
    } else {
      setSelectedBodyTypes([...selectedBodyTypes, option]);
    }
  };

  const handleConfirm = () => {
    onChange(selectedBodyTypes);
  };

  return (
    <CustomBottomSheetModal
      ref={ref}
      snapPoints={['45%']}
      enableContentPanningGesture={true}
      title="Кузова"
      footerProps={{
        onConfirm: handleConfirm,
      }}
    >
      <BottomSheetView className="flex-col">
        {options.map(opt => (
          <CheckboxRectButton
            key={opt.value}
            label={opt.label}
            value={selectedBodyTypes.some(t => t.value === opt.value)}
            onPress={() => handleToggle(opt)}
          />
        ))}
      </BottomSheetView>
    </CustomBottomSheetModal>
  );
});
BodyTypeFilterBottomSheet.displayName = 'BodyTypeFilterBottomSheet';
