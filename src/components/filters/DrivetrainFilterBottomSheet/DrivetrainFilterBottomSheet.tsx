import CustomBottomSheetModal, { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { CheckboxRectButton } from '@/components/global/CheckboxRectButton';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef } from 'react';
import { useFilterConfigs, FilterOption } from '@/shared/filter-registry';
import { BACKEND_FILTERS } from '@/shared/filter-registry';

type DrivetrainFilterBottomSheetProps = {
  onChange: (values: FilterOption[]) => void;
};

export const DrivetrainFilterBottomSheet = forwardRef<BottomSheetRef, DrivetrainFilterBottomSheetProps>(({ onChange }, ref) => {
  const filterConfigs = useFilterConfigs();
  const drivetrainConfig = filterConfigs[BACKEND_FILTERS.DRIVETRAIN_TYPE];
  const options = drivetrainConfig?.options || [];
  const [selectedDrivetrains, setSelectedDrivetrains] = React.useState<FilterOption[]>([]);

  const handleToggle = (option: FilterOption) => {
    const isSelected = selectedDrivetrains.some(t => t.value === option.value);
    if (isSelected) {
      setSelectedDrivetrains(selectedDrivetrains.filter(t => t.value !== option.value));
    } else {
      setSelectedDrivetrains([...selectedDrivetrains, option]);
    }
  };

  const handleConfirm = () => {
    onChange(selectedDrivetrains);
  };

  return (
    <CustomBottomSheetModal
      ref={ref}
      snapPoints={['30%']}
      enableContentPanningGesture={true}
      title="Привод"
      footerProps={{
        onConfirm: handleConfirm,
      }}
    >
      <BottomSheetView className="flex-col">
        {options.map(opt => (
          <CheckboxRectButton
            key={opt.value}
            label={opt.label}
            value={selectedDrivetrains.some(t => t.value === opt.value)}
            onPress={() => handleToggle(opt)}
          />
        ))}
      </BottomSheetView>
    </CustomBottomSheetModal>
  );
});
DrivetrainFilterBottomSheet.displayName = 'DrivetrainFilterBottomSheet';
