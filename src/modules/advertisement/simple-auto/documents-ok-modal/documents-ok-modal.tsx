import CustomBottomSheetModal, { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { CustomRectButton } from '@/components/ui/button';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef } from 'react';

// type DocumentsOkOption = (typeof options)[number];

type DocumentsOkModalProps = {
  onSelect: (value: string) => void;
};

const options = [
  { label: 'Документы в порядке', value: 'ok' },
  { label: 'Проблемы с документами', value: 'missing_or_problematic' },
];

const DocumentsOkModal = forwardRef<BottomSheetRef, DocumentsOkModalProps>(({ onSelect }, ref) => {
  const [selected, setSelected] = React.useState<boolean | undefined>(undefined);

  return (
    <CustomBottomSheetModal
      ref={ref}
      snapPoints={['25%']}
      enableContentPanningGesture={true}
      title="Документы"
    >
      <BottomSheetView className="flex-col">
        {options.map(opt => (
          <CustomRectButton
            key={opt.label}
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
DocumentsOkModal.displayName = 'DocumentsOkModal';

export default DocumentsOkModal;
