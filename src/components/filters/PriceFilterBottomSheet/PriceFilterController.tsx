import { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { TouchableHighlightRow, TouchableHighlightRowProps } from '@/components/global/TouchableHighlightRow';
import React, { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { PriceBottomSheet } from './PriceFilterBottomSheet';
import { RangeFilterType } from '@/types/filter';
import { useTranslateRangeFilter, createFilterFormatCallback } from '@/utils/useTranslateRangeFilter';

interface PriceFilterControllerProps {
  value?: RangeFilterType;
  onChange: (value: RangeFilterType | undefined) => void;
  error?: string;
  appearance?: TouchableHighlightRowProps['appearance'];
  selectedValueMode?: "under" | "replace";
}

const PriceFilterController = React.memo(({ value, onChange, error, appearance = 'default', selectedValueMode = "under" }: PriceFilterControllerProps) => {
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
        appearance={appearance}
        showRightArrow={false}
        error={error}
        selectedValueMode={selectedValueMode}
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
