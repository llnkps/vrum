import { useRouter } from 'expo-router';
import { FC, useEffect, useState } from 'react';
import { StatusBar, Text, TouchableHighlight, View } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { HeaderSearchBar } from '@/components/global/header/HeaderSearchBar/HeaderSearchBar';
import { useSimpleAutoModelByBrandApi } from '@/hooks/api/useSimpleAutoModelByBrandApi';
import { useSimpleAutoFormContext } from '@/modules/advertisement/simple-auto/SimpleAutoFormProvider';
import { GetAppSimpleautocontextPresentationModelgetcollectionGetcollectionbyfilters200ResponseInner } from '@/openapi/client';

const STATUSBAR_HEIGHT = StatusBar.currentHeight ?? 24;

export default function ModalModelItem() {
  const [searchValue, setSearchValue] = useState('');

  const { selectedBrand } = useSimpleAutoFormContext();

  const { data, isLoading } = useSimpleAutoModelByBrandApi(
    selectedBrand?.id ? selectedBrand.id.toString() : ''
  );
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
      <View className="flex-1 items-center justify-center">
        <Text className="text-font dark:text-font-dark">Loading...</Text>
      </View>
    );
  }

  return (
    <>
      <SafeAreaView className="flex-1 gap-y-4 px-3">
        <HeaderSearchBar
          title={selectedBrand?.name || ''}
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
  const { setSelectedModel, setSelectedGeneration } = useSimpleAutoFormContext();

  const handleSelectModel = (
    item: GetAppSimpleautocontextPresentationModelgetcollectionGetcollectionbyfilters200ResponseInner
  ) => {
    setSelectedModel(item);
    setSelectedGeneration(null);
    router.dismiss();
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
          renderItem={({ item }) => (
            <TouchableHighlight
              onPress={() => handleSelectModel(item)}
              className={'border-b border-border p-4 last:border-0 dark:border-border-dark'}
            >
              <View className="flex-row gap-x-4">
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
