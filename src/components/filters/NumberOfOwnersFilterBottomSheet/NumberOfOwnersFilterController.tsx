import { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { TouchableHighlightRow } from '@/components/global/TouchableHighlightRow';
import { BACKEND_FILTERS, FilterOptionType, SelectFilterType } from '@/types/filter';
import React, { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { NumberOfOwnersFilterBottomSheet } from './NumberOfOwnersFilterBottomSheet';
import { useFilterConfigs } from '@/shared/filter';

interface NumberOfOwnersFilterControllerProps {
  selectedOptions?: SelectFilterType;
  onChange: (value: FilterOptionType[] | undefined) => void;
  error?: string;
}

const NumberOfOwnersFilterController = React.memo(({ selectedOptions, onChange, error }: NumberOfOwnersFilterControllerProps) => {
  const { t } = useTranslation();
  const numberOfOwnersModalRef = useRef<BottomSheetRef>(null);

  const filterConfigs = useFilterConfigs();
  const numberOfOwnersConfig = filterConfigs[BACKEND_FILTERS.NUMBER_OF_OWNER];
  const options = numberOfOwnersConfig?.options || [];

  const handlePresentNumberOfOwnersModalPress = useCallback(() => {
    numberOfOwnersModalRef.current?.present();
  }, []);

  const selectedValue = React.useMemo(() => {
    if (!selectedOptions) return undefined;
    const selectedValues = Object.values(selectedOptions);
    const selectedValuesSet = new Set(selectedValues);

    const selectedLabels = options.filter(option => selectedValuesSet.has(option.value)).map(option => option.label);

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
        label={t('filters.numberOfOwners.label')}
        selectedValue={selectedValue}
        onPress={handlePresentNumberOfOwnersModalPress}
        variant="bordered"
        showRightArrow
        rightIcon="chevron-down"
        error={error}
      />
      <NumberOfOwnersFilterBottomSheet
        ref={numberOfOwnersModalRef}
        options={options}
        title={numberOfOwnersConfig?.label || 'Number of Owners'}
        selectedOptions={selectedOptionsArray}
        onChange={options => {
          onChange(options.length > 0 ? options : undefined);
          numberOfOwnersModalRef.current?.close({ duration: 150 });
        }}
      />
    </>
  );
});

NumberOfOwnersFilterController.displayName = 'NumberOfOwnersFilterController';

export { NumberOfOwnersFilterController };
