import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, Text, Dimensions, ScrollView } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, runOnJS } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface DraggableImageProps {
  uri: string;
  index: number;
  isPrimary?: boolean;
  onDelete: (index: number) => void;
  onDragStart?: () => void;
  onDragEnd?: (fromIndex: number, toIndex: number) => void;
  totalImages: number;
}

export const DraggableImage: React.FC<DraggableImageProps> = ({ uri, index, isPrimary = false, onDelete, onDragStart, onDragEnd, totalImages }) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const isDragging = useSharedValue(false);

  const panGesture = Gesture.Pan()
    .onStart(() => {
      isDragging.value = true;
      onDragStart?.();
    })
    .onUpdate(event => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    })
    .onEnd(event => {
      isDragging.value = false;

      // Calculate which position this image should move to
      const moveThreshold = 60; // pixels to trigger move to adjacent position
      const deltaX = event.translationX;

      let toIndex = index;
      if (deltaX > moveThreshold) {
        toIndex = Math.min(index + 1, totalImages - 1);
      } else if (deltaX < -moveThreshold) {
        toIndex = Math.max(index - 1, 0);
      }

      if (toIndex !== index && onDragEnd) {
        runOnJS(onDragEnd)(index, toIndex);
      }

      // Reset position
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
    zIndex: isDragging.value ? 1000 : 1,
  }));

  return (
    <Animated.View style={animatedStyle}>
      <GestureDetector gesture={panGesture}>
        <View className="relative mr-2">
          <View className="relative">
            <Image source={{ uri }} className="h-24 w-24 rounded-md" />
            {isPrimary && (
              <View className="bg-primary absolute -left-2 -top-2 rounded-full px-2 py-1">
                <Text className="text-xs font-bold text-white">1</Text>
              </View>
            )}
            <View className="absolute right-1 top-1 flex-row gap-1">
              <TouchableOpacity onPress={() => onDelete(index)} className="h-6 w-6 items-center justify-center rounded-full bg-red-500">
                <Ionicons name="close" size={12} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </GestureDetector>
    </Animated.View>
  );
};

interface DraggableImageListProps {
  images: Array<{ uri: string }>;
  onReorder: (images: Array<{ uri: string }>) => void;
  onDelete: (index: number) => void;
}

export const DraggableImageList: React.FC<DraggableImageListProps> = ({ images, onReorder, onDelete }) => {
  const [localImages, setLocalImages] = useState(images);

  useEffect(() => {
    setLocalImages(images);
  }, [images]);

  const handleReorder = (fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex) return;

    const newImages = [...localImages];
    const [movedItem] = newImages.splice(fromIndex, 1);
    newImages.splice(toIndex, 0, movedItem);

    setLocalImages(newImages);
    onReorder(newImages);
  };

  if (localImages.length === 0) return null;

  return (
    <View className="mt-4">
      <Text className="mb-2 text-sm font-medium text-font dark:text-font-dark">Выбранные фотографии (перетащите для изменения порядка)</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
        {localImages.map((image, index) => (
          <DraggableImage
            key={`${image.uri}-${index}`}
            uri={image.uri}
            index={index}
            isPrimary={index === 0}
            onDelete={onDelete}
            onDragEnd={handleReorder}
            totalImages={localImages.length}
          />
        ))}
      </ScrollView>
    </View>
  );
};
