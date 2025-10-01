
import React, { forwardRef } from "react";
import CustomBottomSheetModal, { BottomSheetRef } from "@/components/global/CustomBottomSheetModal";
import { View, Text, Pressable } from "react-native";

type ConditionModalProps = {
  onSelect: (value: string) => void;
};

const options = [
  { label: "Новый", value: "new" },
  { label: "Б/у", value: "used" },
  { label: "На запчасти", value: "for parts" },
];

const ConditionModal = forwardRef<BottomSheetRef, ConditionModalProps>(({ onSelect }, ref) => {
  return (
    <CustomBottomSheetModal ref={ref} title="Выберите состояние">
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
ConditionModal.displayName = "ConditionModal";

export default ConditionModal;
