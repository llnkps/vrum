import CustomBottomSheetModal, { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { CheckboxRectButton } from '@/components/global/CheckboxRectButton';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef } from 'react';
import { useFilterConfigs, FilterOption } from '@/shared/filter-registry';
import { BACKEND_FILTERS } from '@/shared/filter-registry';

type TransmissionFilterBottomSheetProps = {
  onChange: (values: FilterOption[]) => void;
};

export const TransmissionFilterBottomSheet = forwardRef<BottomSheetRef, TransmissionFilterBottomSheetProps>(({ onChange }, ref) => {
  const filterConfigs = useFilterConfigs();
  const transmissionConfig = filterConfigs[BACKEND_FILTERS.TRANSMISSION];
  const options = transmissionConfig?.options || [];
  const [selectedTransmissions, setSelectedTransmissions] = React.useState<FilterOption[]>([]);

  const handleToggle = (option: FilterOption) => {
    const isSelected = selectedTransmissions.some(t => t.value === option.value);
    if (isSelected) {
      setSelectedTransmissions(selectedTransmissions.filter(t => t.value !== option.value));
    } else {
      setSelectedTransmissions([...selectedTransmissions, option]);
    }
  };

  const handleConfirm = () => {
    onChange(selectedTransmissions);
  };

  return (
    <CustomBottomSheetModal
      ref={ref}
      snapPoints={['35%']}
      enableContentPanningGesture={true}
      title={'Коробка передач'}
      footerProps={{
        onConfirm: handleConfirm,
      }}
    >
      <BottomSheetView className="flex-col">
        {options.map(opt => (
          <CheckboxRectButton
            key={opt.value}
            label={opt.label}
            value={selectedTransmissions.some(t => t.value === opt.value)}
            onPress={() => handleToggle(opt)}
          />
        ))}
      </BottomSheetView>
    </CustomBottomSheetModal>
  );
});
TransmissionFilterBottomSheet.displayName = 'TransmissionFilterBottomSheet';
