import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, useColorScheme, Modal, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";

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

  const [activeModal, setActiveModal] = useState<string | null>(null);
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handleChange = (key: keyof CarForm, value: any) => {
    setForm({ ...form, [key]: value, updatedAt: new Date() });
  };

  const handleSubmit = () => {
    console.log("New car ad:", form);
    router.back();
  };

  const pickerOptions = {
    currency: [
      { label: "USD ($)", value: "USD" },
      { label: "EUR (€)", value: "EUR" },
      { label: "MDL (L)", value: "MDL" },
      { label: "RUB (₽)", value: "RUB" },
    ],
    fuelType: [
      { label: "Бензин", value: "petrol" },
      { label: "Дизель", value: "diesel" },
      { label: "Электро", value: "electric" },
      { label: "Гибрид", value: "hybrid" },
      { label: "Газ", value: "gas" },
    ],
    transmission: [
      { label: "Механика", value: "manual" },
      { label: "Автомат", value: "automatic" },
      { label: "Робот", value: "robot" },
      { label: "Вариатор (CVT)", value: "cvt" },
    ],
    bodyType: [
      { label: "Седан", value: "sedan" },
      { label: "Хэтчбек", value: "hatchback" },
      { label: "SUV", value: "suv" },
      { label: "Купе", value: "coupe" },
      { label: "Универсал", value: "wagon" },
      { label: "Пикап", value: "pickup" },
      { label: "Фургон", value: "van" },
    ],
    drivetrain: [
      { label: "Передний (FWD)", value: "fwd" },
      { label: "Задний (RWD)", value: "rwd" },
      { label: "Полный (AWD)", value: "awd" },
      { label: "4x4", value: "4x4" },
    ],
    condition: [
      { label: "Новый", value: "new" },
      { label: "Б/у", value: "used" },
      { label: "На запчасти", value: "for parts" },
    ],
  };

  const getPickerLabel = (type: string, value: string) => {
    const options = pickerOptions[type as keyof typeof pickerOptions];
    return options?.find(option => option.value === value)?.label || value;
  };

  const PickerModal = ({
                         visible,
                         onClose,
                         title,
                         options,
                         selectedValue,
                         onValueChange
                       }: {
    visible: boolean;
    onClose: () => void;
    title: string;
    options: Array<{ label: string; value: string }>;
    selectedValue: string;
    onValueChange: (value: string) => void;
  }) => (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-black/50">
        <Pressable className="flex-1" onPress={onClose} />
        <View className={`rounded-t-3xl p-0 ${isDark ? 'bg-surface-dark' : 'bg-surface'}`}>
          <View className="p-4 border-b border-border-DEFAULT/10">
            <View className="flex-row justify-between items-center">
              <Text className={`text-lg font-semibold ${isDark ? 'text-font-dark' : 'text-font'}`}>
                {title}
              </Text>
              <TouchableOpacity onPress={onClose}>
                <Text className="text-background-brand-bold text-base font-medium">Готово</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Picker
            selectedValue={selectedValue}
            onValueChange={(value) => {
              onValueChange(value);
              onClose();
            }}
            style={{
              color: isDark ? '#BFC1C4' : '#292A2E',
            }}
          >
            {options.map((option) => (
              <Picker.Item
                key={option.value}
                label={option.label}
                value={option.value}
              />
            ))}
          </Picker>
        </View>
      </View>
    </Modal>
  );

  const PickerButton = ({
                          label,
                          value,
                          onPress,
                          placeholder = "Выберите..."
                        }: {
    label: string;
    value: string;
    onPress: () => void;
    placeholder?: string;
  }) => (
    <TouchableOpacity
      onPress={onPress}
      className={`
        ${isDark
        ? 'bg-background-input-dark border-border-input-dark'
        : 'bg-background-input border-border-input'
      } 
        border px-4 py-3 rounded-xl flex-row justify-between items-center
        active:opacity-70
      `}
    >
      <Text className={`text-base ${value ? (isDark ? 'text-font-dark' : 'text-font') : (isDark ? 'text-font-subtlest-dark' : 'text-font-subtlest')}`}>
        {value || placeholder}
      </Text>
      <Text className={`text-lg ${isDark ? 'text-font-subtle-dark' : 'text-font-subtle'}`}>▼</Text>
    </TouchableOpacity>
  );

  const inputClassName = `
    ${isDark
    ? 'bg-background-input-dark border-border-input-dark text-font-dark placeholder:text-font-subtlest-dark'
    : 'bg-background-input border-border-input text-font placeholder:text-font-subtlest'
  } 
    border px-4 py-3 rounded-xl text-base
    focus:border-border-brand${isDark ? '-dark' : ''} focus:shadow-sm
  `;

  const labelClassName = `
    ${isDark ? 'text-font-dark' : 'text-font'} 
    text-sm font-semibold mb-2 ml-1
  `;

  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-background-page-dark' : 'bg-background-page'}`}>
      <ScrollView className="px-5 py-2" showsVerticalScrollIndicator={false}>
        {/* Заголовок страницы */}
        <View className="mb-8 mt-2">
          <Text className={`text-3xl font-bold ${isDark ? 'text-font-dark' : 'text-font'} mb-2`}>
            Продать авто
          </Text>
          <Text className={`text-base ${isDark ? 'text-font-subtle-dark' : 'text-font-subtle'}`}>
            Заполните информацию о вашем автомобиле
          </Text>
        </View>

        {/* Основная информация */}
        <View className={`p-5 rounded-2xl mb-5 shadow-sm ${isDark ? 'bg-surface-dark' : 'bg-surface'}`}>
          <View className="flex-row items-center mb-5">
            <Text className={`text-xl font-bold ${isDark ? 'text-font-dark' : 'text-font'}`}>
              Основная информация
            </Text>
          </View>

          <View className="mb-5">
            <Text className={labelClassName}>Заголовок объявления</Text>
            <TextInput
              className={inputClassName}
              value={form.title}
              onChangeText={(t) => handleChange("title", t)}
              placeholder="Например: BMW X5 2020 года"
              placeholderTextColor={isDark ? '#96999E' : '#6B6E76'}
            />
          </View>

          <View className="mb-5">
            <Text className={labelClassName}>Описание</Text>
            <TextInput
              className={`${inputClassName} h-28`}
              value={form.description}
              multiline
              textAlignVertical="top"
              onChangeText={(t) => handleChange("description", t)}
              placeholder="Опишите состояние автомобиля, особенности, дополнительное оборудование..."
              placeholderTextColor={isDark ? '#96999E' : '#6B6E76'}
            />
          </View>

          <View className="flex-row gap-4 mb-5">
            <View className="flex-1">
              <Text className={labelClassName}>Цена</Text>
              <TextInput
                keyboardType="numeric"
                className={inputClassName}
                value={form.price.toString()}
                onChangeText={(t) => handleChange("price", Number(t) || 0)}
                placeholder="15000"
                placeholderTextColor={isDark ? '#96999E' : '#6B6E76'}
              />
            </View>

            <View className="w-28">
              <Text className={labelClassName}>Валюта</Text>
              <PickerButton
                label=""
                value={getPickerLabel('currency', form.currency)}
                onPress={() => setActiveModal('currency')}
              />
            </View>
          </View>

          <View className="mb-0">
            <Text className={labelClassName}>Местоположение</Text>
            <TextInput
              className={inputClassName}
              value={form.location}
              onChangeText={(t) => handleChange("location", t)}
              placeholder="Кишинев, Центр"
              placeholderTextColor={isDark ? '#96999E' : '#6B6E76'}
            />
          </View>
        </View>

        {/* Характеристики автомобиля */}
        <View className={`p-5 rounded-2xl mb-5 shadow-sm ${isDark ? 'bg-surface-dark' : 'bg-surface'}`}>
          <View className="flex-row items-center mb-5">
            <Text className={`text-xl font-bold ${isDark ? 'text-font-dark' : 'text-font'}`}>
              Характеристики
            </Text>
          </View>

          <View className="flex-row gap-4 mb-5">
            <View className="flex-1">
              <Text className={labelClassName}>Марка</Text>
              <TextInput
                className={inputClassName}
                value={form.brand}
                onChangeText={(t) => handleChange("brand", t)}
                placeholder="BMW"
                placeholderTextColor={isDark ? '#96999E' : '#6B6E76'}
              />
            </View>

            <View className="flex-1">
              <Text className={labelClassName}>Модель</Text>
              <TextInput
                className={inputClassName}
                value={form.model}
                onChangeText={(t) => handleChange("model", t)}
                placeholder="X5"
                placeholderTextColor={isDark ? '#96999E' : '#6B6E76'}
              />
            </View>
          </View>

          <View className="flex-row gap-4 mb-5">
            <View className="flex-1">
              <Text className={labelClassName}>Год выпуска</Text>
              <TextInput
                keyboardType="numeric"
                className={inputClassName}
                value={form.year.toString()}
                onChangeText={(t) => handleChange("year", Number(t) || new Date().getFullYear())}
                placeholder="2020"
                placeholderTextColor={isDark ? '#96999E' : '#6B6E76'}
              />
            </View>

            <View className="flex-1">
              <Text className={labelClassName}>Пробег (км)</Text>
              <TextInput
                keyboardType="numeric"
                className={inputClassName}
                value={form.mileage.toString()}
                onChangeText={(t) => handleChange("mileage", Number(t) || 0)}
                placeholder="50000"
                placeholderTextColor={isDark ? '#96999E' : '#6B6E76'}
              />
            </View>
          </View>

          <View className="mb-5">
            <Text className={labelClassName}>Тип топлива</Text>
            <PickerButton
              label=""
              value={getPickerLabel('fuelType', form.fuelType)}
              onPress={() => setActiveModal('fuelType')}
            />
          </View>

          <View className="mb-5">
            <Text className={labelClassName}>Коробка передач</Text>
            <PickerButton
              label=""
              value={getPickerLabel('transmission', form.transmission)}
              onPress={() => setActiveModal('transmission')}
            />
          </View>

          <View className="mb-5">
            <Text className={labelClassName}>Тип кузова</Text>
            <PickerButton
              label=""
              value={getPickerLabel('bodyType', form.bodyType)}
              onPress={() => setActiveModal('bodyType')}
            />
          </View>

          <View className="mb-5">
            <Text className={labelClassName}>Привод</Text>
            <PickerButton
              label=""
              value={getPickerLabel('drivetrain', form.drivetrain)}
              onPress={() => setActiveModal('drivetrain')}
            />
          </View>

          <View className="mb-5">
            <Text className={labelClassName}>Состояние</Text>
            <PickerButton
              label=""
              value={getPickerLabel('condition', form.condition)}
              onPress={() => setActiveModal('condition')}
            />
          </View>

          <View className="mb-0">
            <Text className={labelClassName}>Цвет</Text>
            <TextInput
              className={inputClassName}
              value={form.color}
              onChangeText={(t) => handleChange("color", t)}
              placeholder="Черный"
              placeholderTextColor={isDark ? '#96999E' : '#6B6E76'}
            />
          </View>
        </View>

        {/* Кнопка создания */}
        <TouchableOpacity
          className={`
            ${isDark
            ? 'bg-background-brand-bold-dark active:bg-background-brand-bold-dark-pressed'
            : 'bg-background-brand-bold active:bg-background-brand-bold-pressed'
          } 
            px-6 py-4 rounded-2xl mb-10 shadow-lg
          `}
          onPress={handleSubmit}
          activeOpacity={0.8}
        >
          <Text className="text-white text-center font-bold text-lg">
            Создать объявление
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Модальные окна для пикеров */}
      <PickerModal
        visible={activeModal === 'currency'}
        onClose={() => setActiveModal(null)}
        title="Выберите валюту"
        options={pickerOptions.currency}
        selectedValue={form.currency}
        onValueChange={(value) => handleChange('currency', value)}
      />

      <PickerModal
        visible={activeModal === 'fuelType'}
        onClose={() => setActiveModal(null)}
        title="Выберите тип топлива"
        options={pickerOptions.fuelType}
        selectedValue={form.fuelType}
        onValueChange={(value) => handleChange('fuelType', value)}
      />

      <PickerModal
        visible={activeModal === 'transmission'}
        onClose={() => setActiveModal(null)}
        title="Выберите коробку передач"
        options={pickerOptions.transmission}
        selectedValue={form.transmission}
        onValueChange={(value) => handleChange('transmission', value)}
      />

      <PickerModal
        visible={activeModal === 'bodyType'}
        onClose={() => setActiveModal(null)}
        title="Выберите тип кузова"
        options={pickerOptions.bodyType}
        selectedValue={form.bodyType}
        onValueChange={(value) => handleChange('bodyType', value)}
      />

      <PickerModal
        visible={activeModal === 'drivetrain'}
        onClose={() => setActiveModal(null)}
        title="Выберите привод"
        options={pickerOptions.drivetrain}
        selectedValue={form.drivetrain}
        onValueChange={(value) => handleChange('drivetrain', value)}
      />

      <PickerModal
        visible={activeModal === 'condition'}
        onClose={() => setActiveModal(null)}
        title="Выберите состояние"
        options={pickerOptions.condition}
        selectedValue={form.condition}
        onValueChange={(value) => handleChange('condition', value)}
      />
    </SafeAreaView>
  );
};

export default AddCarForm;