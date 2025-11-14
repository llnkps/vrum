import { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { TouchableHighlightRow } from '@/components/global/TouchableHighlightRow';
import React, { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { PriceBottomSheet } from './PriceFilterBottomSheet';
import { RangeFilterType } from '@/types/filter';

interface PriceFilterControllerProps {
  value?: RangeFilterType;
  onChange: (value: RangeFilterType | undefined) => void;
  error?: string;
  variant?: 'plain' | 'bordered' | 'button';
}

const PriceFilterController = React.memo(({ value, onChange, error, variant = 'button' }: PriceFilterControllerProps) => {
  const { t } = useTranslation();
  const priceModalRef = useRef<BottomSheetRef>(null);

  const handlePresentPriceModalPress = useCallback(() => {
    priceModalRef.current?.present();
  }, []);

  const selectedValue = React.useMemo(() => {
    if (!value) return undefined;
    const { from, to } = value;
    if (from && to) return t('filters.price.range', { from: t('filters.price.from', { value: from }), to: t('filters.price.to', { value: to }) });
    if (from) return t('filters.price.from', { value: from });
    if (to) return t('filters.price.to', { value: to });
    return undefined;
  }, [value, t]);

  return (
    <>
      <TouchableHighlightRow
        label={t('searchScreen.simpleAuto.price')}
        selectedValue={selectedValue}
        onPress={handlePresentPriceModalPress}
        variant={variant}
        showRightArrow={false}
        selectedValueMode="replace"
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
