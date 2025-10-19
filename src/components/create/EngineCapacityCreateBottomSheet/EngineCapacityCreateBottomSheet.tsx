import CustomBottomSheetModal, { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import CustomWheelPicker from '@/components/global/CustomWheelPicker';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { PickerItem, ValueChangedEvent } from '@quidone/react-native-wheel-picker';
import React, { forwardRef, useState } from 'react';
import { View } from 'react-native';

type EngineCapacityCreateModalProps = {
  onChange: (value: number | undefined) => void;
};

const engineCapacity = [
  { value: undefined as number | undefined, label: '--' },
  ...Array.from({ length: Math.round((6.0 - 0.7) / 0.1) + 1 }, (_, i) => {
    const num = +(0.7 + i * 0.1).toFixed(1);
    return { value: num, label: String(num) };
  }),
];

const EngineCapacityCreateBottomSheet = forwardRef<BottomSheetRef, EngineCapacityCreateModalProps>(({ onChange }, ref) => {
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
      title="Объем двигателя"
      footerProps={{
        onConfirm: handleConfirm,
      }}
    >
      <BottomSheetView>
        <View className="flex-row items-center justify-center px-4 pt-5">
          <View className="flex-1">
            <CustomWheelPicker data={engineCapacity} value={selectedValue} onValueChanged={handleChange} label="Объем" />
          </View>
        </View>
      </BottomSheetView>
    </CustomBottomSheetModal>
  );
});
EngineCapacityCreateBottomSheet.displayName = 'EngineCapacityCreateBottomSheet';

export default EngineCapacityCreateBottomSheet;
