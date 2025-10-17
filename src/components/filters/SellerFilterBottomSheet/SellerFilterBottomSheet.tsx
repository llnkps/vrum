import CustomBottomSheetModal, { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { CheckboxRectButton } from '@/components/global/CheckboxRectButton';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef } from 'react';

type SellerOption = (typeof options)[number];

type SellerFilterBottomSheetProps = {
  onChange: (values: SellerOption[]) => void;
};

const options = [
  { label: 'Собственник', value: 'owner' },
  { label: 'Частник', value: 'private' },
  { label: 'Компания', value: 'company' },
];

export const SellerFilterBottomSheet = forwardRef<BottomSheetRef, SellerFilterBottomSheetProps>(
  ({ onChange }, ref) => {
    const [selectedValues, setSelectedValues] = React.useState<SellerOption[]>([]);

    const handleToggle = (option: SellerOption) => {
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
        snapPoints={['35%']}
        enableContentPanningGesture={true}
        title="Владелец"
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
  }
);
SellerFilterBottomSheet.displayName = 'SellerFilterBottomSheet';
