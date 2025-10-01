import { InputField } from "@/components/ui/InputField";
import { useRouter } from "expo-router";
import { useCallback, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CloseIcon from "@/components/global/CloseIcon";
import { Button } from "@/components/ui/button";
import { useSimpleAutoFormContext } from "@/modules/advertisement/simple-auto/SimpleAutoFormProvider";
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
import { Checkbox } from "expo-checkbox";
import { Configuration, SimpleAutoApi } from "@/openapi/client";

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

// const configuration = new Configuration({
//       credentials: "include",
//       headers: {
//         'Bearer': "dsasa"
//       },
//       accessToken: "das"
//     });


  const router = useRouter();
  const simpleAutoClient = new SimpleAutoApi();
  const { selectedBrand, selectedModel } = useSimpleAutoFormContext();
  console.log(selectedBrand);

  const { control, handleSubmit, getValues, reset } = useForm({
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      currency: "USD",
      location: "",
      images: [],
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

  // Form submit handler
  const onSubmit = (data) => {
    // Here you can send data to your API or handle it as needed
    console.log("Form submitted:", data);
    // Example: reset();
    simpleAutoClient.postAppSimpleautocontextPresentationSimpleautocreateCreate(
      {
        postAppSimpleautocontextPresentationSimpleautocreateCreateRequest: {
        ...data,
        brand: selectedBrand?.name || "",
        model: selectedModel?.name || "",
      }}
    );
  };

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

  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-background-page dark:bg-background-page-dark">
      <KeyboardAwareScrollView>
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

            <BottomSheetModalButton
              label={"Год"}
              onPress={handlePresentYearModalPress}
            />
            <BottomSheetModalButton
              label={"Регион"}
              onPress={handlePresentRegionModalPress}
            />
            <BottomSheetModalButton
              label={"Коробка передач"}
              onPress={handlePresentTransmissionModalPress}
            />
            <BottomSheetModalButton
              label={"Тип топлива"}
              onPress={handlePresentFuelTypeModalPress}
            />
            <BottomSheetModalButton
              label={"Тип кузова"}
              onPress={handlePresentBodyTypeModalPress}
            />
            <BottomSheetModalButton
              label={"Привод"}
              onPress={handlePresentDrivetrainModalPress}
            />
            <BottomSheetModalButton
              label={"Состояние"}
              onPress={handlePresentConditionModalPress}
            />

            <View>
              <BottomSheetModalButton
                label={"Цвет"}
                onPress={handlePresentColorModalPress}
              />
            </View>

            <BottomSheetModalButton
              label={"Объем двигателя"}
              onPress={handlePresentEngineCapacityModalPress}
            />
            <BottomSheetModalButton
              label={"Мощность"}
              onPress={handlePresentPowerModalPress}
            />

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

            <BottomSheetModalButton
              label={"Количество владельцев"}
              onPress={handlePresentNumberOfOwnersModalPress}
            />

            <View>
              <Checkbox
                disabled={false}
                value={toggleCheckBox}
                onValueChange={(newValue) => setToggleCheckBox(newValue)}
              />
              <Text className="text-font dark:text-font-dark">
                Обмен возможен - ТОРГ
              </Text>
            </View>

            {/* <View>
              <CheckBox
                disabled={false}
                value={toggleCheckBox}
                onValueChange={(newValue) => setToggleCheckBox(newValue)}
              />
              <Text>Документы в</Text>
            </View> */}

            <BottomSheetModalButton
              label={"Документы в порядке"}
              onPress={handlePresentDocumentsOkModalPress}
            />
            <BottomSheetModalButton
              label={"Фото"}
              onPress={handlePresentPhotoModalPress}
            />

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
        </View>

        {/* Кнопка создания */}
        <Button onPress={handleSubmit(onSubmit)} style={{ marginVertical: 20 }}>
          <Text>Создать объявление</Text>
        </Button>
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
