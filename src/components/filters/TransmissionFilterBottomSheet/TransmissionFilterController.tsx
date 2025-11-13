import { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { TouchableHighlightRow } from '@/components/global/TouchableHighlightRow';
import { useFilterConfigs } from '@/shared/filter';
import { BACKEND_FILTERS, FilterOptionType, SelectFilterType } from '@/types/filter';
import React, { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { TransmissionFilterBottomSheet } from './TransmissionFilterBottomSheet';

interface TransmissionFilterControllerProps {
  selectedOptions?: SelectFilterType;
  onChange: (value: FilterOptionType[] | undefined) => void;
  error?: string;
}

const TransmissionFilterController = ({ selectedOptions, onChange, error }: TransmissionFilterControllerProps) => {
  const { t } = useTranslation();
  const transmissionModalRef = useRef<BottomSheetRef>(null);

  const filterConfigs = useFilterConfigs();
  const transmissionConfig = filterConfigs[BACKEND_FILTERS.TRANSMISSION];
  const options = transmissionConfig?.options || [];

  const handlePresentTransmissionModalPress = useCallback(() => {
    transmissionModalRef.current?.present();
  }, []);

  const selectedOption = React.useMemo(() => {
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
        label={t('filters.transmission.label')}
        selectedValue={selectedOption}
        onPress={handlePresentTransmissionModalPress}
        variant="bordered"
        showRightArrow
        rightIcon="chevron-down"
        error={error}
      />
      <TransmissionFilterBottomSheet
        ref={transmissionModalRef}
        options={options}
        title={transmissionConfig?.label || 'Transmission'}
        selectedOptions={selectedOptionsArray}
        onChange={options => {
          onChange(options.length > 0 ? options : undefined);
          transmissionModalRef.current?.close({ duration: 150 });
        }}
      />
    </>
  );
};

export { TransmissionFilterController };
