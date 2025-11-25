import { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { TouchableHighlightRow } from '@/components/global/TouchableHighlightRow';
import { BACKEND_FILTERS, FilterOptionType, SelectFilterType } from '@/types/filter';
import React, { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { DrivetrainFilterBottomSheet } from './DrivetrainFilterBottomSheet';
import { useFilterConfigs } from '@/shared/filter';

interface DrivetrainFilterControllerProps {
  selectedOptions?: SelectFilterType;
  onChange: (value: FilterOptionType[] | undefined) => void;
  error?: string;
}

const DrivetrainFilterController = React.memo(({ selectedOptions, onChange, error }: DrivetrainFilterControllerProps) => {
  const { t } = useTranslation();
  const drivetrainModalRef = useRef<BottomSheetRef>(null);

  const filterConfigs = useFilterConfigs();
  const drivetrainConfig = filterConfigs[BACKEND_FILTERS.DRIVETRAIN_TYPE];
  const options = drivetrainConfig?.options || [];

  const handlePresentDrivetrainModalPress = useCallback(() => {
    drivetrainModalRef.current?.present();
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
        label={t('filters.drivetrain.label')}
        selectedValue={selectedValue}
        onPress={handlePresentDrivetrainModalPress}
        variant="bordered"
        showRightArrow
        rightIcon="chevron-down"
        error={error}
      />
      <DrivetrainFilterBottomSheet
        ref={drivetrainModalRef}
        options={options}
        title={drivetrainConfig?.label || 'Drivetrain'}
        selectedOptions={selectedOptionsArray}
        onChange={options => {
          onChange(options.length > 0 ? options : undefined);
          drivetrainModalRef.current?.close({ duration: 150 });
        }}
      />
    </>
  );
});

DrivetrainFilterController.displayName = 'DrivetrainFilterController';

export { DrivetrainFilterController };
