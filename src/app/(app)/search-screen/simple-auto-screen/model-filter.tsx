import { useFocusEffect, useRouter } from 'expo-router';
import React, { FC, useCallback, useEffect, useRef, useState, memo } from 'react';
import { RefreshControl, ScrollView, StatusBar, View, VirtualizedList } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CheckboxRectButton } from '@/components/global/CheckboxRectButton/CheckboxRectButton';
import FilterBadge from '@/components/global/FilterBadge';
import { HeaderSearchBar } from '@/components/global/header/HeaderSearchBar/HeaderSearchBar';
import { useSimpleAutoModelByBrandApi } from '@/hooks/api/useSimpleAutoModelByBrandApi';
import { ShowAdvertisementButton } from '@/modules/search-screen/simple-auto-tab/ShowAdvertisementButton';
import { SimpleAutoModel } from '@/openapi/client';
import { useSimpleAutoFilterStore } from '@/state/search-screen/useSimpleAutoFilterStore';
import { LoaderIndicator } from '@/components/global/LoaderIndicator';

const STATUSBAR_HEIGHT = StatusBar.currentHeight ?? 24;

export default function ModelFilter() {
  const router = useRouter();

  const [searchValue, setSearchValue] = useState('');

  const { currentBrand, selectedModelsByBrand } = useSimpleAutoFilterStore();

  // Local state for selected models
  const [localSelectedModels, setLocalSelectedModels] = useState<SimpleAutoModel[]>([]);

  const { data, isPending, refetch } = useSimpleAutoModelByBrandApi(currentBrand ? currentBrand.id.toString() : undefined);
  const [filteredModels, setFilteredModels] = useState<SimpleAutoModel[]>([]);

  const scrollY = useSharedValue(0);
  const isScrolling = useSharedValue(false);

  const lastBrandRef = useRef(currentBrand);
  const lastSelectedRef = useRef<SimpleAutoModel[]>([]);

  useEffect(() => {
    lastBrandRef.current = currentBrand;
    if (currentBrand && selectedModelsByBrand[currentBrand.id]) {
      setLocalSelectedModels(selectedModelsByBrand[currentBrand.id]);
    } else {
      setLocalSelectedModels([]);
    }
  }, [currentBrand]);

  useEffect(() => {
    lastSelectedRef.current = localSelectedModels;
  }, [localSelectedModels]);

  // Sync filteredModels with data when data loads
  useEffect(() => {
    if (data) {
      setFilteredModels(data);
    }
  }, [data]);

  useEffect(() => {
    if (!currentBrand) {
      router.back(); // Go back if no brand is selected
    }
  }, [currentBrand, router]);

  // Save local state of models to global store when component unmounts
  useFocusEffect(
    useCallback(() => {
      return () => {
        const brand = lastBrandRef.current;
        if (!brand) return;

        const storeState = useSimpleAutoFilterStore.getState();
        const existingModels = storeState.selectedModelsByBrand[brand.id] || [];
        existingModels.forEach(model => {
          storeState.removeSelectedModel(model.id!);
        });

        if (lastSelectedRef.current.length > 0) {
          storeState.addSelectedModel(lastSelectedRef.current);
        }
      };
    }, [])
  );

  const handleRemoveModel = useCallback((modelId: number) => {
    setLocalSelectedModels(prev => prev.filter(m => m.id !== modelId));
  }, []);

  if (isPending) {
    return (
      <View className="flex-1 items-center justify-center">
        <LoaderIndicator />
      </View>
    );
  }

  if (!currentBrand) {
    return null;
  }

  return (
    <>
      <SafeAreaView className="flex-1 gap-y-4 px-3">
        <HeaderSearchBar
          title={currentBrand.name}
          scrollY={scrollY}
          showSearch={true}
          searchValue={searchValue}
          onSearch={value => {
            setSearchValue(value);
            if (data) {
              const searchValueLowerCase = value.toLowerCase();
              setFilteredModels(
                data.filter(i => {
                  if (!i.name) return false;
                  return i.name.toLowerCase().includes(searchValueLowerCase);
                })
              );
            }
          }}
          searchPlaceholder="Марка или модель"
        />

        <SelectedModelsBadges localSelectedModels={localSelectedModels} onRemoveModel={handleRemoveModel} />

        <ModelList
          models={filteredModels}
          scrollY={scrollY}
          isScrolling={isScrolling}
          localSelectedModels={localSelectedModels}
          onModelSelect={setLocalSelectedModels}
          refreshing={isPending}
          onRefresh={refetch}
        />

        {/* Fixed Button */}
        <View className="absolute bottom-2 left-0 right-0 px-3 pb-6">
          <ShowAdvertisementButton />
        </View>
      </SafeAreaView>
    </>
  );
}

