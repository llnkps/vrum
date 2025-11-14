import { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { TouchableHighlightRow } from '@/components/global/TouchableHighlightRow';
import React, { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import EngineCapacityFilterBottomSheet from './EngineCapacityFilterBottomSheet';
import { RangeFilterType } from '@/types/filter';

interface EngineCapacityFilterControllerProps {
  value?: RangeFilterType;
  onChange: (value: RangeFilterType | undefined) => void;
  error?: string;
}

const EngineCapacityFilterController = React.memo(({ value, onChange, error }: EngineCapacityFilterControllerProps) => {
  const { t } = useTranslation();
  const engineCapacityModalRef = useRef<BottomSheetRef>(null);

  const handlePresentEngineCapacityModalPress = useCallback(() => {
    engineCapacityModalRef.current?.present();
  }, []);

  const selectedValue = React.useMemo(() => {
    if (!value) return undefined;
    const { from, to } = value;
    if (from && to) return t('filters.engineCapacity.range', { from: t('filters.engineCapacity.from', { value: from }), to: t('filters.engineCapacity.to', { value: to }) });
    if (from) return t('filters.engineCapacity.from', { value: from });
    if (to) return t('filters.engineCapacity.to', { value: to });
    return undefined;
  }, [value, t]);

  return (
    <>
      <TouchableHighlightRow
        label={t('filters.engineCapacity.label')}
        selectedValue={selectedValue}
        onPress={handlePresentEngineCapacityModalPress}
        variant="bordered"
        showRightArrow
        rightIcon="chevron-down"
        selectedValueMode="replace"
        error={error}
      />
      <EngineCapacityFilterBottomSheet
        ref={engineCapacityModalRef}
        onChange={range => {
          onChange(range);
          engineCapacityModalRef.current?.close({ duration: 150 });
        }}
      />
    </>
  );
});

EngineCapacityFilterController.displayName = 'EngineCapacityFilterController';

export { EngineCapacityFilterController };
