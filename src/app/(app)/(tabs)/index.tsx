import { Link, Stack } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator, Dimensions, Image, Platform, Pressable, ScrollView, Text, View
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

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
];

export default function HomeScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  console.log(Platform.OS)
  // const { data } = useQuery({
  //   queryKey: ['homeInfo'],
  //   queryFn: () => getHomeInfo(),
  // });

  return (
      <SafeAreaView className="flex-1 bg-background-page dark:bg-background-page-dark">
        <View className="h-full flex-1">
          {/* <Stack.Screen options={{ title: data?.title }} /> */}
          {isLoading && (
            <View className="flex-1 items-center justify-center">
              <ActivityIndicator />
            </View>
          )}
          <Header />
          <ScrollView>
            <View className="items-center justify-center">
              <Carousel
                loop
                width={width}
                height={350}
                autoPlay={false}
                data={data}
                scrollAnimationDuration={800}
                renderItem={({ item }) => {
                  console.log(item)
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
                        <Text className="text-base text-font dark:text-font-dark">{item.price}</Text>
                        <View className="flex-row mt-2">
                          <Text className="text-xs text-font dark:text-font-dark mr-2">⭐ 5-star GNCAP</Text>
                          <Text className="text-xs text-font dark:text-font-dark">🚗 More Mileage</Text>
                        </View>
                      </View>
                    </View>
                  )
                }}
              />
            </View>
            <BuySellButtons navigation={navigation} />
          </ScrollView>
          {/* <HomeBlock
        homeInfo={data!}
        dom={{
          scrollEnabled: false,
          matchContents: true,
          onLoadEnd: () => {
            setIsLoading(false);
          },
        }}
      /> */}
        </View>
      </SafeAreaView>
  );
}




const Header = () => {
  return (
    <View className="flex-row items-center justify-between px-4 py-3">
      {/* Left side: Location */}
      <View className="flex-row items-center">
        <Ionicons name="location-sharp" size={20} color="red" />
        <Text className="ml-1 text-base font-semibold text-font">
          Your Location
        </Text>
      </View>

      {/* Right side: Heart + Profile */}
      <View className="flex-row items-center">
        <Ionicons name="heart-outline" size={22} color="black" />
        <Image
          source={{ uri: "https://i.pravatar.cc/100" }}
          className="w-8 h-8 rounded-full ml-3"
        />
      </View>
    </View>
  );
}


const BuySellButtons = ({ navigation }) => {
  return (
    <View className="px-4 bg-background dark:bg-background-dark">
      <Text className="text-xl font-bold mb-3">What are you looking for?</Text>

      <View className="flex-row">
        {/* Buy Car Button */}
        <Link href="/buy-car" asChild>
          <Pressable className="flex-1 bg-orange-500 rounded-2xl p-4 mr-2">
            <Text className="text-white text-lg font-bold">Buy Car</Text>
            <Text className="text-white text-xs mb-2">
              Wide Range of Verified Cars for you!
            </Text>
            <Image
              source={require("@/assets/images/home-buy-car.png")} // replace with your illustration
              className="w-full h-24"
              resizeMode="contain"
            />
          </Pressable>
        </Link>

        {/* Sell Car Button */}
        <Pressable className="flex-1 bg-blue-500 rounded-2xl p-4 ml-2">
          <Text className="text-white text-lg font-bold">Sell Car</Text>
          <Text className="text-white text-xs mb-2">
            Made Easy and Simple from Home
          </Text>
          <Image
            source={require("@/assets/images/home-sell-car.png")} // replace with your illustration
            className="w-full h-24"
            resizeMode="contain"
          />
        </Pressable>
      </View>
    </View>
  );
}
