import CustomBottomSheetModal, { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { CustomRectButton } from '@/components/ui/button';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef } from 'react';
import { FilterOptionType } from '@/types/filter';

type DocumentsOkFilterBottomSheetProps = {
  onSelect: (value: FilterOption) => void;
  options: readonly FilterOptionType[];
  title: string;
};

export const DocumentsOkFilterBottomSheet = forwardRef<BottomSheetRef, DocumentsOkFilterBottomSheetProps>(({ onSelect, options, title }, ref) => {
  const [selected, setSelected] = React.useState<string | number | undefined>(undefined);

  return (
    <CustomBottomSheetModal ref={ref} snapPoints={['25%']} enableContentPanningGesture={true} title={title}>
      <BottomSheetView className="flex-col">
        {options.map(opt => (
          <CustomRectButton
            key={opt.value}
            onPress={() => {
              onSelect(opt);
              setSelected(opt.value);
            }}
            title={opt.label}
            isSelected={selected === opt.value}
          />
        ))}
      </BottomSheetView>
    </CustomBottomSheetModal>
  );
});
DocumentsOkFilterBottomSheet.displayName = 'DocumentsOkFilterBottomSheet';
