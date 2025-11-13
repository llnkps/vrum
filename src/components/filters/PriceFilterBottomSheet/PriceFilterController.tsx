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

const PriceFilterController = ({ value, onChange, error, variant = 'button' }: PriceFilterControllerProps) => {
  const { t } = useTranslation();
  const priceModalRef = useRef<BottomSheetRef>(null);

  const handlePresentPriceModalPress = useCallback(() => {
    priceModalRef.current?.present();
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
        onChange={(priceRange) => {
          onChange(priceRange);
          priceModalRef.current?.close({ duration: 150 });
        }}
      />
    </>
  );
};

export { PriceFilterController };