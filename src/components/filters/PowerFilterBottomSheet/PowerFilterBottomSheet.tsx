import CustomBottomSheetModal, { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import CustomWheelPicker from '@/components/global/CustomWheelPicker';
import { RangeFilterType } from '@/types/filter';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { PickerItem, ValueChangedEvent } from '@quidone/react-native-wheel-picker';
import React, { forwardRef, memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

type PowerModalProps = {
  onChange: (range: RangeFilterType) => void;
};

// Move powerArray outside component to avoid recreation on every render
const powerArray = [
  { value: undefined as number | undefined, label: '--' },
  ...Array.from({ length: (500 - 50) / 10 + 1 }, (_, i) => {
    const num = 50 + i * 10;
    return { value: num, label: String(num) };
  }),
];

const PowerFilterBottomSheet = memo(forwardRef<BottomSheetRef, PowerModalProps>(({ onChange }, ref) => {
  const { t } = useTranslation();
  const [minValue, setMinValue] = useState<number | undefined>(undefined);
  const [maxValue, setMaxValue] = useState<number | undefined>(undefined);

  const handleMinChange = (value: ValueChangedEvent<PickerItem<number>>) => {
    setMinValue(value.item.value);
  };

  const handleMaxChange = (value: ValueChangedEvent<PickerItem<number>>) => {
    setMaxValue(value.item.value);
  };

  const handleConfirm = () => {
    onChange({ from: minValue, to: maxValue });
  };

  return (
    <CustomBottomSheetModal
      ref={ref}
      snapPoints={['45%']}
      title={t('filters.power.label')}
      footerProps={{
        onConfirm: handleConfirm,
      }}
    >
      <BottomSheetView>
        <View className="flex-row items-center justify-center gap-x-4">
          <View className="flex-1">
            <CustomWheelPicker data={powerArray} value={minValue} onValueChanged={handleMinChange} label={t('filters.power.fromLabel')} />
          </View>
          <View className="flex-1">
            <CustomWheelPicker data={powerArray} value={maxValue} onValueChanged={handleMaxChange} label={t('filters.power.toLabel')} />
          </View>
        </View>
      </BottomSheetView>
    </CustomBottomSheetModal>
  );
}));
PowerFilterBottomSheet.displayName = 'PowerFilterBottomSheet';

export default PowerFilterBottomSheet;
