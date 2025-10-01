
import React, { forwardRef, useState } from "react";
import CustomBottomSheetModal, { BottomSheetRef } from "@/components/global/CustomBottomSheetModal";
import { View, Text, TextInput, Button } from "react-native";

type PowerModalProps = {
  onSelect: (value: number) => void;
};

const PowerModal = forwardRef<BottomSheetRef, PowerModalProps>(({ onSelect }, ref) => {
  const [value, setValue] = useState(0);
  return (
    <CustomBottomSheetModal ref={ref} title="Введите мощность (л.с.)">
      <View style={{ padding: 20 }}>
        <TextInput
          keyboardType="numeric"
          value={value.toString()}
          onChangeText={t => setValue(Number(t) || 0)}
          style={{ padding: 10, borderWidth: 1, borderRadius: 8, marginVertical: 10 }}
        />
        <Button title="Выбрать" onPress={() => onSelect(value)} />
      </View>
    </CustomBottomSheetModal>
  );
});
PowerModal.displayName = "PowerModal";

export default PowerModal;
