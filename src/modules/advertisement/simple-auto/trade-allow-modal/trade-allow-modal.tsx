
import React, { forwardRef } from "react";
import CustomBottomSheetModal, { BottomSheetRef } from "@/components/global/CustomBottomSheetModal";
import { View, Text, Pressable } from "react-native";

type TradeAllowModalProps = {
  onSelect: (value: boolean) => void;
};

const options = [
  { label: "Торг возможен", value: true },
  { label: "Без торга", value: false },
];

const TradeAllowModal = forwardRef<BottomSheetRef, TradeAllowModalProps>(({ onSelect }, ref) => {
  return (
    <CustomBottomSheetModal ref={ref} title="Торг">
      <View style={{ padding: 20 }}>
        {options.map((opt) => (
          <Pressable key={opt.label} onPress={() => onSelect(opt.value)}>
            <Text style={{ padding: 10 }}>{opt.label}</Text>
          </Pressable>
        ))}
      </View>
    </CustomBottomSheetModal>
  );
});
TradeAllowModal.displayName = "TradeAllowModal";

export default TradeAllowModal;
