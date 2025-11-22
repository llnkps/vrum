import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { FC, memo, useCallback, useEffect, useState } from 'react';
import { ScrollView, StatusBar, Text, View, RefreshControl, VirtualizedList } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import FilterBadge from '@/components/global/FilterBadge';
import { HeaderSearchBar } from '@/components/global/header/HeaderSearchBar/HeaderSearchBar';
import { LoaderIndicator } from '@/components/global/LoaderIndicator';
import { CustomRectButton } from '@/components/ui/button';
import { useSimpleAutoBrandApi } from '@/hooks/api/useSimpleAutoBrandApi';
import { DefaultConfig, SimpleAutoBrand } from '@/openapi/client';
import { selectSelectedBrands, useSimpleAutoFilterStore } from '@/state/search-screen/useSimpleAutoFilterStore';
import { useTheme } from '@react-navigation/native';

const STATUSBAR_HEIGHT = StatusBar.currentHeight ?? 24;

export const unstable_settings = {
  // This tells Expo Router to unmount the screen when it loses focus
  unmountOnBlur: true,
};

export default function BrandAutoFilter() {
  const router = useRouter();
  const searchParams = useLocalSearchParams();

  const store = useSimpleAutoFilterStore();
  const selectedBrands = selectSelectedBrands(store);
  const { removeSelectedBrand } = store;

  const [searchValue, setSearchValue] = useState('');

  const { data, isPending, refetch } = useSimpleAutoBrandApi();
  const [filteredBrands, setFilteredBrands] = useState<SimpleAutoBrand[]>([]);

  const scrollY = useSharedValue(0);
  const isScrolling = useSharedValue(false);

  useEffect(() => {
    if (data) {
      setFilteredBrands(data);
    }
  }, [data]);

  // useEffect(() => {
  //   router.prefetch(`/(app)/search-screen/simple-auto-screen/model-filter`);
  // }, [router])

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

        <BrandAutoList brands={filteredBrands} scrollY={scrollY} isScrolling={isScrolling} onRefresh={refetch} refreshing={isPending} />

        {/* Fixed Button */}
        <View className="absolute bottom-2 left-0 right-0 px-3 pb-6">
          <CustomRectButton
            onPress={() => {
              if (searchParams.from === 'settings') {
                router.replace('/(app)/search-screen/simple-auto-screen/settings');
              } else {
                router.replace('/(app)/search-screen/simple-auto-screen/simple-auto-modal');
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
  onRefresh: () => void;
  refreshing: boolean;
};

const AnimatedVirtualizedList = Animated.createAnimatedComponent(VirtualizedList);

const BrandAutoList: FC<props> = ({ brands, scrollY, isScrolling, onRefresh, refreshing }) => {
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
        <AnimatedVirtualizedList
          data={brands}
          
          getItemCount={d => d.length}
          getItem={(d, index) => d[index]}

          keyExtractor={item => `${item.id}`}
          onScroll={scrollHandler}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 120 + STATUSBAR_HEIGHT, // Extra padding for fixed button
          }}
          renderItem={({ item }) => {
            return <ListItem item={item as SimpleAutoBrand} />;
          }}
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
};

interface ListItemProps {
  item: SimpleAutoBrand;
}

const ListItem = memo<ListItemProps>(({ item }) => {
  const theme = useTheme();
  const searchParams = useLocalSearchParams();
  const router = useRouter();

  const { setCurrentBrand, selectedModelsByBrand } = useSimpleAutoFilterStore();
  const selectedCount = selectedModelsByBrand[item.id!]?.length || 0;
  const handleSelectBrand = useCallback((brand: SimpleAutoBrand) => {
    setCurrentBrand(brand);

    const fromParam = searchParams.from === 'settings' ? '?from=settings' : '';
    router.navigate(`/(app)/search-screen/simple-auto-screen/model-filter${fromParam}`);
  }, [setCurrentBrand, searchParams.from, router]);

  return (
    <View style={{ borderBottomWidth: 1, borderBottomColor: theme.colors.border }}>
      <CustomRectButton onPress={() => handleSelectBrand(item)} appearance="subtle">
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
      </CustomRectButton>
    </View>
  );
});

ListItem.displayName = 'ListItem';
