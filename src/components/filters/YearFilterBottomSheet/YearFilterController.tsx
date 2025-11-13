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

const YearFilterController = ({ value, onChange, error, variant = 'button' }: YearFilterControllerProps) => {
  const { t } = useTranslation();
  const yearModalRef = useRef<BottomSheetRef>(null);

  const handlePresentYearModalPress = useCallback(() => {
    yearModalRef.current?.present();
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
        onChange={(yearRange) => {
          onChange(yearRange);
          yearModalRef.current?.close({ duration: 150 });
        }}
      />
    </>
  );
};

export { YearFilterController };