
import React, { forwardRef } from "react";
import CustomBottomSheetModal, { BottomSheetRef } from "@/components/global/CustomBottomSheetModal";
import { View, Text, Pressable } from "react-native";

type DocumentsOkModalProps = {
  onSelect: (value: boolean) => void;
};

const options = [
  { label: "Документы в порядке", value: true },
  { label: "Проблемы с документами", value: false },
];

const DocumentsOkModal = forwardRef<BottomSheetRef, DocumentsOkModalProps>(({ onSelect }, ref) => {
  return (
    <CustomBottomSheetModal ref={ref} title="Документы">
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
DocumentsOkModal.displayName = "DocumentsOkModal";

export default DocumentsOkModal;
