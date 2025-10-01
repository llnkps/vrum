import { InputField } from "@/components/ui/InputField";
import { useRouter } from "expo-router";
import { useCallback, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CloseIcon from "@/components/global/CloseIcon";
import { Button } from "@/components/ui/button";
import { useFilterContext } from "@/modules/advertisement/simple-auto/FilterProvider";
import YearModal from "@/modules/advertisement/simple-auto/year-modal/year-modal";
import TransmissionModal from "@/modules/advertisement/simple-auto/transmission-modal/transmission-modal";
import FuelTypeModal from "@/modules/advertisement/simple-auto/fuel-type-modal/fuel-type-modal";
import BodyTypeModal from "@/modules/advertisement/simple-auto/body-type-modal/body-type-modal";
import DrivetrainModal from "@/modules/advertisement/simple-auto/drivetrain-modal/drivetrain-modal";
import ConditionModal from "@/modules/advertisement/simple-auto/condition-modal/condition-modal";
import ColorModal from "@/modules/advertisement/simple-auto/color-modal/color-modal";
import EngineCapacityModal from "@/modules/advertisement/simple-auto/engine-capacity-modal/engine-capacity-modal";
import PowerModal from "@/modules/advertisement/simple-auto/power-modal/power-modal";
import NumberOfOwnersModal from "@/modules/advertisement/simple-auto/number-of-owners-modal/number-of-owners-modal";
import TradeAllowModal from "@/modules/advertisement/simple-auto/trade-allow-modal/trade-allow-modal";
import DocumentsOkModal from "@/modules/advertisement/simple-auto/documents-ok-modal/documents-ok-modal";
import PhotoModal from "@/modules/advertisement/simple-auto/photo-modal/photo-modal";
import SellerModal from "@/modules/advertisement/simple-auto/seller-modal/seller-modal";
import { BottomSheetRef } from "@/components/global/CustomBottomSheetModal";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Entypo from "@expo/vector-icons/Entypo";
import { useTheme } from "@react-navigation/native";
import { CustomTheme } from "@/theme";
import clsx from "clsx";
import { RegionModal } from "@/modules/advertisement/simple-auto/region-modal/region-modal";
import { Checkbox } from 'expo-checkbox';



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

export default function AddCarPage() {
  const router = useRouter();
  const { selectedBrand, selectedModel } = useFilterContext();
  console.log(selectedBrand);

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


  const yearModalRef = useRef<BottomSheetRef>(null);
  const regionModalRef = useRef<BottomSheetRef>(null);
  const transmissionModalRef = useRef<BottomSheetRef>(null);
  const fuelTypeModalRef = useRef<BottomSheetRef>(null);
  const bodyTypeModalRef = useRef<BottomSheetRef>(null);
  const drivetrainModalRef = useRef<BottomSheetRef>(null);
  const conditionModalRef = useRef<BottomSheetRef>(null);
  const colorModalRef = useRef<BottomSheetRef>(null);
  const engineCapacityModalRef = useRef<BottomSheetRef>(null);
  const powerModalRef = useRef<BottomSheetRef>(null);
  const numberOfOwnersModalRef = useRef<BottomSheetRef>(null);
  const tradeAllowModalRef = useRef<BottomSheetRef>(null);
  const documentsOkModalRef = useRef<BottomSheetRef>(null);
  const photoModalRef = useRef<BottomSheetRef>(null);
  const sellerModalRef = useRef<BottomSheetRef>(null);

  const handlePresentYearModalPress = useCallback(() => {
    yearModalRef.current?.present();
  }, []);

  const handlePresentRegionModalPress = useCallback(() => {
    regionModalRef.current?.present();
  }, []);

  const handlePresentTransmissionModalPress = useCallback(() => {
    transmissionModalRef.current?.present();
  }, []);
  const handlePresentFuelTypeModalPress = useCallback(() => {
    fuelTypeModalRef.current?.present();
  }, []);
  const handlePresentBodyTypeModalPress = useCallback(() => {
    bodyTypeModalRef.current?.present();
  }, []);
  const handlePresentDrivetrainModalPress = useCallback(() => {
    drivetrainModalRef.current?.present();
  }, []);
  const handlePresentConditionModalPress = useCallback(() => {
    conditionModalRef.current?.present();
  }, []);
  const handlePresentColorModalPress = useCallback(() => {
    colorModalRef.current?.present();
  }, []);
  const handlePresentEngineCapacityModalPress = useCallback(() => {
    engineCapacityModalRef.current?.present();
  }, []);
  const handlePresentPowerModalPress = useCallback(() => {
    powerModalRef.current?.present();
  }, []);
  const handlePresentNumberOfOwnersModalPress = useCallback(() => {
    numberOfOwnersModalRef.current?.present();
  }, []);
  const handlePresentTradeAllowModalPress = useCallback(() => {
    tradeAllowModalRef.current?.present();
  }, []);
  const handlePresentDocumentsOkModalPress = useCallback(() => {
    documentsOkModalRef.current?.present();
  }, []);
  const handlePresentPhotoModalPress = useCallback(() => {
    photoModalRef.current?.present();
  }, []);
  const handlePresentSellerModalPress = useCallback(() => {
    sellerModalRef.current?.present();
  }, []);
 
  const [toggleCheckBox, setToggleCheckBox] = useState(false)

  
  return (
    <SafeAreaView className="flex-1 bg-background-page dark:bg-background-page-dark">
      <KeyboardAwareScrollView
      // className="px-5 py-2"
      // showsVerticalScrollIndicator={false}
      >
        <Header />

        {/* Основная информация */}
        <View className="p-5 rounded-2xl mb-5 bg-surface dark:bg-surface-dark gap-y-3">
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

            {/* <View className="w-28">
              <Text className={labelClassName}>Валюта</Text>
              <PickerButton
                label=""
                value={getPickerLabel("currency", "1")}
                onPress={() => setActiveModal("currency")}
              />
            </View> */}
          </View>

          <View>
            {/* <Text className={labelClassName}>Местоположение</Text> */}
            {/* <TextInput
              className={inputClassName}
              value={form.location}
              onChangeText={(t) => handleChange("location", t)}
              placeholder="Кишинев, Центр"
              placeholderTextColor={isDark ? "#96999E" : "#6B6E76"}
            /> */}
            {/* <PickerButton
              label=""
              value={getPickerLabel("currency", "USD")}
              onPress={() => setActiveModal("currency")}
            /> */}
          </View>
        </View>

        {/* Характеристики автомобиля */}
        <View className="p-5 rounded-2xl mb-5 bg-surface dark:bg-surface-dark">
          <View className="flex-row items-center mb-5">
            <Text className="text-xl font-bold text-font dark:text-font-dark">
              Характеристики
            </Text>
          </View>
          <View className="gap-y-3">
            <ModalButton
              label={selectedBrand?.name ?? "Марка"}
              onPress={() =>
                router.push("/(app)/advertisement/simple-auto/brand-auto-modal")
              }
            />
            <ModalButton
              label={selectedModel?.name ?? "Модель"}
              onPress={() =>
                router.push(
                  "/(app)/advertisement/simple-auto/brand-auto-type-modal"
                )
              }
            />


            <BottomSheetModalButton label={"Год"} onPress={handlePresentYearModalPress} />
            <BottomSheetModalButton label={"Регион"} onPress={handlePresentRegionModalPress} />
            <BottomSheetModalButton label={"Коробка передач"} onPress={handlePresentTransmissionModalPress} />
            <BottomSheetModalButton label={"Тип топлива"} onPress={handlePresentFuelTypeModalPress} />
            <BottomSheetModalButton label={"Тип кузова"} onPress={handlePresentBodyTypeModalPress} />
            <BottomSheetModalButton label={"Привод"} onPress={handlePresentDrivetrainModalPress} />
            <BottomSheetModalButton label={"Состояние"} onPress={handlePresentConditionModalPress} />
            
            <View>
              <BottomSheetModalButton label={"Цвет"} onPress={handlePresentColorModalPress} />
            </View>

            <BottomSheetModalButton label={"Объем двигателя"} onPress={handlePresentEngineCapacityModalPress} />
            <BottomSheetModalButton label={"Мощность"} onPress={handlePresentPowerModalPress} />
            
            <Controller
                control={control}
                name="mileage"
                render={({ field }) => {
                  return (
                    <InputField
                      ref={field.ref}
                      value={field.value.toString()}
                      onChange={field.onChange}
                      label={"Пробег (км)"}
                      keyboardType="numeric"
                      placeholder="50000"
                    />
                  );
                }}
              />

            <BottomSheetModalButton label={"Количество владельцев"} onPress={handlePresentNumberOfOwnersModalPress} />
            
            <View>
              <Checkbox
                disabled={false}
                value={toggleCheckBox}
                onValueChange={(newValue) => setToggleCheckBox(newValue)}
              />
              <Text className="text-font dark:text-font-dark">Обмен возможен - ТОРГ</Text>
            </View>


            {/* <View>
              <CheckBox
                disabled={false}
                value={toggleCheckBox}
                onValueChange={(newValue) => setToggleCheckBox(newValue)}
              />
              <Text>Документы в</Text>
            </View> */}


            <BottomSheetModalButton label={"Документы в порядке"} onPress={handlePresentDocumentsOkModalPress} />
            <BottomSheetModalButton label={"Фото"} onPress={handlePresentPhotoModalPress} />
            
            
            <View>
              <Text>Продавец</Text>
              <Text>Любой</Text>
              <Text>Собственник</Text>
              <Text>Частник</Text>
              <Text>Компания</Text>
            </View>
            {/* <BottomSheetModalButton label={"Продавец"} onPress={handlePresentSellerModalPress} /> */}



            {/* filterTransmission 
            filterFuel 
            filterVolumeFrom 
            filterVolumeTo
            filterDriveType 
            filterUnsold 
            filterWithImage
            filterFrame 
            filterColor
            filterDocument 
            filterDamangedType 
            filterWheelType
            filterPowerFrom
            filterPowerTo 
            filterMileageFrom 
            filterMileageTo
            filterFirmCountryGroup 
            filterSeller 
            filterSellLocation
            filterNumberOfOwners 
            filterTradeAllow */}
          </View>

          <View className="flex-1">
            {/* <Text className={labelClassName}>Модель</Text> */}
            {/* <TextInput
                className={inputClassName}
                value={form.model}
                onChangeText={(t) => handleChange("model", t)}
                placeholder="X5"
                placeholderTextColor={isDark ? "#96999E" : "#6B6E76"}
              /> */}
            {/* <PickerButton */}
            {/* label="" */}
            {/* value={getPickerLabel("currency", "1")} */}
            {/* onPress={() => setActiveModal("currency")} */}
            {/* /> */}
          </View>

          <View className="flex-row gap-4 mb-5">
            <View className="flex-1">
              {/* <Text className={labelClassName}>Год выпуска</Text> */}
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
              {/* <PickerButton */}
              {/* label="" */}
              {/* value={getPickerLabel("currency", "1")} */}
              {/* onPress={() => setActiveModal("currency")} */}
              {/* /> */}
            </View>

            <View className="flex-1">
              {/* <Text className={labelClassName}>Пробег (км)</Text> */}

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

          {/* <View className="mb-5">
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
          </View> */}

          <View className="mb-0">
            {/* <Text className={labelClassName}>Цвет</Text> */}
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
        {/* <TouchableOpacity
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
        </TouchableOpacity> */}
      </KeyboardAwareScrollView>

      <YearModal ref={yearModalRef} />
      <RegionModal ref={regionModalRef} />
      <TransmissionModal ref={transmissionModalRef} onSelect={() => {}} />
      <FuelTypeModal ref={fuelTypeModalRef} onSelect={() => {}} />
      <BodyTypeModal ref={bodyTypeModalRef} onSelect={() => {}} />
      <DrivetrainModal ref={drivetrainModalRef} onSelect={() => {}} />
      <ConditionModal ref={conditionModalRef} onSelect={() => {}} />
      <ColorModal ref={colorModalRef} onSelect={() => {}} />
      <EngineCapacityModal ref={engineCapacityModalRef} onSelect={() => {}} />
      <PowerModal ref={powerModalRef} onSelect={() => {}} />
      <NumberOfOwnersModal ref={numberOfOwnersModalRef} onSelect={() => {}} />
      <TradeAllowModal ref={tradeAllowModalRef} onSelect={() => {}} />
      <DocumentsOkModal ref={documentsOkModalRef} onSelect={() => {}} />
      <PhotoModal ref={photoModalRef} onSelect={() => {}} />
      <SellerModal ref={sellerModalRef} onSelect={() => {}} />
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

const ModalButton = ({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}) => {
  const theme = useTheme() as CustomTheme;

  return (
    <Pressable
      onPress={onPress}
      className={clsx(
        "px-4 py-3 flex flex-row justify-between items-center",
        "bg-background-neutral dark:bg-background-neutral-dark",
        "rounded-md border border-border dark:border-border-dark"
      )}
    >
      <Text className="text-font dark:text-font-dark font-bold">{label}</Text>
      <Entypo name="chevron-right" size={24} color={theme.colors.icon} />
    </Pressable>
  );
};

const BottomSheetModalButton = ({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}) => {
  const theme = useTheme() as CustomTheme;

  return (
    <Pressable
      onPress={onPress}
      className={clsx(
        "px-4 py-3 flex flex-row justify-between items-center",
        "bg-background-neutral dark:bg-background-neutral-dark",
        "rounded-md border border-border dark:border-border-dark"
      )}
    >
      <Text className="text-font dark:text-font-dark font-bold">{label}</Text>
      <Entypo name="chevron-down" size={24} color={theme.colors.icon} />
    </Pressable>
  );
};
