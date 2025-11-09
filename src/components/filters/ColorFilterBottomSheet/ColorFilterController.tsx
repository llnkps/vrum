import { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { TouchableHighlightRow } from '@/components/global/TouchableHighlightRow';
import React, { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ColorFilterBottomSheet } from './ColorFilterBottomSheet';

interface ColorFilterControllerProps {
  value?: Array<{ label: string; value: string }>;
  onChange: (value: Array<{ label: string; value: string }> | undefined) => void;
  error?: string;
}

const ColorFilterController = ({ value, onChange, error }: ColorFilterControllerProps) => {
  const { t } = useTranslation();
  const colorModalRef = useRef<BottomSheetRef>(null);

  const handlePresentColorModalPress = useCallback(() => {
    colorModalRef.current?.present();
  }, []);

  const selectedValue = React.useMemo(() => {
    if (!value || value.length === 0) return undefined;
    return value.map(t => t.label).join(', ');
  }, [value]);

  return (
    <>
      <TouchableHighlightRow
        label={t('filters.color.label')}
        selectedValue={selectedValue}
        onPress={handlePresentColorModalPress}
        variant="plain"
        showRightArrow
        rightIcon="chevron-down"
        selectedValueMode="replace"
        error={error}
      />
      <ColorFilterBottomSheet
        ref={colorModalRef}
        onChange={(options) => {
          onChange(options.length > 0 ? options : undefined);
          colorModalRef.current?.close({ duration: 150 });
        }}
      />
    </>
  );
};

export { ColorFilterController };