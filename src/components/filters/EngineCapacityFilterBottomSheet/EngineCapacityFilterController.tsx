import { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { TouchableHighlightRow } from '@/components/global/TouchableHighlightRow';
import React, { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import EngineCapacityFilterBottomSheet from './EngineCapacityFilterBottomSheet';
import { BACKEND_FILTERS, RangeFilterType } from '@/types/filter';
import { useTranslateRangeFilter } from '@/utils/useTranslateRangeFilter';

interface EngineCapacityFilterControllerProps {
  value?: RangeFilterType;
  onChange: (value: RangeFilterType | undefined) => void;
  error?: string;
}

const EngineCapacityFilterController = React.memo(({ value, onChange, error }: EngineCapacityFilterControllerProps) => {
  const { t } = useTranslation();
  const engineCapacityModalRef = useRef<BottomSheetRef>(null);
  const selectedValue = useTranslateRangeFilter(BACKEND_FILTERS.ENGINE_CAPACITY, value);

  const handlePresentEngineCapacityModalPress = useCallback(() => {
    engineCapacityModalRef.current?.present();
  }, []);

  return (
    <>
      <TouchableHighlightRow
        label={t(`filters.${BACKEND_FILTERS.ENGINE_CAPACITY}.label`)}
        selectedValue={selectedValue}
        onPress={handlePresentEngineCapacityModalPress}
        variant="bordered"
        showRightArrow
        rightIcon="chevron-down"
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
