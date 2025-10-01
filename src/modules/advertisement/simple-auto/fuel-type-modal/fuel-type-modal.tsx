
import React, { forwardRef } from "react";
import CustomBottomSheetModal, { BottomSheetRef } from "@/components/global/CustomBottomSheetModal";
import { View, Text, Pressable } from "react-native";

type FuelTypeModalProps = {
  onSelect: (value: string) => void;
};

const options = [
  { label: "Бензин", value: "petrol" },
  { label: "Дизель", value: "diesel" },
  { label: "Электро", value: "electric" },
  { label: "Гибрид", value: "hybrid" },
  { label: "Газ", value: "gas" },
];

const FuelTypeModal = forwardRef<BottomSheetRef, FuelTypeModalProps>(({ onSelect }, ref) => {
  return (
    <CustomBottomSheetModal ref={ref} title="Выберите тип топлива">
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
FuelTypeModal.displayName = "FuelTypeModal";

export default FuelTypeModal;
