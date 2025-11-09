import { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { TouchableHighlightRow } from '@/components/global/TouchableHighlightRow';
import React, { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { SellerFilterBottomSheet } from './SellerFilterBottomSheet';

interface SellerFilterControllerProps {
  value?: Array<{ label: string; value: string }>;
  onChange: (value: Array<{ label: string; value: string }> | undefined) => void;
  error?: string;
}

const SellerFilterController = ({ value, onChange, error }: SellerFilterControllerProps) => {
  const { t } = useTranslation();
  const sellerModalRef = useRef<BottomSheetRef>(null);

  const handlePresentSellerModalPress = useCallback(() => {
    sellerModalRef.current?.present();
  }, []);

  const selectedValue = React.useMemo(() => {
    if (!value || value.length === 0) return undefined;
    return value.map(t => t.label).join(', ');
  }, [value]);

  return (
    <>
      <TouchableHighlightRow
        label={t('filters.seller.label')}
        selectedValue={selectedValue}
        onPress={handlePresentSellerModalPress}
        variant="plain"
        showRightArrow
        rightIcon="chevron-down"
        selectedValueMode="replace"
        error={error}
      />
      <SellerFilterBottomSheet
        ref={sellerModalRef}
        onChange={(options) => {
          const convertedOptions = options.length > 0 ? options.map(opt => ({
            label: opt.label,
            value: String(opt.value)
          })) : undefined;
          onChange(convertedOptions);
          sellerModalRef.current?.close({ duration: 150 });
        }}
      />
    </>
  );
};

export { SellerFilterController };