import { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { TouchableHighlightRow } from '@/components/global/TouchableHighlightRow';
import React, { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { YearBottomSheet } from './YearFilterBottomSheet';
import { RangeFilterType } from '@/types/filter';
import { useTranslateRangeFilter } from '@/utils/useTranslateRangeFilter';

interface YearFilterControllerProps {
  value?: RangeFilterType;
  onChange: (value: RangeFilterType | undefined) => void;
  error?: string;
  variant?: 'plain' | 'bordered' | 'button';
}

const YearFilterController = React.memo(({ value, onChange, error, variant = 'button' }: YearFilterControllerProps) => {
  const { t } = useTranslation();
  const yearModalRef = useRef<BottomSheetRef>(null);
  const selectedValue = useTranslateRangeFilter('year', value);

  const handlePresentYearModalPress = useCallback(() => {
    yearModalRef.current?.present();
  }, []);

  return (
    <>
      <TouchableHighlightRow
        label={t('searchScreen.simpleAuto.year')}
        selectedValue={selectedValue}
        onPress={handlePresentYearModalPress}
        variant={variant}
        showRightArrow={false}
        error={error}
      />
      <YearBottomSheet
        ref={yearModalRef}
        onChange={yearRange => {
          onChange(yearRange);
          yearModalRef.current?.close({ duration: 150 });
        }}
      />
    </>
  );
});

YearFilterController.displayName = 'YearFilterController';

export { YearFilterController };
