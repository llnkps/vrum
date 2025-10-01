
import React, { forwardRef, useState } from "react";
import CustomBottomSheetModal, { BottomSheetRef } from "@/components/global/CustomBottomSheetModal";
import { View, Text, TextInput, Button } from "react-native";

type EngineCapacityModalProps = {
  onSelect: (value: number) => void;
};

const EngineCapacityModal = forwardRef<BottomSheetRef, EngineCapacityModalProps>(({ onSelect }, ref) => {
  const [value, setValue] = useState(0);
  return (
    <CustomBottomSheetModal ref={ref} title="Введите объем двигателя (л)">
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
EngineCapacityModal.displayName = "EngineCapacityModal";

export default EngineCapacityModal;
