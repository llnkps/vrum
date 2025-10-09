import CustomBottomSheetModal, {
  BottomSheetRef,
} from "@/components/global/CustomBottomSheetModal";
import CustomWheelPicker from "@/components/global/CustomWheelPicker";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import {
  PickerItem,
  ValueChangedEvent,
} from "@quidone/react-native-wheel-picker";
import React, { forwardRef, useState } from "react";
import { Text } from "react-native";

type OptionType = (typeof engineCapacity)[number];

type EngineCapacityModalProps = {
  onSelect: (value: OptionType) => void;
};

const engineCapacity = Array.from(
  { length: Math.round((6.0 - 0.7) / 0.1) + 1 },
  (_, i) => {
    const num = +(0.7 + i * 0.1).toFixed(1);
    return { value: num, label: String(num) };
  }
);

const EngineCapacityModal = forwardRef<
  BottomSheetRef,
  EngineCapacityModalProps
>(({ onSelect }, ref) => {
  const [value, setValue] = useState(engineCapacity[0].value);

  const handleChange = (value: ValueChangedEvent<PickerItem<number>>) => {
    setValue(value.item.value);
    if (onSelect) {
      onSelect(value.item);
    }
  };

  return (
    <CustomBottomSheetModal
      ref={ref}
      snapPoints={["60%"]}
      enableContentPanningGesture={true}
    >
      <BottomSheetView className="flex-row justify-center gap-x-10">
        <BottomSheetView className="flex-row gap-x-8">
          <Text className="mt-[7.6rem] text-font dark:text-font-dark font-bold text-lg">
            Объем (л.с.)
          </Text>
          <CustomWheelPicker
            data={engineCapacity}
            value={value}
            onValueChanged={handleChange}
          />
        </BottomSheetView>
      </BottomSheetView>
    </CustomBottomSheetModal>
  );
});
EngineCapacityModal.displayName = "EngineCapacityModal";

export default EngineCapacityModal;
