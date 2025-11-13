import CustomBottomSheetModal, { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { CheckboxRectButton } from '@/components/global/CheckboxRectButton';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef } from 'react';
import { FilterOptionType } from '@/types/filter';

type NumberOfOwnersFilterBottomSheetProps = {
  onChange: (values: FilterOptionType[]) => void;
  options: readonly FilterOptionType[];
  title: string;
  selectedOptions?: FilterOptionType[];
};

export const NumberOfOwnersFilterBottomSheet = forwardRef<BottomSheetRef, NumberOfOwnersFilterBottomSheetProps>(({ onChange, options, title, selectedOptions = [] }, ref) => {
  const [selectedNumberOfOwners, setSelectedNumberOfOwners] = React.useState<FilterOptionType[]>(selectedOptions);

  React.useEffect(() => {
    setSelectedNumberOfOwners(selectedOptions);
  }, [selectedOptions]);

  const handleToggle = (option: FilterOptionType) => {
    const isSelected = selectedNumberOfOwners.some(v => v.value === option.value);
    if (isSelected) {
      setSelectedNumberOfOwners(selectedNumberOfOwners.filter(v => v.value !== option.value));
    } else {
      setSelectedNumberOfOwners([...selectedNumberOfOwners, option]);
    }
  };

  const handleConfirm = () => {
    onChange(selectedNumberOfOwners);
  };

  return (
    <CustomBottomSheetModal
      ref={ref}
      snapPoints={['33%']}
      enableContentPanningGesture={true}
      title={title}
      footerProps={{
        onConfirm: handleConfirm,
      }}
    >
      <BottomSheetView className="flex-col">
        {options.map(opt => (
          <CheckboxRectButton
            key={opt.value}
            label={opt.label}
            value={selectedNumberOfOwners.some(v => v.value === opt.value)}
            onPress={() => handleToggle(opt)}
          />
        ))}
      </BottomSheetView>
    </CustomBottomSheetModal>
  );
});
NumberOfOwnersFilterBottomSheet.displayName = 'NumberOfOwnersFilterBottomSheet';
