import CustomBottomSheetModal, { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { CustomRectButton } from '@/components/ui/button';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef } from 'react';

type TransmissionOption = (typeof options)[number];

type TransmissionCreateBottomSheetProps = {
  onChange: (value: TransmissionOption | undefined) => void;
};

const options = [
  { label: 'Механика', value: 'manual' },
  { label: 'Автомат', value: 'automatic' },
  { label: 'Робот', value: 'robot' },
  { label: 'Вариатор (CVT)', value: 'cvt' },
];

export const TransmissionCreateBottomSheet = forwardRef<BottomSheetRef, TransmissionCreateBottomSheetProps>(({ onChange }, ref) => {
  const [selectedTransmission, setSelectedTransmission] = React.useState<TransmissionOption | undefined>(undefined);

  const handleToggle = (option: TransmissionOption) => {
    setSelectedTransmission(option);
  };

  const handleConfirm = () => {
    onChange(selectedTransmission);
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
      <BottomSheetView enableFooterMarginAdjustment>
        {options.map(opt => (
          <CustomRectButton
            key={opt.value}
            title={opt.label}
            isSelected={selectedTransmission?.value === opt.value}
            onPress={() => handleToggle(opt)}
          />
        ))}
      </BottomSheetView>
    </CustomBottomSheetModal>
  );
});
TransmissionCreateBottomSheet.displayName = 'TransmissionCreateBottomSheet';
