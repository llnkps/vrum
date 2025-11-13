import { useLocalSearchParams, useRouter } from 'expo-router';
import { FC, useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StatusBar, Text, View } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CheckboxRectButton } from '@/components/global/CheckboxRectButton/CheckboxRectButton';
import { HeaderSearchBar } from '@/components/global/header/HeaderSearchBar/HeaderSearchBar';
import { CustomRectButton } from '@/components/ui/button';
import { useSimpleAutoModelByBrandApi } from '@/hooks/api/useSimpleAutoModelByBrandApi';
import { SimpleAutoModel } from '@/openapi/client';
import { useAutoSelectStore } from '@/state/search-screen/useAutoSelectStore';
import { useSearchedFiltersStore } from '@/state/search-screen/useSearchedFiltersStore';
import { BACKEND_FILTERS } from '@/shared/filter';
import FilterBadge from '@/components/global/FilterBadge';

// const STATUSBAR_HEIGHT = StatusBar.currentHeight ?? 24;

const STATUSBAR_HEIGHT = StatusBar.currentHeight ?? 24;

export default function ModelFilter() {
  const router = useRouter();
  const searchParams = useLocalSearchParams();

  const [searchValue, setSearchValue] = useState('');

  const { 
    currentBrand, 
    selectedModelsByBrand, 
    removeSelectedModel,
    selectedBrandsMap,
    selectedRegions,
    onlyUnsold,
    onlyWithPhotos,
    transmission,
    fuelType,
    drivetrain,
    bodyType,
    color,
    condition,
    documentsOk,
    numberOfOwners,
    seller,
    tradeAllow,
    priceRange,
    yearRange,
    engineCapacityRange,
    powerRange,
    mileageRange
  } = useAutoSelectStore();

  const { addSearchedItem } = useSearchedFiltersStore();

  const { data, isLoading } = useSimpleAutoModelByBrandApi(currentBrand ? currentBrand.id.toString() : undefined);
  const [filteredModels, setFilteredModels] = useState<SimpleAutoModel[]>([]);

  const scrollY = useSharedValue(0);
  const isScrolling = useSharedValue(false);

  // Function to collect current filter data and save to searched filters
  const saveCurrentFiltersToSearched = () => {
    const filters: Record<string, any> = {};

    // Add selected brands
    const selectedBrands = Object.values(selectedBrandsMap);
    if (selectedBrands.length > 0) {
      filters[BACKEND_FILTERS.BRAND] = selectedBrands[0].name; // For simplicity, take first brand
    }

    // Add selected models for current brand
    const selectedModels = selectedModelsByBrand[currentBrand?.id || 0] || [];
    if (selectedModels.length > 0) {
      filters[BACKEND_FILTERS.MODEL] = selectedModels.map(m => m.name).join(', ');
    }

    // Add other filters
    if (yearRange) filters[BACKEND_FILTERS.YEAR] = yearRange;
    if (priceRange) filters[BACKEND_FILTERS.PRICE] = priceRange;
    if (transmission?.length) filters[BACKEND_FILTERS.TRANSMISSION] = transmission.map(t => t.value);
    if (fuelType?.length) filters[BACKEND_FILTERS.FUEL_TYPE] = fuelType.map(f => f.value);
    if (drivetrain?.length) filters[BACKEND_FILTERS.DRIVETRAIN_TYPE] = drivetrain.map(d => d.value);
    if (bodyType?.length) filters[BACKEND_FILTERS.FRAME_TYPE] = bodyType.map(b => b.value);
    if (color?.length) filters[BACKEND_FILTERS.COLOR] = color.map(c => c.value);
    if (condition?.length) filters[BACKEND_FILTERS.CONDITION] = condition.map(c => c.value);
    if (documentsOk?.length) filters[BACKEND_FILTERS.DOCUMENT_TYPE] = documentsOk.map(d => d.value);
    if (numberOfOwners?.length) filters[BACKEND_FILTERS.NUMBER_OF_OWNER] = numberOfOwners.map(n => n.value);
    if (seller?.length) filters[BACKEND_FILTERS.SELLER] = seller.map(s => s.value);
    if (tradeAllow?.length) filters[BACKEND_FILTERS.TRADE_ALLOW] = tradeAllow[0]?.value === 'true';
    if (engineCapacityRange) filters[BACKEND_FILTERS.ENGINE_CAPACITY] = engineCapacityRange;
    if (powerRange) filters[BACKEND_FILTERS.POWER] = powerRange;
    if (mileageRange) filters[BACKEND_FILTERS.MILEAGE] = mileageRange;
    if (onlyUnsold) filters[BACKEND_FILTERS.UNSOLD] = true;
    if (onlyWithPhotos) filters[BACKEND_FILTERS.WITH_IMAGE] = true;

    // Only save if there are actual filters
    if (Object.keys(filters).length > 0) {
      addSearchedItem({ filters });
    }
  };

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
        <ActivityIndicator size="large" color="#0000ff" />
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

        {(selectedModelsByBrand[currentBrand.id]?.length || 0) > 0 && (
          <View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mt-2"
              style={{ height: 50 }}
              contentContainerStyle={{ alignItems: 'center', paddingVertical: 8 }}
            >
              {selectedModelsByBrand[currentBrand.id]?.map(model => (
                <View key={model.id} className="mr-2 self-start">
                  <FilterBadge label={model.name || ''} onRemove={() => removeSelectedModel(model.id!)} />
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        <ModelList models={filteredModels} scrollY={scrollY} isScrolling={isScrolling} />

        {/* Fixed Button */}
        <View className="absolute bottom-2 left-0 right-0 px-3 pb-6">
          <CustomRectButton
            onPress={() => {
              // Save current filters to searched filters store
              saveCurrentFiltersToSearched();

              // Navigate based on source
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
  models: SimpleAutoModel[];
  scrollY: any;
  isScrolling: any;
};

const ModelList: FC<props> = ({ models, scrollY, isScrolling }) => {
  const { addSelectedModel, removeSelectedModel, selectedModelsByBrand, currentBrand } = useAutoSelectStore();

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

  if (!currentBrand) {
    return null;
  }

  const handleSelectModel = (item: SimpleAutoModel) => {
    const isSelected = (selectedModelsByBrand[currentBrand.id] || []).some(m => m.id === item.id) || false;

    if (isSelected) {
      removeSelectedModel(item.id!);
    } else {
      addSelectedModel(item);
    }
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
            const isSelected = (selectedModelsByBrand[currentBrand.id] || []).some(m => m.id === item.id) || false;
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
