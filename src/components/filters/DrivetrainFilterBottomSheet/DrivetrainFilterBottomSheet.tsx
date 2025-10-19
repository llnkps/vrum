import CustomBottomSheetModal, { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { CheckboxRectButton } from '@/components/global/CheckboxRectButton';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef } from 'react';

type DrivetrainOption = (typeof options)[number];

type DrivetrainFilterBottomSheetProps = {
  onChange: (values: DrivetrainOption[]) => void;
};

const options = [
  { label: 'Передний (FWD)', value: 'front' },
  { label: 'Задний (RWD)', value: 'rear' },
  { label: '4x4', value: '4wd' },
];

export const DrivetrainFilterBottomSheet = forwardRef<BottomSheetRef, DrivetrainFilterBottomSheetProps>(({ onChange }, ref) => {
  const [selectedDrivetrains, setSelectedDrivetrains] = React.useState<DrivetrainOption[]>([]);

  const handleToggle = (option: DrivetrainOption) => {
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
