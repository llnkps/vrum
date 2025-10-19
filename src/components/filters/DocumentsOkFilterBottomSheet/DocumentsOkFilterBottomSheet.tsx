import CustomBottomSheetModal, { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { CustomRectButton } from '@/components/ui/button';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef } from 'react';

type DocumentsOkOption = (typeof options)[number];

type DocumentsOkFilterBottomSheetProps = {
  onSelect: (value: DocumentsOkOption) => void;
};

const options = [
  { label: 'Документы в порядке', value: 'ok' },
  { label: 'Проблемы с документами', value: 'missing_or_problematic' },
];

export const DocumentsOkFilterBottomSheet = forwardRef<BottomSheetRef, DocumentsOkFilterBottomSheetProps>(({ onSelect }, ref) => {
  const [selected, setSelected] = React.useState<string | undefined>(undefined);

  return (
    <CustomBottomSheetModal ref={ref} snapPoints={['25%']} enableContentPanningGesture={true} title="Документы">
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
