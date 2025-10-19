import CustomBottomSheetModal, { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { CheckboxRectButton } from '@/components/global/CheckboxRectButton';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef } from 'react';

type BodyTypeOption = (typeof options)[number];

type BodyTypeModalProps = {
  onChange: (values: BodyTypeOption[]) => void;
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

export const BodyTypeFilterBottomSheet = forwardRef<BottomSheetRef, BodyTypeModalProps>(({ onChange }, ref) => {
  const [selectedBodyTypes, setSelectedBodyTypes] = React.useState<BodyTypeOption[]>([]);

  const handleToggle = (option: BodyTypeOption) => {
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
