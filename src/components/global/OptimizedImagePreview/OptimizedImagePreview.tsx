import React, { useState, useEffect, memo } from 'react';
import { View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface OptimizedImagePreviewProps {
  uri: string;
  width?: number;
  height?: number;
  onDelete?: () => void;
  showDeleteButton?: boolean;
  isPrimary?: boolean;
  style?: any;
}

export const OptimizedImagePreview = memo<OptimizedImagePreviewProps>(({
  uri,
  width = 96,
  height = 96,
  onDelete,
  showDeleteButton = true,
  isPrimary = false,
  style,
}) => {
  const [optimizedUri, setOptimizedUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const optimizeImage = async () => {
      try {
        setLoading(true);
        setError(false);

        // For local files, we can try to create a compressed version
        if (uri.startsWith('file://')) {
          // For now, just use the original URI - optimization can be added later
        if (isMounted) {
          setOptimizedUri(uri);
          setLoading(false);
        }
        } else {
          // For remote URLs or other URIs, use as-is
          if (isMounted) {
            setOptimizedUri(uri);
            setLoading(false);
          }
        }
      } catch (err) {
        console.warn('Image optimization failed:', err);
        if (isMounted) {
          setOptimizedUri(uri); // Fallback to original
          setLoading(false);
        }
      }
    };

    optimizeImage();

    return () => {
      isMounted = false;
    };
  }, [uri]);

  if (error) {
    return (
      <View
        style={[{ width, height, backgroundColor: '#f3f4f6', borderRadius: 8, justifyContent: 'center', alignItems: 'center' }, style]}
      >
        <Ionicons name="image-outline" size={24} color="#9ca3af" />
      </View>
    );
  }

  return (
    <View style={[{ position: 'relative' }, style]}>
      <View
        style={{
          width,
          height,
          borderRadius: 8,
          backgroundColor: '#f3f4f6',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        {loading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="small" color="#6b7280" />
          </View>
        ) : (
          <Image
            source={{ uri: optimizedUri || uri }}
            style={{ width, height, borderRadius: 8 }}
            resizeMode="cover"
          />
        )}
      </View>

      {isPrimary && (
        <View className="bg-primary absolute -left-2 -top-2 rounded-full px-2 py-1">
          <Ionicons name="star" size={12} color="white" />
        </View>
      )}

      {showDeleteButton && onDelete && (
        <TouchableOpacity
          onPress={onDelete}
          style={{
            position: 'absolute',
            top: 4,
            right: 4,
            backgroundColor: 'rgba(239, 68, 68, 0.9)',
            borderRadius: 12,
            width: 24,
            height: 24,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Ionicons name="close" size={14} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
});

OptimizedImagePreview.displayName = 'OptimizedImagePreview';