import { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { TouchableHighlightRow } from '@/components/global/TouchableHighlightRow';
import { RangeFilterType } from '@/types/filter';
import React, { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import PowerFilterBottomSheet from './PowerFilterBottomSheet';
import { useTranslateRangeFilter, createFilterFormatCallback } from '@/utils/useTranslateRangeFilter';

interface PowerFilterControllerProps {
  value?: RangeFilterType;
  onChange: (value: RangeFilterType | undefined) => void;
  error?: string;
}

const PowerFilterController = React.memo(({ value, onChange, error }: PowerFilterControllerProps) => {
  const { t } = useTranslation();
  const powerModalRef = useRef<BottomSheetRef>(null);
  const selectedValue = useTranslateRangeFilter('power', value, createFilterFormatCallback('power'));

  const handlePresentPowerModalPress = useCallback(() => {
    powerModalRef.current?.present();
  }, []);

  return (
    <>
      <TouchableHighlightRow
        label={t('filters.power.label')}
        selectedValue={selectedValue}
        onPress={handlePresentPowerModalPress}
        variant="bordered"
        showRightArrow
        rightIcon="chevron-down"
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
