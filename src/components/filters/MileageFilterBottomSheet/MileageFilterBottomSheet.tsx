import CustomBottomSheetModal, { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import CustomWheelPicker from '@/components/global/CustomWheelPicker';
import { RangeFilterType } from '@/types/filter';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { PickerItem, ValueChangedEvent } from '@quidone/react-native-wheel-picker';
import React, { forwardRef, memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

type MileageModalProps = {
  onChange: (range: RangeFilterType) => void;
};

// Move mileage arrays outside component to avoid recreation on every render
const minMileageArray = [
  { value: undefined as number | undefined, label: '--' },
  { value: 1000, label: '1000' },
  { value: 5000, label: '5000' },
  ...Array.from({ length: (500000 - 10000) / 10000 + 1 }, (_, i) => {
    const num = 10000 + i * 10000;
    return { value: num, label: String(num) };
  }),
];

const maxMileageArray = [
  { value: undefined as number | undefined, label: '--' },
  ...Array.from({ length: (500000 - 10000) / 10000 + 1 }, (_, i) => {
    const num = 10000 + i * 10000;
    return { value: num, label: String(num) };
  }),
];

const MileageFilterBottomSheet = memo(
  forwardRef<BottomSheetRef, MileageModalProps>(({ onChange }, ref) => {
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
        title={t('filters.mileage.label')}
        footerProps={{
          onConfirm: handleConfirm,
        }}
      >
        <BottomSheetView>
          <View className="flex-row items-center justify-center gap-x-4">
            <View className="flex-1">
              <CustomWheelPicker
                virtualized={true}
                data={minMileageArray}
                value={minValue}
                onValueChanged={handleMinChange}
                label={t('filters.mileage.fromLabel')}
              />
            </View>
            <View className="flex-1">
              <CustomWheelPicker
                virtualized={true}
                data={maxMileageArray}
                value={maxValue}
                onValueChanged={handleMaxChange}
                label={t('filters.mileage.toLabel')}
              />
            </View>
          </View>
        </BottomSheetView>
      </CustomBottomSheetModal>
    );
  })
);
MileageFilterBottomSheet.displayName = 'MileageFilterBottomSheet';

export default MileageFilterBottomSheet;
