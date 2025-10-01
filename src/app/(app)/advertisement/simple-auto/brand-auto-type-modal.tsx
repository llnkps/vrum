import { useRouter } from "expo-router";
import { FC, useEffect, useState } from "react";
import { StatusBar, Text, TouchableHighlight, View } from "react-native";
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
import { useSimpleAutoModelByBrandApi } from "@/hooks/useSimpleAutoModelByBrandApi";
import { useFilterContext } from "@/modules/advertisement/simple-auto/FilterProvider";
import { GetAppSimpleautocontextPresentationModelgetcollectionGetcollectionbyfilters200ResponseInner } from "@/openapi/client";
import { useAutoSelectStore } from "@/state/search-screen/useAutoSelectStore";
import { Ionicons } from "@expo/vector-icons";

const STATUSBAR_HEIGHT = StatusBar.currentHeight ?? 24;

export default function ModalModelItem() {
  const { selectedBrand } = useFilterContext();

  const { data, isLoading } = useSimpleAutoModelByBrandApi(
    selectedBrand?.id || null
  );
  const [filteredModels, setFilteredModels] = useState<
    GetAppSimpleautocontextPresentationModelgetcollectionGetcollectionbyfilters200ResponseInner[]
  >([]);

  const scrollY = useSharedValue(0);
  const isScrolling = useSharedValue(false);
  console.log(scrollY);
  // Sync filteredModels with data when data loads
  useEffect(() => {
    if (data) {
      setFilteredModels(data);
    }
  }, [data]);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-font dark:text-font-dark">Loading...</Text>
      </View>
    );
  }

  return (
    <>
      <SafeAreaView className="flex-1 px-3 gap-y-4">
        <Header
          brandName={selectedBrand?.name || ""}
          scrollY={scrollY}
          setFilteredData={setFilteredModels}
          initialData={data || []}
        />

        <ModalModelItemBlock
          models={filteredModels}
          scrollY={scrollY}
          isScrolling={isScrolling}
        />
      </SafeAreaView>
    </>
  );
}

type props = {
  models: GetAppSimpleautocontextPresentationModelgetcollectionGetcollectionbyfilters200ResponseInner[];
  scrollY: any;
  isScrolling: any;
};

const ModalModelItemBlock: FC<props> = ({ models, scrollY, isScrolling }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const items = ["Apple", "Banana", "Orange"];

  const router = useRouter();

  // console.log(params)

  // const { selectedModels, addSelectedModel } = useAutoSelectStore();

  const { setSelectedModel } = useFilterContext();

  const handleSelectModel = (
    item: GetAppSimpleautocontextPresentationModelgetcollectionGetcollectionbyfilters200ResponseInner
  ) => {
    setSelectedModel(item);
    router.dismiss();
  };

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

  return (
    <>
      <View className="mt-2">
        <Animated.FlatList
          data={models}
          keyExtractor={(item) => `${item.id}`}
          scrollEventThrottle={16}
          onScroll={scrollHandler}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 120 + STATUSBAR_HEIGHT + 100,
          }} // HEADER + STATUSBAR + 100 so list doesn't hide under button
          renderItem={({ item }) => (
            <TouchableHighlight
              onPress={() => handleSelectModel(item)}
              className={
                "p-4 border-b border-border dark:border-border-dark last:border-0"
              }
            >
              <View className="flex-row gap-x-4">
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

      {/* ✅ Show button only after user picks something */}
      {selected && (
        <Button title="Confirm" onPress={() => setModalVisible(false)} />
      )}
    </>
  );
};

type HeaderProps = {
  brandName: string;
  scrollY: SharedValue<number>;
  setFilteredData: (
    data: GetAppSimpleautocontextPresentationModelgetcollectionGetcollectionbyfilters200ResponseInner[]
  ) => void;
  initialData: GetAppSimpleautocontextPresentationModelgetcollectionGetcollectionbyfilters200ResponseInner[];
};

const Header: FC<HeaderProps> = ({
  brandName,
  scrollY,
  setFilteredData,
  initialData,
}) => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");

  const offsetValue = 140;

  // filter data using searchValue
  useEffect(() => {
    if (searchValue) {
      const searchValueLowerCase = searchValue.toLowerCase();
      setFilteredData(
        initialData.filter((i) => {
          if (!i.name) return false;
          const nameLowerCase = i.name.toLowerCase();
          return nameLowerCase.includes(searchValueLowerCase);
        })
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
              {brandName}
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
