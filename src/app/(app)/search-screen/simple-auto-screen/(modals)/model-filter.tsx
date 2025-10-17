import { useRouter, useLocalSearchParams } from 'expo-router';
import { FC, useEffect, useState } from 'react';
import { ScrollView, StatusBar, Text, TouchableHighlight, View } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CheckboxRectButton } from '@/components/global/CheckboxRectButton/CheckboxRectButton';
import FilterBadge from '@/components/global/FilterBadge';
import { HeaderSearchBar } from '@/components/global/header/HeaderSearchBar/HeaderSearchBar';
import { CustomRectButton } from '@/components/ui/button';
import { useSimpleAutoModelByBrandApi } from '@/hooks/api/useSimpleAutoModelByBrandApi';
import { GetAppSimpleautocontextPresentationModelgetcollectionGetcollectionbyfilters200ResponseInner } from '@/openapi/client';
import { useAutoSelectStore } from '@/state/search-screen/useAutoSelectStore';

// const STATUSBAR_HEIGHT = StatusBar.currentHeight ?? 24;

const STATUSBAR_HEIGHT = StatusBar.currentHeight ?? 24;

export default function ModelFilter() {
  const router = useRouter();
  const searchParams = useLocalSearchParams();

  const [searchValue, setSearchValue] = useState('');
  const { removeSelectedModel, currentBrand, selectedModelsByBrand } = useAutoSelectStore();
  const selectedBrand = currentBrand;

  const { data, isLoading } = useSimpleAutoModelByBrandApi(
    selectedBrand?.id ? selectedBrand.id.toString() : ''
  );
  const [filteredModels, setFilteredModels] = useState<
    GetAppSimpleautocontextPresentationModelgetcollectionGetcollectionbyfilters200ResponseInner[]
  >([]);
  console.log(data, isLoading);
  const scrollY = useSharedValue(0);
  const isScrolling = useSharedValue(false);

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

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-font dark:text-font-dark">Loading...</Text>
      </View>
    );
  }

  return (
    <>
      <SafeAreaView className="flex-1 gap-y-4 px-3">
        <HeaderSearchBar
          title={selectedBrand?.name || 'Выберите модель'}
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

        {(selectedModelsByBrand[currentBrand?.id!]?.length || 0) > 0 && (
          <View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mt-2"
              style={{ height: 50 }}
              contentContainerStyle={{ alignItems: 'center', paddingVertical: 8 }}
            >
              {selectedModelsByBrand[currentBrand?.id!]?.map(model => (
                <View key={model.id} className="mr-2 self-start">
                  <FilterBadge
                    label={model.name || ''}
                    onRemove={() => removeSelectedModel(model.id!)}
                  />
                </View>
              ))}
            </ScrollView>
          </View>
        )}
        {(selectedModelsByBrand[currentBrand?.id!]?.length || 0) === 0 && (
          <View style={{ height: 50 }}></View>
        )}

        <ModelList
          models={filteredModels}
          scrollY={scrollY}
          isScrolling={isScrolling}
          selectedModelsByBrand={selectedModelsByBrand}
        />

        {/* Fixed Button */}
        <View className="absolute bottom-2 left-0 right-0 px-3 pb-6">
          <CustomRectButton
            onPress={() => {
              if (searchParams.from === 'settings') {
                router.replace('/(app)/search-screen/simple-auto-screen/modals/settings');
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

type props = {
  models: GetAppSimpleautocontextPresentationModelgetcollectionGetcollectionbyfilters200ResponseInner[];
  scrollY: any;
  isScrolling: any;
  selectedModelsByBrand: Record<
    number,
    GetAppSimpleautocontextPresentationModelgetcollectionGetcollectionbyfilters200ResponseInner[]
  >;
};

const ModelList: FC<props> = ({ models, scrollY, isScrolling, selectedModelsByBrand }) => {
  const router = useRouter();
  const { addSelectedModel, removeSelectedModel, currentBrand } = useAutoSelectStore();

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

  const handleSelectModel = (
    item: GetAppSimpleautocontextPresentationModelgetcollectionGetcollectionbyfilters200ResponseInner
  ) => {
    console.log('================');
    console.log(item);
    const isSelected =
      selectedModelsByBrand[currentBrand?.id!]?.some(m => m.id === item.id) || false;
    console.log(isSelected);
    if (isSelected) {
      removeSelectedModel(item.id!);
    } else {
      addSelectedModel(item);
    }
  };

  const handleContinue = () => {
    router.dismiss(); // Go back to index.tsx
  };

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
            const isSelected =
              selectedModelsByBrand[currentBrand?.id!]?.some(m => m.id === item.id) || false;
            return (
              <CheckboxRectButton
                value={isSelected}
                label={item.name || ''}
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
    </>
  );
};
