import CustomBottomSheetModal, { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { CustomRectButton } from '@/components/ui/button';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef } from 'react';

type SellerOption = (typeof options)[number];

type SellerCreateBottomSheetProps = {
  onChange: (value: SellerOption | undefined) => void;
};

const options = [
  { label: 'Собственник', value: 'owner' },
  { label: 'Частник', value: 'private' },
  { label: 'Компания', value: 'company' },
];

export const SellerCreateBottomSheet = forwardRef<BottomSheetRef, SellerCreateBottomSheetProps>(({ onChange }, ref) => {
  const [selectedSeller, setSelectedSeller] = React.useState<SellerOption | undefined>(undefined);

  const handleToggle = (option: SellerOption) => {
    setSelectedSeller(option);
  };
  const handleConfirm = () => {
    onChange(selectedSeller);
  };

  return (
    <CustomBottomSheetModal
      ref={ref}
      snapPoints={['30%']}
      enableContentPanningGesture={true}
      title={'Продавец'}
      footerProps={{
        onConfirm: handleConfirm,
      }}
    >
      <BottomSheetView className="flex-col">
        {options.map(opt => (
          <CustomRectButton key={opt.value} title={opt.label} isSelected={selectedSeller?.value === opt.value} onPress={() => handleToggle(opt)} />
        ))}
      </BottomSheetView>
    </CustomBottomSheetModal>
  );
});
SellerCreateBottomSheet.displayName = 'SellerCreateBottomSheet';
