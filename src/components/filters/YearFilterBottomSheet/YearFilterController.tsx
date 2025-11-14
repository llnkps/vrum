import { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { TouchableHighlightRow } from '@/components/global/TouchableHighlightRow';
import React, { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { YearBottomSheet } from './YearFilterBottomSheet';
import { RangeFilterType } from '@/types/filter';

interface YearFilterControllerProps {
  value?: RangeFilterType;
  onChange: (value: RangeFilterType | undefined) => void;
  error?: string;
  variant?: 'plain' | 'bordered' | 'button';
}

const YearFilterController = React.memo(({ value, onChange, error, variant = 'button' }: YearFilterControllerProps) => {
  const { t } = useTranslation();
  const yearModalRef = useRef<BottomSheetRef>(null);

  const handlePresentYearModalPress = useCallback(() => {
    yearModalRef.current?.present();
  }, []);

  const selectedValue = React.useMemo(() => {
    if (!value) return undefined;
    const { from, to } = value;
    if (from && to) return t('filters.year.range', { from: t('filters.year.from', { value: from }), to: t('filters.year.to', { value: to }) });
    if (from) return t('filters.year.from', { value: from });
    if (to) return t('filters.year.to', { value: to });
    return undefined;
  }, [value, t]);

  return (
    <>
      <TouchableHighlightRow
        label={t('searchScreen.simpleAuto.year')}
        selectedValue={selectedValue}
        onPress={handlePresentYearModalPress}
        variant={variant}
        showRightArrow={false}
        selectedValueMode="replace"
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
