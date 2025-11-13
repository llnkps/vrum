import CustomBottomSheetModal, { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { CustomRectButton } from '@/components/ui/button';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef } from 'react';
import { useFilterConfigs, FilterOption } from '@/shared/filter';
import { BACKEND_FILTERS } from '@/shared/filter';

type DocumentsOkFilterBottomSheetProps = {
  onSelect: (value: FilterOption) => void;
};

export const DocumentsOkFilterBottomSheet = forwardRef<BottomSheetRef, DocumentsOkFilterBottomSheetProps>(({ onSelect }, ref) => {
  const filterConfigs = useFilterConfigs();
  const documentConfig = filterConfigs[BACKEND_FILTERS.DOCUMENT_TYPE];
  const options = documentConfig?.options || [];
  const [selected, setSelected] = React.useState<string | number | undefined>(undefined);

  return (
    <CustomBottomSheetModal ref={ref} snapPoints={['25%']} enableContentPanningGesture={true} title={documentConfig.label}>
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
