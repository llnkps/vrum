import { useRouter } from "expo-router";
import { useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Image, Text, View } from "react-native";

import { PriceBottomSheet } from "@/components/filters/PriceFilterBottomSheet";
import { YearBottomSheet } from "@/components/filters/YearFilterBottomSheet";
import { RegionBottomSheet } from "@/components/filters/RegionBottomSheet";
import { TouchableHighlightRow } from "@/components/global/TouchableHighlightRow";
import { useAutoSelectStore } from "@/state/search-screen/useAutoSelectStore";
import { Ionicons } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

export const AutoHeaderScreen = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const store = useAutoSelectStore();

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

  const getYearDisplayValue = () => {
    if (!store.yearFilter) return undefined;
    const { min, max } = store.yearFilter;
    if (min && max) return `${min} - ${max}`;
    if (min) return `от ${min}`;
    if (max) return `до ${max}`;
    return undefined;
  };

  const getPriceDisplayValue = () => {
    if (!store.priceFilter) return undefined;
    const { min, max } = store.priceFilter;
    if (min && max) return `${min} - ${max}`;
    if (min) return `от ${min}`;
    if (max) return `до ${max}`;
    return undefined;
  };

  const getRegionDisplayValue = () => {
    return store.regionFilter?.name;
  };

  return (
    <>
      <View className={"px-4 py-3 gap-y-1"}>
        <TouchableHighlightRow
          label="Марка, модель, поколение"
          onPress={() => router.push("/(app)/search-screen/simple-auto-screen/modals/brand-auto-filter")}
          variant="button"
          showRightArrow={false}
        />
        <View className={"flex-row gap-1"}>
          <TouchableHighlightRow
            label="Год"
            selectedValue={getYearDisplayValue()}
            onPress={handlePresentYearModalPress}
            variant="button"
            showRightArrow={false}
          />

          <TouchableHighlightRow
            label="Цена"
            selectedValue={getPriceDisplayValue()}
            onPress={handlePresentPriceModalPress}
            variant="button"
            showRightArrow={false}
            selectedValueMode="replace"
          />

          <TouchableHighlightRow
            label="Параметры"
            onPress={() => router.push("/(app)/search-screen/simple-auto-screen/modals/settings")}
            variant="button"
            icon={<Ionicons name="options-sharp" size={20} color="white" />}
            showRightArrow={false}
            fullWidth
          />
        </View>
        <TouchableHighlightRow
          label="Все регионы"
          selectedValue={getRegionDisplayValue()}
          onPress={handlePresentRegionModalPress}
          variant="button"
          showRightArrow={false}
        />

        <YearBottomSheet ref={yearModalRef} onChange={(yearRange) => store.setYearFilter(yearRange)} />
        <PriceBottomSheet ref={priceModalRef} onChange={(priceRange) => store.setPriceFilter(priceRange)} />
        <RegionBottomSheet 
          ref={regionModalRef}
          multiple
          onChange={(region) => {
            // Handle both single region and array of regions
            if (Array.isArray(region)) {
              // For now, take the first region if multiple are selected
              store.setRegionFilter(region[0]);
            } else {
              store.setRegionFilter(region);
            }
          }}
        />
      </View>

      <View className={"px-4 py-3"}>
        <TouchableHighlightRow
          label={t("searchScreen.auto.searchPlaceholder")}
          onPress={() => router.push("/(app)/search-screen/simple-auto-screen/modals/simple-auto-modal")}
          variant="button"
          showRightArrow={false}
          centerText={true}
        />
      </View>
    </>
  );
};

export const AutoItemScreen = ({ item }: { item: any }) => {
  return (
    <View className="mx-2 rounded-2xl shadow-md">
      <Image source={item.image} className="w-full h-48 rounded-t-2xl" resizeMode="cover" />
      <View className="p-4">
        <Text className="text-lg font-bold text-font-brand dark:text-font-brand-dark">{item.title}</Text>
        <Text className="text-base text-font dark:text-font-dark">{item.price}</Text>
        <View className="flex-row mt-2">
          <Text className="text-xs text-font dark:text-font-dark mr-2">⭐ 5-star GNCAP</Text>
          <Text className="text-xs text-font dark:text-font-dark">🚗 More Mileage</Text>
        </View>
      </View>
    </View>
  );
};
