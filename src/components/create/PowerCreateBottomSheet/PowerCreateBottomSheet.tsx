import CustomBottomSheetModal, { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import CustomWheelPicker from '@/components/global/CustomWheelPicker';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { PickerItem, ValueChangedEvent } from '@quidone/react-native-wheel-picker';
import React, { forwardRef, useState } from 'react';
import { View } from 'react-native';

type PowerCreateModalProps = {
  onChange: (value: number | undefined) => void;
};

const powerArray = [
  { value: undefined as number | undefined, label: '--' },
  ...Array.from({ length: (1000 - 50) / 10 + 1 }, (_, i) => {
    const num = 50 + i * 10;
    return { value: num, label: String(num) };
  }),
];

const PowerCreateBottomSheet = forwardRef<BottomSheetRef, PowerCreateModalProps>(({ onChange }, ref) => {
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
      title={'Мощность'}
      footerProps={{
        onConfirm: handleConfirm,
      }}
    >
      <BottomSheetView>
        <View className="flex-row items-center justify-center px-4 pt-5">
          <View className="flex-1">
            <CustomWheelPicker data={powerArray} value={selectedValue} onValueChanged={handleChange} label="Мощность" />
          </View>
        </View>
      </BottomSheetView>
    </CustomBottomSheetModal>
  );
});
PowerCreateBottomSheet.displayName = 'PowerCreateBottomSheet';

export default PowerCreateBottomSheet;