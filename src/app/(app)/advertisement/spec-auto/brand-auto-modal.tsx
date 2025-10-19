import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { FC, useEffect, useState } from 'react';
import { StatusBar, Text, TouchableHighlight, View } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { HeaderSearchBar } from '@/components/global/header/HeaderSearchBar/HeaderSearchBar';
import { useSimpleAutoBrandApi } from '@/hooks/api/useSimpleAutoBrandApi';
import { useSimpleAutoFormContext } from '@/modules/advertisement/simple-auto/SimpleAutoFormProvider';
import { DefaultConfig, SimpleAutoBrand } from '@/openapi/client';

const STATUSBAR_HEIGHT = StatusBar.currentHeight ?? 24;

export default function ModelItemScreenFilterModal() {
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

        <ModelItemScreenFilterModalBlock brands={filteredBrands} scrollY={scrollY} isScrolling={isScrolling} />
      </SafeAreaView>
    </>
  );
}

type props = {
  brands: SimpleAutoBrand[];
  scrollY: any;
  isScrolling: any;
};

const ModelItemScreenFilterModalBlock: FC<props> = ({ brands, scrollY, isScrolling }) => {
  const router = useRouter();
  const { setSelectedBrand, setSelectedModel, setSelectedGeneration } = useSimpleAutoFormContext();

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

  const handleAddBrand = (brand: SimpleAutoBrand) => {
    setSelectedBrand(brand);
    setSelectedModel(null);
    setSelectedGeneration(null);
    router.dismiss();
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
            paddingBottom: 120 + STATUSBAR_HEIGHT + 100,
          }}
          renderItem={({ item }) => (
            <TouchableHighlight onPress={() => handleAddBrand(item)} className={'border-b border-border p-4 last:border-0 dark:border-border-dark'}>
              <View className="flex-row gap-x-4">
                <Image
                  source={{
                    uri: DefaultConfig.basePath + '/' + item.imageFilePath,
                  }}
                  style={{ width: 25, height: 25 }}
                  contentFit="cover"
                />
                <Text className="text-xl text-font dark:text-font-dark">{item.name}</Text>
              </View>
            </TouchableHighlight>
          )}
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
