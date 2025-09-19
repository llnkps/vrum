import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { FadeIn } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import CustomBottomSheetModal from '@/components/global/CustomBottomSheetModal';
import { Header } from '@/components/global/Header';
import {
  AutoHeaderScreen, AutoItemScreen
} from '@/components/search-screen/auto-screen-tab/auto-screen';
import {
  AutoDetailHeaderScreen, AutoDetailItemScreen
} from '@/components/search-screen/(components-tabs)/auto_detail-screen';
import {
  MotoHeaderScreen, MotoItemScreen
} from '@/components/search-screen/(components-tabs)/moto-screen';
import {
  SpecAutoHeaderScreen, SpecAutoItemScreen
} from '@/components/search-screen/(components-tabs)/spec_auto-screen';
import { HeaderCategory } from '@/components/search-screen/HeaderCategory';
import { ActiveScreen } from '@/components/search-screen/types';
import { useAutoSelectStore } from '@/state/search-screen/useAutoSelectStore';
import BottomSheet, {
  BottomSheetBackdrop, BottomSheetModal, BottomSheetView, useBottomSheetModal
} from '@gorhom/bottom-sheet';

const data = [
  {
    id: 1,
    title: "Tata Punch",
    price: "₹ 5.99 Lakh",
    image: require("@/data/images/1images.jpeg"), // use your car image
  },
  {
    id: 2,
    title: "Hyundai Venue",
    price: "₹ 7.89 Lakh",
    image: require("@/data/images/2LEAD.jpg"),
  },

  {
    id: 3,
    title: "Hyundai Venue",
    price: "₹ 7.89 Lakh",
    image: require("@/data/images/2LEAD.jpg"),
  },
  {
    id: 4,
    title: "Hyundai Venue",
    price: "₹ 7.89 Lakh",
    image: require("@/data/images/2LEAD.jpg"),
  },
  {
    id: 5,
    title: "Hyundai Venue",
    price: "₹ 7.89 Lakh",
    image: require("@/data/images/2LEAD.jpg"),
  },
  {
    id: 6,
    title: "Hyundai Venue",
    price: "₹ 7.89 Lakh",
    image: require("@/data/images/2LEAD.jpg"),
  },
  {
    id: 7,
    title: "Hyundai Venue",
    price: "₹ 7.89 Lakh",
    image: require("@/data/images/2LEAD.jpg"),
  },
  {
    id: 8,
    title: "Hyundai Venue",
    price: "₹ 7.89 Lakh",
    image: require("@/data/images/2LEAD.jpg"),
  },
  {
    id: 9,
    title: "Hyundai Venue",
    price: "₹ 7.89 Lakh",
    image: require("@/data/images/2LEAD.jpg"),
  },
  {
    id: 10,
    title: "Hyundai Venue",
    price: "₹ 7.89 Lakh",
    image: require("@/data/images/2LEAD.jpg"),
  },

];

const renderContent = (activeScreen: ActiveScreen) => {
  if (activeScreen === "auto") {
    return {
      header: AutoHeaderScreen,
      item: AutoItemScreen,
    }
  } else if (activeScreen === "auto_detail") {
    return {
      header: AutoDetailHeaderScreen,
      item: AutoDetailItemScreen,
    }
  } else if (activeScreen === "spec_auto") {
    return {
      header: SpecAutoHeaderScreen,
      item: SpecAutoItemScreen,
    }
  } else if (activeScreen === "moto") {
    return {
      header: MotoHeaderScreen,
      item: MotoItemScreen,
    }
  }
  // Add other conditions for different screens if needed
  return null;
}

export default function SearchScreen() {
  const [activeSreen, setActiveSreen] = useState<ActiveScreen>("auto");
  const { header: HeaderScreen, item: RenderItemScreen } = renderContent(activeSreen) || {};

  const { selectedModels } = useAutoSelectStore();

  console.log("INDEX -------------------")
  console.log(selectedModels)



  // const bottomSheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['20%', '90%'], []);

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
    console.log('handleSheetChanges', index);
  }, []);

  const handleOpen = () => {}

  return (
    <SafeAreaView className="flex-1">
      <View>
        <Header />
        <HeaderCategory activeScreen={activeSreen} setActiveScreen={setActiveSreen} />
        {HeaderScreen && <HeaderScreen handleOpen={handleOpen} />}
        <Animated.FlatList
          data={data}
          renderItem={({ item, index }) => (
            <Animated.ScrollView entering={FadeIn.delay(index * 400).duration(800)}>
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
