import { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { TouchableHighlightRow } from '@/components/global/TouchableHighlightRow';
import { RangeFilterType } from '@/types/filter';
import React, { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import PowerFilterBottomSheet from './PowerFilterBottomSheet';

interface PowerFilterControllerProps {
  value?: RangeFilterType;
  onChange: (value: RangeFilterType | undefined) => void;
  error?: string;
}

const PowerFilterController = React.memo(({ value, onChange, error }: PowerFilterControllerProps) => {
  const { t } = useTranslation();
  const powerModalRef = useRef<BottomSheetRef>(null);

  const handlePresentPowerModalPress = useCallback(() => {
    powerModalRef.current?.present();
  }, []);

  const selectedValue = React.useMemo(() => {
    if (!value) return undefined;
    const { from, to } = value;
    if (from && to) return t('filters.power.range', { from: t('filters.power.from', { value: from }), to: t('filters.power.to', { value: to }) });
    if (from) return t('filters.power.from', { value: from });
    if (to) return t('filters.power.to', { value: to });
    return undefined;
  }, [value, t]);

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
        onChange={range => {
          onChange(range);
          powerModalRef.current?.close({ duration: 150 });
        }}
      />
    </>
  );
});

PowerFilterController.displayName = 'PowerFilterController';

export { PowerFilterController };
