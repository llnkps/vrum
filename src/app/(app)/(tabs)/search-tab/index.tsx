import React, { useMemo, useState } from "react";
import { ActivityIndicator, RefreshControl, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { HeaderBrand } from "@/components/global/Header";
import { useSimpleGetCollectionPagination } from "@/hooks/useSimpleGetCollectionPagination";
import { AutoDetailHeaderScreen, AutoDetailItemScreen } from "@/modules/search-screen/(components-tabs)/details-screen";
import { MotoHeaderScreen, MotoItemScreen } from "@/modules/search-screen/(components-tabs)/moto-screen";
import { SpecAutoHeaderScreen, SpecAutoItemScreen } from "@/modules/search-screen/(components-tabs)/spec_auto-screen";
import { HeaderCategory } from "@/modules/search-screen/HeaderCategory";
import { AutoHeaderScreen, AutoItemScreen } from "@/modules/search-screen/simple-auto-tab/auto-screen";
import { ActiveScreen } from "@/modules/search-screen/types";
import { DefaultConfig } from "@/openapi/client";
import { selectSelectedBrands, selectSelectedModels, useAutoSelectStore } from "@/state/search-screen/useAutoSelectStore";
import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import { useRouter } from "expo-router";

const SCREEN_CONFIGS: Record<ActiveScreen, { header: React.ComponentType; item: React.ComponentType<{ item: any }> } | null> = {
  auto: {
    header: AutoHeaderScreen,
    item: AutoItemScreen,
  },
  auto_detail: {
    header: AutoDetailHeaderScreen,
    item: AutoDetailItemScreen,
  },
  spec_auto: {
    header: SpecAutoHeaderScreen,
    item: SpecAutoItemScreen,
  },
  moto: {
    header: MotoHeaderScreen,
    item: MotoItemScreen,
  },
};

const renderContent = (activeScreen: ActiveScreen) => SCREEN_CONFIGS[activeScreen];

export default function SearchScreen() {
  const [activeSreen, setActiveSreen] = useState<ActiveScreen>("auto");
  const { header: HeaderScreen } = renderContent(activeSreen) || {};
  const router = useRouter();

  const store = useAutoSelectStore();
  const selectedBrands = selectSelectedBrands(store);
  const selectedModels = selectSelectedModels(store);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch, isRefetching } = useSimpleGetCollectionPagination({
    brand: selectedBrands?.map((brand) => brand.id).join(",") || undefined,
    model: selectedModels?.map((model) => model.id).join(",") || undefined,
    releaseYear: undefined,
    price: undefined,
    pageSize: "10",
  });

  // Flatten the infinite query data
  const flattenedData = useMemo(() => {
    return data?.pages?.flatMap((page) => page.data) || [];
  }, [data]);

  const handleGenerationPress = () => {
    router.push("/search-screen/simple-auto-screen/modals/generation-modal-filter");
  };

  return (
    <SafeAreaView className="flex-1">
      <FlashList
        numColumns={2}
        data={flattenedData}
        ListHeaderComponent={
          <>
            <HeaderBrand />
            <HeaderCategory activeScreen={activeSreen} setActiveScreen={setActiveSreen} />
            {HeaderScreen && <HeaderScreen />}

            {/* Selected Filters Display */}
            {/* {(selectedBrands.length > 0 || selectedModels.length > 0 || selectedGenerations.length > 0) && (
              <View className="mx-4 mb-4 p-4 bg-surface dark:bg-surface-dark rounded-2xl">
                <Text className="text-lg font-semibold text-font dark:text-font-dark mb-2">Выбранные фильтры:</Text>

                {selectedBrands.length > 0 && (
                  <Text className="text-font dark:text-font-dark mb-1">
                    Марка: {selectedBrands.map(b => b.name).join(", ")}
                  </Text>
                )}

                {selectedModels.length > 0 && (
                  <Text className="text-font dark:text-font-dark mb-1">
                    Модель: {selectedModels.map(m => m.name).join(", ")}
                  </Text>
                )}

                <TouchableOpacity
                  onPress={handleGenerationPress}
                  className="mt-2 p-3 bg-background-neutral dark:bg-background-neutral-dark rounded-xl"
                >
                  <Text className="text-font dark:text-font-dark">
                    Поколение: {selectedGenerations.length > 0
                      ? selectedGenerations.map(g => g.generation).join(", ")
                      : "Выбрать поколение"
                    }
                  </Text>
                </TouchableOpacity>
              </View>
            )} */}
          </>
        }
        keyExtractor={(item) => item.id?.toString() || `item-${Math.random()}`}
        refreshControl={<RefreshControl tintColor={"blue"} refreshing={isRefetching} onRefresh={refetch} />}
        ListEmptyComponent={<Text className="text-center p-4">No data available</Text>}
        renderItem={({ item, index }) => {
          return (
            <View className="p-4">
              {item.images && item.images.length > 0 ? (
                <Image
                  source={{
                    uri: DefaultConfig.basePath + "/" + item.images[0],
                  }}
                  style={{ width: "100%", height: 150, borderRadius: 8 }}
                  contentFit="cover"
                />
              ) : (
                <View style={{ width: "100%", height: 150, borderRadius: 8, backgroundColor: "#ccc" }} />
              )}
              <Text className="text-lg font-bold text-font dark:text-font-dark">
                {item.brand} {item.model}, {item.releaseYear}
              </Text>
              <Text className="text-font-subtle dark:text-font-subtle-dark">
                {item.price} {item.currency}
              </Text>
              {item.region && <Text className="text-font-subtlest dark:text-font-subtlest-dark">{item.region}</Text>}
            </View>
          );
        }}
        onEndReachedThreshold={0.2}
        onEndReached={() => hasNextPage && !isFetchingNextPage && fetchNextPage()}
        ListFooterComponent={
          isFetchingNextPage ? <ActivityIndicator color="blue" size="small" style={{ marginBottom: 5 }} /> : null
        }
      />
    </SafeAreaView>
  );
}
