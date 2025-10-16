import { useRouter } from "expo-router";
import { useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";

import { PriceBottomSheet } from "@/components/filters/PriceFilterBottomSheet";
import { RegionBottomSheet } from "@/components/filters/RegionBottomSheet";
import { YearBottomSheet } from "@/components/filters/YearFilterBottomSheet";
import { GetRegionIndex200ResponseInner } from "@/openapi/client";
import { Ionicons } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { selectSelectedBrands, selectSelectedModels, useAutoSelectStore } from "@/state/search-screen/useAutoSelectStore";
import { useSimpleGetCollectionPagination } from "@/hooks/useSimpleGetCollectionPagination";
import { TouchableHighlightRow } from "@/components/global/TouchableHighlightRow";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderBrand } from "@/components/global/header/HeaderBrand";
import { HeaderBackSaveFilter } from "@/components/global/header";

export default function SimpleAutoModal() {
  const { t } = useTranslation();
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

  const yearModalRef = useRef<BottomSheetModal>(null);
  const priceModalRef = useRef<BottomSheetModal>(null);
  const regionModalRef = useRef<BottomSheetModal>(null);

  const handlePresentYearModalPress = useCallback(() => {
    yearModalRef.current?.present();
  }, []);

  const handlePresentPriceModalPress = useCallback(() => {
    priceModalRef.current?.present();
  }, []);

  const handlePresentRegionModalPress = useCallback(() => {
    regionModalRef.current?.present();
  }, []);

  return (
    <SafeAreaView>
      <HeaderBackSaveFilter />

      <View className={"flex-col"}>
        <View className="flex-1">
          <TouchableHighlightRow
            variant="bordered"
            label={"Марка, модель, поколение"}
            selectedValue={undefined}
            onPress={() => router.push("/(app)/search-screen/simple-auto-screen/modals/brand-auto-filter")}
            showRightArrow={false}
          />
        </View>

        <View className={"flex flex-row gap-1"}>
          <TouchableHighlightRow
            variant="bordered"
            label={"Год"}
            selectedValue={undefined}
            onPress={() => handlePresentYearModalPress()}
            showRightArrow={false}
          />
          <YearBottomSheet ref={yearModalRef} />

          <TouchableHighlightRow
            variant="bordered"
            label={"Цена"}
            selectedValue={undefined}
            onPress={() => handlePresentPriceModalPress()}
            showRightArrow={false}
          />
          <PriceBottomSheet ref={priceModalRef} />

          <TouchableHighlightRow
            variant="bordered"
            label={"Параметры"}
            selectedValue={undefined}
            onPress={() => router.push("/(app)/search-screen/simple-auto-screen/modals/settings")}
            showRightArrow={false}
            icon={<Ionicons name="options-sharp" size={20} color="white" />}
          />
        </View>

        <TouchableHighlightRow
          variant="bordered"
          label={"Все регионы"}
          selectedValue={undefined}
          onPress={handlePresentRegionModalPress}
          rightIcon="chevron-down"
        />

        {/** component for opening year modal */}
        {/** TODO: move them to shared between creating advertisement */}
        <RegionBottomSheet
          ref={regionModalRef}
          onChange={function (region: GetRegionIndex200ResponseInner): void {
            // throw new Error("Function not implemented.");
          }}
        />
      </View>

      <FlashList
        numColumns={2}
        data={flattenedData}
        ListHeaderComponent={
          <>
            <HeaderBrand />
            <HeaderCategory activeScreen={activeSreen} setActiveScreen={setActiveSreen} />
            {HeaderScreen && <HeaderScreen />}
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
