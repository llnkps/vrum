import { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { TouchableHighlightRow } from '@/components/global/TouchableHighlightRow';
import React, { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import MileageFilterBottomSheet from './MileageFilterBottomSheet';
import { RangeFilterType } from '@/types/filter';

interface MileageFilterControllerProps {
  value?: RangeFilterType;
  onChange: (value: RangeFilterType | undefined) => void;
  error?: string;
}

const MileageFilterController = React.memo(({ value, onChange, error }: MileageFilterControllerProps) => {
  const { t } = useTranslation();
  const mileageModalRef = useRef<BottomSheetRef>(null);

  const handlePresentMileageModalPress = useCallback(() => {
    mileageModalRef.current?.present();
  }, []);

  const selectedValue = React.useMemo(() => {
    if (!value) return undefined;
    const { from, to } = value;
    if (from && to) return t('filters.mileage.range', { from: t('filters.mileage.from', { value: from }), to: t('filters.mileage.to', { value: to }) });
    if (from) return t('filters.mileage.from', { value: from });
    if (to) return t('filters.mileage.to', { value: to });
    return undefined;
  }, [value, t]);

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
        onChange={range => {
          onChange(range);
          mileageModalRef.current?.close({ duration: 150 });
        }}
      />
    </>
  );
});

MileageFilterController.displayName = 'MileageFilterController';

export { MileageFilterController };
