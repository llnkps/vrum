
import React, { forwardRef } from "react";
import CustomBottomSheetModal, { BottomSheetRef } from "@/components/global/CustomBottomSheetModal";
import { View, Text, Pressable } from "react-native";

type DrivetrainModalProps = {
  onSelect: (value: string) => void;
};

const options = [
  { label: "Передний (FWD)", value: "fwd" },
  { label: "Задний (RWD)", value: "rwd" },
  { label: "Полный (AWD)", value: "awd" },
  { label: "4x4", value: "4x4" },
];

const DrivetrainModal = forwardRef<BottomSheetRef, DrivetrainModalProps>(({ onSelect }, ref) => {
  return (
    <CustomBottomSheetModal ref={ref} title="Выберите привод">
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
DrivetrainModal.displayName = "DrivetrainModal";

export default DrivetrainModal;
