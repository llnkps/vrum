import CustomBottomSheetModal, { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { CheckboxRectButton } from '@/components/global/CheckboxRectButton';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef } from 'react';
import { FilterOptionType } from '@/types/filter';

type DrivetrainFilterBottomSheetProps = {
  onChange: (values: FilterOptionType[]) => void;
  options: readonly FilterOptionType[];
  title: string;
  selectedOptions?: FilterOptionType[];
};

export const DrivetrainFilterBottomSheet = forwardRef<BottomSheetRef, DrivetrainFilterBottomSheetProps>(
  ({ onChange, options, title, selectedOptions = [] }, ref) => {
    const [selectedDrivetrains, setSelectedDrivetrains] = React.useState<FilterOptionType[]>(selectedOptions);

    React.useEffect(() => {
      setSelectedDrivetrains(selectedOptions);
    }, [selectedOptions]);

    const handleToggle = (option: FilterOptionType) => {
      const isSelected = selectedDrivetrains.some(t => t.value === option.value);
      if (isSelected) {
        setSelectedDrivetrains(selectedDrivetrains.filter(t => t.value !== option.value));
      } else {
        setSelectedDrivetrains([...selectedDrivetrains, option]);
      }
    };

    const handleConfirm = () => {
      onChange(selectedDrivetrains);
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
        <BottomSheetView className="flex-col">
          {options.map(opt => (
            <CheckboxRectButton
              key={opt.value}
              label={opt.label}
              value={selectedDrivetrains.some(t => t.value === opt.value)}
              onPress={() => handleToggle(opt)}
            />
          ))}
        </BottomSheetView>
      </CustomBottomSheetModal>
    );
  }
);
DrivetrainFilterBottomSheet.displayName = 'DrivetrainFilterBottomSheet';
