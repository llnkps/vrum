import { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { TouchableHighlightRow } from '@/components/global/TouchableHighlightRow';
import React, { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { PriceBottomSheet } from './PriceFilterBottomSheet';
import { RangeFilterType } from '@/types/filter';
import { useTranslateRangeFilter, createFilterFormatCallback } from '@/utils/useTranslateRangeFilter';

interface PriceFilterControllerProps {
  value?: RangeFilterType;
  onChange: (value: RangeFilterType | undefined) => void;
  error?: string;
  variant?: 'plain' | 'bordered' | 'button';
}

const PriceFilterController = React.memo(({ value, onChange, error, variant = 'button' }: PriceFilterControllerProps) => {
  const { t } = useTranslation();
  const priceModalRef = useRef<BottomSheetRef>(null);
  const selectedValue = useTranslateRangeFilter('price', value, createFilterFormatCallback('price'));

  const handlePresentPriceModalPress = useCallback(() => {
    priceModalRef.current?.present();
  }, []);

  return (
    <>
      <TouchableHighlightRow
        label={t('searchScreen.simpleAuto.price')}
        selectedValue={selectedValue}
        onPress={handlePresentPriceModalPress}
        variant={variant}
        showRightArrow={false}
        error={error}
      />
      <PriceBottomSheet
        ref={priceModalRef}
        onChange={priceRange => {
          onChange(priceRange);
          priceModalRef.current?.close({ duration: 150 });
        }}
      />
    </>
  );
});

PriceFilterController.displayName = 'PriceFilterController';

export { PriceFilterController };
