import { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { TouchableHighlightRow } from '@/components/global/TouchableHighlightRow';
import React, { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { BodyTypeFilterBottomSheet } from './BodyTypeFilterBottomSheet';

interface BodyTypeFilterControllerProps {
  value?: Array<{ label: string; value: string }>;
  onChange: (value: Array<{ label: string; value: string }> | undefined) => void;
  error?: string;
}

const BodyTypeFilterController = ({ value, onChange, error }: BodyTypeFilterControllerProps) => {
  const { t } = useTranslation();
  const bodyTypeModalRef = useRef<BottomSheetRef>(null);

  const handlePresentBodyTypeModalPress = useCallback(() => {
    bodyTypeModalRef.current?.present();
  }, []);

  const selectedValue = React.useMemo(() => {
    if (!value || value.length === 0) return undefined;
    return value.map(t => t.label).join(', ');
  }, [value]);

  return (
    <>
      <TouchableHighlightRow
        label={t('filters.frameType.label')}
        selectedValue={selectedValue}
        onPress={handlePresentBodyTypeModalPress}
        variant="bordered"
        showRightArrow
        rightIcon="chevron-down"
        selectedValueMode="replace"
        error={error}
      />
      <BodyTypeFilterBottomSheet
        ref={bodyTypeModalRef}
        onChange={(options) => {
          onChange(options.length > 0 ? options : undefined);
          bodyTypeModalRef.current?.close({ duration: 150 });
        }}
      />
    </>
  );
};

export { BodyTypeFilterController };