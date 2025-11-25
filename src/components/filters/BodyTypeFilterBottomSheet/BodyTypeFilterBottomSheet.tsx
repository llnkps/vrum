import { CheckboxRectButton } from '@/components/global/CheckboxRectButton';
import CustomBottomSheetModal, { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { FilterOptionType } from '@/types/filter';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import React, { forwardRef } from 'react';

type BodyTypeFilterBottomSheetProps = {
  onChange: (values: FilterOptionType[]) => void;
  options: readonly FilterOptionType[];
  title: string;
  selectedOptions?: FilterOptionType[];
};

export const BodyTypeFilterBottomSheet = forwardRef<BottomSheetRef, BodyTypeFilterBottomSheetProps>(
  ({ onChange, options, title, selectedOptions = [] }, ref) => {
    const [selectedBodyTypes, setSelectedBodyTypes] = React.useState<FilterOptionType[]>(selectedOptions);

    React.useEffect(() => {
      setSelectedBodyTypes(selectedOptions);
    }, [selectedOptions]);

    const handleToggle = (option: FilterOptionType) => {
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
        title={title}
        footerProps={{
          onConfirm: handleConfirm,
        }}
      >
        <BottomSheetScrollView className="flex-col">
          {options.map(opt => (
            <CheckboxRectButton
              key={opt.value}
              label={opt.label}
              value={selectedBodyTypes.some(t => t.value === opt.value)}
              onPress={() => handleToggle(opt)}
            />
          ))}
        </BottomSheetScrollView>
      </CustomBottomSheetModal>
    );
  }
);
BodyTypeFilterBottomSheet.displayName = 'BodyTypeFilterBottomSheet';
