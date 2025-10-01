
import React, { forwardRef } from "react";
import CustomBottomSheetModal, { BottomSheetRef } from "@/components/global/CustomBottomSheetModal";
import { View, Text, Pressable } from "react-native";

type BodyTypeModalProps = {
  onSelect: (value: string) => void;
};

const options = [
  { label: "Седан", value: "sedan" },
  { label: "Хэтчбек", value: "hatchback" },
  { label: "SUV", value: "suv" },
  { label: "Купе", value: "coupe" },
  { label: "Универсал", value: "wagon" },
  { label: "Пикап", value: "pickup" },
  { label: "Фургон", value: "van" },
];

const BodyTypeModal = forwardRef<BottomSheetRef, BodyTypeModalProps>(({ onSelect }, ref) => {
  return (
    <CustomBottomSheetModal ref={ref} title="Выберите тип кузова">
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
BodyTypeModal.displayName = "BodyTypeModal";

export default BodyTypeModal;
