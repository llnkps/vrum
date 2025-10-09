import CustomBottomSheetModal, {
  BottomSheetRef,
} from "@/components/global/CustomBottomSheetModal";
import { CustomRectButton } from "@/components/ui/button";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { forwardRef } from "react";
import * as ImagePicker from "expo-image-picker";
import { View, Image, ScrollView } from "react-native";

type ImagePickerModalProps = {
  onSelect: (images: ImagePicker.ImagePickerAsset[]) => void;
  maxImages?: number;
};

const ImagePickerModal = forwardRef<BottomSheetRef, ImagePickerModalProps>(
  ({ onSelect, maxImages = 10 }, ref) => {
    const [selectedImages, setSelectedImages] = React.useState<ImagePicker.ImagePickerAsset[]>([]);

    const pickImages = async () => {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        quality: 0.7,
        selectionLimit: maxImages,
      });

      if (!result.canceled) {
        const newImages = result.assets;
        setSelectedImages((prev) => {
          const combined = [...prev, ...newImages];
          return combined.slice(0, maxImages);
        });
        onSelect(result.assets);
      }
    };

    const takePhoto = async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera permissions to make this work!");
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.7,
      });

      if (!result.canceled) {
        setSelectedImages((prev) => {
          const combined = [...prev, ...result.assets];
          return combined.slice(0, maxImages);
        });
        onSelect(result.assets);
      }
    };

    return (
      <CustomBottomSheetModal
        ref={ref}
        snapPoints={["80%"]}
        enableContentPanningGesture={true}
      >
        <BottomSheetView className="flex-col p-4 gap-y-4">
          {selectedImages.length > 0 && (
            <ScrollView horizontal className="h-24">
              {selectedImages.map((image, index) => (
                <Image
                  key={index}
                  source={{ uri: image.uri }}
                  className="w-24 h-24 rounded-md mr-2"
                />
              ))}
            </ScrollView>
          )}
          <View className="gap-y-2">
            <CustomRectButton
              title="Выбрать из галереи"
              onPress={pickImages}
              isSelected={false}
            />
            <CustomRectButton
              title="Сделать фото"
              onPress={takePhoto}
              isSelected={false}
            />
          </View>
        </BottomSheetView>
      </CustomBottomSheetModal>
    );
  }
);

ImagePickerModal.displayName = "ImagePickerModal";

export default ImagePickerModal;