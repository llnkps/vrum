import { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { TouchableHighlightRow } from '@/components/global/TouchableHighlightRow';
import React, { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import PowerFilterBottomSheet from './PowerFilterBottomSheet';

interface PowerFilterControllerProps {
  value?: { min?: number; max?: number };
  onChange: (value: { min?: number; max?: number } | undefined) => void;
  error?: string;
}

const PowerFilterController = ({ value, onChange, error }: PowerFilterControllerProps) => {
  const { t } = useTranslation();
  const powerModalRef = useRef<BottomSheetRef>(null);

  const handlePresentPowerModalPress = useCallback(() => {
    powerModalRef.current?.present();
  }, []);

  const selectedValue = React.useMemo(() => {
    if (!value) return undefined;
    const { min, max } = value;
    if (min && max) return `${min} - ${max}`;
    if (min) return `от ${min}`;
    if (max) return `до ${max}`;
    return undefined;
  }, [value]);

  return (
    <>
      <TouchableHighlightRow
        label={t('filters.power.label')}
        selectedValue={selectedValue}
        onPress={handlePresentPowerModalPress}
        variant="bordered"
        showRightArrow
        rightIcon="chevron-down"
        selectedValueMode="replace"
        error={error}
      />
      <PowerFilterBottomSheet
        ref={powerModalRef}
        onChange={(range) => {
          onChange(range);
          powerModalRef.current?.close({ duration: 150 });
        }}
      />
    </>
  );
};

export { PowerFilterController };