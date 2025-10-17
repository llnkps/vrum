import CustomBottomSheetModal, { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { CustomRectButton } from '@/components/ui/button';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef } from 'react';

type BodyTypeOption = (typeof options)[number];

type BodyTypeModalProps = {
  onSelect: (value: BodyTypeOption) => void;
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

export const BodyTypeFilterBottomSheet = forwardRef<BottomSheetRef, BodyTypeModalProps>(
  ({ onSelect }, ref) => {
    const [selectedBodyType, setSelectedBodyType] = React.useState<string | undefined>(undefined);

    return (
      <CustomBottomSheetModal
        ref={ref}
        snapPoints={['45%']}
        enableContentPanningGesture={true}
        title="Кузова"
      >
        <BottomSheetView className="flex-col">
          {options.map(opt => (
            <CustomRectButton
              key={opt.value}
              onPress={() => {
                onSelect(opt);
                setSelectedBodyType(opt.value);
              }}
              title={opt.label}
              isSelected={selectedBodyType === opt.value}
            />
          ))}
        </BottomSheetView>
      </CustomBottomSheetModal>
    );
  }
);
BodyTypeFilterBottomSheet.displayName = 'BodyTypeFilterBottomSheet';
