import CustomBottomSheetModal, { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { TouchableHighlightRow } from '@/components/global/TouchableHighlightRow/TouchableHighlightRow';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { View, Text, Alert, ActivityIndicator } from 'react-native';

type OptimizedImagePickerModalProps = {
  onSelect: (images: ImagePicker.ImagePickerAsset[]) => void;
  maxImages?: number;
  currentImageCount?: number;
};

const OptimizedImagePickerModal = forwardRef<BottomSheetRef, OptimizedImagePickerModalProps>(({
  onSelect,
  maxImages = 10,
  currentImageCount = 0
}, ref) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const pickImages = useCallback(async () => {
    if (currentImageCount >= maxImages) {
      Alert.alert('Лимит достигнут', `Можно выбрать максимум ${maxImages} изображений`);
      return;
    }

    if (isProcessing) return;

    try {
      setIsProcessing(true);

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        quality: 0.8, // Slightly higher quality for better thumbnails
        selectionLimit: maxImages - currentImageCount,
        exif: false, // Skip EXIF data to reduce processing
      });

      if (!result.canceled && result.assets.length > 0) {
        // Process images in batches to avoid blocking the UI
        const processedAssets = result.assets.map(asset => ({
          ...asset,
          // Add any additional processing here if needed
        }));

        onSelect(processedAssets);
      }
    } catch (error) {
      console.error('Image picker error:', error);
      Alert.alert('Ошибка', 'Не удалось выбрать изображения');
    } finally {
      setIsProcessing(false);
    }
  }, [currentImageCount, maxImages, onSelect, isProcessing]);

  const takePhoto = useCallback(async () => {
    if (currentImageCount >= maxImages) {
      Alert.alert('Лимит достигнут', `Можно выбрать максимум ${maxImages} изображений`);
      return;
    }

    if (isProcessing) return;

    try {
      setIsProcessing(true);

      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Разрешение камеры', 'Необходимо разрешение для использования камеры');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
        exif: false,
      });

      if (!result.canceled && result.assets.length > 0) {
        onSelect(result.assets);
      }
    } catch (error) {
      console.error('Camera error:', error);
      Alert.alert('Ошибка', 'Не удалось сделать фото');
    } finally {
      setIsProcessing(false);
    }
  }, [currentImageCount, maxImages, onSelect, isProcessing]);

  return (
    <CustomBottomSheetModal
      ref={ref}
      snapPoints={['25%']}
      enableContentPanningGesture={true}
      title="Добавить изображение"
    >
      <BottomSheetView className="flex-col gap-y-4 p-4">
        <View className="gap-y-2">
          <TouchableHighlightRow
            label="Выбрать из галереи"
            onPress={pickImages}
            showRightArrow={false}
            disabled={isProcessing || currentImageCount >= maxImages}
            variant="bordered"
          />
          <TouchableHighlightRow
            label="Сделать фото"
            onPress={takePhoto}
            showRightArrow={false}
            disabled={isProcessing || currentImageCount >= maxImages}
            variant="bordered"
          />
        </View>

        {currentImageCount > 0 && (
          <View className="mt-2">
            <Text className="text-center text-gray-600 dark:text-gray-400">
              Выбрано изображений: {currentImageCount} / {maxImages}
            </Text>
          </View>
        )}

        {isProcessing && (
          <View className="flex-1 items-center justify-center py-4">
            <ActivityIndicator size="small" color="#6b7280" />
            <Text className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Обработка изображений...
            </Text>
          </View>
        )}
      </BottomSheetView>
    </CustomBottomSheetModal>
  );
});

OptimizedImagePickerModal.displayName = 'OptimizedImagePickerModal';

export default OptimizedImagePickerModal;