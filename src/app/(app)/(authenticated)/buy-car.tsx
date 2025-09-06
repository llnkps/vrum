import { Image, Platform, ScrollView, Text, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import CourseCard from '@/components/CourseCard';
import Animated, { FadeIn } from 'react-native-reanimated';

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

const Page = () => {
  console.log("BUY CAR PAGE RENDERED", Platform.OS);
  return (
    <View className="flex-1 px-4">
      <Animated.FlatList
        data={data}
        renderItem={({ item, index }) => (
          <Animated.View entering={FadeIn.delay(index * 400).duration(800)}>
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
          </Animated.View>
        )}
        contentContainerClassName="pt-4"
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
export default Page;
