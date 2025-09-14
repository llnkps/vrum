import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import {
  Button, Image, Pressable, Text, TextInput, TouchableOpacity, View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import TextInputIcon from '@/components/ui/TextInputIcon';
import { Ionicons } from '@expo/vector-icons';


import Animated, { FadeIn } from 'react-native-reanimated';


export default function ModelItemScreenFilterModal() {
  const data = require('@/data/auto-icons/output.json');

  const [text, setText] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);


  // const scrollY = useRef(new Animated.Value(0)).current;

  // Interpolate title position
  // const translateY = scrollY.interpolate({
  //   inputRange: [0, 100], // scroll distance
  //   outputRange: [0, -40], // move up into header
  //   extrapolate: "clamp",
  // });

  // const scale = scrollY.interpolate({
  //   inputRange: [0, 100],
  //   outputRange: [1, 0.8], // shrink a bit
  //   extrapolate: "clamp",
  // });

  // const opacity = scrollY.interpolate({
  //   inputRange: [0, 100],
  //   outputRange: [1, 0], // fade out
  //   extrapolate: "clamp",
  // });


  const router = useRouter();

  return (
    <>
      <SafeAreaView className="flex-1 px-3 gap-y-4">
        <View className="mt-2 gap-y-2">

          <Animated.FlatList
            ListHeaderComponent={
              <>
                <TouchableOpacity
                  onPress={() => router.dismiss()}
                  className="p-2"
                >
                  <Ionicons name="close" size={22} color="white" />
                </TouchableOpacity>

                <View className="gap-y-3">
                  <Text className="text-3xl font-bold text-font dark:text-font-dark">
                    Марки
                  </Text>
                  <TextInputIcon />
                </View>
              </>
            }
            data={data}
            renderItem={({ item, index }) => (
              <Animated.ScrollView entering={FadeIn.delay(index * 20).duration(50)}>
                <TouchableOpacity
                  key={`${item.filename}_${index}`}
                  onPress={() => router.push({
                    pathname: "/search-screen/filters/modal-model",
                    params: {
                      ...item
                    }
                  })}
                  className={"p-2 border-b border-border dark:border-border-dark"}
                >
                  <View className="flex-row gap-x-4">
                    {/* <Image source={require(`@/data/auto-icons/${item.filepath}`)} /> */}
                    <Text className="text-xl text-font dark:text-font-dark">{item.name}</Text>
                  </View>
                </TouchableOpacity>
              </Animated.ScrollView>
            )}
            contentContainerClassName="pt-4"
            keyExtractor={(item, index) => `${item.filename}_${index}`}
            showsVerticalScrollIndicator={false}
          />

          {/* {data.map((item, i) => {
            // const a = require(`@/data/auto-icons/${item.filepath}`)
            return (
              
            )
          })} */}

          {/* ✅ Show button only after user picks something */}
          {selected && (
            <Button
              title="Confirm"
              onPress={() => setModalVisible(false)}
            />
          )}
        </View>
        {/* <View className="px-4 py-3">
          <Pressable
            onPress={() => console.log('Показать результаты Pressed')}
            className={"px-4 py-3 flex flex-row bg-button-primary dark:bg-button-primary-dark rounded-md justify-center"}
          >
            <Text className="text-white font-bold">Показать результаты</Text>
          </Pressable>
        </View> */}
      </SafeAreaView>
    </>
  )
}



// import React, { useRef } from "react";
// import {
//   View,
//   Text,
//   Animated,
//   FlatList,
//   SafeAreaView,
// } from "react-native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { NavigationContainer } from "@react-navigation/native";

// const Stack = createNativeStackNavigator();

// const DATA = Array.from({ length: 30 }, (_, i) => `Item ${i + 1}`);

// export default function ModelsScreen() {
//   const scrollY = useRef(new Animated.Value(0)).current;

//   // animate title vertical movement
//   const translateY = scrollY.interpolate({
//     inputRange: [0, 100], // scroll distance
//     outputRange: [0, -40], // how far "Models" goes up
//     extrapolate: "clamp",
//   });

//   // animate horizontal movement (towards back button area)
//   const translateX = scrollY.interpolate({
//     inputRange: [0, 100],
//     outputRange: [0, -80], // shift left toward back arrow
//     extrapolate: "clamp",
//   });

//   const scale = scrollY.interpolate({
//     inputRange: [0, 100],
//     outputRange: [1, 0.8],
//     extrapolate: "clamp",
//   });

//   return (
//     <SafeAreaView className="flex-1 bg-white">
//       {/* Animated title */}
//       <Animated.View
//         style={{
//           transform: [{ translateY }, { translateX }, { scale }],
//         }}
//         className="px-4 py-2"
//       >
//         <Text className="text-3xl font-bold">Models</Text>
//       </Animated.View>

//       {/* Scrollable content */}
//       <Animated.FlatList
//         data={DATA}
//         keyExtractor={(item) => item}
//         renderItem={({ item }) => (
//           <View className="p-4 border-b border-gray-200">
//             <Text>{item}</Text>
//           </View>
//         )}
//         onScroll={Animated.event(
//           [{ nativeEvent: { contentOffset: { y: scrollY } } }],
//           { useNativeDriver: true }
//         )}
//         scrollEventThrottle={16}
//       />
//     </SafeAreaView>
//   );
// }