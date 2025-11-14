import { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { TouchableHighlightRow } from '@/components/global/TouchableHighlightRow';
import { BACKEND_FILTERS, FilterOptionType, SelectFilterType } from '@/types/filter';
import React, { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ColorFilterBottomSheet } from './ColorFilterBottomSheet';
import { useFilterConfigs } from '@/shared/filter';

interface ColorFilterControllerProps {
  selectedOptions?: SelectFilterType;
  onChange: (value: FilterOptionType[] | undefined) => void;
  error?: string;
}

const ColorFilterController = React.memo(({ selectedOptions, onChange, error }: ColorFilterControllerProps) => {
  const { t } = useTranslation();
  const colorModalRef = useRef<BottomSheetRef>(null);

  const filterConfigs = useFilterConfigs();
  const colorConfig = filterConfigs[BACKEND_FILTERS.COLOR];
  const options = colorConfig?.options || [];

  const handlePresentColorModalPress = useCallback(() => {
    colorModalRef.current?.present();
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
        label={t('filters.color.label')}
        selectedValue={selectedValue}
        onPress={handlePresentColorModalPress}
        variant="plain"
        showRightArrow
        rightIcon="chevron-down"
        selectedValueMode="replace"
        error={error}
      />
      <ColorFilterBottomSheet
        ref={colorModalRef}
        options={options}
        title={colorConfig?.label || 'Color'}
        selectedOptions={selectedOptionsArray}
        onChange={options => {
          onChange(options.length > 0 ? options : undefined);
          colorModalRef.current?.close({ duration: 150 });
        }}
      />
    </>
  );
});

ColorFilterController.displayName = 'ColorFilterController';

export { ColorFilterController };
