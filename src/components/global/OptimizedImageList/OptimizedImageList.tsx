import React, { useCallback, memo, useMemo } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { OptimizedImagePreview } from '../OptimizedImagePreview/OptimizedImagePreview';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, runOnJS } from 'react-native-reanimated';

interface DraggableImageProps {
  uri: string;
  index: number;
  isPrimary?: boolean;
  onDelete: (index: number) => void;
  onDragStart?: () => void;
  onDragEnd?: (fromIndex: number, toIndex: number) => void;
  totalImages: number;
}

const DraggableImage = memo<DraggableImageProps>(({ uri, index, isPrimary = false, onDelete, onDragStart, onDragEnd, totalImages }) => {
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
      const moveThreshold = 80; // pixels to trigger move to adjacent position
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
        <View className="mr-3">
          <OptimizedImagePreview uri={uri} width={96} height={96} isPrimary={isPrimary} onDelete={() => onDelete(index)} showDeleteButton={true} />
          <View className="mt-1 items-center">
            <Text className="text-xs text-gray-500 dark:text-gray-400">{index + 1}</Text>
          </View>
        </View>
      </GestureDetector>
    </Animated.View>
  );
});

DraggableImage.displayName = 'DraggableImage';

interface OptimizedImageListProps {
  images: Array<{ uri: string }>;
  onReorder?: (images: Array<{ uri: string }>) => void;
  onDelete: (index: number) => void;
  maxImages?: number;
  showReorderHint?: boolean;
}

export const OptimizedImageList = memo<OptimizedImageListProps>(({ images, onReorder, onDelete, maxImages = 10, showReorderHint = true }) => {
  // Memoize the images array to prevent unnecessary re-renders
  const memoizedImages = useMemo(() => images, [images]);

  const handleDelete = useCallback(
    (index: number) => {
      onDelete(index);
    },
    [onDelete]
  );

  const handleReorder = useCallback(
    (fromIndex: number, toIndex: number) => {
      if (!onReorder || fromIndex === toIndex) return;

      const newImages = [...memoizedImages];
      const [movedItem] = newImages.splice(fromIndex, 1);
      newImages.splice(toIndex, 0, movedItem);

      onReorder(newImages);
    },
    [memoizedImages, onReorder]
  );

  if (memoizedImages.length === 0) {
    return null;
  }

  return (
    <View className="mt-4">
      {showReorderHint && (
        <Text className="mb-2 text-sm font-medium text-font dark:text-font-dark">
          Выбранные фотографии ({memoizedImages.length}/{maxImages}){onReorder && ' • Зажмите и перетащите для изменения порядка'}
        </Text>
      )}

      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row" contentContainerStyle={{ paddingRight: 20 }}>
        {memoizedImages.map((image, index) => (
          <DraggableImage
            key={`${image.uri}-${index}`}
            uri={image.uri}
            index={index}
            isPrimary={index === 0}
            onDelete={handleDelete}
            onDragEnd={handleReorder}
            totalImages={memoizedImages.length}
          />
        ))}
      </ScrollView>
    </View>
  );
});

OptimizedImageList.displayName = 'OptimizedImageList';
