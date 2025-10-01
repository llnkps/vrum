
import React, { forwardRef, useState } from "react";
import CustomBottomSheetModal, { BottomSheetRef } from "@/components/global/CustomBottomSheetModal";
import { View, Text, TextInput, Button } from "react-native";

type NumberOfOwnersModalProps = {
  onSelect: (value: number) => void;
};

const NumberOfOwnersModal = forwardRef<BottomSheetRef, NumberOfOwnersModalProps>(({ onSelect }, ref) => {
  const [value, setValue] = useState(1);
  return (
    <CustomBottomSheetModal ref={ref} title="Количество владельцев">
      <View style={{ padding: 20 }}>
        <TextInput
          keyboardType="numeric"
          value={value.toString()}
          onChangeText={t => setValue(Number(t) || 1)}
          style={{ padding: 10, borderWidth: 1, borderRadius: 8, marginVertical: 10 }}
        />
        <Button title="Выбрать" onPress={() => onSelect(value)} />
      </View>
    </CustomBottomSheetModal>
  );
});
NumberOfOwnersModal.displayName = "NumberOfOwnersModal";

export default NumberOfOwnersModal;
