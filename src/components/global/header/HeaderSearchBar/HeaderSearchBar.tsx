import { useRouter } from 'expo-router';
import { FC } from 'react';
import { Text, View } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import Animated, { Extrapolation, interpolate, useAnimatedStyle } from 'react-native-reanimated';

import CloseIcon from '@/components/global/CloseIcon';
import { InputField } from '@/components/ui/input/InputField/InputField';
import { CustomTheme } from '@/theme';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';

interface HeaderProps {
  title: string;
  scrollY: SharedValue<number>;
  showSearch?: boolean;
  onSearch?: (text: string) => void;
  searchValue?: string;
  searchPlaceholder?: string;
  onClose?: () => void;
}

export const HeaderSearchBar: FC<HeaderProps> = ({
  title,
  scrollY,
  showSearch = false,
  onSearch,
  searchValue = '',
  searchPlaceholder = '',
  onClose,
}) => {
  const theme = useTheme() as CustomTheme;
  const router = useRouter();
  const offsetValue = 140;

  // Header container (bg + height)
  const animatedHeader = useAnimatedStyle(() => {
    const height = interpolate(
      scrollY.value,
      [0, offsetValue],
      [100, 40], // from 100px to 40px
      Extrapolation.CLAMP
    );

    return {
      height,
    };
  });

  // Title (font size + vertical shift)
  const animatedTitle = useAnimatedStyle(() => {
    const scale = interpolate(scrollY.value, [0, offsetValue], [1, 18 / 24], Extrapolation.CLAMP);

    const translateY = interpolate(scrollY.value, [0, offsetValue], [0, -32], Extrapolation.CLAMP);

    const translateX = interpolate(scrollY.value, [0, offsetValue], [0, 0], Extrapolation.CLAMP);

    return {
      transform: [{ translateY }, { translateX }, { scale }],
    };
  });

  // Spacing between back button and title
  const animatedSpacer = useAnimatedStyle(() => {
    const marginLeft = interpolate(scrollY.value, [0, 0], [0, 8], Extrapolation.CLAMP);
    return { marginLeft };
  });

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      router.dismiss();
    }
  };

  return (
    <View>
      <Animated.View style={[{ paddingHorizontal: 8 }, animatedHeader]}>
        {/* Back button */}
        <View className="self-start">
          <CloseIcon onPress={handleClose} />
        </View>

        {/* Title */}
        <Animated.View style={[{ paddingHorizontal: 6 }, animatedSpacer]}>
          <Animated.Text style={[{ fontWeight: 'bold', color: theme.colors.text, fontSize: 24 }, animatedTitle]}>{title}</Animated.Text>
        </Animated.View>
      </Animated.View>

      {/* Input stays outside, not collapsing with header */}
      {showSearch && (
        <View style={{ paddingHorizontal: 12, paddingBottom: 8 }}>
          <InputField
            Icon={<Ionicons name="search" size={20} color="gray" />}
            value={searchValue}
            onChange={e => onSearch(e)}
            placeholder={searchPlaceholder}
          />
        </View>
      )}
    </View>
  );
};
HeaderSearchBar.displayName = 'HeaderSearchBar';
