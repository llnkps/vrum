import { useRouter } from "expo-router";
import { useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Image, Pressable, Text, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import YearModal from "./year-modal/year-modal";
import PriceModal from "./price-modal/price-modal";

export const AutoHeaderScreen = () => {
  const { t } = useTranslation();

  return (
    <>
      <SearchSection />
      <View className={"px-4 py-3"}>
        <Pressable
          className={
            "px-4 py-3 flex flex-row justify-center bg-background-neutral dark:bg-background-neutral-dark rounded-md border border-border dark:border-border-dark"
          }
        >
          <Text className="text-font dark:text-font-dark font-bold">
            {t("searchScreen.auto.searchPlaceholder")}
          </Text>
        </Pressable>
      </View>
    </>
  );
};

export const AutoItemScreen = ({ item }) => {
  return (
    <View className="mx-2 rounded-2xl shadow-md">
      <Image
        source={item.image}
        className="w-full h-48 rounded-t-2xl"
        resizeMode="cover"
      />
      <View className="p-4">
        <Text className="text-lg font-bold text-font-brand dark:text-font-brand-dark">
          {item.title}
        </Text>
        <Text className="text-base text-font dark:text-font-dark">
          {item.price}
        </Text>
        <View className="flex-row mt-2">
          <Text className="text-xs text-font dark:text-font-dark mr-2">
            ⭐ 5-star GNCAP
          </Text>
          <Text className="text-xs text-font dark:text-font-dark">
            🚗 More Mileage
          </Text>
        </View>
      </View>
    </View>
  );
};

const SearchSection = () => {
  const router = useRouter();

  const yearModalRef = useRef<BottomSheetModal>(null);
  const priceModalRef = useRef<BottomSheetModal>(null);

  const handlePresentYearModalPress = useCallback(() => {
    yearModalRef.current?.present();
  }, []);

  const handlePresentPriceModalPress = useCallback(() => {
    priceModalRef.current?.present();
  }, []);


  return (
    <View className={"px-4 py-3 gap-y-1 bg-background dark:bg-background-dark"}>
      <Pressable
        onPress={() =>
          router.push("/search-screen/auto-screen/brand-auto-filter")
        }
        className={
          "px-4 py-3 flex flex-row bg-background-neutral dark:bg-background-neutral-dark rounded-t-md border border-border dark:border-border-dark"
        }
      >
        <Text className="text-font dark:text-font-dark font-bold">
          Марка, модель, поколение
        </Text>
      </Pressable>
      <View className={"flex flex-row gap-1"}>
        <Pressable
          onPress={() => handlePresentYearModalPress()}
          className={
            "px-4 py-3 flex flex-row bg-background-neutral dark:bg-background-neutral-dark border border-border dark:border-border-dark"
          }
        >
          <Text className="text-font dark:text-font-dark font-bold">Год</Text>
        </Pressable>

        <Pressable
          onPress={() => handlePresentPriceModalPress()}
          className={
            "px-4 py-3 flex flex-row bg-background-neutral dark:bg-background-neutral-dark border border-border dark:border-border-dark"
          }
        >
          <Text className="text-font dark:text-font-dark font-bold">Цена</Text>
        </Pressable>

        <Pressable
          onPress={() => router.push("/search-screen/auto-screen/settings")}
          className={
            "flex-1 px-4 py-3 flex flex-row bg-background-neutral dark:bg-background-neutral-dark border border-border dark:border-border-dark"
          }
        >
          <View className="flex flex-row items-center space-x-2">
            {/* The name 'sliders' comes from the FontAwesome icon library. */}
            <Ionicons name="options-sharp" size={20} color="white" />
            <Text className="text-font dark:text-font-dark font-bold">
              Параметры
            </Text>
          </View>
        </Pressable>
      </View>
      <Pressable
        onPress={() => handlePress("Все регионы")}
        className={
          "px-4 py-3 flex flex-row bg-background-neutral dark:bg-background-neutral-dark rounded-b-md border border-border dark:border-border-dark"
        }
      >
        <Text className="text-font dark:text-font-dark font-bold">
          Все регионы
        </Text>
      </Pressable>

      {/** component for opening year modal */}
      <YearModal ref={yearModalRef} />
      <PriceModal ref={priceModalRef} />
    </View>
  );
};
