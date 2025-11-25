import { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { TouchableHighlightRow } from '@/components/global/TouchableHighlightRow';
import { BACKEND_FILTERS, FilterOptionType, SelectFilterType } from '@/types/filter';
import React, { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { BodyTypeFilterBottomSheet } from './BodyTypeFilterBottomSheet';
import { useFilterConfigs } from '@/shared/filter';

interface BodyTypeFilterControllerProps {
  selectedOptions?: SelectFilterType;
  onChange: (value: FilterOptionType[] | undefined) => void;
  error?: string;
}

const BodyTypeFilterController = React.memo(({ selectedOptions, onChange, error }: BodyTypeFilterControllerProps) => {
  const { t } = useTranslation();
  const bodyTypeModalRef = useRef<BottomSheetRef>(null);

  const filterConfigs = useFilterConfigs();
  const bodyTypeConfig = filterConfigs[BACKEND_FILTERS.FRAME_TYPE];
  const options = bodyTypeConfig?.options || [];

  const handlePresentBodyTypeModalPress = useCallback(() => {
    bodyTypeModalRef.current?.present();
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
        label={t('filters.frameType.label')}
        selectedValue={selectedValue}
        onPress={handlePresentBodyTypeModalPress}
        variant="bordered"
        showRightArrow
        rightIcon="chevron-down"
        error={error}
      />
      <BodyTypeFilterBottomSheet
        ref={bodyTypeModalRef}
        options={options}
        title={bodyTypeConfig?.label || 'Body Type'}
        selectedOptions={selectedOptionsArray}
        onChange={options => {
          onChange(options.length > 0 ? options : undefined);
          bodyTypeModalRef.current?.close({ duration: 150 });
        }}
      />
    </>
  );
});

BodyTypeFilterController.displayName = 'BodyTypeFilterController';

export { BodyTypeFilterController };
