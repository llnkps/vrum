import { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { TouchableHighlightRow } from '@/components/global/TouchableHighlightRow';
import React, { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { FuelTypeFilterBottomSheet } from './FuelTypeFilterBottomSheet';

interface FuelTypeFilterControllerProps {
  value?: Array<{ label: string; value: string }>;
  onChange: (value: Array<{ label: string; value: string }> | undefined) => void;
  error?: string;
}

const FuelTypeFilterController = ({ value, onChange, error }: FuelTypeFilterControllerProps) => {
  const { t } = useTranslation();
  const fuelTypeModalRef = useRef<BottomSheetRef>(null);

  const handlePresentFuelTypeModalPress = useCallback(() => {
    fuelTypeModalRef.current?.present();
  }, []);

  const selectedValue = React.useMemo(() => {
    if (!value || value.length === 0) return undefined;
    return value.map(t => t.label).join(', ');
  }, [value]);

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
        onChange={(options) => {
          onChange(options.length > 0 ? options : undefined);
          fuelTypeModalRef.current?.close({ duration: 150 });
        }}
      />
    </>
  );
};

export { FuelTypeFilterController };