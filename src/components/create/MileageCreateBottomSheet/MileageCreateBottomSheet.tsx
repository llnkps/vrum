import CustomBottomSheetModal, { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import CustomWheelPicker from '@/components/global/CustomWheelPicker';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { PickerItem, ValueChangedEvent } from '@quidone/react-native-wheel-picker';
import React, { forwardRef, useState } from 'react';
import { View } from 'react-native';

type MileageCreateModalProps = {
  onChange: (value: number | undefined) => void;
};

const mileageArray = [
  { value: undefined as number | undefined, label: '--' },
  ...Array.from({ length: (500000 - 10000) / 10000 + 1 }, (_, i) => {
    const num = 10000 + i * 10000;
    return { value: num, label: String(num) };
  }),
];

const MileageCreateBottomSheet = forwardRef<BottomSheetRef, MileageCreateModalProps>(({ onChange }, ref) => {
  const [selectedValue, setSelectedValue] = useState<number | undefined>(undefined);

  const handleChange = (value: ValueChangedEvent<PickerItem<number>>) => {
    setSelectedValue(value.item.value);
  };

  const handleConfirm = () => {
    onChange(selectedValue);
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
        <View className="flex-row items-center justify-center px-4 pt-5">
          <View className="flex-1">
            <CustomWheelPicker data={mileageArray} value={selectedValue} onValueChanged={handleChange} label="Пробег" />
          </View>
        </View>
      </BottomSheetView>
    </CustomBottomSheetModal>
  );
});
MileageCreateBottomSheet.displayName = 'MileageCreateBottomSheet';

export default MileageCreateBottomSheet;