type SelectedModelsBadgesProps = {
  localSelectedModels: SimpleAutoModel[];
  onRemoveModel: (modelId: number) => void;
};

const SelectedModelsBadges: FC<SelectedModelsBadgesProps> = memo(({ localSelectedModels, onRemoveModel }) => {
  if (localSelectedModels.length === 0) return null;

  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mt-2"
        style={{ height: 50 }}
        contentContainerStyle={{ alignItems: 'center', paddingVertical: 8 }}
      >
        {localSelectedModels.map(model => (
          <View key={model.id} className="mr-2 self-start">
            <FilterBadge label={model.name || ''} onRemove={() => onRemoveModel(model.id!)} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
});
SelectedModelsBadges.displayName = 'SelectedModelsBadges';

type ModelItemProps = {
  model: SimpleAutoModel;
  isSelected: boolean;
  onPress: () => void;
};

const ModelItem: FC<ModelItemProps> = memo(({ model, isSelected, onPress }) => {
  return <CheckboxRectButton value={isSelected} label={model.name || ''} onPress={onPress} />;
});
ModelItem.displayName = 'ModelItem';

type props = {
  models: SimpleAutoModel[];
  scrollY: any;
  isScrolling: any;
  localSelectedModels: SimpleAutoModel[];
  onModelSelect: (models: SimpleAutoModel[]) => void;
  refreshing: boolean;
  onRefresh: () => void;
};

const AnimatedVirtualizedList = Animated.createAnimatedComponent(VirtualizedList);

const ModelList: FC<props> = memo(({ models, scrollY, isScrolling, localSelectedModels, onModelSelect, refreshing, onRefresh }) => {
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

  const handleSelectModel = useCallback(
    (item: SimpleAutoModel) => {
      const isSelected = localSelectedModels.some(m => m.id === item.id);

      if (isSelected) {
        // Remove model
        onModelSelect(localSelectedModels.filter(m => m.id !== item.id));
      } else {
        // Add model
        onModelSelect([...localSelectedModels, item]);
      }
    },
    [localSelectedModels, onModelSelect]
  );

  const renderItem = useCallback(
    ({ item }: { item: unknown }) => {
      const model = item as SimpleAutoModel;
      const isSelected = localSelectedModels.some(m => m.id === model.id);
      return <ModelItem model={model} isSelected={isSelected} onPress={() => handleSelectModel(model)} />;
    },
    [localSelectedModels, handleSelectModel]
  );

  return (
    <>
      <View className="mt-2">
        <AnimatedVirtualizedList
          data={models}
          getItemCount={d => d.length}
          getItem={(d, index) => d[index]}
          keyExtractor={(item) => `${(item as SimpleAutoModel).id}`}
          onScroll={scrollHandler}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 120 + STATUSBAR_HEIGHT, // Extra padding for fixed button
          }}
          renderItem={renderItem}
          initialNumToRender={13}
          scrollEventThrottle={16}
          windowSize={5}
          maxToRenderPerBatch={10}
          updateCellsBatchingPeriod={50}
          removeClippedSubviews={true}
          refreshing={refreshing}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      </View>
    </>
  );
});

ModelList.displayName = 'ModelList';
