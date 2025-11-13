import { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { TouchableHighlightRow } from '@/components/global/TouchableHighlightRow';
import { BACKEND_FILTERS, FilterOptionType, SelectFilterType } from '@/types/filter';
import React, { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { FuelTypeFilterBottomSheet } from './FuelTypeFilterBottomSheet';
import { useFilterConfigs } from '@/shared/filter';

interface FuelTypeFilterControllerProps {
  selectedOptions?: SelectFilterType;
  onChange: (value: FilterOptionType[] | undefined) => void;
  error?: string;
}

const FuelTypeFilterController = ({ selectedOptions, onChange, error }: FuelTypeFilterControllerProps) => {
  const { t } = useTranslation();
  const fuelTypeModalRef = useRef<BottomSheetRef>(null);

  const filterConfigs = useFilterConfigs();
  const fuelTypeConfig = filterConfigs[BACKEND_FILTERS.FUEL_TYPE];
  const options = fuelTypeConfig?.options || [];

  const handlePresentFuelTypeModalPress = useCallback(() => {
    fuelTypeModalRef.current?.present();
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
        label={t('filters.fuelType.label')}
        selectedValue={selectedValue}
        onPress={handlePresentFuelTypeModalPress}
        variant="bordered"
        showRightArrow
        rightIcon="chevron-down"
        selectedValueMode="replace"
        error={error}
      />
      <FuelTypeFilterBottomSheet
        ref={fuelTypeModalRef}
        options={options}
        title={fuelTypeConfig?.label || 'Fuel Type'}
        selectedOptions={selectedOptionsArray}
        onChange={(options) => {
          onChange(options.length > 0 ? options : undefined);
          fuelTypeModalRef.current?.close({ duration: 150 });
        }}
      />
    </>
  );
};

export { FuelTypeFilterController };