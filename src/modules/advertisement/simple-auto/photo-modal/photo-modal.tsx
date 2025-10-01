
import React, { forwardRef } from "react";
import CustomBottomSheetModal, { BottomSheetRef } from "@/components/global/CustomBottomSheetModal";
import { View, Text, Button } from "react-native";

type PhotoModalProps = {
  onSelect: () => void;
};

const PhotoModal = forwardRef<BottomSheetRef, PhotoModalProps>(({ onSelect }, ref) => {
  return (
    <CustomBottomSheetModal ref={ref} title="Добавьте фото">
      <View style={{ padding: 20 }}>
        <Button title="Загрузить фото" onPress={onSelect} />
      </View>
    </CustomBottomSheetModal>
  );
});
PhotoModal.displayName = "PhotoModal";

export default PhotoModal;
