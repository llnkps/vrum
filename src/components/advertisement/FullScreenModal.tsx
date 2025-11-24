import { AdvertisementWithFiltersResponse, DefaultConfig } from '@/openapi/client';
import { CustomTheme } from '@/theme';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { memo } from 'react';
import { Image, Modal, NativeScrollEvent, NativeSyntheticEvent, StatusBar, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

interface FullScreenModalProps {
  showFullScreen: boolean;
  onClose: () => void;
  data: AdvertisementWithFiltersResponse;
  fullScreenImageIndex: number;
  onImageScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  width: number;
}

const FullScreenModal = memo(({ showFullScreen, onClose, data, width, fullScreenImageIndex, onImageScroll }: FullScreenModalProps) => {
  const theme = useTheme() as CustomTheme;
  return (
    <Modal visible={showFullScreen} transparent={false} animationType="fade" onRequestClose={onClose}>
      <StatusBar hidden />
      <View className="flex-1 bg-black">
        {/* Close Button */}
        <TouchableOpacity className="absolute right-4 top-12 z-10 rounded-full bg-black/50 p-2" onPress={onClose}>
          <Ionicons name="close" size={24} color={theme.colors.icon} />
        </TouchableOpacity>

        {/* Full Screen Images */}
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={onImageScroll}
          scrollEventThrottle={16}
          className="flex-1"
        >
          {data.images?.map((imageUri, index) => (
            <View key={index} style={{ width }}>
              <Image source={{ uri: DefaultConfig.basePath + imageUri }} className="h-full w-full" resizeMode="contain" />
            </View>
          ))}
        </ScrollView>

        {/* Pagination Dots for Full Screen */}
        {data.images && data.images.length > 1 && (
          <View className="absolute bottom-8 left-0 right-0 flex-row justify-center">
            <View className="flex-row gap-2 rounded-full bg-black/50 px-3 py-2">
              {data.images.map((_, index) => (
                <View key={index} className={`h-2 w-2 rounded-full ${index === fullScreenImageIndex ? 'bg-white' : 'bg-white/50'}`} />
              ))}
            </View>
          </View>
        )}
      </View>
    </Modal>
  );
});

FullScreenModal.displayName = 'FullScreenModal';

export default FullScreenModal;
