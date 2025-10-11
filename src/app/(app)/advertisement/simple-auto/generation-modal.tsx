import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { FC, useEffect, useState } from "react";
import { StatusBar, Text, TouchableHighlight, View } from "react-native";
import type { SharedValue } from "react-native-reanimated";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import { HeaderSearchBar } from "@/components/global/HeaderSearchBar";
import { useGenerationsByModelApi } from "@/hooks/useGenerationsByModelApi";
import { useSimpleAutoFormContext } from "@/modules/advertisement/simple-auto/SimpleAutoFormProvider";
import {
  DefaultConfig,
  GetAppSimpleautocontextPresentationGenerationgetcollectionGetgenerations200ResponseInner,
} from "@/openapi/client";

const STATUSBAR_HEIGHT = StatusBar.currentHeight ?? 24;

export default function GenerationModal() {
  const router = useRouter();
  const { selectedBrand, selectedModel } = useSimpleAutoFormContext();
  const [searchValue, setSearchValue] = useState("");

  const { data: generations, isLoading } = useGenerationsByModelApi(
    selectedBrand?.id?.toString() || null,
    selectedModel?.id?.toString() || null
  );

  const [filteredGenerations, setFilteredGenerations] = useState(
    generations || []
  );

  const scrollY = useSharedValue(0);
  const isScrolling = useSharedValue(false);

  useEffect(() => {
    if (generations) {
      setFilteredGenerations(generations);
    }
  }, [generations]);

  // Filter generations based on search value
  useEffect(() => {
    if (!generations) return;

    const filtered = generations.filter(
      (generation) =>
        String(generation.generation)
          ?.toLowerCase()
          .includes(searchValue.toLowerCase()) || false
    );
    setFilteredGenerations(filtered);
  }, [searchValue, generations]);

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
          title={selectedModel?.name || ""}
          scrollY={scrollY}
          showSearch={false}
          onClose={() => router.dismiss()}
        />

        <GenerationList
          generations={filteredGenerations}
          scrollY={scrollY}
          isScrolling={isScrolling}
        />
      </SafeAreaView>
    </>
  );
}

type GenerationListProps = {
  generations: GetAppSimpleautocontextPresentationGenerationgetcollectionGetgenerations200ResponseInner[];
  scrollY: SharedValue<number>;
  isScrolling: SharedValue<boolean>;
};

const GenerationList: FC<GenerationListProps> = ({
  generations,
  scrollY,
  isScrolling,
}) => {
  const router = useRouter();
  const { setSelectedGeneration } = useSimpleAutoFormContext();

  const handleSelectGeneration = (
    generation: GetAppSimpleautocontextPresentationGenerationgetcollectionGetgenerations200ResponseInner
  ) => {
    setSelectedGeneration(generation);
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
    <View className="mt-2">
      <Animated.FlatList
        data={generations}
        keyExtractor={(item) => `${item.generation}`}
        scrollEventThrottle={16}
        onScroll={scrollHandler}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 120 + STATUSBAR_HEIGHT + 100,
        }}
        renderItem={({ item }) => (
          <>
            {item.modifications?.map((modification) => (
              <TouchableHighlight
                key={`${item.generation}_${modification.restyling}_${modification.yearStart}`}
                onPress={() => handleSelectGeneration(item)}
                className={
                  "p-4 border-b border-border dark:border-border-dark last:border-0"
                }
              >
                <View className="flex-col">
                  <View className="flex-col gap-y-2">
                    <View className="flex-col gap-y-1">
                      <Text className="text-base text-font dark:text-font-dark">
                        {`${modification.yearStart} - ${
                          modification.yearEnd || "н.в."
                        }`}
                        {modification.restyling > 0
                          ? ` (рестайлинг ${modification.restyling})`
                          : ""}
                      </Text>
                    </View>
                    <View className="flex-col gap-y-1 border-l-2 border-border dark:border-border-dark pl-4 mb-2">
                      <Text className="text-2xl font-bold text-font dark:text-font-dark">
                        {`${item.generation} поколение`}
                      </Text>
                      <View className="flex-row flex-wrap gap-2">
                        {modification.frames?.map((frame, frameIndex) => (
                          <Text
                            key={frameIndex}
                            className="text-sm bg-background-input dark:bg-background-input-dark px-2 py-1 rounded-md text-font dark:text-font-dark"
                          >
                            {frame}
                          </Text>
                        ))}
                      </View>
                    </View>
                  </View>

                  {modification.images && modification.images.length > 0 && (
                    <Image
                      source={{
                        uri:
                          DefaultConfig.basePath + "/" + modification.images[0],
                      }}
                      style={{ width: 200, height: 120, marginTop: 8 }}
                      contentFit="contain"
                    />
                  )}
                </View>
              </TouchableHighlight>
            ))}
          </>
        )}
        initialNumToRender={18}
        windowSize={10}
        maxToRenderPerBatch={20}
        updateCellsBatchingPeriod={50}
        removeClippedSubviews={true}
      />
    </View>
  );
};
