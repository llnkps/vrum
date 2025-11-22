import { useFocusEffect, useRouter } from 'expo-router';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, ScrollView, StatusBar, View } from 'react-native';
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

  const { data, isLoading } = useSimpleAutoModelByBrandApi(currentBrand ? currentBrand.id.toString() : undefined);
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

  if (isLoading) {
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

        {(localSelectedModels.length || 0) > 0 && (
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
                  <FilterBadge label={model.name || ''} onRemove={() => setLocalSelectedModels(prev => prev.filter(m => m.id !== model.id))} />
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        <ModelList
          models={filteredModels}
          scrollY={scrollY}
          isScrolling={isScrolling}
          localSelectedModels={localSelectedModels}
          onModelSelect={setLocalSelectedModels}
        />

        {/* Fixed Button */}
        <View className="absolute bottom-2 left-0 right-0 px-3 pb-6">
          <ShowAdvertisementButton />
        </View>
      </SafeAreaView>
    </>
  );
}

type props = {
  models: SimpleAutoModel[];
  scrollY: any;
  isScrolling: any;
  localSelectedModels: SimpleAutoModel[];
  onModelSelect: (models: SimpleAutoModel[]) => void;
};

const ModelList: FC<props> = ({ models, scrollY, isScrolling, localSelectedModels, onModelSelect }) => {
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

  return (
    <>
      <View className="mt-2">
        <Animated.FlatList
          data={models}
          keyExtractor={item => `${item.id}`}
          scrollEventThrottle={16}
          onScroll={scrollHandler}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 120 + STATUSBAR_HEIGHT + 100,
          }}
          renderItem={({ item }) => {
            const isSelected = localSelectedModels.some(m => m.id === item.id);
            return <CheckboxRectButton value={isSelected} label={item.name || ''} onPress={() => handleSelectModel(item)} />;
          }}
          initialNumToRender={18}
          windowSize={10}
          maxToRenderPerBatch={20}
          updateCellsBatchingPeriod={50}
          removeClippedSubviews={true}
        />
      </View>
    </>
  );
};
