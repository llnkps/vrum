import { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { TouchableHighlightRow } from '@/components/global/TouchableHighlightRow';
import { RangeFilterType } from '@/types/filter';
import React, { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import PowerFilterBottomSheet from './PowerFilterBottomSheet';

interface PowerFilterControllerProps {
  value?: RangeFilterType;
  onChange: (value: RangeFilterType | undefined) => void;
  error?: string;
}

const PowerFilterController = ({ value, onChange, error }: PowerFilterControllerProps) => {
  const { t } = useTranslation();
  const powerModalRef = useRef<BottomSheetRef>(null);

  const handlePresentPowerModalPress = useCallback(() => {
    powerModalRef.current?.present();
  }, []);

  const selectedValue = React.useMemo(() => {
    if (!value) return undefined;
    const { from, to } = value;
    if (from && to) return `${from} - ${to}`;
    if (from) return `от ${from}`;
    if (to) return `до ${to}`;
    return undefined;
  }, [value]);

  return (
    <>
      <TouchableHighlightRow
        label={t('filters.power.label')}
        selectedValue={selectedValue}
        onPress={handlePresentPowerModalPress}
        variant="bordered"
        showRightArrow
        rightIcon="chevron-down"
        selectedValueMode="replace"
        error={error}
      />
      <PowerFilterBottomSheet
        ref={powerModalRef}
        onChange={range => {
          onChange(range);
          powerModalRef.current?.close({ duration: 150 });
        }}
      />
    </>
  );
};

export { PowerFilterController };
