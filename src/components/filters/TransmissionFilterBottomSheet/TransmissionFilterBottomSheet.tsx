import { CheckboxRectButton } from '@/components/global/CheckboxRectButton';
import CustomBottomSheetModal, { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { FilterOptionType } from '@/types/filter';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef } from 'react';

type TransmissionFilterBottomSheetProps = {
  onChange: (values: FilterOptionType[]) => void;
  options: readonly FilterOptionType[];
  title: string;
  selectedOptions?: FilterOptionType[];
};

export const TransmissionFilterBottomSheet = forwardRef<BottomSheetRef, TransmissionFilterBottomSheetProps>(
  ({ onChange, options, title, selectedOptions = [] }, ref) => {
    const [selectedTransmissions, setSelectedTransmissions] = React.useState<FilterOptionType[]>(selectedOptions);

    React.useEffect(() => {
      setSelectedTransmissions(selectedOptions);
    }, [selectedOptions]);

    const handleToggle = (option: FilterOptionType) => {
      const isSelected = selectedTransmissions.some(t => t.value === option.value);
      if (isSelected) {
        setSelectedTransmissions(selectedTransmissions.filter(t => t.value !== option.value));
      } else {
        setSelectedTransmissions([...selectedTransmissions, option]);
      }
    };

    const handleConfirm = () => {
      onChange(selectedTransmissions);
    };

    return (
      <CustomBottomSheetModal
        ref={ref}
        snapPoints={['35%']}
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
              value={selectedTransmissions.some(t => t.value === opt.value)}
              onPress={() => handleToggle(opt)}
            />
          ))}
        </BottomSheetView>
      </CustomBottomSheetModal>
    );
  }
);
TransmissionFilterBottomSheet.displayName = 'TransmissionFilterBottomSheet';
