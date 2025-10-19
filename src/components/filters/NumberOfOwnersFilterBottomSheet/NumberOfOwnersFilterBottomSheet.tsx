import CustomBottomSheetModal, { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { CheckboxRectButton } from '@/components/global/CheckboxRectButton';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef } from 'react';

type NumberOfOwnersOption = (typeof options)[number];

type NumberOfOwnersFilterBottomSheetProps = {
  onChange: (values: NumberOfOwnersOption[]) => void;
};

const options = [
  { label: 'Один', value: 'one' },
  { label: 'Два', value: 'up_to_two' },
  { label: 'Три', value: 'up_to_three' },
  { label: 'Больше трех', value: 'more_than_three' },
];

export const NumberOfOwnersFilterBottomSheet = forwardRef<BottomSheetRef, NumberOfOwnersFilterBottomSheetProps>(({ onChange }, ref) => {
  const [selectedValues, setSelectedValues] = React.useState<NumberOfOwnersOption[]>([]);

  const handleToggle = (option: NumberOfOwnersOption) => {
    const isSelected = selectedValues.some(v => v.value === option.value);
    if (isSelected) {
      setSelectedValues(selectedValues.filter(v => v.value !== option.value));
    } else {
      setSelectedValues([...selectedValues, option]);
    }
  };

  const handleConfirm = () => {
    onChange(selectedValues);
  };

  return (
    <CustomBottomSheetModal
      ref={ref}
      snapPoints={['33%']}
      enableContentPanningGesture={true}
      title={'Количество владельцев'}
      footerProps={{
        onConfirm: handleConfirm,
      }}
    >
      <BottomSheetView className="flex-col">
        {options.map(opt => (
          <CheckboxRectButton
            key={opt.value}
            label={opt.label}
            value={selectedValues.some(v => v.value === opt.value)}
            onPress={() => handleToggle(opt)}
          />
        ))}
      </BottomSheetView>
    </CustomBottomSheetModal>
  );
});
NumberOfOwnersFilterBottomSheet.displayName = 'NumberOfOwnersFilterBottomSheet';
