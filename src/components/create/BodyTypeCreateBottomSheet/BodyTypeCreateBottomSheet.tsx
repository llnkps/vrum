import CustomBottomSheetModal, { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { CustomRectButton } from '@/components/ui/button';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef } from 'react';

type BodyTypeOption = (typeof options)[number];

type BodyTypeCreateModalProps = {
  onChange: (value: BodyTypeOption | undefined) => void;
};

const options = [
  { label: 'Седан', value: 'sedan' },
  { label: 'Хэтчбек', value: 'hatchback' },
  { label: 'SUV', value: 'suv' },
  { label: 'Купе', value: 'coupe' },
  { label: 'Универсал', value: 'wagon' },
  { label: 'Пикап', value: 'pickup' },
  { label: 'Фургон', value: 'van' },
];

export const BodyTypeCreateBottomSheet = forwardRef<BottomSheetRef, BodyTypeCreateModalProps>(({ onChange }, ref) => {
  const [selectedBodyType, setSelectedBodyType] = React.useState<BodyTypeOption | undefined>(undefined);

  const handleToggle = (option: BodyTypeOption) => {
    setSelectedBodyType(option);
  };
  const handleConfirm = () => {
    onChange(selectedBodyType);
  };

  return (
    <CustomBottomSheetModal
      ref={ref}
      snapPoints={['35%']}
      enableContentPanningGesture={true}
      title={'Тип кузова'}
      footerProps={{
        onConfirm: handleConfirm,
      }}
    >
      <BottomSheetView className="flex-col">
        {options.map(opt => (
          <CustomRectButton key={opt.value} title={opt.label} isSelected={selectedBodyType?.value === opt.value} onPress={() => handleToggle(opt)} />
        ))}
      </BottomSheetView>
    </CustomBottomSheetModal>
  );
});
BodyTypeCreateBottomSheet.displayName = 'BodyTypeCreateBottomSheet';
