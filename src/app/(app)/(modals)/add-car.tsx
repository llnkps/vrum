import { PickerModal } from "@/components/global/PickerModal";
import { PickerButton } from "@/components/global/PickerModal/PickerButton";
import { InputField } from "@/components/ui/InputField";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CloseIcon from "@/components/global/CloseIcon";
import DropDownPicker from "react-native-dropdown-picker";
import { Dropdown } from "react-native-element-dropdown";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AntDesign } from "@expo/vector-icons";
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
  bodyType:
    | "sedan"
    | "hatchback"
    | "suv"
    | "coupe"
    | "wagon"
    | "pickup"
    | "van";
  drivetrain: "fwd" | "rwd" | "awd" | "4x4";
  engineCapacity: number;
  power: number;
  color: string;
  condition: "new" | "used" | "for parts";
};

export default function AddCarPage() {
  const { control } = useForm({
    defaultValues: {
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
    },
  });

  const [activeModal, setActiveModal] = useState<string | null>(null);
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const handleChange = (key: keyof CarForm, value: any) => {
    // setForm({ ...form, [key]: value, updatedAt: new Date() });
  };

  const handleSubmit = () => {
    console.log("New car ad:");
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
    return options?.find((option) => option.value === value)?.label || value;
  };

  const labelClassName = `
    ${isDark ? "text-font-dark" : "text-font"} 
    text-sm font-semibold mb-2 ml-1
  `;

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Spain", value: "spain" },
    { label: "Madrid", value: "madrid", parent: "spain" },
    { label: "Barcelona", value: "barcelona", parent: "spain" },

    { label: "Italy", value: "italy" },
    { label: "Rome", value: "rome", parent: "italy" },

    { label: "Finland", value: "finland" },
  ]);

  const renderCustomTextInput = (props) => (
    <TextInput
      {...props} // Pass through default props like style, onChangeText, etc.
      placeholder="Type something here..."
      // value={inputValue}
      // onChangeText={(text) => {
      //   setInputValue(text);
      //   // You might want to filter items based on inputValue here
      //   // or perform other actions.
      // }}
      style={{
        borderWidth: 1,
        borderColor: "gray",
        padding: 10,
        marginBottom: 10,
      }}
    />
  );
  const [isFocus, setIsFocus] = useState(false);
  const [fValue, setFValue] = useState(null);

  return (
    <SafeAreaView className="flex-1 bg-background-page dark:bg-background-page-dark">
      <KeyboardAwareScrollView
      // className="px-5 py-2"
      // showsVerticalScrollIndicator={false}
      >
        <Header />

        {/* Основная информация */}
        <View className="p-5 rounded-2xl mb-5 bg-surface dark:bg-surface-dark">
          <View className="flex-row items-center mb-5">
            <Text className="text-xl font-bold text-font dark:text-font-dark">
              Основная информация
            </Text>
          </View>

          <Controller
            control={control}
            name="title"
            render={({ field }) => {
              return (
                <InputField
                  {...field}
                  label={"Заголовок объявления"}
                  placeholder="Например: BMW X5 2020 года"
                />
              );
            }}
          />
          <Controller
            control={control}
            name="description"
            render={({ field }) => {
              return (
                <InputField
                  {...field}
                  label={"Описание"}
                  multiline
                  textAlignVertical="top"
                  placeholder="Опишите состояние автомобиля, особенности, дополнительное оборудование..."
                />
              );
            }}
          />

          <View className="flex-row gap-4">
            <View className="flex-1">
              <Controller
                control={control}
                name="price"
                render={({ field }) => {
                  return (
                    <InputField
                      ref={field.ref}
                      value={field.value.toString()}
                      label={"Цена"}
                      keyboardType="numeric"
                      placeholder="1500"
                    />
                  );
                }}
              />
            </View>

            <View className="w-28">
              <Text className={labelClassName}>Валюта</Text>
              <PickerButton
                label=""
                value={getPickerLabel("currency", "1")}
                onPress={() => setActiveModal("currency")}
              />
            </View>
          </View>

          <View>
            <Text className={labelClassName}>Местоположение</Text>
            {/* <TextInput
              className={inputClassName}
              value={form.location}
              onChangeText={(t) => handleChange("location", t)}
              placeholder="Кишинев, Центр"
              placeholderTextColor={isDark ? "#96999E" : "#6B6E76"}
            /> */}
            <PickerButton
              label=""
              value={getPickerLabel("currency", "USD")}
              onPress={() => setActiveModal("currency")}
            />
          </View>
        </View>

        {/* Характеристики автомобиля */}
        <View className="p-5 rounded-2xl mb-5 bg-surface dark:bg-surface-dark">
          <View className="flex-row items-center mb-5">
            <Text className="text-xl font-bold text-font dark:text-font-dark">
              Характеристики
            </Text>
          </View>
          <Dropdown
          
            style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={[
              { label: "Item 1", value: "1" },
              { label: "Item 2", value: "2" },
              { label: "Item 3", value: "3" },
              { label: "Item 4", value: "4" },
              { label: "Item 5", value: "5" },
              { label: "Item 6", value: "6" },
              { label: "Item 7", value: "7" },
              { label: "Item 8", value: "8" },
            ]}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? "Select item" : "..."}
            searchPlaceholder="Search..."
            value={fValue}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setFValue(item.value);
              setIsFocus(false);
            }}
            renderLeftIcon={() => (
              <AntDesign
                style={styles.icon}
                color={isFocus ? "blue" : "black"}
                // name="Safety"
                size={20}
              />
            )}
          />
          <View className="flex-1">
            <Text className={labelClassName}>Марddка</Text>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              addCustomItem={true}
              //  flatListProps={{nestedScrollEnabled:true}}
              // dropDownContainerStyle={{
              //   position: "relative", // to fix scroll issue ... it is by default 'absolute'
              //   top: 0, //to fix gap between label box and container
              //   borderWidth: 1,
              //   // borderColor: Colors.Black,
              // }}
              listMode="SCROLLVIEW"
              scrollViewProps={{
                nestedScrollEnabled: true,
              }}
              searchable={true}
              render
              multiple={false}
              // mode="BADGE"
              // badgeDotColors={["#e76f51", "#00b4d8", "#e9c46a", "#e76f51", "#8ac926", "#00b4d8", "#e9c46a"]}
            />
            <PickerButton
              label=""
              value={getPickerLabel("currency", "1")}
              onPress={() => setActiveModal("currency")}
            />
            {/* <TextInput
                className={inputClassName}
                value={form.brand}
                onChangeText={(t) => handleChange("brand", t)}
                placeholder="BMW"
                placeholderTextColor={isDark ? "#96999E" : "#6B6E76"}
              /> */}
          </View>
          <View className="flex-1">
            <Text className={labelClassName}>Модель</Text>
            {/* <TextInput
                className={inputClassName}
                value={form.model}
                onChangeText={(t) => handleChange("model", t)}
                placeholder="X5"
                placeholderTextColor={isDark ? "#96999E" : "#6B6E76"}
              /> */}
            <PickerButton
              label=""
              value={getPickerLabel("currency", "1")}
              onPress={() => setActiveModal("currency")}
            />
          </View>

          <View className="flex-row gap-4 mb-5">
            <View className="flex-1">
              <Text className={labelClassName}>Год выпуска</Text>
              {/* <TextInput
                keyboardType="numeric"
                className={inputClassName}
                value={form.year.toString()}
                onChangeText={(t) =>
                  handleChange("year", Number(t) || new Date().getFullYear())
                }
                placeholder="2020"
                placeholderTextColor={isDark ? "#96999E" : "#6B6E76"}
              /> */}
              <PickerButton
                label=""
                value={getPickerLabel("currency", "1")}
                onPress={() => setActiveModal("currency")}
              />
            </View>

            <View className="flex-1">
              <Text className={labelClassName}>Пробег (км)</Text>

              <Controller
                control={control}
                name="mileage"
                render={({ field }) => {
                  return (
                    <InputField
                      ref={field.ref}
                      value={field.value.toString()}
                      label={"Пробег (км)"}
                      keyboardType="numeric"
                      placeholder="50000"
                    />
                  );
                }}
              />
              {/* onChangeText={(t) => handleChange("mileage", Number(t) || 0)} */}
            </View>
          </View>

          <View className="mb-5">
            <Text className={labelClassName}>Тип топлива</Text>
            <PickerButton
              label=""
              value={getPickerLabel("fuelType", "")}
              onPress={() => setActiveModal("fuelType")}
            />
          </View>

          <View className="mb-5">
            <Text className={labelClassName}>Коробка передач</Text>
            <PickerButton
              label=""
              value={getPickerLabel("transmission", "aa")}
              onPress={() => setActiveModal("transmission")}
            />
          </View>

          <View className="mb-5">
            <Text className={labelClassName}>Тип кузова</Text>
            <PickerButton
              label=""
              value={getPickerLabel("bodyType", "s")}
              onPress={() => setActiveModal("bodyType")}
            />
          </View>

          <View className="mb-5">
            <Text className={labelClassName}>Привод</Text>
            <PickerButton
              label=""
              value={getPickerLabel("drivetrain", "sa")}
              onPress={() => setActiveModal("drivetrain")}
            />
          </View>

          <View className="mb-5">
            <Text className={labelClassName}>Состояние</Text>
            <PickerButton
              label=""
              value={getPickerLabel("condition", "d")}
              onPress={() => setActiveModal("condition")}
            />
          </View>

          <View className="mb-0">
            <Text className={labelClassName}>Цвет</Text>
            {/* <TextInput
              className={inputClassName}
              value={form.color}
              onChangeText={(t) => handleChange("color", t)}
              placeholder="Черный"
              placeholderTextColor={isDark ? "#96999E" : "#6B6E76"}
            /> */}
          </View>
        </View>

        {/* Кнопка создания */}
        <TouchableOpacity
          className={`
            ${
              isDark
                ? "bg-background-brand-bold-dark active:bg-background-brand-bold-dark-pressed"
                : "bg-background-brand-bold active:bg-background-brand-bold-pressed"
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
      </KeyboardAwareScrollView>

      {/* Модальные окна для пикеров */}
      <PickerModal
        visible={activeModal === "currency"}
        onClose={() => setActiveModal(null)}
        title="Выберите валюту"
        options={pickerOptions.currency}
        selectedValue={"USD"}
        onValueChange={(value) => handleChange("currency", value)}
      />
      {/*
      <PickerModal
        visible={activeModal === "fuelType"}
        onClose={() => setActiveModal(null)}
        title="Выберите тип топлива"
        options={pickerOptions.fuelType}
        selectedValue={form.fuelType}
        onValueChange={(value) => handleChange("fuelType", value)}
      />

      <PickerModal
        visible={activeModal === "transmission"}
        onClose={() => setActiveModal(null)}
        title="Выберите коробку передач"
        options={pickerOptions.transmission}
        selectedValue={form.transmission}
        onValueChange={(value) => handleChange("transmission", value)}
      />

      <PickerModal
        visible={activeModal === "bodyType"}
        onClose={() => setActiveModal(null)}
        title="Выберите тип кузова"
        options={pickerOptions.bodyType}
        selectedValue={form.bodyType}
        onValueChange={(value) => handleChange("bodyType", value)}
      />

      <PickerModal
        visible={activeModal === "drivetrain"}
        onClose={() => setActiveModal(null)}
        title="Выберите привод"
        options={pickerOptions.drivetrain}
        selectedValue={form.drivetrain}
        onValueChange={(value) => handleChange("drivetrain", value)}
      />

      <PickerModal
        visible={activeModal === "condition"}
        onClose={() => setActiveModal(null)}
        title="Выберите состояние"
        options={pickerOptions.condition}
        selectedValue={form.condition}
        onValueChange={(value) => handleChange("condition", value)}
      /> */}
    </SafeAreaView>
  );
}

const Header = () => {
  const router = useRouter();

  return (
    <View className="flex-row items-center mb-4">
      {/* Back button */}
      <CloseIcon onPress={() => router.dismiss()} />

      {/* Title */}
      <View className="px-3">
        <Text className="text-3xl font-bold text-font dark:text-font-dark">
          Продать авто
        </Text>
        <Text className="text-base text-font-subtle dark:text-font-subtle-dark">
          Заполните информацию о вашем автомобиле
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
