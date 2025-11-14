import { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { TouchableHighlightRow } from '@/components/global/TouchableHighlightRow';
import { BACKEND_FILTERS, FilterOptionType } from '@/types/filter';
import React, { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { DocumentsOkFilterBottomSheet } from './DocumentsOkFilterBottomSheet';
import { useFilterConfigs } from '@/shared/filter';

interface DocumentsOkFilterControllerProps {
  selectedOption?: FilterOptionType;
  onChange: (value: FilterOptionType | undefined) => void;
  error?: string;
}

const DocumentsOkFilterController = ({ selectedOption, onChange, error }: DocumentsOkFilterControllerProps) => {
  const { t } = useTranslation();
  const documentsOkModalRef = useRef<BottomSheetRef>(null);

  const filterConfigs = useFilterConfigs();
  const documentsOkConfig = filterConfigs[BACKEND_FILTERS.DOCUMENT_TYPE];
  const options = documentsOkConfig?.options || [];

  const handlePresentDocumentsOkModalPress = useCallback(() => {
    documentsOkModalRef.current?.present();
  }, []);

  const selectedValue = React.useMemo(() => {
    return selectedOption?.label;
  }, [selectedOption]);

  return (
    <>
      <TouchableHighlightRow
        label={t('filters.documentsOk.label')}
        selectedValue={selectedValue}
        onPress={handlePresentDocumentsOkModalPress}
        variant="bordered"
        showRightArrow
        rightIcon="chevron-down"
        selectedValueMode="replace"
        error={error}
      />
      <DocumentsOkFilterBottomSheet
        ref={documentsOkModalRef}
        options={options}
        title={documentsOkConfig?.label || 'Documents'}
        onSelect={option => {
          onChange(option);
          documentsOkModalRef.current?.close({ duration: 150 });
        }}
      />
    </>
  );
};

export { DocumentsOkFilterController };
