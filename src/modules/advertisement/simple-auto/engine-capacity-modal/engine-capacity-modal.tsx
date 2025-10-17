import CustomBottomSheetModal, { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import CustomWheelPicker from '@/components/global/CustomWheelPicker';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { PickerItem, ValueChangedEvent } from '@quidone/react-native-wheel-picker';
import React, { forwardRef, useState } from 'react';
import { Text, View } from 'react-native';

type OptionType = (typeof engineCapacity)[number];

type EngineCapacityModalProps = {
  onSelect: (value: number) => void;
};

const engineCapacity = Array.from({ length: Math.round((6.0 - 0.7) / 0.1) + 1 }, (_, i) => {
  const num = +(0.7 + i * 0.1).toFixed(1);
  return { value: num, label: String(num) };
});

const EngineCapacityModal = forwardRef<BottomSheetRef, EngineCapacityModalProps>(
  ({ onSelect }, ref) => {
    const [value, setValue] = useState(engineCapacity[0].value);

    const handleChange = (value: ValueChangedEvent<PickerItem<number>>) => {
      setValue(value.item.value);
    };

    return (
      <CustomBottomSheetModal
        ref={ref}
        snapPoints={['40%']}
        footerProps={{
          selectedValue: value,
          onConfirm: onSelect,
        }}
        title="Объем двигателя"
      >
        <BottomSheetView className="flex-row items-center justify-center gap-x-10 border-1 border-border-focused">
          <View className="mr-3">
            <Text className="text-lg font-bold text-font dark:text-font-dark">Объем (л.с.) =</Text>
          </View>
          <CustomWheelPicker data={engineCapacity} value={value} onValueChanged={handleChange} />
        </BottomSheetView>
      </CustomBottomSheetModal>
    );
  }
);
EngineCapacityModal.displayName = 'EngineCapacityModal';

export default EngineCapacityModal;
