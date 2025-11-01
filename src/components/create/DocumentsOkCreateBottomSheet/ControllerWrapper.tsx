import { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { TouchableHighlightRow } from '@/components/global/TouchableHighlightRow';
import React, { useCallback, useRef } from 'react';
import { Controller, Control } from 'react-hook-form';
import { DocumentsOkCreateBottomSheet } from './DocumentsOkCreateBottomSheet';

interface DocumentsOkControllerWrapperProps {
  control: Control<any>;
}

const Wrapper = ({ control }: DocumentsOkControllerWrapperProps) => {
  const [selectedDocumentsOk, setSelectedDocumentsOk] = React.useState<string | undefined>(undefined);
  console.log('Rendering DocumentsOkCreateBottomSheet Wrapper');
  const documentsOkModalRef = useRef<BottomSheetRef>(null);
  const handlePresentDocumentsOkModalPress = useCallback(() => {
    documentsOkModalRef.current?.present();
  }, []);

  return (
    <>
      <Controller
        control={control}
        name="documents_ok"
        rules={{
          required: 'Выберите состояние документов'
        }}
        render={({ field: _field, fieldState: { error } }) => (
          <>
            <TouchableHighlightRow
              variant="bordered"
              label={'Документы'}
              selectedValue={selectedDocumentsOk ?? undefined}
              onPress={handlePresentDocumentsOkModalPress}
              rightIcon="chevron-down"
              required
              error={error?.message}
            />
            <DocumentsOkCreateBottomSheet
              ref={documentsOkModalRef}
              onChange={(documentsOk) => {
                _field.onChange(documentsOk?.value || '');
                setSelectedDocumentsOk(documentsOk?.label || '');
                documentsOkModalRef.current?.close({ duration: 150 });
              }}
            />
          </>
        )}
      />
    </>
  );
};

export const DocumentsOkCreateBottomSheetControllerWrapper = React.memo(Wrapper);