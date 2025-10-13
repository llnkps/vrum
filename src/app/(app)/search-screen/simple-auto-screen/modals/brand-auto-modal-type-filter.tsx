import { useRouter } from "expo-router";
import { FC, useEffect, useState } from "react";
import { StatusBar, Text, TouchableHighlight, View } from "react-native";
import Animated, { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import { CheckboxRectButton } from "@/components/global/CheckboxRectButton/CheckboxRectButton";
import { HeaderSearchBar } from "@/components/global/HeaderSearchBar/HeaderSearchBar";
import { useSimpleAutoModelByBrandApi } from "@/hooks/useSimpleAutoModelByBrandApi";
import { GetAppSimpleautocontextPresentationModelgetcollectionGetcollectionbyfilters200ResponseInner } from "@/openapi/client";
import { useAutoSelectStore } from "@/state/search-screen/useAutoSelectStore";

// const STATUSBAR_HEIGHT = StatusBar.currentHeight ?? 24;

const STATUSBAR_HEIGHT = StatusBar.currentHeight ?? 24;

export default function ModalModelItem() {
  const [searchValue, setSearchValue] = useState("");
  const { selectedBrands } = useAutoSelectStore();
  const selectedBrand = selectedBrands[0]; // Get the first (and only) selected brand

  const { data, isLoading } = useSimpleAutoModelByBrandApi(selectedBrand?.id ? selectedBrand.id.toString() : "");
  const [filteredModels, setFilteredModels] = useState<
    GetAppSimpleautocontextPresentationModelgetcollectionGetcollectionbyfilters200ResponseInner[]
  >([]);

  const scrollY = useSharedValue(0);
  const isScrolling = useSharedValue(false);

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
        <HeaderSearchBar
          title={selectedBrand?.name || "Выберите модель"}
          scrollY={scrollY}
          showSearch={true}
          searchValue={searchValue}
          onSearch={(value) => {
            setSearchValue(value);
            if (data) {
              const searchValueLowerCase = value.toLowerCase();
              setFilteredModels(
                data.filter((i) => {
                  if (!i.name) return false;
                  return i.name.toLowerCase().includes(searchValueLowerCase);
                })
              );
            }
          }}
          searchPlaceholder="Марка или модель"
        />

        <ModalModelItemBlock models={filteredModels} scrollY={scrollY} isScrolling={isScrolling} />
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
  const router = useRouter();
  const { selectedModels, addSelectedModel } = useAutoSelectStore();

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

  const handleSelectModel = (
    item: GetAppSimpleautocontextPresentationModelgetcollectionGetcollectionbyfilters200ResponseInner
  ) => {
    addSelectedModel(item);
  };

  const handleContinue = () => {
    router.dismiss(); // Go back to index.tsx
  };

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
          }}
          renderItem={({ item }) => {
            const isSelected = selectedModels.some((m) => m.id === item.id);
            return (
              <CheckboxRectButton
                value={isSelected}
                label={item.name || ""}
                onPress={() => handleSelectModel(item)}
              />
            );
          }}
          initialNumToRender={18}
          windowSize={10}
          maxToRenderPerBatch={20}
          updateCellsBatchingPeriod={50}
          removeClippedSubviews={true}
        />
      </View>

      {selectedModels.length > 0 && (
        <View className="mt-4">
          <TouchableHighlight
            onPress={handleContinue}
            className="bg-brand px-4 py-3 rounded-2xl"
            underlayColor="#123263"
          >
            <Text className="text-center text-white font-semibold">
              Продолжить ({selectedModels.length})
            </Text>
          </TouchableHighlight>
        </View>
      )}
    </>
  );
};
