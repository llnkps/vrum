import CustomBottomSheetModal, { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { CustomRectButton } from '@/components/ui/button';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef } from 'react';

type DrivetrainOption = (typeof options)[number];

type DrivetrainCreateBottomSheetProps = {
  onChange: (value: DrivetrainOption | undefined) => void;
};

export const options = [
  { label: 'Передний (FWD)', value: 'front' },
  { label: 'Задний (RWD)', value: 'rear' },
  { label: '4x4', value: '4wd' },
];

export const DrivetrainCreateBottomSheet = forwardRef<BottomSheetRef, DrivetrainCreateBottomSheetProps>(({ onChange }, ref) => {
  const [selectedDrivetrain, setSelectedDrivetrain] = React.useState<DrivetrainOption | undefined>(undefined);

  const handleToggle = (option: DrivetrainOption) => {
    setSelectedDrivetrain(option);
  };

  const handleConfirm = () => {
    onChange(selectedDrivetrain);
  };

  return (
    <CustomBottomSheetModal
      ref={ref}
      snapPoints={['30%']}
      enableContentPanningGesture={true}
      title={'Привод'}
      footerProps={{
        onConfirm: handleConfirm,
      }}
    >
      <BottomSheetView className="flex-col">
        {options.map(opt => (
          <CustomRectButton
            key={opt.value}
            title={opt.label}
            isSelected={selectedDrivetrain?.value === opt.value}
            onPress={() => handleToggle(opt)}
          />
        ))}
      </BottomSheetView>
    </CustomBottomSheetModal>
  );
});
DrivetrainCreateBottomSheet.displayName = 'DrivetrainCreateBottomSheet';
