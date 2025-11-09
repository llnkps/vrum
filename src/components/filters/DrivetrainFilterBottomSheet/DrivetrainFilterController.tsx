import { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { TouchableHighlightRow } from '@/components/global/TouchableHighlightRow';
import React, { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { DrivetrainFilterBottomSheet } from './DrivetrainFilterBottomSheet';

interface DrivetrainFilterControllerProps {
  value?: Array<{ label: string; value: string }>;
  onChange: (value: Array<{ label: string; value: string }> | undefined) => void;
  error?: string;
}

const DrivetrainFilterController = ({ value, onChange, error }: DrivetrainFilterControllerProps) => {
  const { t } = useTranslation();
  const drivetrainModalRef = useRef<BottomSheetRef>(null);

  const handlePresentDrivetrainModalPress = useCallback(() => {
    drivetrainModalRef.current?.present();
  }, []);

  const selectedValue = React.useMemo(() => {
    if (!value || value.length === 0) return undefined;
    return value.map(t => t.label).join(', ');
  }, [value]);

  return (
    <>
      <TouchableHighlightRow
        label={t('filters.drivetrain.label')}
        selectedValue={selectedValue}
        onPress={handlePresentDrivetrainModalPress}
        variant="bordered"
        showRightArrow
        rightIcon="chevron-down"
        selectedValueMode="replace"
        error={error}
      />
      <DrivetrainFilterBottomSheet
        ref={drivetrainModalRef}
        onChange={(options) => {
          onChange(options.length > 0 ? options : undefined);
          drivetrainModalRef.current?.close({ duration: 150 });
        }}
      />
    </>
  );
};

export { DrivetrainFilterController };