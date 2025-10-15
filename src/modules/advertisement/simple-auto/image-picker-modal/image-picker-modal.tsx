import CustomBottomSheetModal, {
  BottomSheetRef,
} from "@/components/global/CustomBottomSheetModal";
import { CustomRectButton } from "@/components/ui/button";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { forwardRef } from "react";
import * as ImagePicker from "expo-image-picker";
import { View, Image, ScrollView, Text, TouchableOpacity } from "react-native";
import { useFieldArray } from "react-hook-form";

type ImagePickerModalProps = {
  onSelect: (images: ImagePicker.ImagePickerAsset[]) => void;
  maxImages?: number;
  control: any;
};

const ImagePickerModal = forwardRef<BottomSheetRef, ImagePickerModalProps>(
  ({ onSelect, control, maxImages = 10 }, ref) => {
    const { fields, append, remove } = useFieldArray({
      control,
      name: "images", // The name of your array field in the form
    });

    const pickImages = async () => {
      if (fields.length >= maxImages) {
        return; // Don't allow selection if at max limit
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        quality: 0.7,
        selectionLimit: maxImages - fields.length, // Only allow selection up to the remaining limit
      });

      if (!result.canceled) {
        const newImages = result.assets.map(asset => ({
          uri: asset.uri,
          type: asset.type || 'image',
          fileName: asset.fileName,
          width: asset.width,
          height: asset.height,
        }));

        // Add new images to the form
        newImages.forEach(image => append(image));

        // Call onSelect with the new images
        onSelect(result.assets);
      }
    };

    const takePhoto = async () => {
      if (fields.length >= maxImages) {
        return; // Don't allow taking photo if at max limit
      }

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
        const newImage = {
          uri: result.assets[0].uri,
          type: result.assets[0].type || 'image',
          fileName: result.assets[0].fileName,
          width: result.assets[0].width,
          height: result.assets[0].height,
        };

        // Add new image to the form
        append(newImage);

        // Call onSelect with the new image
        onSelect(result.assets);
      }
    };

    const removeImage = (index: number) => {
      remove(index);
    };

    return (
      <CustomBottomSheetModal
        ref={ref}
        snapPoints={["80%"]}
        enableContentPanningGesture={true}
      >
        <BottomSheetView className="flex-col p-4 gap-y-4">
          {fields.length > 0 && (
            <ScrollView horizontal className="h-24">
              {fields.map((field, index) => (
                <View key={field.id} className="relative mr-2">
                  <Image
                    source={{ uri: (field as any).uri }}
                    className="w-24 h-24 rounded-md"
                  />
                  <TouchableOpacity
                    onPress={() => removeImage(index)}
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 items-center justify-center"
                  >
                    <Text className="text-white text-xs font-bold">×</Text>
                  </TouchableOpacity>
                </View>
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
          {fields.length > 0 && (
            <View className="mt-2">
              <Text className="text-center text-gray-600">
                Выбрано изображений: {fields.length} / {maxImages}
              </Text>
            </View>
          )}
        </BottomSheetView>
      </CustomBottomSheetModal>
    );
  }
);

ImagePickerModal.displayName = "ImagePickerModal";

export default ImagePickerModal;
