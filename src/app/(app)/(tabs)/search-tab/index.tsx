import React, { useCallback, useMemo, useRef, useState } from "react";
import { View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import { HeaderBrand } from "@/components/global/Header";
import {
  AutoDetailHeaderScreen,
  AutoDetailItemScreen,
} from "@/modules/search-screen/(components-tabs)/details-screen";
import {
  MotoHeaderScreen,
  MotoItemScreen,
} from "@/modules/search-screen/(components-tabs)/moto-screen";
import {
  SpecAutoHeaderScreen,
  SpecAutoItemScreen,
} from "@/modules/search-screen/(components-tabs)/spec_auto-screen";
import {
  AutoHeaderScreen,
  AutoItemScreen,
} from "@/modules/search-screen/simple-auto-tab/auto-screen";
import { HeaderCategory } from "@/modules/search-screen/HeaderCategory";
import { ActiveScreen } from "@/modules/search-screen/types";
import { useAutoSelectStore } from "@/state/search-screen/useAutoSelectStore";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

const renderContent = (activeScreen: ActiveScreen) => {
  if (activeScreen === "auto") {
    return {
      header: AutoHeaderScreen,
      item: AutoItemScreen,
    };
  } else if (activeScreen === "auto_detail") {
    return {
      header: AutoDetailHeaderScreen,
      item: AutoDetailItemScreen,
    };
  } else if (activeScreen === "spec_auto") {
    return {
      header: SpecAutoHeaderScreen,
      item: SpecAutoItemScreen,
    };
  } else if (activeScreen === "moto") {
    return {
      header: MotoHeaderScreen,
      item: MotoItemScreen,
    };
  }
  // Add other conditions for different screens if needed
  return null;
};

export default function SearchScreen() {
  const [activeSreen, setActiveSreen] = useState<ActiveScreen>("auto");
  const { header: HeaderScreen, item: RenderItemScreen } =
    renderContent(activeSreen) || {};

  const { selectedModels } = useAutoSelectStore();

  console.log("INDEX -------------------");
  console.log(selectedModels);

  // const bottomSheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["20%", "90%"], []);

  // const bottomSheetRef = useRef<BottomSheetModal>(null);

  // const handleOpen = useCallback(() => {
  //   console.log("open sheet")
  //   bottomSheetRef.current?.present();
  // }, []);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const handleOpen = () => {};

  return (
    <SafeAreaView className="flex-1">
      <View>
        <HeaderBrand />
        <HeaderCategory
          activeScreen={activeSreen}
          setActiveScreen={setActiveSreen}
        />
        {HeaderScreen && <HeaderScreen handleOpen={handleOpen} />}
        <Animated.FlatList
          data={[]}
          renderItem={({ item, index }) => (
            <Animated.ScrollView
              entering={FadeIn.delay(index * 400).duration(800)}
            >
              {RenderItemScreen && <RenderItemScreen item={item} />}
            </Animated.ScrollView>
          )}
          contentContainerClassName="pt-4"
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}
