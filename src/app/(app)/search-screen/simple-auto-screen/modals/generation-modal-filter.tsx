import { useRouter } from "expo-router";
import { FC, useEffect, useState } from "react";
import { StatusBar, Text, TouchableHighlight, View } from "react-native";
import type { SharedValue } from "react-native-reanimated";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import { CheckboxRectButton } from "@/components/global/CheckboxRectButton/CheckboxRectButton";
import { HeaderSearchBar } from "@/components/global/HeaderSearchBar";
import { useGenerationsByModelApi } from "@/hooks/useGenerationsByModelApi";
import { GetAppSimpleautocontextPresentationGenerationgetcollectionGetgenerations200ResponseInner } from "@/openapi/client";
import { useAutoSelectStore } from "@/state/search-screen/useAutoSelectStore";

const STATUSBAR_HEIGHT = StatusBar.currentHeight ?? 24;

export default function GenerationModal() {
  const router = useRouter();
  const { selectedBrands, selectedModels } = useAutoSelectStore();
  const selectedBrand = selectedBrands[0];

  const { data: generations, isLoading } = useGenerationsByModelApi(
    selectedBrand?.id?.toString() || null,
    selectedModels?.[0]?.id?.toString() || null // Use first selected model for now
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
          title="Выберите поколение"
          scrollY={scrollY}
          showSearch={false}
          onClose={() => router.dismiss()}
        />

        {/* Selected Models Display */}
        {selectedModels.length > 0 && (
          <View className="p-4 bg-surface dark:bg-surface-dark rounded-2xl">
            <Text className="text-sm font-semibold text-font-subtlest dark:text-font-subtlest-dark mb-2">
              Выбранные модели:
            </Text>
            <Text className="text-font dark:text-font-dark">
              {selectedModels.map(m => m.name).join(", ")}
            </Text>
          </View>
        )}

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
  const { selectedGenerations, addSelectedGeneration } = useAutoSelectStore();

  const handleSelectGeneration = (generation: GetAppSimpleautocontextPresentationGenerationgetcollectionGetgenerations200ResponseInner) => {
    addSelectedGeneration(generation);
  };

  const handleContinue = () => {
    router.dismiss(); // Go back to index.tsx
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
        renderItem={({ item }) => {
          const isSelected = selectedGenerations.some((g) => g.id === item.id);
          return (
            <CheckboxRectButton
              value={isSelected}
              label={`${item.generation} поколение`}
              onPress={() => handleSelectGeneration(item)}
            />
          );
        }}
        initialNumToRender={18}
        windowSize={10}
        maxToRenderPerBatch={20}
        updateCellsBatchingPeriod={50}
        removeClippedSubviews={true}
      />

      {selectedGenerations.length > 0 && (
        <View className="mt-4">
          <TouchableHighlight
            onPress={handleContinue}
            className="bg-brand px-4 py-3 rounded-2xl"
            underlayColor="#123263"
          >
            <Text className="text-center text-white font-semibold">
              Продолжить ({selectedGenerations.length})
            </Text>
          </TouchableHighlight>
        </View>
      )}
    </View>
  );
};
