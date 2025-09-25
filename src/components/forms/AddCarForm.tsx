import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import {useRouter} from "expo-router";

type CarForm = {
  id: string;
  userId: string;
  title: string;
  description: string;
  price: number;
  currency: "USD" | "EUR" | "MDL" | "RUB";
  location: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
  status: "active" | "archived";
  category: "car";
  brand: string;
  model: string;
  year: number;
  mileage: number;
  fuelType: "petrol" | "diesel" | "electric" | "hybrid" | "gas";
  transmission: "manual" | "automatic" | "robot" | "cvt";
  bodyType: "sedan" | "hatchback" | "suv" | "coupe" | "wagon" | "pickup" | "van";
  drivetrain: "fwd" | "rwd" | "awd" | "4x4";
  engineCapacity: number;
  power: number;
  color: string;
  condition: "new" | "used" | "for parts";
};

const AddCarForm = () => {
  const [form, setForm] = useState<CarForm>({
    id: "1",
    userId: "123",
    title: "",
    description: "",
    price: 0,
    currency: "USD",
    location: "",
    images: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    status: "active",
    category: "car",
    brand: "",
    model: "",
    year: new Date().getFullYear(),
    mileage: 0,
    fuelType: "petrol",
    transmission: "manual",
    bodyType: "sedan",
    drivetrain: "fwd",
    engineCapacity: 0,
    power: 0,
    color: "",
    condition: "used",
  });
  const router = useRouter();

  const handleChange = (key: keyof CarForm, value: any) => {
    setForm({ ...form, [key]: value, updatedAt: new Date() });
  };

  const handleSubmit = () => {
    console.log("New car ad:", form);
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="p-4">
        <Text className="text-xl font-bold mb-4">Создать объявление</Text>

        {/* Заголовок */}
        <Text className="font-semibold">Заголовок</Text>
        <TextInput
          className="border p-2 rounded mb-3"
          value={form.title}
          onChangeText={(t) => handleChange("title", t)}
        />

        {/* Описание */}
        <Text className="font-semibold">Описание</Text>
        <TextInput
          className="border p-2 rounded mb-3"
          value={form.description}
          multiline
          onChangeText={(t) => handleChange("description", t)}
        />

        {/* Цена + Валюта */}
        <Text className="font-semibold">Цена</Text>
        <TextInput
          keyboardType="numeric"
          className="border p-2 rounded mb-3"
          value={form.price.toString()}
          onChangeText={(t) => handleChange("price", Number(t))}
        />

        <Text className="font-semibold">Валюта</Text>
        <Picker
          selectedValue={form.currency}
          onValueChange={(v) => handleChange("currency", v)}
          className="mb-3"
        >
          <Picker.Item label="USD" value="USD" />
          <Picker.Item label="EUR" value="EUR" />
          <Picker.Item label="MDL" value="MDL" />
          <Picker.Item label="RUB" value="RUB" />
        </Picker>

        {/* Локация */}
        <Text className="font-semibold">Локация</Text>
        <TextInput
          className="border p-2 rounded mb-3"
          value={form.location}
          onChangeText={(t) => handleChange("location", t)}
        />

        {/* Марка */}
        <Text className="font-semibold">Марка</Text>
        <TextInput
          className="border p-2 rounded mb-3"
          value={form.brand}
          onChangeText={(t) => handleChange("brand", t)}
        />

        {/* Модель */}
        <Text className="font-semibold">Модель</Text>
        <TextInput
          className="border p-2 rounded mb-3"
          value={form.model}
          onChangeText={(t) => handleChange("model", t)}
        />

        {/* Год */}
        <Text className="font-semibold">Год выпуска</Text>
        <TextInput
          keyboardType="numeric"
          className="border p-2 rounded mb-3"
          value={form.year.toString()}
          onChangeText={(t) => handleChange("year", Number(t))}
        />

        {/* Пробег */}
        <Text className="font-semibold">Пробег (км)</Text>
        <TextInput
          keyboardType="numeric"
          className="border p-2 rounded mb-3"
          value={form.mileage.toString()}
          onChangeText={(t) => handleChange("mileage", Number(t))}
        />

        {/* Топливо */}
        <Text className="font-semibold">Тип топлива</Text>
        <Picker
          selectedValue={form.fuelType}
          onValueChange={(v) => handleChange("fuelType", v)}
          className="mb-3"
        >
          <Picker.Item label="Бензин" value="petrol" />
          <Picker.Item label="Дизель" value="diesel" />
          <Picker.Item label="Электро" value="electric" />
          <Picker.Item label="Гибрид" value="hybrid" />
          <Picker.Item label="Газ" value="gas" />
        </Picker>

        {/* Коробка передач */}
        <Text className="font-semibold">Коробка передач</Text>
        <Picker
          selectedValue={form.transmission}
          onValueChange={(v) => handleChange("transmission", v)}
          className="mb-3"
        >
          <Picker.Item label="Механика" value="manual" />
          <Picker.Item label="Автомат" value="automatic" />
          <Picker.Item label="Робот" value="robot" />
          <Picker.Item label="Вариатор (CVT)" value="cvt" />
        </Picker>

        {/* Кузов */}
        <Text className="font-semibold">Тип кузова</Text>
        <Picker
          selectedValue={form.bodyType}
          onValueChange={(v) => handleChange("bodyType", v)}
          className="mb-3"
        >
          <Picker.Item label="Седан" value="sedan" />
          <Picker.Item label="Хэтчбек" value="hatchback" />
          <Picker.Item label="SUV" value="suv" />
          <Picker.Item label="Купе" value="coupe" />
          <Picker.Item label="Универсал" value="wagon" />
          <Picker.Item label="Пикап" value="pickup" />
          <Picker.Item label="Фургон" value="van" />
        </Picker>

        {/* Привод */}
        <Text className="font-semibold">Привод</Text>
        <Picker
          selectedValue={form.drivetrain}
          onValueChange={(v) => handleChange("drivetrain", v)}
          className="mb-3"
        >
          <Picker.Item label="Передний (FWD)" value="fwd" />
          <Picker.Item label="Задний (RWD)" value="rwd" />
          <Picker.Item label="Полный (AWD)" value="awd" />
          <Picker.Item label="4x4" value="4x4" />
        </Picker>

        {/* Состояние */}
        <Text className="font-semibold">Состояние</Text>
        <Picker
          selectedValue={form.condition}
          onValueChange={(v) => handleChange("condition", v)}
          className="mb-3"
        >
          <Picker.Item label="Новый" value="new" />
          <Picker.Item label="Б/у" value="used" />
          <Picker.Item label="На запчасти" value="for parts" />
        </Picker>

        {/* Цвет */}
        <Text className="font-semibold">Цвет</Text>
        <TextInput
          className="border p-2 rounded mb-3"
          value={form.color}
          onChangeText={(t) => handleChange("color", t)}
        />

        {/* Кнопка */}
        <TouchableOpacity
          className="bg-blue-500 p-3 rounded mt-4"
          onPress={handleSubmit}
        >
          <Text className="text-white text-center font-bold">Создать</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddCarForm;
