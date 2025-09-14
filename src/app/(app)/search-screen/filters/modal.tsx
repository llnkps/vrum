import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import {
    Button, Dimensions, FlatList, Image, Pressable, StatusBar, StyleSheet, Text, TextInput,
    TouchableOpacity, useColorScheme, View
} from 'react-native';
import Animated, {
    Extrapolation, FadeIn, interpolate, interpolateColor, useAnimatedScrollHandler,
    useAnimatedStyle, useSharedValue
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import TextInputIcon from '@/components/ui/TextInputIcon';
import { Ionicons } from '@expo/vector-icons';

const HEADER_HEIGHT = 120;
const STATUSBAR_HEIGHT = StatusBar.currentHeight;

export default function ModelItemScreenFilterModal() {
  const data = require('@/data/auto-icons/output.json');
  const router = useRouter();

  const scrollY = useSharedValue(0);
  const isScrolling = useSharedValue(false);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollY.value = event.contentOffset.y;
    },
    onBeginDrag: () => {
      isScrolling.value = true;
    },
    onEndDrag: () => {
      isScrolling.value = false;
    }
  })

  return (
    <>
      <View style={{ height: STATUSBAR_HEIGHT }}>
        <SafeAreaView>
          <StatusBar
            translucent
            backgroundColor={"red"}
            barStyle={'light-content'}
          />
        </SafeAreaView>
      </View>

      {/* <SafeAreaView className="flex-1 px-3 gap-y-4"> */}
      <View className="mt-2">
        <Header headerHeight={HEADER_HEIGHT} scrollY={scrollY} />

        <Animated.FlatList
          data={data}
          keyExtractor={(item, index) => `${item.filename}_${index}`}
          scrollEventThrottle={16}
          onScroll={scrollHandler}
          renderItem={({ item, index }) => (
            <Animated.ScrollView>
              <TouchableOpacity
                key={`${item.filename}_${index}`}
                onPress={() => router.push({
                  pathname: "/search-screen/filters/modal-model",
                  params: {
                    ...item
                  }
                })}
                className={"p-2 border-b border-border dark:border-border-dark"}
              >
                <View className="flex-row gap-x-4">
                  {/* <Image source={require(`@/data/auto-icons/${item.filepath}`)} /> */}
                  <Text className="text-xl text-font dark:text-font-dark">{item.name}</Text>
                </View>
              </TouchableOpacity>
            </Animated.ScrollView>
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <View className="absolute left-0 right-0 bottom-2 p-8">
        <TouchableOpacity className="bg-background-brand-bold rounded-md py-3 items-center">
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Continue</Text>
        </TouchableOpacity>
      </View>
    </>
  )
}


const Header = ({ headerHeight, scrollY }) => {
  const router = useRouter();

  const offsetValue = 140;

  // Header container (bg + height)
  const animatedHeader = useAnimatedStyle(() => {
    const height = interpolate(
      scrollY.value,
      [0, offsetValue],
      [80, 40], // from 100px to 55px
      Extrapolation.CLAMP
    );

    return {
      // backgroundColor,
      height,
    };
  });

  // Title (font size + vertical shift)
  const animatedTitle = useAnimatedStyle(() => {
    const fontSize = interpolate(
      scrollY.value,
      [0, offsetValue], // when scrollY value is 0 then font-size=24
      [24, 18], // from 24 to 18
      Extrapolation.CLAMP
    );

    const translateY = interpolate(
      scrollY.value,
      [0, offsetValue], // входной диапазон: от 0 до 100 px скролла
      [0, -32], // start lower, then align vertically with back button
      Extrapolation.CLAMP
    );

    const translateX = interpolate(
      scrollY.value,
      [0, offsetValue], // входной диапазон: от 0 до 100 px скролла
      [0, 40], // slide right when collapsed
      Extrapolation.CLAMP
    );

    return {
      fontSize,
      transform: [{ translateY }, { translateX }],
    };
  });

  // Spacing between back button and title
  const animatedSpacer = useAnimatedStyle(() => {
    const marginLeft = interpolate(
      scrollY.value,
      [0, 0],
      [0, 8], // when collapsed, add a small space so title sits right next to button
      Extrapolation.CLAMP
    );
    return { marginLeft };
  });

  return (
    <>
      <View>
        <Animated.View style={[animatedHeader]} className="px-2">
          {/* Back button */}
          <TouchableOpacity onPress={() => router.dismiss()} style={{ padding: 8 }}>
            <Ionicons name="close" size={22} color="white" />
          </TouchableOpacity>

          {/* Title */}
          <Animated.View style={animatedSpacer}>
            <Animated.Text style={[animatedTitle]} className="font-bold text-font dark:text-font-dark">
              Марки
            </Animated.Text>
          </Animated.View>
        </Animated.View>

        {/* Input stays outside, not collapsing with header */}
        <View className="px-3 pb-2">
          <TextInputIcon />
        </View>
      </View>
    </>
  );
};






// TODO: check if we can reuse it

// import React from 'react';
// import { View, TouchableOpacity, Text } from 'react-native';
// import Animated, { interpolate, Extrapolation, useAnimatedStyle } from 'react-native-reanimated';
// import { Ionicons } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';

// interface CollapsibleHeaderProps {
//   title: string;
//   scrollY: Animated.SharedValue<number>;
//   offsetValue?: number;
//   initialHeight?: number;
//   collapsedHeight?: number;
//   initialFontSize?: number;
//   collapsedFontSize?: number;
//   showBackButton?: boolean;
//   onBackPress?: () => void;
//   children?: React.ReactNode; // e.g., input component
// }

// export const CollapsibleHeader: React.FC<CollapsibleHeaderProps> = ({
//   title,
//   scrollY,
//   offsetValue = 140,
//   initialHeight = 80,
//   collapsedHeight = 40,
//   initialFontSize = 24,
//   collapsedFontSize = 18,
//   showBackButton = true,
//   onBackPress,
//   children,
// }) => {
//   const router = useRouter();

//   // Header container animation
//   const animatedHeader = useAnimatedStyle(() => {
//     const height = interpolate(
//       scrollY.value,
//       [0, offsetValue],
//       [initialHeight, collapsedHeight],
//       Extrapolation.CLAMP
//     );
//     return { height, flexDirection: 'row', alignItems: 'center' };
//   });

//   // Title animation
//   const animatedTitle = useAnimatedStyle(() => {
//     const fontSize = interpolate(
//       scrollY.value,
//       [0, offsetValue],
//       [initialFontSize, collapsedFontSize],
//       Extrapolation.CLAMP
//     );

//     const translateY = interpolate(
//       scrollY.value,
//       [0, offsetValue],
//       [0, -Math.abs(initialHeight - collapsedHeight) / 2],
//       Extrapolation.CLAMP
//     );

//     const translateX = interpolate(
//       scrollY.value,
//       [0, offsetValue],
//       [0, 40],
//       Extrapolation.CLAMP
//     );

//     return { fontSize, transform: [{ translateY }, { translateX }] };
//   });

//   return (
//     <View>
//       <Animated.View style={[animatedHeader, { paddingHorizontal: 12 }]}>
//         {showBackButton && (
//           <TouchableOpacity
//             onPress={onBackPress || (() => router.dismiss())}
//             style={{ padding: 8 }}
//           >
//             <Ionicons name="close" size={22} color="white" />
//           </TouchableOpacity>
//         )}

//         <Animated.Text
//           style={[animatedTitle, { fontWeight: 'bold', color: 'white' }]}
//         >
//           {title}
//         </Animated.Text>
//       </Animated.View>

//       {/* Optional children (e.g., input) */}
//       {children && <View className="px-3 pb-2">{children}</View>}
//     </View>
//   );
// };