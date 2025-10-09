import { InputField } from "@/components/ui/InputField";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { CheckboxRectButton } from "@/components/global/CheckboxRectButton";
import CloseIcon from "@/components/global/CloseIcon";
import { BottomSheetRef } from "@/components/global/CustomBottomSheetModal";
import { Button } from "@/components/ui/button";
import BodyTypeModal from "@/modules/advertisement/simple-auto/body-type-modal/body-type-modal";
import ColorModal from "@/modules/advertisement/simple-auto/color-modal/color-modal";
import ConditionModal from "@/modules/advertisement/simple-auto/condition-modal/condition-modal";
import { CurrencyModal } from "@/modules/advertisement/simple-auto/currency-modal";
import DocumentsOkModal from "@/modules/advertisement/simple-auto/documents-ok-modal/documents-ok-modal";
import DrivetrainModal from "@/modules/advertisement/simple-auto/drivetrain-modal/drivetrain-modal";
import EngineCapacityModal from "@/modules/advertisement/simple-auto/engine-capacity-modal/engine-capacity-modal";
import FuelTypeModal from "@/modules/advertisement/simple-auto/fuel-type-modal/fuel-type-modal";
import ImagePickerModal from "@/modules/advertisement/simple-auto/image-picker-modal/image-picker-modal";
import NumberOfOwnersModal from "@/modules/advertisement/simple-auto/number-of-owners-modal/number-of-owners-modal";
import PowerModal from "@/modules/advertisement/simple-auto/power-modal/power-modal";
import { RegionModal } from "@/modules/advertisement/simple-auto/region-modal/region-modal";
import SellerModal from "@/modules/advertisement/simple-auto/seller-modal/seller-modal";
import { useSimpleAutoFormContext } from "@/modules/advertisement/simple-auto/SimpleAutoFormProvider";
import TransmissionModal from "@/modules/advertisement/simple-auto/transmission-modal/transmission-modal";
import YearModal from "@/modules/advertisement/simple-auto/year-modal/year-modal";
import { SimpleAutoApi } from "@/openapi/client";
import { CustomTheme } from "@/theme";
import Entypo from "@expo/vector-icons/Entypo";
import { useTheme } from "@react-navigation/native";
import clsx from "clsx";
import * as ImagePicker from "expo-image-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

type FormValues = {
  name: string;
  description: string;
  price: string;
  images: ImagePicker.ImagePickerAsset[];

  brand?: number;
  model?: number;
  releaseYear?: number;
  region: string;
  currency: string;

  mileage: string;
  transmissionType: string;
  fuelType: string;
  bodyType: string;
  driveTrain: string; // привод
  color: string;
  power: number;
  engineCapacity: number;

  tradeAllow: boolean;
  condition: string;
  numberOfOwner: string;
  documentOk: boolean;
  seller: string;
};

