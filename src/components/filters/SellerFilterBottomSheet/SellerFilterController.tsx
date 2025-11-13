import { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { TouchableHighlightRow } from '@/components/global/TouchableHighlightRow';
import { BACKEND_FILTERS, FilterOptionType, SelectFilterType } from '@/types/filter';
import React, { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { SellerFilterBottomSheet } from './SellerFilterBottomSheet';
import { useFilterConfigs } from '@/shared/filter';

interface SellerFilterControllerProps {
  selectedOptions?: SelectFilterType;
  onChange: (value: FilterOptionType[] | undefined) => void;
  error?: string;
}

const SellerFilterController = ({ selectedOptions, onChange, error }: SellerFilterControllerProps) => {
  const { t } = useTranslation();
  const sellerModalRef = useRef<BottomSheetRef>(null);

  const filterConfigs = useFilterConfigs();
  const sellerConfig = filterConfigs[BACKEND_FILTERS.SELLER];
  const options = sellerConfig?.options || [];

  const handlePresentSellerModalPress = useCallback(() => {
    sellerModalRef.current?.present();
  }, []);

  const selectedValue = React.useMemo(() => {
    if (!selectedOptions) return undefined;
    const selectedValues = Object.values(selectedOptions);
    const selectedValuesSet = new Set(selectedValues);

    const selectedLabels = options
      .filter(option => selectedValuesSet.has(option.value))
      .map(option => option.label);

    return selectedLabels.join(', ');
  }, [selectedOptions, options]);

  const selectedOptionsArray = React.useMemo(() => {
    if (!selectedOptions) return [];
    const selectedValues = Object.values(selectedOptions);
    const selectedValuesSet = new Set(selectedValues);

    return options.filter(option => selectedValuesSet.has(option.value));
  }, [selectedOptions, options]);

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
        options={options}
        title={sellerConfig?.label || 'Seller'}
        selectedOptions={selectedOptionsArray}
        onChange={(options) => {
          onChange(options.length > 0 ? options : undefined);
          sellerModalRef.current?.close({ duration: 150 });
        }}
      />
    </>
  );
};

export { SellerFilterController };