import CustomBottomSheetModal, { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { CustomRectButton } from '@/components/ui/button';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef } from 'react';

type OptionType = (typeof options)[number];

type SellerModalProps = {
  onSelect: (value: OptionType) => void;
};

const options = [
  { label: 'Собственник', value: 'owner' },
  { label: 'Частник', value: 'private' },
  { label: 'Компания', value: 'company' },
];

const SellerModal = forwardRef<BottomSheetRef, SellerModalProps>(({ onSelect }, ref) => {
  const [selectedValue, setSelectedValue] = React.useState<string>('');

  return (
    <CustomBottomSheetModal
      ref={ref}
      snapPoints={['35%']}
      enableContentPanningGesture={true}
      title="Владелец"
    >
      <BottomSheetView className="flex-col">
        {options.map(opt => (
          <CustomRectButton
            key={opt.value}
            onPress={() => {
              onSelect(opt);
              setSelectedValue(opt.value);
            }}
            title={opt.label}
            isSelected={selectedValue === opt.value}
          />
        ))}
      </BottomSheetView>
    </CustomBottomSheetModal>
  );
});
SellerModal.displayName = 'SellerModal';

export default SellerModal;
