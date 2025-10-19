import { useCallback } from 'react';
import { Image } from 'expo-image';
import { DefaultConfig } from '@/openapi/client';

// Global set to track prefetched image URIs
const prefetchedImages = new Set<string>();

export const useImagePrefetch = (data: any[]) => {
  const onViewableItemsChanged = useCallback(
    ({ viewableItems, changed }: { viewableItems: any[]; changed: any[] }) => {
      // Prefetch images for upcoming items (next 5 items)
      const lastVisibleIndex = Math.max(...viewableItems.map(v => v.index));
      const prefetchStart = lastVisibleIndex + 1;
      const prefetchEnd = lastVisibleIndex + 6; // prefetch next 5 items

      for (let i = prefetchStart; i < prefetchEnd && i < data.length; i++) {
        const item = data[i];
        if (item.images && item.images.length > 0) {
          const imagesToPreload = item.images.slice(0, 3).map((imageUri: string) => DefaultConfig.basePath + imageUri);
          const newImages = imagesToPreload.filter((uri: string) => !prefetchedImages.has(uri));
          if (newImages.length > 0) {
            Image.prefetch(newImages);
            newImages.forEach((uri: string) => prefetchedImages.add(uri));
          }
        }
      }
    },
    [data]
  );

  return { onViewableItemsChanged };
};
