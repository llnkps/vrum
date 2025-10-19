import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { FC, useEffect, useState } from 'react';
import { ScrollView, StatusBar, Text, TouchableHighlight, View } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import FilterBadge from '@/components/global/FilterBadge';
import { HeaderSearchBar } from '@/components/global/header/HeaderSearchBar/HeaderSearchBar';
import { LoaderIndicator } from '@/components/global/LoaderIndicator';
import { CustomRectButton } from '@/components/ui/button';
import { useSimpleAutoBrandApi } from '@/hooks/api/useSimpleAutoBrandApi';
import { DefaultConfig, SimpleAutoBrand, SimpleAutoModel } from '@/openapi/client';
import { selectSelectedBrands, useAutoSelectStore } from '@/state/search-screen/useAutoSelectStore';

const STATUSBAR_HEIGHT = StatusBar.currentHeight ?? 24;

export default function BrandAutoFilter() {
  const router = useRouter();
  const searchParams = useLocalSearchParams();

  const store = useAutoSelectStore();
  const selectedBrands = selectSelectedBrands(store);
  const { removeSelectedBrand, setCurrentBrand, selectedModelsByBrand, addSelectedBrand } = store;

  const [searchValue, setSearchValue] = useState('');
  const { data, isLoading } = useSimpleAutoBrandApi();
  const [filteredBrands, setFilteredBrands] = useState<SimpleAutoBrand[]>([]);

  const scrollY = useSharedValue(0);
  const isScrolling = useSharedValue(false);

  useEffect(() => {
    if (data) {
      setFilteredBrands(data);
    }
  }, [data]);

  if (isLoading) {
    return <LoaderIndicator />;
  }

  return (
    <>
      <SafeAreaView className="flex-1 gap-y-4 px-3">
        <HeaderSearchBar
          title="Выберите марку"
          scrollY={scrollY}
          showSearch={true}
          searchValue={searchValue}
          onSearch={value => {
            setSearchValue(value);
            if (data) {
              const searchValueLowerCase = value.toLowerCase();
              setFilteredBrands(
                data.filter(i => {
                  if (!i.name) return false;
                  return i.name.toLowerCase().includes(searchValueLowerCase);
                })
              );
            }
          }}
          searchPlaceholder="Поиск марки"
        />

        {selectedBrands.length > 0 && (
          <View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mt-2"
              style={{ height: 50 }}
              contentContainerStyle={{ alignItems: 'center', paddingVertical: 8 }}
            >
              {selectedBrands.map(brand => (
                // <Animated.View key={brand.id} entering={SlideInRight.duration(300)} className="self-start mr-2">
                <View key={brand.id} className="mr-2 self-start">
                  <FilterBadge label={brand.name || ''} onRemove={() => removeSelectedBrand(brand.id!)} />
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        <BrandAutoList
          brands={filteredBrands}
          scrollY={scrollY}
          isScrolling={isScrolling}
          setCurrentBrand={setCurrentBrand}
          addSelectedBrand={addSelectedBrand}
          selectedModelsByBrand={selectedModelsByBrand}
          searchParams={searchParams}
        />

        {/* Fixed Button */}
        <View className="absolute bottom-2 left-0 right-0 px-3 pb-6">
          <CustomRectButton
            onPress={() => {
              if (searchParams.from === 'settings') {
                router.replace('/(app)/search-screen/simple-auto-screen/(modals)/settings');
              } else {
                router.replace('/(app)/search-screen/simple-auto-screen/(modals)/simple-auto-modal');
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
  brands: SimpleAutoBrand[];
  scrollY: any;
  isScrolling: any;
  setCurrentBrand: (brand: SimpleAutoBrand | null) => void;
  addSelectedBrand: (brand: SimpleAutoBrand) => void;
  selectedModelsByBrand: Record<number, SimpleAutoModel[]>;
  searchParams: any;
};

const BrandAutoList: FC<props> = ({ brands, scrollY, isScrolling, setCurrentBrand, addSelectedBrand, selectedModelsByBrand, searchParams }) => {
  const router = useRouter();

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

  const handleSelectBrand = (brand: SimpleAutoBrand) => {
    addSelectedBrand(brand);
    setCurrentBrand(brand);
    const fromParam = searchParams.from === 'settings' ? '?from=settings' : '';
    router.push(`/(app)/search-screen/simple-auto-screen/(modals)/model-filter${fromParam}`);
  };

  return (
    <>
      <View className="mt-2">
        <Animated.FlatList
          data={brands}
          keyExtractor={item => `${item.id}`}
          scrollEventThrottle={16}
          onScroll={scrollHandler}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 120 + STATUSBAR_HEIGHT + 100 + 80, // Extra padding for fixed button
          }}
          renderItem={({ item }) => {
            const selectedCount = selectedModelsByBrand[item.id!]?.length || 0;
            return (
              <TouchableHighlight
                onPress={() => handleSelectBrand(item)}
                className={'border-b border-border p-4 last:border-0 dark:border-border-dark'}
              >
                <View className="flex-row gap-x-4">
                  <Image
                    source={{
                      uri: DefaultConfig.basePath + '/' + item.imageFilePath,
                    }}
                    style={{ width: 25, height: 25 }}
                    contentFit="cover"
                  />
                  <View className="flex-1">
                    <Text className="text-xl text-font dark:text-font-dark">{item.name}</Text>
                    {selectedCount > 0 && <Text className="text-sm text-font dark:text-font-dark">Выбрано моделей: {selectedCount}</Text>}
                  </View>
                </View>
              </TouchableHighlight>
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
