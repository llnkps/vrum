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

const EngineCapacityFilterController = ({ value, onChange, error }: EngineCapacityFilterControllerProps) => {
  const { t } = useTranslation();
  const engineCapacityModalRef = useRef<BottomSheetRef>(null);

  const handlePresentEngineCapacityModalPress = useCallback(() => {
    engineCapacityModalRef.current?.present();
  }, []);

  const selectedValue = React.useMemo(() => {
    if (!value) return undefined;
    const { from, to } = value;
    if (from && to) return `${from} - ${to}`;
    if (from) return `от ${from}`;
    if (to) return `до ${to}`;
    return undefined;
  }, [value]);

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
        onChange={(range) => {
          onChange(range);
          engineCapacityModalRef.current?.close({ duration: 150 });
        }}
      />
    </>
  );
};

export { EngineCapacityFilterController };