import { useRouter } from "expo-router";
import { FC, useEffect, useState } from "react";
import {
  StatusBar,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import type { SharedValue } from "react-native-reanimated";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import CloseIcon from "@/components/global/CloseIcon";
import { InputField } from "@/components/ui/InputField";
import { useSimpleAutoBrandApi } from "@/hooks/useSimpleAutoBrandApi";
import { useSimpleAutoFormContext } from "@/modules/advertisement/simple-auto/SimpleAutoFormProvider";
import {
  DefaultConfig,
  GetAppSimpleautocontextPresentationBrandgetcollectionGetbrands200ResponseInner,
} from "@/openapi/client";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";

const STATUSBAR_HEIGHT = StatusBar.currentHeight ?? 24;

export default function ModelItemScreenFilterModal() {
  const { data, isLoading } = useSimpleAutoBrandApi();
  const [filteredBrands, setFilteredBrands] = useState<
    GetAppSimpleautocontextPresentationBrandgetcollectionGetbrands200ResponseInner[]
  >([]);
  const scrollY = useSharedValue(0);
  const isScrolling = useSharedValue(false);

  useEffect(() => {
    if (data) {
      setFilteredBrands(data);
    }
  }, [data]);

  return (
    <>
      <View style={{ height: STATUSBAR_HEIGHT }}>
        <SafeAreaView>
          <StatusBar
            translucent
            backgroundColor={"red"}
            barStyle={"light-content"}
          />
        </SafeAreaView>
      </View>

      {isLoading ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-font dark:text-font-dark">Loading...</Text>
        </View>
      ) : (
        <>
          <Header
            scrollY={scrollY}
            setFilteredData={setFilteredBrands}
            initialData={data ?? []}
          />
          <ModelItemScreenFilterModalBlock
            brands={filteredBrands}
            scrollY={scrollY}
            isScrolling={isScrolling}
          />
        </>
      )}
    </>
  );
}

type props = {
  brands: GetAppSimpleautocontextPresentationBrandgetcollectionGetbrands200ResponseInner[];
  scrollY: any;
  isScrolling: any;
};

const ModelItemScreenFilterModalBlock: FC<props> = ({
  brands,
  scrollY,
  isScrolling,
}) => {
  const router = useRouter();

  // const { addSelectedModel } = useAutoSelectStore();
  const { setSelectedBrand, setSelectedModel } = useSimpleAutoFormContext();

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
    onBeginDrag: () => {
      isScrolling.value = true;
    },
    onEndDrag: () => {
      isScrolling.value = false;
    },
  });

  const handleAddBrand = (
    brand: GetAppSimpleautocontextPresentationBrandgetcollectionGetbrands200ResponseInner
  ) => {
    setSelectedBrand(brand);
    setSelectedModel(null);
    router.dismiss();
  };

  return (
    <>
      <View className="mt-2">
        <Animated.FlatList
          data={brands}
          keyExtractor={(item) => `${item.id}`}
          scrollEventThrottle={16}
          onScroll={scrollHandler}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 120 + STATUSBAR_HEIGHT + 100,
          }} // HEADER + STATUSBAR + 100 so list doesn't hide under button
          renderItem={({ item }) => (
            <TouchableHighlight
              onPress={() => handleAddBrand(item)}
              className={
                "p-4 border-b border-border dark:border-border-dark last:border-0"
              }
            >
              <View className="flex-row gap-x-4">
                <Image
                  source={{ uri: DefaultConfig.basePath + item.imageFilePath }}
                  style={{ width: 25, height: 25 }}
                  contentFit="cover" // or "contain", "fill", etc.
                />
                <Text className="text-xl text-font dark:text-font-dark">
                  {item.name}
                </Text>
              </View>
            </TouchableHighlight>
          )}
          initialNumToRender={18} // how many items to render at first
          windowSize={10} // number of screen heights to render around
          maxToRenderPerBatch={20} // batch size
          updateCellsBatchingPeriod={50} // delay in ms between renders
          removeClippedSubviews={true} //
        />
      </View>

      <View className="absolute left-0 right-0 bottom-2 p-8">
        <TouchableOpacity className="bg-background-brand-bold rounded-md py-3 items-center">
          <Text style={{ color: "white", fontWeight: "bold" }}>Continue</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

type HeaderProps = {
  scrollY: SharedValue<number>;
  setFilteredData: (
    data: GetAppSimpleautocontextPresentationBrandgetcollectionGetbrands200ResponseInner[]
  ) => void;
  initialData: GetAppSimpleautocontextPresentationBrandgetcollectionGetbrands200ResponseInner[];
};

const Header: FC<HeaderProps> = ({ scrollY, setFilteredData, initialData }) => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");

  const offsetValue = 140;

  // filter data using searchValue
  useEffect(() => {
    if (searchValue) {
      const searchValueLowerCase = searchValue.toLowerCase();
      setFilteredData(
        initialData.filter(
          (
            i: GetAppSimpleautocontextPresentationBrandgetcollectionGetbrands200ResponseInner
          ) => {
            if (!i.name) return false;
            const nameLowerCase = i.name.toLowerCase();
            return nameLowerCase.includes(searchValueLowerCase);
          }
        )
      );
    } else {
      setFilteredData(initialData);
    }
  }, [searchValue, setFilteredData, initialData]);

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
          <CloseIcon onPress={() => router.dismiss()} />

          {/* Title */}
          <Animated.View style={animatedSpacer} className="px-3">
            <Animated.Text
              style={[animatedTitle]}
              className="font-bold text-font dark:text-font-dark"
            >
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
