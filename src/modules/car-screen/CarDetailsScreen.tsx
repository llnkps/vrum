import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

interface CarSpec {
  label: string;
  value: string;
  highlighted?: boolean;
}

export default function CarDetailsScreen() {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showAllSpecs, setShowAllSpecs] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const mainSpecs: CarSpec[] = [
    { label: "Наличие", value: "В наличии", highlighted: true },
    { label: "Поколение", value: "VIII (992)", highlighted: true },
    { label: "Год выпуска", value: "2023" },
    { label: "Комплектация", value: "Brabus 900 Rocket R", highlighted: true },
    { label: "Кузов", value: "Купе" },
    { label: "Цвет", value: "Серый" },
    { label: "Двигатель", value: "3.8 л / 900 л.с. / Бензин" },
  ];

  const additionalSpecs: CarSpec[] = [
    { label: "Налог", value: "135 000 ₽ в год", highlighted: true },
    { label: "КПП", value: "Роботизированная" },
    { label: "Привод", value: "Полный" },
    { label: "VIN", value: "W09**************" },
  ];

  const displaySpecs = showAllSpecs ? [...mainSpecs, ...additionalSpecs] : mainSpecs;
  const showHeaderInfo = scrollY > 200;

  return (
    <View className="flex-1 bg-background-page dark:bg-background-page-dark">
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View className="flex-row justify-between items-center px-4 pt-12 pb-3">
        <View className="flex-row items-center gap-3">
          <TouchableOpacity className="p-1 active:opacity-70">
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <View className="flex-1 items-center justify-center px-2">
          {showHeaderInfo && (
            <View className="items-center">
              <Text className="text-font-dark text-sm font-semibold" numberOfLines={1}>
                Porsche 911 Brabus 900
              </Text>
              <Text className="text-font-dark text-base font-bold">89 900 000 ₽</Text>
            </View>
          )}
        </View>

        <View className="flex-row items-center gap-3">
          <TouchableOpacity className="p-1" onPress={() => setIsFavorite(!isFavorite)}>
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={24}
              color="#fff"
            />
          </TouchableOpacity>
          <TouchableOpacity className="p-1">
            <Ionicons name="ellipsis-vertical" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Main content */}
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        onScroll={(event) => setScrollY(event.nativeEvent.contentOffset.y)}
        scrollEventThrottle={16}
      >
        {/* Image */}
        <View className="relative" style={{ width, height: 300 }}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1614162692292-7ac56d7f3c88?w=800&q=80",
            }}
            className="w-full h-full"
            resizeMode="cover"
          />
          <View className="absolute bottom-4 left-4 flex-row gap-2">
            <View className="bg-background-success-bold dark:bg-background-success-bold-dark px-4 py-1.5 rounded-full">
              <Text className="text-white text-sm font-semibold">Новый</Text>
            </View>
            <View className="bg-background-success-bold/90 dark:bg-background-success-bold-dark/90 px-4 py-1.5 rounded-full">
              <Text className="text-white text-sm font-semibold">В наличии</Text>
            </View>
          </View>
        </View>

        {/* Title and Price */}
        <View className="p-4">
          <Text className="text-font dark:text-font-dark text-xl font-semibold mb-2">
            Porsche 911 Brabus 900 Rocket R, VIII (992), 2023
          </Text>
          <Text className="text-font-brand dark:text-font-brand-dark text-4xl font-bold mb-1">
            89 900 000 ₽
          </Text>
          <Text className="text-font-subtlest dark:text-font-subtlest-dark text-sm">
            22 января, Москва
          </Text>
        </View>

        {/* Specifications */}
        <View className="bg-surface dark:bg-surface-dark mx-4 mt-2 p-5 rounded-2xl">
          <Text className="text-font dark:text-font-dark text-xl font-semibold mb-4">
            Характеристики
          </Text>

          <View className="gap-3">
            {displaySpecs.map((spec, index) => (
              <View key={index} className="flex-row justify-between items-center py-1">
                <Text className="text-font-subtle dark:text-font-subtle-dark text-base flex-1">
                  {spec.label}
                </Text>
                <Text
                  className={`text-base text-right flex-1 ${
                    spec.highlighted
                      ? "text-font-brand dark:text-font-brand-dark font-medium"
                      : "text-font dark:text-font-dark"
                  }`}
                >
                  {spec.value}
                </Text>
              </View>
            ))}
          </View>

          {!showAllSpecs && (
            <TouchableOpacity
              className="bg-background-neutral-subtle pressed:bg-background-neutral-subtle-pressed dark:bg-background-neutral-subtle-dark py-3.5 rounded-xl mt-4 items-center active:opacity-80"
              onPress={() => setShowAllSpecs(true)}
            >
              <Text className="text-font dark:text-font-dark text-base font-medium">
                Все характеристики
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <View className="h-24" />
      </ScrollView>

      {/* Bottom Action Bar */}
      <View className="absolute bottom-0 left-0 right-0 bg-surface dark:bg-surface-dark flex-row p-4 gap-3 border-t border-border/10 dark:border-border-dark/10">
        <TouchableOpacity className="flex-1 bg-background-success-bold dark:bg-background-success-bold-dark py-4 rounded-2xl items-center justify-center active:opacity-80">
          <Text className="text-white text-base font-semibold">Позвонить</Text>
          <Text className="text-white/80 text-xs mt-0.5">с 9:00 до 21:00</Text>
        </TouchableOpacity>

        <TouchableOpacity className="w-16 h-16 bg-background-success-bold dark:bg-background-success-bold-dark rounded-2xl items-center justify-center active:opacity-80">
          <Ionicons name="chatbubble-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}