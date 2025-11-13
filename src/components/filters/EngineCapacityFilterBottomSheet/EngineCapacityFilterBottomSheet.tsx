import CustomBottomSheetModal, { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import CustomWheelPicker from '@/components/global/CustomWheelPicker';
import { RangeFilterType } from '@/types/filter';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { PickerItem, ValueChangedEvent } from '@quidone/react-native-wheel-picker';
import React, { forwardRef, useState } from 'react';
import { View } from 'react-native';

type EngineCapacityModalProps = {
  onChange: (range: RangeFilterType) => void;
};

const engineCapacity = [
  { value: undefined as number | undefined, label: '--' },
  ...Array.from({ length: Math.round((6.0 - 0.7) / 0.1) + 1 }, (_, i) => {
    const num = +(0.7 + i * 0.1).toFixed(1);
    return { value: num, label: String(num) };
  }),
];

const EngineCapacityBottomSheet = forwardRef<BottomSheetRef, EngineCapacityModalProps>(({ onChange }, ref) => {
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
      title="Объем двигателя"
      footerProps={{
        onConfirm: handleConfirm,
      }}
    >
      <BottomSheetView>
        <View className="flex-row items-center justify-center gap-x-10 px-4 pt-5">
          <View className="flex-1">
            <CustomWheelPicker data={engineCapacity} value={minValue} onValueChanged={handleMinChange} label="От" />
          </View>
          <View className="flex-1">
            <CustomWheelPicker data={engineCapacity} value={maxValue} onValueChanged={handleMaxChange} label="До" />
          </View>
        </View>
      </BottomSheetView>
    </CustomBottomSheetModal>
  );
});
EngineCapacityBottomSheet.displayName = 'EngineCapacityBottomSheet';

export default EngineCapacityBottomSheet;
