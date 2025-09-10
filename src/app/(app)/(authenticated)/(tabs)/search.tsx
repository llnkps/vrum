import React, { useState } from 'react';
import { View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { Header } from '@/components/global/Header';
import { HeaderCategory } from '@/components/search-screen/HeaderCategory';
import { ActiveScreen } from '@/components/search-screen/types';
import { AutoHeaderScreen, AutoItemScreen } from '@/screens/search-screen/auto-screen';
import { AutoDetailHeaderScreen, AutoDetailItemScreen } from '@/screens/search-screen/auto_detail-screen';
import { SpecAutoHeaderScreen, SpecAutoItemScreen } from '@/screens/search-screen/spec_auto-screen';
import { MotoHeaderScreen, MotoItemScreen } from '@/screens/search-screen/moto-screen';


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

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-surface dark:bg-surface-dark">
        <View className="h-full flex-1">
          <Animated.FlatList
            ListHeaderComponent={
              <>
                <Header />
                <HeaderCategory activeScreen={activeSreen} setActiveScreen={setActiveSreen} />
                {HeaderScreen && <HeaderScreen />}
              </>
            }
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
    </SafeAreaProvider>
  );
}
