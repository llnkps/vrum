import { CheckboxRectButton } from '@/components/global/CheckboxRectButton';
import CustomBottomSheetModal, { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { FilterOptionType } from '@/types/filter';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import React, { forwardRef } from 'react';

type SellerFilterBottomSheetProps = {
  onChange: (values: FilterOptionType[]) => void;
  options: readonly FilterOptionType[];
  title: string;
  selectedOptions?: FilterOptionType[];
};

export const SellerFilterBottomSheet = forwardRef<BottomSheetRef, SellerFilterBottomSheetProps>(
  ({ onChange, options, title, selectedOptions = [] }, ref) => {
    const [selectedSellers, setSelectedSellers] = React.useState<FilterOptionType[]>(selectedOptions);

    React.useEffect(() => {
      setSelectedSellers(selectedOptions);
    }, [selectedOptions]);

    const handleToggle = (option: FilterOptionType) => {
      const isSelected = selectedSellers.some(v => v.value === option.value);
      if (isSelected) {
        setSelectedSellers(selectedSellers.filter(v => v.value !== option.value));
      } else {
        setSelectedSellers([...selectedSellers, option]);
      }
    };

    const handleConfirm = () => {
      onChange(selectedSellers);
    };

    return (
      <CustomBottomSheetModal
        ref={ref}
        snapPoints={['30%']}
        enableContentPanningGesture={true}
        title={title}
        footerProps={{
          onConfirm: handleConfirm,
        }}
      >
        <BottomSheetScrollView className="flex-col" enableFooterMarginAdjustment={true}>
          {options.map(opt => (
            <CheckboxRectButton
              key={opt.value}
              label={opt.label}
              value={selectedSellers.some(v => v.value === opt.value)}
              onPress={() => handleToggle(opt)}
            />
          ))}
        </BottomSheetScrollView>
      </CustomBottomSheetModal>
    );
  }
);
SellerFilterBottomSheet.displayName = 'SellerFilterBottomSheet';
