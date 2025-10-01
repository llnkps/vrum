
import React, { forwardRef } from "react";
import CustomBottomSheetModal, { BottomSheetRef } from "@/components/global/CustomBottomSheetModal";
import { View, Text, Pressable } from "react-native";

type ColorModalProps = {
  onSelect: (value: string) => void;
};

const options = [
  { label: "Черный", value: "black" },
  { label: "Белый", value: "white" },
  { label: "Серый", value: "gray" },
  { label: "Красный", value: "red" },
  { label: "Синий", value: "blue" },
  { label: "Зеленый", value: "green" },
  { label: "Желтый", value: "yellow" },
  { label: "Другой", value: "other" },
];

const ColorModal = forwardRef<BottomSheetRef, ColorModalProps>(({ onSelect }, ref) => {
  return (
    <CustomBottomSheetModal ref={ref} title="Выберите цвет">
      <View style={{ padding: 20 }}>
        {options.map((opt) => (
          <Pressable key={opt.value} onPress={() => onSelect(opt.value)}>
            <Text style={{ padding: 10 }}>{opt.label}</Text>
          </Pressable>
        ))}
      </View>
    </CustomBottomSheetModal>
  );
});
ColorModal.displayName = "ColorModal";

export default ColorModal;
