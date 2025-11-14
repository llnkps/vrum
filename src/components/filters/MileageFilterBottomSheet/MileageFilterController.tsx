import { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { TouchableHighlightRow } from '@/components/global/TouchableHighlightRow';
import React, { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import MileageFilterBottomSheet from './MileageFilterBottomSheet';
import { RangeFilterType } from '@/types/filter';
import { useTranslateRangeFilter } from '@/utils/useTranslateRangeFilter';

interface MileageFilterControllerProps {
  value?: RangeFilterType;
  onChange: (value: RangeFilterType | undefined) => void;
  error?: string;
}

const MileageFilterController = React.memo(({ value, onChange, error }: MileageFilterControllerProps) => {
  const { t } = useTranslation();
  const mileageModalRef = useRef<BottomSheetRef>(null);
  const selectedValue = useTranslateRangeFilter('mileage', value);

  const handlePresentMileageModalPress = useCallback(() => {
    mileageModalRef.current?.present();
  }, []);

  return (
    <>
      <TouchableHighlightRow
        label={t('filters.mileage.label')}
        selectedValue={selectedValue}
        onPress={handlePresentMileageModalPress}
        variant="bordered"
        showRightArrow
        rightIcon="chevron-down"
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
