import { Link, Stack, useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Dimensions, Image, Platform, Pressable, ScrollView, Text, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import HomeBlock from '@/components/HomeBlock';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/state/auth/useAuthStore';

const { width } = Dimensions.get('window');

const data = [];

export default function HomeScreen({ navigation }) {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/sign-in');
    }
  }, [isAuthenticated, router]);
  // const { data } = useQuery({
  //   queryKey: ['homeInfo'],
  //   queryFn: () => getHomeInfo(),
  // });

  return (
    <SafeAreaView className="flex-1">
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
                return (
                  <View className="mx-2 rounded-2xl shadow-md">
                    <Image source={item.image} className="h-48 w-full rounded-t-2xl" resizeMode="cover" />
                    <View className="p-4">
                      <Text className="text-lg font-bold text-font-brand dark:text-font-brand-dark">{item.title}</Text>
                      <Text className="text-base text-font dark:text-font-dark">{item.price}</Text>
                      <View className="mt-2 flex-row">
                        <Text className="mr-2 text-xs text-font dark:text-font-dark">⭐ 5-star GNCAP</Text>
                        <Text className="text-xs text-font dark:text-font-dark">🚗 More Mileage</Text>
                      </View>
                    </View>
                  </View>
                );
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
        <Text className="ml-1 text-base font-semibold text-font">Your Location</Text>
      </View>

      {/* Right side: Heart + Profile */}
      <View className="flex-row items-center">
        <Ionicons name="heart-outline" size={22} color="black" />
        <Image source={{ uri: 'https://i.pravatar.cc/100' }} className="ml-3 h-8 w-8 rounded-full" />
      </View>
    </View>
  );
};

const BuySellButtons = ({ navigation }) => {
  return (
    <View className="bg-background dark:bg-background-dark px-4">
      <Text className="mb-3 text-xl font-bold">What are you looking for?</Text>

      <View className="flex-row">
        {/* Buy Car Button */}
        <Link href="/buy-car" asChild>
          <Pressable className="mr-2 flex-1 rounded-2xl bg-orange-500 p-4">
            <Text className="text-lg font-bold text-white">Buy Car</Text>
            <Text className="mb-2 text-xs text-white">Wide Range of Verified Cars for you!</Text>
            <Image
              source={require('@/assets/images/home-buy-car.png')} // replace with your illustration
              className="h-24 w-full"
              resizeMode="contain"
            />
          </Pressable>
        </Link>

        {/* Sell Car Button */}
        <Pressable className="ml-2 flex-1 rounded-2xl bg-blue-500 p-4">
          <Text className="text-lg font-bold text-white">Sell Car</Text>
          <Text className="mb-2 text-xs text-white">Made Easy and Simple from Home</Text>
          <Image
            source={require('@/assets/images/home-sell-car.png')} // replace with your illustration
            className="h-24 w-full"
            resizeMode="contain"
          />
        </Pressable>
      </View>
    </View>
  );
};
