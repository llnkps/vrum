import CustomBottomSheetModal, { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { CheckboxRectButton } from '@/components/global/CheckboxRectButton';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef } from 'react';

type TransmissionOption = (typeof options)[number];

type TransmissionFilterBottomSheetProps = {
  onChange: (values: TransmissionOption[]) => void;
};

const options = [
  { label: 'Механика', value: 'manual' },
  { label: 'Автомат', value: 'automatic' },
  { label: 'Робот', value: 'robot' },
  { label: 'Вариатор (CVT)', value: 'cvt' },
];

export const TransmissionFilterBottomSheet = forwardRef<
  BottomSheetRef,
  TransmissionFilterBottomSheetProps
>(({ onChange }, ref) => {
  const [selectedTransmissions, setSelectedTransmissions] = React.useState<TransmissionOption[]>([]);

  const handleToggle = (option: TransmissionOption) => {
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
