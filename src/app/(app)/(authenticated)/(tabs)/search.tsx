import { Link, Stack } from 'expo-router';
import React, { useState } from 'react';
import {
    ActivityIndicator, Dimensions, Image, Platform, Pressable, ScrollView, Text, View
} from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { SvgUri } from 'react-native-svg';

import HeaderAuto from '@/assets/images/header-auto-icon.svg';
import HeaderBreak from '@/assets/images/header-break-icon.svg';
import HeaderMoto from '@/assets/images/header-moto-icon.svg';
import HeaderSpecauto from '@/assets/images/header-specauto-icon.svg';
import HomeBlock from '@/components/HomeBlock';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';

const { width } = Dimensions.get("window");

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

export default function SearchScreen() {
  const [isLoading, setIsLoading] = useState(false);
  console.log(Platform.OS)
  // const { data } = useQuery({
  //   queryKey: ['homeInfo'],
  //   queryFn: () => getHomeInfo(),
  // });

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-surface dark:bg-surface-dark">
        <View className="h-full flex-1">
          <Animated.FlatList
            data={data}
            renderItem={({ item, index }) => (
              <Animated.ScrollView entering={FadeIn.delay(index * 400).duration(800)}>
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
                    <Text className="text-base text-font dark:text-font-dark">{item.price}</Text>
                    <View className="flex-row mt-2">
                      <Text className="text-xs text-font dark:text-font-dark mr-2">⭐ 5-star GNCAP</Text>
                      <Text className="text-xs text-font dark:text-font-dark">🚗 More Mileage</Text>
                    </View>
                  </View>
                </View>
              </Animated.ScrollView>
            )}
            contentContainerClassName="pt-4"
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<>
              <Header />
              <HeaderCategory />
              <SearchSection />

              <View className={"px-4 py-3"}>
                <Pressable
                  className={"px-4 py-3 flex flex-row justify-center bg-background-neutral dark:bg-background-neutral-dark rounded-md border border-border dark:border-border-dark"}
                >
                  <Text className="text-font dark:text-font-dark font-bold">Показать 8888 объявлений</Text>
                </Pressable>
              </View>

            </>}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const Header = () => {
  return (
    <View className="flex-row items-center justify-center gap-1 px-4 py-3">
      <Ionicons name="heart-outline" size={22} color="red" />
      <Text className="text-font dark:text-font-dark text-lg font-bold">VRUM</Text>
    </View>
  );
}

const HeaderCategory = () => {
  return (
    <View className="flex-row items-center justify-center gap-4 px-4 py-3">
      {/* Left side: Location */}
      <View className="flex-col items-center justify-center">
        <HeaderAuto />
        <Text className="text-font dark:text-font-dark">Автомобили</Text>
      </View>
      <View className="flex-col items-center justify-center">
        <HeaderSpecauto />
        <Text className="text-font dark:text-font-dark">Спецтехника</Text>
      </View>
      <View className="flex-col items-center justify-center">
        <HeaderBreak />
        <Text className="text-font dark:text-font-dark">Запчасти</Text>
      </View>
      <View className="flex-col items-center justify-center">
        <HeaderMoto />
        <Text className="text-font dark:text-font-dark">Мототехника</Text>
      </View>
    </View>
  );
}


const SearchSection = () => {

  const handlePress = (buttonName) => {
    console.log(`Button "${buttonName}" was pressed.`);
    // You can add navigation or other logic here.
  };

  // const getPressableStyle = (pressed) => {
  //   // return [
  //   //   tailwind('flex-1 justify-center items-center p-3 border-gray-700'),
  //   //   pressed && tailwind('bg-gray-800'),
  //   // ];
  // };

  return (
    <View className={"px-4 py-3 gap-y-1 bg-background dark:bg-background-dark"}>
      <Pressable
        onPress={() => handlePress('Model')}
        className={"px-4 py-3 flex flex-row bg-background-neutral dark:bg-background-neutral-dark rounded-t-md border border-border dark:border-border-dark"}
      >
        <Text className="text-font dark:text-font-dark font-bold">Марка, модель, поколение</Text>
      </Pressable>
      <View className={"flex flex-row gap-1"}>
        <Pressable
          onPress={() => handlePress('Год')}
          className={"px-4 py-3 flex flex-row bg-background-neutral dark:bg-background-neutral-dark border border-border dark:border-border-dark"}
        >
          <Text className="text-font dark:text-font-dark font-bold">Год</Text>
        </Pressable>

        <Pressable
          onPress={() => handlePress('Цена')}
          className={"px-4 py-3 flex flex-row bg-background-neutral dark:bg-background-neutral-dark border border-border dark:border-border-dark"}
        >
          <Text className="text-font dark:text-font-dark font-bold">Цена</Text>
        </Pressable>

        <Pressable
          onPress={() => handlePress('Параметры')}
          className={"flex-1 px-4 py-3 flex flex-row bg-background-neutral dark:bg-background-neutral-dark border border-border dark:border-border-dark"}
        >
          <View className="flex flex-row items-center space-x-2">
            {/* The name 'sliders' comes from the FontAwesome icon library. */}
            <Ionicons name="options-sharp" size={20} color="white" />
            <Text className="text-font dark:text-font-dark font-bold">Параметры</Text>
          </View>
        </Pressable>
      </View>
      <Pressable
        onPress={() => handlePress('Все регионы')}
        className={"px-4 py-3 flex flex-row bg-background-neutral dark:bg-background-neutral-dark rounded-b-md border border-border dark:border-border-dark"}
      >
        <Text className="text-font dark:text-font-dark font-bold">Все регионы</Text>
      </Pressable>
    </View>
  );
}
