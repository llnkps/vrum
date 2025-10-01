
import React, { forwardRef, useState } from "react";
import CustomBottomSheetModal, { BottomSheetRef } from "@/components/global/CustomBottomSheetModal";
import { View, Text, TextInput, Button } from "react-native";

type SellerModalProps = {
  onSelect: (value: string) => void;
};

const SellerModal = forwardRef<BottomSheetRef, SellerModalProps>(({ onSelect }, ref) => {
  const [value, setValue] = useState("");
  return (
    <CustomBottomSheetModal ref={ref} title="Введите имя продавца">
      <View style={{ padding: 20 }}>
        <TextInput
          value={value}
          onChangeText={setValue}
          style={{ padding: 10, borderWidth: 1, borderRadius: 8, marginVertical: 10 }}
        />
        <Button title="Выбрать" onPress={() => onSelect(value)} />
      </View>
    </CustomBottomSheetModal>
  );
});
SellerModal.displayName = "SellerModal";

export default SellerModal;
