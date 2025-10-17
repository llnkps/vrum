import CustomBottomSheetModal, { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { CustomRectButton } from '@/components/ui/button';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef } from 'react';

type NumberOfOwnersOption = (typeof options)[number];

type NumberOfOwnersCreateBottomSheetProps = {
  onChange: (value: NumberOfOwnersOption | undefined) => void;
};

const options = [
  { label: 'Один', value: 'one' },
  { label: 'Два', value: 'up_to_two' },
  { label: 'Три', value: 'up_to_three' },
  { label: 'Больше трех', value: 'more_than_three' },
];

export const NumberOfOwnersCreateBottomSheet = forwardRef<
  BottomSheetRef,
  NumberOfOwnersCreateBottomSheetProps
>(({ onChange }, ref) => {
  const [selectedNumberOfOwners, setSelectedNumberOfOwners] = React.useState<NumberOfOwnersOption | undefined>(undefined);

  const handleToggle = (option: NumberOfOwnersOption) => {
    setSelectedNumberOfOwners(option);
  };

  const handleConfirm = () => {
    onChange(selectedNumberOfOwners);
  };

  return (
    <CustomBottomSheetModal
      ref={ref}
      snapPoints={['35%']}
      enableContentPanningGesture={true}
      title={'Количество владельцев'}
      footerProps={{
        onConfirm: handleConfirm,
      }}
    >
      <BottomSheetView className="flex-col">
        {options.map(opt => (
          <CustomRectButton
            key={opt.value}
            title={opt.label}
            isSelected={selectedNumberOfOwners?.value === opt.value}
            onPress={() => handleToggle(opt)}
          />
        ))}
      </BottomSheetView>
    </CustomBottomSheetModal>
  );
});
NumberOfOwnersCreateBottomSheet.displayName = 'NumberOfOwnersCreateBottomSheet';