import CustomBottomSheetModal, { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { CustomRectButton } from '@/components/ui/button';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef } from 'react';

type NumberOfOwnersOption = (typeof options)[number];

type NumberOfOwnersFilterBottomSheetProps = {
  onSelect: (value: NumberOfOwnersOption) => void;
};

const options = [
  { label: 'Один', value: 'one' },
  { label: 'Два', value: 'up_to_two' },
  { label: 'Три', value: 'up_to_three' },
  { label: 'Больше трех', value: 'more_than_three' },
];

export const NumberOfOwnersFilterBottomSheet = forwardRef<
  BottomSheetRef,
  NumberOfOwnersFilterBottomSheetProps
>(({ onSelect }, ref) => {
  const [selectedValue, setSelectedValue] = React.useState<string | undefined>(undefined);

  return (
    <CustomBottomSheetModal
      ref={ref}
      snapPoints={['33%']}
      enableContentPanningGesture={true}
      title={'Количество владельцев'}
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
NumberOfOwnersFilterBottomSheet.displayName = 'NumberOfOwnersFilterBottomSheet';
