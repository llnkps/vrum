import { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { TouchableHighlightRow } from '@/components/global/TouchableHighlightRow';
import React, { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { PriceBottomSheet } from './PriceFilterBottomSheet';

interface PriceFilterControllerProps {
  value?: { min?: number; max?: number };
  onChange: (value: { min?: number; max?: number } | undefined) => void;
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
    const { min, max } = value;
    if (min && max) return `${min} - ${max}`;
    if (min) return `от ${min}`;
    if (max) return `до ${max}`;
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