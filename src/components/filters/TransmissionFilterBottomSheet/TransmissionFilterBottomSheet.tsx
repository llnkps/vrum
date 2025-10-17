import CustomBottomSheetModal, { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { CustomRectButton } from '@/components/ui/button';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef } from 'react';

type TransmissionOption = (typeof options)[number];

type TransmissionFilterBottomSheetProps = {
  onSelect: (value: TransmissionOption) => void;
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
>(({ onSelect }, ref) => {
  const [selectedTransmission, setSelectedTransmission] = React.useState<string | undefined>(
    undefined
  );

  return (
    <CustomBottomSheetModal
      ref={ref}
      snapPoints={['35%']}
      enableContentPanningGesture={true}
      title={'Коробка передач'}
    >
      <BottomSheetView className="flex-col">
        {options.map(opt => (
          <CustomRectButton
            key={opt.value}
            onPress={() => {
              onSelect(opt);
              setSelectedTransmission(opt.value);
            }}
            title={opt.label}
            isSelected={selectedTransmission === opt.value}
          />
        ))}
      </BottomSheetView>
    </CustomBottomSheetModal>
  );
});
TransmissionFilterBottomSheet.displayName = 'TransmissionFilterBottomSheet';
