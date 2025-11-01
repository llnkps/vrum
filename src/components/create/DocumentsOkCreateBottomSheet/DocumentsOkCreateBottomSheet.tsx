import CustomBottomSheetModal, { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { CustomRectButton } from '@/components/ui/button';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef } from 'react';

type DocumentsOkOption = (typeof options)[number];

type DocumentsOkCreateBottomSheetProps = {
  onChange: (value: DocumentsOkOption | undefined) => void;
};

const options = [
  { label: 'Документы в порядке', value: 'ok' },
  { label: 'Проблемы с документами', value: 'missing_or_problematic' },
];

export const DocumentsOkCreateBottomSheet = forwardRef<BottomSheetRef, DocumentsOkCreateBottomSheetProps>(({ onChange }, ref) => {
  const [selected, setSelected] = React.useState<DocumentsOkOption | undefined>(undefined);

  const handleToggle = (option: DocumentsOkOption) => {
    setSelected(option);
  };

  const handleConfirm = () => {
    onChange(selected);
  };

  return (
    <CustomBottomSheetModal
      ref={ref}
      snapPoints={['25%']}
      enableContentPanningGesture={true}
      title="Документы"
      footerProps={{
        onConfirm: handleConfirm,
      }}
    >
      <BottomSheetView className="flex-col">
        {options.map(opt => (
          <CustomRectButton key={opt.value} title={opt.label} isSelected={selected?.value === opt.value} onPress={() => handleToggle(opt)} />
        ))}
      </BottomSheetView>
    </CustomBottomSheetModal>
  );
});
DocumentsOkCreateBottomSheet.displayName = 'DocumentsOkCreateBottomSheet';
