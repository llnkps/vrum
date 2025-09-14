import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { StatusBar, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import Animated, {
  Extrapolation, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { InputField } from '@/components/ui/InputField';
import { Ionicons } from '@expo/vector-icons';

const STATUSBAR_HEIGHT = StatusBar.currentHeight;

export default function ModelItemScreenFilterModal() {
  const data = require('@/data/auto-icons/output.json');

  const [filteredData, setFilteredData] = useState(data);

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
        <Header scrollY={scrollY} setFilteredData={setFilteredData} initialData={data} />

        <Animated.FlatList
          data={filteredData}
          keyExtractor={(item, index) => `${item.filename}_${index}`}
          scrollEventThrottle={16}
          onScroll={scrollHandler}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 + STATUSBAR_HEIGHT + 100 }} // HEADER + STATUSBAR + 100 so list doesn't hide under button
          renderItem={({ item, index }) => (

            <TouchableHighlight
              onPress={() => router.push({
                pathname: "/search-screen/filters/modal-model",
                params: {
                  ...item
                }
              })}
              className={"p-4 border-b border-border dark:border-border-dark last:border-0"}
            >
              <View className="flex-row gap-x-4">
                {/* <Image source={require(`@/data/auto-icons/${item.filepath}`)} /> */}
                <Text className="text-xl text-font dark:text-font-dark">{item.name}</Text>
              </View>
            </TouchableHighlight>
          )}

          initialNumToRender={10}      // how many items to render at first
          windowSize={10}              // number of screen heights to render around
          maxToRenderPerBatch={10}     // batch size
          updateCellsBatchingPeriod={50} // delay in ms between renders
          removeClippedSubviews={true} // 
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


const Header = ({ scrollY, setFilteredData, initialData }) => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");

  const offsetValue = 140;

  // filter data using searchValue
  useEffect(() => {
    if (searchValue) {
      const searchValueLowerCase = searchValue.toLowerCase();
      setFilteredData(initialData.filter(i => {
        const nameLowerCase = i.name.toLowerCase();
        if (nameLowerCase.includes(searchValueLowerCase)) {
          return true;
        }
        return false;
      }))
    } else {
      setFilteredData(initialData)
    }

  }, [searchValue, setFilteredData, initialData])


  // Header container (bg + height)
  const animatedHeader = useAnimatedStyle(() => {
    const height = interpolate(
      scrollY.value,
      [0, offsetValue],
      [100, 40], // from 100px to 40px
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
          <TouchableOpacity onPress={() => router.dismiss()} className="p-3">
            <Ionicons name="close" size={22} color="white" />
          </TouchableOpacity>

          {/* Title */}
          <Animated.View style={animatedSpacer} className="px-3">
            <Animated.Text style={[animatedTitle]} className="font-bold text-font dark:text-font-dark">
              Марки
            </Animated.Text>
          </Animated.View>
        </Animated.View>

        {/* Input stays outside, not collapsing with header */}
        <View className="px-3 pb-2">
          <InputField
            Icon={<Ionicons name="search" size={20} color="gray" />}
            value={searchValue}
            onChange={(value) => setSearchValue(value)}
            placeholder="Марка или модель"
          />
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