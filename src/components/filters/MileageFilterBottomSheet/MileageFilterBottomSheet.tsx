import CustomBottomSheetModal, { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import CustomWheelPicker from '@/components/global/CustomWheelPicker';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { PickerItem, ValueChangedEvent } from '@quidone/react-native-wheel-picker';
import React, { forwardRef, useState } from 'react';
import { Text, View } from 'react-native';

type MileageModalProps = {
  onChange: (range: { min?: number; max?: number }) => void;
};

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

const MileageFilterBottomSheet = forwardRef<BottomSheetRef, MileageModalProps>(({ onChange }, ref) => {
  const [minValue, setMinValue] = useState<number | undefined>(undefined);
  const [maxValue, setMaxValue] = useState<number | undefined>(undefined);

  const handleMinChange = (value: ValueChangedEvent<PickerItem<number>>) => {
    setMinValue(value.item.value);
  };

  const handleMaxChange = (value: ValueChangedEvent<PickerItem<number>>) => {
    setMaxValue(value.item.value);
  };

  const handleConfirm = () => {
    onChange({ min: minValue, max: maxValue });
  };

  return (
    <CustomBottomSheetModal
      ref={ref}
      snapPoints={['45%']}
      title={'Пробег'}
      footerProps={{
        onConfirm: handleConfirm,
      }}
    >
      <BottomSheetView>
        <View className="flex-row items-center justify-center gap-x-4">
          <View className="flex-1">
            <CustomWheelPicker data={minMileageArray} value={minValue} onValueChanged={handleMinChange} label="От" />
          </View>
          <View className="flex-1">
            <CustomWheelPicker data={maxMileageArray} value={maxValue} onValueChanged={handleMaxChange} label="До" />
          </View>
        </View>
      </BottomSheetView>
    </CustomBottomSheetModal>
  );
});
MileageFilterBottomSheet.displayName = 'MileageFilterBottomSheet';

export default MileageFilterBottomSheet;
