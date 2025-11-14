import { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { TouchableHighlightRow } from '@/components/global/TouchableHighlightRow';
import React, { useCallback, useRef } from 'react';
import { DocumentsOkCreateBottomSheet, options } from './DocumentsOkCreateBottomSheet';

interface DocumentsOkControllerWrapperProps {
  value?: string;
  onChange: (value: string) => void;
  error?: string;
}

const Wrapper = ({ value, onChange, error }: DocumentsOkControllerWrapperProps) => {
  console.log('Rendering DocumentsOkCreateBottomSheet Wrapper');
  const documentsOkModalRef = useRef<BottomSheetRef>(null);
  const handlePresentDocumentsOkModalPress = useCallback(() => {
    documentsOkModalRef.current?.present();
  }, []);

  const selectedLabel = React.useMemo(() => {
    return options.find(opt => opt.value === value)?.label;
  }, [value]);

  return (
    <>
      <TouchableHighlightRow
        variant="bordered"
        label={'Документы'}
        selectedValue={selectedLabel}
        onPress={handlePresentDocumentsOkModalPress}
        rightIcon="chevron-down"
        required
        error={error}
      />
      <DocumentsOkCreateBottomSheet
        ref={documentsOkModalRef}
        onChange={documentsOk => {
          onChange(documentsOk?.value || '');
          documentsOkModalRef.current?.close({ duration: 150 });
        }}
      />
    </>
  );
};

export const DocumentsOkCreateBottomSheetControllerWrapper = React.memo(Wrapper);
