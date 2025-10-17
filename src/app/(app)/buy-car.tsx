import 'tailwindcss/tailwind.css';

import React, { useState } from 'react';
import { FlatList, Image, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { useQuery } from '@tanstack/react-query';
import { Ionicons } from '@expo/vector-icons';

const data = [];

const Page = () => {
  console.log('BUY CAR PAGE RENDERED', Platform.OS);
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-surface dark:bg-surface-dark">
        <View className="flex-1 px-4">
          <Header />
          <ButtonCarousel />
          <Animated.FlatList
            data={data}
            renderItem={({ item, index }) => (
              <Animated.ScrollView entering={FadeIn.delay(index * 400).duration(800)}>
                <View className="mx-2 rounded-2xl shadow-md">
                  <Image
                    source={item.image}
                    className="h-48 w-full rounded-t-2xl"
                    resizeMode="cover"
                  />
                  <View className="p-4">
                    <Text className="text-lg font-bold text-font-brand dark:text-font-brand-dark">
                      {item.title}
                    </Text>
                    <Text className="text-base text-font dark:text-font-dark">{item.price}</Text>
                    <View className="mt-2 flex-row">
                      <Text className="mr-2 text-xs text-font dark:text-font-dark">
                        ⭐ 5-star GNCAP
                      </Text>
                      <Text className="text-xs text-font dark:text-font-dark">🚗 More Mileage</Text>
                    </View>
                  </View>
                </View>
              </Animated.ScrollView>
            )}
            contentContainerClassName="pt-4"
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
export default Page;

const Header = () => {
  return (
    <View className="flex-row items-center justify-between px-4 py-3">
      {/* Left side: Location */}
      <View className="flex-row items-center">
        <Ionicons name="location-sharp" size={20} color="red" />
        <Text className="ml-1 text-base font-semibold text-font dark:text-font-dark">
          Your Location
        </Text>
      </View>

      {/* Right side: Heart + Profile */}
      <View className="flex-row items-center">
        <Ionicons name="heart-outline" size={22} color="red" />
        <Image
          source={{ uri: 'https://i.pravatar.cc/100' }}
          className="ml-3 h-8 w-8 rounded-full"
        />
      </View>
    </View>
  );
};

const options = ['Preference', 'Price', 'Kms', 'Other'];

function ButtonCarousel() {
  const [selected, setSelected] = useState('Preference');

  const renderItem = ({ item }: { item: string }) => {
    const isSelected = selected === item;
    return (
      <TouchableOpacity
        onPress={() => setSelected(item)}
        className={`mr-2 rounded-md border px-4 py-2 ${
          isSelected ? 'border-red-400 bg-red-400' : 'border-gray-300 bg-gray-200'
        }`}
      >
        <Text className={`font-medium ${isSelected ? 'text-white' : 'text-gray-800'}`}>{item}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 items-start justify-center p-4">
      <FlatList
        data={options}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={item => item}
      />
    </SafeAreaView>
  );
}
