
import React, { forwardRef } from "react";
import CustomBottomSheetModal, { BottomSheetRef } from "@/components/global/CustomBottomSheetModal";
import { View, Text, Pressable } from "react-native";

type TransmissionModalProps = {
  onSelect: (value: string) => void;
};

const options = [
  { label: "Механика", value: "manual" },
  { label: "Автомат", value: "automatic" },
  { label: "Робот", value: "robot" },
  { label: "Вариатор (CVT)", value: "cvt" },
];

const TransmissionModal = forwardRef<BottomSheetRef, TransmissionModalProps>(({ onSelect }, ref) => {
  return (
    <CustomBottomSheetModal ref={ref} title="Выберите коробку передач">
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
TransmissionModal.displayName = "TransmissionModal";

export default TransmissionModal;
