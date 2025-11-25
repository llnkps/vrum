import { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { TouchableHighlightRow, TouchableHighlightRowProps } from '@/components/global/TouchableHighlightRow';
import React, { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { YearBottomSheet } from './YearFilterBottomSheet';
import { RangeFilterType } from '@/types/filter';
import { useTranslateRangeFilter } from '@/utils/useTranslateRangeFilter';

interface YearFilterControllerProps {
  value?: RangeFilterType;
  onChange: (value: RangeFilterType | undefined) => void;
  error?: string;
  appearance?: TouchableHighlightRowProps['appearance'];
  selectedValueMode?: 'under' | 'replace';
}

const YearFilterController = React.memo(({ value, onChange, error, appearance = 'default', selectedValueMode = 'under' }: YearFilterControllerProps) => {
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
        appearance={appearance}
        showRightArrow={false}
        error={error}
        selectedValueMode={selectedValueMode}
      />
      <YearBottomSheet
        ref={yearModalRef}
        onChange={yearRange => {
          onChange(yearRange);
        }}
      />
    </>
  );
});

YearFilterController.displayName = 'YearFilterController';

export { YearFilterController };