export default function AddCarPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const configuration = new Configuration({
  //       credentials: "include",
  //       headers: {
  //         'Bearer': "dsasa"
  //       },
  //       accessToken: "das"
  //     });

  const router = useRouter();
  const simpleAutoClient = new SimpleAutoApi();
  const {
    selectedBrand,
    selectedModel,
    selectedReleaseYear,
    setSelectedReleaseYear,
    selectedRegion,
    setSelectedRegion,
    selectedCurrency,
    setSelectedCurrency,
    selectedTransmissionType,
    setSelectedTransmissionType,
    selectedFuelType,
    setSelectedFuelType,
    selectedBodyType,
    setSelectedBodyType,
    selectedDriveTrain,
    setSelectedDriveTrain,
    selectedColor,
    setSelectedColor,
    selectedPower,
    setSelectedPower,
    selectedEngineCapacity,
    setSelectedEngineCapacity,
    selectedTradeAllow,
    setSelectedTradeAllow,
    selectedCondition,
    setSelectedCondition,
    selectedNumberOfOwner,
    setSelectedNumberOfOwner,
    selectedDocumentOk,
    setSelectedDocumentOk,
  } = useSimpleAutoFormContext();

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      description: "",
      price: "",
      currency: "",
      images: [],
      brand: undefined,
      model: undefined,
      releaseYear: undefined,
      region: "",

      mileage: "",
      fuelType: "",
      transmissionType: "",
      bodyType: "",
      driveTrain: "",
      engineCapacity: 0,
      power: 0,
      color: "",

      tradeAllow: false,
      condition: "",
      seller: "",
    },
  });

  // Form submit handler
  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);

      const formData = new FormData();

      // Add main fields
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("currency", data.currency);
      formData.append("region", data.region);

      // Add car details
      if (selectedBrand?.id)
        formData.append("brand", selectedBrand.id.toString());
      if (selectedModel?.id)
        formData.append("model", selectedModel.id.toString());
      if (data.releaseYear)
        formData.append("releaseYear", data.releaseYear.toString());
      if (data.mileage) formData.append("mileage", data.mileage);
      if (data.transmissionType)
        formData.append("transmissionType", data.transmissionType);
      if (data.fuelType) formData.append("fuelType", data.fuelType);
      if (data.bodyType) formData.append("bodyType", data.bodyType);
      if (data.driveTrain) formData.append("driveTrain", data.driveTrain);
      if (data.color) formData.append("color", data.color);
      if (data.power) formData.append("power", data.power.toString());
      if (data.engineCapacity)
        formData.append("engineCapacity", data.engineCapacity.toString());

      // Add additional info
      formData.append("tradeAllow", data.tradeAllow ? "1" : "0");
      formData.append("condition", data.condition);
      formData.append("numberOfOwner", data.numberOfOwner);
      formData.append("documentOk", data.documentOk ? "1" : "0");
      formData.append("seller", data.seller);

      // Add images
      data.images.forEach((image, index) => {
        const fileExtension = image.uri.split(".").pop();
        formData.append("images", {
          uri: image.uri,
          type: `image/${fileExtension}`,
          name: `image_${index}.${fileExtension}`,
        } as any);
      });

      await simpleAutoClient.postAppSimpleautocontextPresentationSimpleautocreateCreate(
        {
          postAppSimpleautocontextPresentationSimpleautocreateCreateRequest:
            formData as any,
        }
      );

      // Success
      alert("Объявление успешно создано!");
      router.back();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Произошла ошибка при создании объявления. Попробуйте еще раз.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (selectedBrand && selectedBrand.id) {
      setValue("brand", selectedBrand.id);
    }
  }, [selectedBrand, setValue]);

  useEffect(() => {
    if (selectedModel && selectedModel.id) {
      setValue("model", selectedModel.id);
    }
  }, [selectedModel, setValue]);

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
  const documentsOkModalRef = useRef<BottomSheetRef>(null);
  const sellerModalRef = useRef<BottomSheetRef>(null);
  const imagePickerModalRef = useRef<BottomSheetRef>(null);

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
  const handlePresentDocumentsOkModalPress = useCallback(() => {
    documentsOkModalRef.current?.present();
  }, []);
  const handlePresentSellerModalPress = useCallback(() => {
    sellerModalRef.current?.present();
  }, []);

  const handlePresentImagePickerModalPress = useCallback(() => {
    imagePickerModalRef.current?.present();
  }, []);

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
            name="name"
            rules={{
              required: "Заголовок объявления обязателен",
              minLength: {
                value: 10,
                message: "Заголовок должен содержать минимум 10 символов",
              },
              maxLength: {
                value: 100,
                message: "Заголовок не должен превышать 100 символов",
              },
            }}
            render={({ field }) => {
              return (
                <InputField
                  {...field}
                  required
                  error={errors.name?.message}
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
          <BottomSheetModalButton
            label="Добавить фотографии"
            onPress={handlePresentImagePickerModalPress}
          />
          <ImagePickerModal
            ref={imagePickerModalRef}
            onSelect={(images) => {
              setValue("images", images);
              imagePickerModalRef.current?.close();
            }}
          />
          <Controller
            control={control}
            name="price"
            rules={{
              required: "Цена обязательна",
              min: {
                value: 1,
                message: "Цена должна быть больше 0",
              },
              pattern: {
                value: /^\d+$/,
                message: "Введите только цифры",
              },
            }}
            render={({ field }) => {
              return (
                <InputField
                  ref={field.ref}
                  value={field.value.toString()}
                  onChange={(e) => field.onChange(e)}
                  label={"Цена"}
                  keyboardType="numeric"
                  placeholder="1500"
                  required
                />
              );
            }}
          />
          <CurrencyModal
            onSelect={(currency) => {
              setValue("currency", currency.value);
              setSelectedCurrency(currency.label);
            }}
          />
          <ModalButton
            label={selectedBrand?.name ?? "Марка"}
            onPress={() =>
              router.push("/(app)/advertisement/simple-auto/brand-auto-modal")
            }
          />
          {selectedBrand && (
            <ModalButton
              label={selectedModel?.name ?? "Модель"}
              onPress={() =>
                router.push(
                  "/(app)/advertisement/simple-auto/brand-auto-type-modal"
                )
              }
            />
          )}
          {selectedModel && (
            <ModalButton
              label={"Поколение"}
              onPress={() =>
                router.push("/(app)/advertisement/simple-auto/generation-modal")
              }
            />
          )}
          <BottomSheetModalButton
            label={"Год"}
            onPress={handlePresentYearModalPress}
          />
          <YearModal
            ref={yearModalRef}
            onChange={(releaseYear) => {
              console.log(releaseYear);
              setValue("releaseYear", releaseYear.value);
            }}
          />
          <BottomSheetModalButton
            label={"Регион"}
            onPress={handlePresentRegionModalPress}
            selectedValue={selectedRegion ?? undefined}
          />
          <RegionModal
            ref={regionModalRef}
            onChange={(region) => {
              console.log(region);
              setValue("region", region.slug || "");
              setSelectedRegion(region.name || "");
              regionModalRef.current?.close({ duration: 150 });
            }}
          />
        </View>

        {/* Характеристики автомобиля */}
        <View className="p-5 rounded-2xl mb-5 bg-surface dark:bg-surface-dark">
          <View className="flex-row items-center mb-5">
            <Text className="text-xl font-bold text-font dark:text-font-dark">
              Характеристики
            </Text>
          </View>
          <View className="gap-y-3">
            {/* Buttons to open modals and bottom sheet modals */}
            <BottomSheetModalButton
              label={"Коробка передач"}
              onPress={handlePresentTransmissionModalPress}
              selectedValue={selectedTransmissionType ?? undefined}
            />
            <TransmissionModal
              ref={transmissionModalRef}
              onSelect={(transmisison) => {
                setValue("transmissionType", transmisison.value);
                setSelectedTransmissionType(transmisison.label);
                transmissionModalRef.current?.close({ duration: 150 });
              }}
            />
            <BottomSheetModalButton
              label={"Тип топлива"}
              onPress={handlePresentFuelTypeModalPress}
              selectedValue={selectedFuelType ?? undefined}
            />
            <FuelTypeModal
              ref={fuelTypeModalRef}
              onSelect={(fuelType) => {
                setValue("fuelType", fuelType.value);
                setSelectedFuelType(fuelType.label);
              }}
            />
            <BottomSheetModalButton
              label={"Тип кузова"}
              onPress={handlePresentBodyTypeModalPress}
              selectedValue={selectedBodyType ?? undefined}
            />
            <BodyTypeModal
              ref={bodyTypeModalRef}
              onSelect={(bodyType) => {
                setValue("bodyType", bodyType.value);
                setSelectedBodyType(bodyType.label);
              }}
            />
            <BottomSheetModalButton
              label={"Привод"}
              onPress={handlePresentDrivetrainModalPress}
              selectedValue={selectedDriveTrain ?? undefined}
            />
            <DrivetrainModal
              ref={drivetrainModalRef}
              onSelect={(driveTrain) => {
                setValue("driveTrain", driveTrain.value);
                setSelectedDriveTrain(driveTrain.label);
              }}
            />
            <BottomSheetModalButton
              label={"Цвет"}
              onPress={handlePresentColorModalPress}
              selectedValue={selectedColor ?? undefined}
            />
            <ColorModal
              ref={colorModalRef}
              onSelect={(color) => {
                setValue("color", color.value);
                setSelectedColor(color.label);
              }}
            />
            <BottomSheetModalButton
              label={"Объем двигателя"}
              onPress={handlePresentEngineCapacityModalPress}
              selectedValue={selectedEngineCapacity ?? undefined}
            />
            <EngineCapacityModal
              ref={engineCapacityModalRef}
              onSelect={(engineCapacity) => {
                setValue("engineCapacity", engineCapacity.value);
                setSelectedEngineCapacity(engineCapacity.value.toString());
              }}
            />
            <BottomSheetModalButton
              label={"Мощность"}
              onPress={handlePresentPowerModalPress}
              selectedValue={selectedPower ?? undefined}
            />
            <PowerModal
              ref={powerModalRef}
              onSelect={(power) => {
                setValue("power", power.value);
                setSelectedFuelType(power.label);
              }}
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
          </View>
        </View>

        <View className="p-5 rounded-2xl mb-5 bg-surface dark:bg-surface-dark gap-y-3">
          <BottomSheetModalButton
            label={"Состояние"}
            onPress={handlePresentConditionModalPress}
            selectedValue={selectedCondition ?? undefined}
          />
          <ConditionModal
            ref={conditionModalRef}
            onSelect={(condition) => {
              setValue("condition", condition.value);
              setSelectedFuelType(condition.label);
            }}
          />
          <Controller
            control={control}
            name="tradeAllow"
            render={({ field }) => {
              console.log(field.value);
              return (
                <CheckboxRectButton
                  label="Обмен возможен - ТОРГ"
                  value={field.value}
                  onPress={() => field.onChange(!field.value)} // toggle value
                />
              );
            }}
          />
          <BottomSheetModalButton
            label={"Документы в порядке"}
            onPress={handlePresentDocumentsOkModalPress}
          />
          <DocumentsOkModal
            ref={documentsOkModalRef}
            onSelect={(document) => {
              setValue("documentOk", document.value);
              setSelectedDocumentOk(document.value);
            }}
          />
          <BottomSheetModalButton
            label={"Количество владельцев"}
            onPress={handlePresentNumberOfOwnersModalPress}
            selectedValue={selectedNumberOfOwner ?? undefined}
          />
          <NumberOfOwnersModal
            ref={numberOfOwnersModalRef}
            onSelect={(numberOfOwner) => {
              setValue("numberOfOwner", numberOfOwner.toString());
              setSelectedNumberOfOwner(numberOfOwner.toString());
            }}
          />
          <BottomSheetModalButton
            label={"Продавец"}
            onPress={handlePresentSellerModalPress}
          />
          <SellerModal
            ref={sellerModalRef}
            onSelect={(seller) => {
              setValue("seller", seller.value);
              setSelectedFuelType(seller.label);
            }}
          />
        </View>

        {/* Кнопка создания */}
        <Button
          onPress={handleSubmit(onSubmit)}
          style={{ marginVertical: 20 }}
          disabled={isSubmitting}
        >
          <Text>{isSubmitting ? "Создание..." : "Создать объявление"}</Text>
        </Button>
      </KeyboardAwareScrollView>
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
  selectedValue,
}: {
  label: string;
  onPress: () => void;
  selectedValue?: string;
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
      <View>
        <Text className="text-font dark:text-font-dark font-bold">{label}</Text>
        {selectedValue && (
          <Text className="text-font-subtle dark:text-font-subtle-dark">
            {selectedValue}
          </Text>
        )}
      </View>

      <Entypo name="chevron-down" size={24} color={theme.colors.icon} />
    </Pressable>
  );
};
