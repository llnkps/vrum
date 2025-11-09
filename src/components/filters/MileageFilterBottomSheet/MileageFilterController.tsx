import { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { TouchableHighlightRow } from '@/components/global/TouchableHighlightRow';
import React, { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import MileageFilterBottomSheet from './MileageFilterBottomSheet';

interface MileageFilterControllerProps {
  value?: { min?: number; max?: number };
  onChange: (value: { min?: number; max?: number } | undefined) => void;
  error?: string;
}

const MileageFilterController = ({ value, onChange, error }: MileageFilterControllerProps) => {
  const { t } = useTranslation();
  const mileageModalRef = useRef<BottomSheetRef>(null);

  const handlePresentMileageModalPress = useCallback(() => {
    mileageModalRef.current?.present();
  }, []);

  const selectedValue = React.useMemo(() => {
    if (!value) return undefined;
    const { min, max } = value;
    if (min && max) return `${min} - ${max}`;
    if (min) return `от ${min}`;
    if (max) return `до ${max}`;
    return undefined;
  }, [value]);

  return (
    <>
      <TouchableHighlightRow
        label={t('filters.mileage.label')}
        selectedValue={selectedValue}
        onPress={handlePresentMileageModalPress}
        variant="bordered"
        showRightArrow
        rightIcon="chevron-down"
        selectedValueMode="replace"
        error={error}
      />
      <MileageFilterBottomSheet
        ref={mileageModalRef}
        onChange={(range) => {
          onChange(range);
          mileageModalRef.current?.close({ duration: 150 });
        }}
      />
    </>
  );
};

export { MileageFilterController };