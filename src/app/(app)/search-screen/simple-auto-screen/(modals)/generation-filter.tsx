import { useRouter, useLocalSearchParams } from 'expo-router';
import { FC, useEffect, useState } from 'react';
import { StatusBar, Text, TouchableHighlight, View } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CheckboxRectButton } from '@/components/global/CheckboxRectButton/CheckboxRectButton';
import { HeaderSearchBar } from '@/components/global/header/HeaderSearchBar';
import { useGenerationsByModelApi } from '@/hooks/api/useGenerationsByModelApi';
import { SimpleAutoGeneration } from '@/openapi/client';
import { useAutoSelectStore, selectSelectedBrands, selectSelectedModels, selectSelectedGenerations } from '@/state/search-screen/useAutoSelectStore';
import { CustomRectButton } from '@/components/ui/button/CustomRectButton';

const STATUSBAR_HEIGHT = StatusBar.currentHeight ?? 24;

export default function GenerationFilter() {
  const router = useRouter();
  const searchParams = useLocalSearchParams();
  const store = useAutoSelectStore();
  const selectedBrands = selectSelectedBrands(store);
  const selectedModels = selectSelectedModels(store);
  const selectedBrand = selectedBrands[0];

  const { data: generations, isLoading } = useGenerationsByModelApi(
    selectedBrand?.id?.toString() || null,
    selectedModels?.[0]?.id?.toString() || null // Use first selected model for now
  );

  const [filteredGenerations, setFilteredGenerations] = useState(generations || []);

  const scrollY = useSharedValue(0);
  const isScrolling = useSharedValue(false);

  useEffect(() => {
    if (generations) {
      setFilteredGenerations(generations);
    }
  }, [generations]);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-font dark:text-font-dark">Loading...</Text>
      </View>
    );
  }

  const handleShowAds = () => {
    router.dismiss();
  };

  return (
    <>
      <SafeAreaView className="flex-1 gap-y-4 px-3">
        <HeaderSearchBar title="Выберите поколение" scrollY={scrollY} showSearch={false} onClose={() => router.dismiss()} />

        {/* Selected Models Display */}
        {selectedModels.length > 0 && (
          <View className="rounded-2xl bg-surface p-4 dark:bg-surface-dark">
            <Text className="mb-2 text-sm font-semibold text-font-subtlest dark:text-font-subtlest-dark">Выбранные модели:</Text>
            <Text className="text-font dark:text-font-dark">{selectedModels.map(m => m.name).join(', ')}</Text>
          </View>
        )}
        {/* {(selectedModelsByBrand[currentBrand?.id!]?.length || 0) > 0 && (
          <View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mt-2"
              style={{ height: 50 }}
              contentContainerStyle={{ alignItems: "center", paddingVertical: 8 }}
            >
              {selectedModelsByBrand[currentBrand?.id!]?.map((model) => (
                <View key={model.id} className="self-start mr-2">
                  <FilterBadge label={model.name || ""} onRemove={() => removeSelectedModel(model.id!)} />
                </View>
              ))}
            </ScrollView>
          </View>
        )} */}

        <GenerationList generations={filteredGenerations} scrollY={scrollY} isScrolling={isScrolling} />

        {/* Fixed Button */}
        <View className="absolute bottom-2 left-0 right-0 px-3 pb-6">
          <CustomRectButton
            onPress={() => {
              if (searchParams.from === 'settings') {
                router.dismiss(); // Go back to settings
              } else {
                router.replace('/(app)/search-screen/simple-auto-screen/modals/simple-auto-modal');
              }
            }}
            appearance="primary"
          >
            <Text className="text-center font-semibold text-white">Показать объявления</Text>
          </CustomRectButton>
        </View>
      </SafeAreaView>
    </>
  );
}

type GenerationListProps = {
  generations: SimpleAutoGeneration[];
  scrollY: SharedValue<number>;
  isScrolling: SharedValue<boolean>;
};

const GenerationList: FC<GenerationListProps> = ({ generations, scrollY, isScrolling }) => {
  const store = useAutoSelectStore();
  const selectedGenerations = selectSelectedGenerations(store);
  const { addSelectedGeneration } = store;

  const handleSelectGeneration = (generation: SimpleAutoGeneration) => {
    addSelectedGeneration(generation);
  };

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
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
        keyExtractor={item => `${item.generation}`}
        scrollEventThrottle={16}
        onScroll={scrollHandler}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 120 + STATUSBAR_HEIGHT + 100,
        }}
        renderItem={({ item }) => {
          const isSelected = selectedGenerations.some(g => g.id === item.id);
          return <CheckboxRectButton value={isSelected} label={`${item.generation} поколение`} onPress={() => handleSelectGeneration(item)} />;
        }}
        initialNumToRender={18}
        windowSize={10}
        maxToRenderPerBatch={20}
        updateCellsBatchingPeriod={50}
        removeClippedSubviews={true}
      />
    </View>
  );
};
