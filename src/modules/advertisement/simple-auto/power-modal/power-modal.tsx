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
import { HeaderHandle } from "./header";

type OptionType = (typeof powerArray)[number];

type PowerModalProps = {
  onSelect: (value: OptionType) => void;
};

const powerArray = Array.from({ length: (1000 - 50) / 10 + 1 }, (_, i) => {
  const num = 50 + i * 10;
  return { value: num, label: String(num) };
});

const PowerModal = forwardRef<BottomSheetRef, PowerModalProps>(
  ({ onSelect }, ref) => {
    const [fromYear, setFromYear] = useState(powerArray[0].value);

    const handleChange = (value: ValueChangedEvent<PickerItem<number>>) => {
      setFromYear(value.item.value);
      if (onSelect) {
        onSelect(value.item);
      }
    };

    return (
      <CustomBottomSheetModal
        ref={ref}
        snapPoints={["40%"]}
        handleComponent={HeaderHandle}
        // enableContentPanningGesture={true}
      >
        <BottomSheetView className="flex-row justify-center gap-x-10">
          <BottomSheetView className="flex-row gap-x-8">
            <Text className="mt-[7.6rem] text-font dark:text-font-dark font-bold text-lg">
              Мощность (л.с.)
            </Text>
            <CustomWheelPicker
              data={powerArray}
              value={fromYear}
              onValueChanged={handleChange}
            />
          </BottomSheetView>
        </BottomSheetView>
      </CustomBottomSheetModal>
    );
  }
);
PowerModal.displayName = "PowerModal";

export default PowerModal;
