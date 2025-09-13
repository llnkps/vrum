




import React, { useRef } from 'react';
import { Animated, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ModalView() {
  let scrollOffsetY = useRef(new Animated.Value(0)).current;

  console.log(scrollOffsetY)
  return (
    <SafeAreaView style={styles.container}>
      <DynamicHeader animHeaderValue={scrollOffsetY} />
      <ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
          { useNativeDriver: false }
        )}
      >
        {DATA.map((book, index) => {
          return (
            <Text style={styles.scrollText} key={book.id}>{book.title}</Text>
          )
        })}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({  
  container: {
    flex: 1,  
    paddingTop: 10, 
    margin: 0     
  },
  scrollText: {            
    fontSize: 19,
    textAlign: 'center',
    padding: 20,
    color: '#fff'
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',      
    left: 0,
    right: 0,
    paddingTop: 10         
  },
  headerText: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center'
  },
});



const Header_Max_Height = 200;
const Header_Min_Height = 70;

function DynamicHeader({ animHeaderValue }) {
  const animateHeaderBackgroundColor = animHeaderValue.interpolate({
    inputRange: [0, Header_Max_Height - Header_Min_Height],
    outputRange: ['blue', 'red'],
    extrapolate: 'clamp'
  })

  const animateHeaderHeight = animHeaderValue.interpolate({
    inputRange: [0, Header_Max_Height - Header_Min_Height],
    outputRange: [Header_Max_Height, Header_Min_Height],
    extrapolate: 'clamp'
  })

  return (
    <Animated.View
      style={[
        styles.header,
        {
          height: animateHeaderHeight,
          backgroundColor: animateHeaderBackgroundColor
        }

      ]}
    >
      <Text style={styles.headerText}>
        A List of Books
      </Text>
    </Animated.View>
  );
}


// import { useRef, useState } from 'react';
// import { Animated, Button, Image, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';

// import TextInputIcon from '@/components/ui/TextInputIcon';


// const DATA = Array.from({ length: 30 }, (_, i) => `Item ${i + 1}`);

// export default function ModelItemScreenFilterModal() {
//   const [text, setText] = useState('');

//   const [modalVisible, setModalVisible] = useState(false);
//   const [selected, setSelected] = useState<string | null>(null);

//   const items = ["Apple", "Banana", "Orange"];



//  const scrollY = useRef(new Animated.Value(0)).current;

//   // Interpolate title position
//   const translateY = scrollY.interpolate({
//     inputRange: [0, 100], // scroll distance
//     outputRange: [0, -40], // move up into header
//     extrapolate: "clamp",
//   });

//   const scale = scrollY.interpolate({
//     inputRange: [0, 100],
//     outputRange: [1, 0.8], // shrink a bit
//     extrapolate: "clamp",
//   });

//   const opacity = scrollY.interpolate({
//     inputRange: [0, 100],
//     outputRange: [1, 0], // fade out
//     extrapolate: "clamp",
//   });


//   return (
//     <>
//       <View className="flex-1">
//         <View>
//           <Text className="text-lg font-bold text-font dark:text-font-dark">
//             Марки
//           </Text>
//           <TextInput
//             style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
//             onChangeText={newText => setText(newText)}
//             value={text}
//             placeholder="Марка или модель"
//           />
//           <TextInputIcon />
//         </View>
//         <View className="px-4 py-3 gap-y-1 bg-background dark:bg-background-dark">
//           {items.map((item) => (
//             <TouchableOpacity
//               key={item}
//               onPress={() => setSelected(item)}
//               className={`p-3 m-2 border rounded-lg ${selected === item ? "border-blue-500 bg-blue-100" : "border-gray-300"
//                 }`}
//             >
//               <Text>{item}</Text>
//             </TouchableOpacity>
//           ))}

//           {/* ✅ Show button only after user picks something */}
//           {selected && (
//             <Button
//               title="Confirm"
//               onPress={() => setModalVisible(false)}
//             />
//           )}
//         </View>
//         <View className="px-4 py-3">
//           <Pressable
//             onPress={() => console.log('Показать результаты Pressed')}
//             className={"px-4 py-3 flex flex-row bg-button-primary dark:bg-button-primary-dark rounded-md justify-center"}
//           >
//             <Text className="text-white font-bold">Показать результаты</Text>
//           </Pressable>
//         </View>
//       </View>
//     </>
//   )
// }



// // import React, { useRef } from "react";
// // import {
// //   View,
// //   Text,
// //   Animated,
// //   FlatList,
// //   SafeAreaView,
// // } from "react-native";
// // import { createNativeStackNavigator } from "@react-navigation/native-stack";
// // import { NavigationContainer } from "@react-navigation/native";

// // const Stack = createNativeStackNavigator();

// // const DATA = Array.from({ length: 30 }, (_, i) => `Item ${i + 1}`);

// // export default function ModelsScreen() {
// //   const scrollY = useRef(new Animated.Value(0)).current;

// //   // animate title vertical movement
// //   const translateY = scrollY.interpolate({
// //     inputRange: [0, 100], // scroll distance
// //     outputRange: [0, -40], // how far "Models" goes up
// //     extrapolate: "clamp",
// //   });

// //   // animate horizontal movement (towards back button area)
// //   const translateX = scrollY.interpolate({
// //     inputRange: [0, 100],
// //     outputRange: [0, -80], // shift left toward back arrow
// //     extrapolate: "clamp",
// //   });

// //   const scale = scrollY.interpolate({
// //     inputRange: [0, 100],
// //     outputRange: [1, 0.8],
// //     extrapolate: "clamp",
// //   });

// //   return (
// //     <SafeAreaView className="flex-1 bg-white">
// //       {/* Animated title */}
// //       <Animated.View
// //         style={{
// //           transform: [{ translateY }, { translateX }, { scale }],
// //         }}
// //         className="px-4 py-2"
// //       >
// //         <Text className="text-3xl font-bold">Models</Text>
// //       </Animated.View>

// //       {/* Scrollable content */}
// //       <Animated.FlatList
// //         data={DATA}
// //         keyExtractor={(item) => item}
// //         renderItem={({ item }) => (
// //           <View className="p-4 border-b border-gray-200">
// //             <Text>{item}</Text>
// //           </View>
// //         )}
// //         onScroll={Animated.event(
// //           [{ nativeEvent: { contentOffset: { y: scrollY } } }],
// //           { useNativeDriver: true }
// //         )}
// //         scrollEventThrottle={16}
// //       />
// //     </SafeAreaView>
// //   );
// // }

export const DATA = [
  {
    id: 1,
    title: 'Modern JS: A curated collection'
  },
  {
    id: 2,
    title: 'JavaScript notes for professionals'
  },
  {
    id: 3,
    title: 'JavaScript: The Good Parts'
  },
  {
    id: 4,
    title: 'JavaScript: The right way'
  },
  {
    id: 5,
    title: 'Exploring ES6'
  },
  {
    id: 6,
    title: 'JavaScript Enlightenment'
  },
  {
    id: 7,
    title: 'You dont know JS'
  },
  {
    id: 8,
    title: 'Learn JavaScript'
  },
  {
    id: 9,
    title: 'JavaScript succintly'
  },
  {
    id: 10,
    title: 'Human JavaScript'
  },
  {
    id: 11,
    title: 'JavaScript design patterns'
  },
  {
    id: 12,
    title: "JS50: 50 illustrations in JS"
  },
  {
    id: 13,
    title: 'Eloqent JavaScript'
  },
  {
    id: 14,
    title: 'Practical ES6'
  },
  {
    id: 15,
    title: 'Speaking JavaScript'
  }
];