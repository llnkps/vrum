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
import { Text, View } from "react-native";

type OptionType = (typeof powerArray)[number];

type PowerModalProps = {
  onSelect: (value: number) => void;
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
    };

    return (
      <CustomBottomSheetModal
        ref={ref}
        snapPoints={["40%"]}
        title={"Мощность"}
        footerProps={{
          selectedValue: fromYear,
          onConfirm: onSelect,
        }}
      >
        <BottomSheetView className="flex-row items-center justify-center gap-x-10 border-1 border-border-focused">
          <View className="mr-3">
            <Text className="text-font dark:text-font-dark font-bold text-lg">
              Мощность (л.с.) =
            </Text>
          </View>
          <CustomWheelPicker
            data={powerArray}
            value={fromYear}
            onValueChanged={handleChange}
          />
        </BottomSheetView>
      </CustomBottomSheetModal>
    );
  }
);
PowerModal.displayName = "PowerModal";

export default PowerModal;
