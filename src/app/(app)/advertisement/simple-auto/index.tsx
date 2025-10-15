import { InputField } from "@/components/ui/InputField";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { CheckboxRectButton } from "@/components/global/CheckboxRectButton";
import CloseIcon from "@/components/global/CloseIcon";
import { BottomSheetRef } from "@/components/global/CustomBottomSheetModal";
import { TouchableHighlightRow } from "@/components/global/TouchableHighlightRow/TouchableHighlightRow";
import { Button } from "@/components/ui/button";
import BodyTypeModal from "@/modules/advertisement/simple-auto/body-type-modal/body-type-modal";
import ColorModal from "@/modules/advertisement/simple-auto/color-modal/color-modal";
import ConditionModal from "@/modules/advertisement/simple-auto/condition-modal/condition-modal";
import { CurrencyModal } from "@/modules/advertisement/simple-auto/currency-modal/CurrencyModal";
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
import { ResponseError, SimpleAutoApi } from "@/openapi/client";
import { useMutation } from "@tanstack/react-query";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useAuthStore } from "@/state/auth/useAuthStore";

type FormValues = {
  description: string;
  price: string;
  images: ImagePicker.ImagePickerAsset[];

  brand?: number;
  model?: number;
  releaseYear?: number;
  region: string;
  currency: string;

  mileage: string;
  transmission_type: string;
  fuel_type: string;
  frame_type: string;
  drive_train: string; // привод
  color: string;
  power: number;
  engine_capacity: number;

  trade_allow: boolean;
  condition: string;
  number_of_owner: string;
  document_ok: boolean;
  seller: string;
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
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      Alert.alert("Authentication Required", "You need to be logged in to create an advertisement.", [
        { text: "Login", onPress: () => router.push("/sign-in") },
        { text: "Cancel", onPress: () => router.back() }
      ]);
    }
  }, [isAuthenticated]);

  const simpleAutoClient = new SimpleAutoApi();
  const {
    selectedBrand,
    selectedModel,
    selectedGeneration,
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
    selectedSeller,
    setSelectedSeller,
  } = useSimpleAutoFormContext();

  const mutateAdvertisement = useMutation({
    mutationFn: async (formData: FormData) => {
      const formParams = new FormData();

      formParams.append("description", formData.get("description") as any);
      formParams.append("price", formData.get("price") as any);
      formParams.append("currency", formData.get("currency") as any);
      formParams.append("region", formData.get("region") as any);
      formParams.append("releaseYear", formData.get("releaseYear") as any);
      formParams.append("brand", formData.get("brand") as any);
      formParams.append("model", formData.get("model") as any);
      formParams.append("generationId", formData.get("generationId") as any);
      formParams.append("modificationId", formData.get("modificationId") as any);

      formParams.append("parameters[mileage]", formData.get("mileage") as any);
      formParams.append("parameters[transmission]", formData.get("transmission_type") as any);
      formParams.append("parameters[fuel_type]", formData.get("fuel_type") as any);
      formParams.append("parameters[frame_type]", formData.get("frame_type") as any);
      formParams.append("parameters[drivetrain_type]", formData.get("drive_train") as any);
      formParams.append("parameters[color]", formData.get("color") as any);
      formParams.append("parameters[power]", formData.get("power") as any);
      formParams.append("parameters[engine_capacity]", formData.get("engine_capacity") as any);
      formParams.append("parameters[trade_allow]", formData.get("trade_allow") ? "1" : "0");
      formParams.append("parameters[condition]", formData.get("condition") as any);
      formParams.append("parameters[number_of_owner]", formData.get("number_of_owner") as any);
      formParams.append("parameters[document_type]", formData.get("document_ok"));
      formParams.append("parameters[seller]", formData.get("seller") as any);

      formData.getAll("images").forEach((element) => {
        formParams.append("images[]", element as any);
      });
      try {
        const res = await simpleAutoClient.postAppSimpleautocontextPresentationSimpleautocreateCreateRaw({
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: formParams,
        });
        return res;
      } catch (e) {
        console.log("ERROR", e);
        console.log("EMD");
        throw e;
      }
    },
    onSuccess: (e) => {
      console.log("SUCCESS", e);
      // TODO: make something when success
    },
    onError: async (error: ResponseError) => {
      console.log("ERROR", error);
      console.log(await error.response.json());
      console.log("EMD");
      console.log("EMD");
      console.log("EMD");
      // TODO: make something when error
    },
  });

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      description: "",
      price: "",
      currency: "",
      images: [],
      brand: undefined,
      model: undefined,
      releaseYear: undefined,
      region: "",

      mileage: "",
      fuel_type: "",
      transmission_type: "",
      frame_type: "",
      drive_train: "",
      engine_capacity: 0,
      power: 0,
      color: "",

      trade_allow: false,
      condition: "",
      seller: "",
    },
  });

  // Form submit handler
  const onSubmit = async (data: FormValues) => {
    console.log(data.mileage, isNaN(Number(data.mileage)), Number(data.mileage));

    try {
      // Validate required fields
      if (!selectedBrand?.id || !selectedModel?.id || !data.releaseYear || !data.region) {
        alert("Пожалуйста, заполните все обязательные поля");
        return;
      }

      // Validate images
      if (!data.images || data.images.length === 0) {
        alert("Пожалуйста, добавьте хотя бы одно фото");
        return;
      }
      const formData = new FormData();

      // Add main fields with validation
      formData.append("description", (data.description || "").trim());
      formData.append("price", data.price.toString());
      formData.append("currency", data.currency);
      formData.append("region", data.region);

      // Add car details
      formData.append("brand", selectedBrand.id.toString());
      formData.append("model", selectedModel.id.toString());
      formData.append("generationId", selectedGeneration?.id.toString());
      formData.append("modificationId", selectedGeneration?.modification?.id.toString());
      formData.append("releaseYear", data.releaseYear.toString());

      if (data.mileage && !isNaN(Number(data.mileage))) {
        formData.append("mileage", data.mileage);
      }

      if (data.transmission_type) {
        formData.append("transmission_type", data.transmission_type);
      }

      if (data.fuel_type) {
        formData.append("fuel_type", data.fuel_type);
      }

      if (data.frame_type) {
        formData.append("frame_type", data.frame_type);
      }

      if (data.drive_train) {
        formData.append("drive_train", data.drive_train);
      }

      if (data.color) {
        formData.append("color", data.color);
      }

      if (data.power && !isNaN(Number(data.power))) {
        formData.append("power", data.power.toString());
      }

      if (data.engine_capacity && !isNaN(Number(data.engine_capacity))) {
        formData.append("engine_capacity", data.engine_capacity.toString());
      }

      // Add additional info with validation
      formData.append("trade_allow", data.trade_allow ? "1" : "0");

      if (data.condition) {
        formData.append("condition", data.condition);
      }

      if (data.number_of_owner) {
        formData.append("number_of_owner", data.number_of_owner.toString());
      }

      formData.append("document_ok", data.document_ok);

      if (data.seller) {
        formData.append("seller", data.seller);
      }

      // Add images with validation
      data.images.forEach((image, index) => {
        if (!image.uri) return;

        const fileExtension = image.uri.split(".").pop()?.toLowerCase();
        if (!fileExtension) return;

        if (!["jpg", "jpeg", "png"].includes(fileExtension)) {
          throw new Error(`Неподдерживаемый формат изображения: ${fileExtension}`);
        }

        formData.append("images", {
          uri: image.uri,
          type: `image/${fileExtension}`,
          name: `image_${index}.${fileExtension}`,
        } as any);
      });

      mutateAdvertisement.mutate(formData);

      // if (result) {
      //   Alert.alert("Успешно", "Объявление успешно создано!", [
      //     { text: "OK", onPress: () => router.back() },
      //   ]);
      // }
    } catch (error) {
      console.error("Error submitting form:", error);
      Alert.alert("Ошибка", "Произошла ошибка при создании объявления. Попробуйте еще раз.", [{ text: "OK" }]);
    } finally {
      // setIsSubmitting(false);
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

  const currencyModalRef = useRef<BottomSheetRef>(null);
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

  const handlePresentCurrencyModalPress = useCallback(() => {
    currencyModalRef.current?.present();
  }, []);
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
            <Text className="text-xl font-bold text-font dark:text-font-dark">Основная информация</Text>
          </View>
          {/* <Controller
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
          /> */}

          {/** Brand Selection */}
          <TouchableHighlightRow
            variant="bordered"
            label={"Марка"}
            selectedValue={selectedBrand?.name ?? undefined}
            onPress={() => router.push("/(app)/advertisement/simple-auto/brand-auto-modal")}
            rightIcon="chevron-right"
          />

          <TouchableHighlightRow
            variant="bordered"
            label={"Модель"}
            selectedValue={selectedModel?.name ?? undefined}
            onPress={() => router.push("/(app)/advertisement/simple-auto/brand-auto-type-modal")}
            rightIcon="chevron-right"
            disabled={!selectedBrand}
          />

          <TouchableHighlightRow
            variant="bordered"
            label={"Поколение"}
            selectedValue={
              selectedGeneration?.generation
                ? `${selectedGeneration.generation} поколение ${selectedGeneration?.modification?.yearStart} - ${
                    selectedGeneration?.modification?.yearEnd ?? "н.в."
                  }, рестайлинг ${selectedGeneration?.modification?.restyling}`
                : undefined
            }
            onPress={() => router.push("/(app)/advertisement/simple-auto/generation-modal")}
            rightIcon="chevron-right"
            disabled={!selectedModel}
          />

          {/** Year Selection */}
          <TouchableHighlightRow
            variant="bordered"
            label={"Год"}
            selectedValue={selectedReleaseYear ?? undefined}
            onPress={handlePresentYearModalPress}
            rightIcon="chevron-down"
          />
          <YearModal
            ref={yearModalRef}
            onChange={(releaseYear) => {
              setValue("releaseYear", releaseYear);
              setSelectedReleaseYear(releaseYear);
              yearModalRef.current?.close({ duration: 150 });
            }}
          />
        </View>

        {/* Характеристики автомобиля */}
        <View className="p-5 rounded-2xl mb-5 bg-surface dark:bg-surface-dark">
          <View className="flex-row items-center mb-5">
            <Text className="text-xl font-bold text-font dark:text-font-dark">Характеристики</Text>
          </View>
          <View className="gap-y-3">
            {/* Buttons to open modals and bottom sheet modals */}

            <TouchableHighlightRow
              variant="bordered"
              label={"Коробка передач"}
              onPress={handlePresentTransmissionModalPress}
              selectedValue={selectedTransmissionType ?? undefined}
              rightIcon="chevron-down"
            />
            <TransmissionModal
              ref={transmissionModalRef}
              onSelect={(transmisison) => {
                setValue("transmission_type", transmisison.value);
                setSelectedTransmissionType(transmisison.label);
                transmissionModalRef.current?.close({ duration: 150 });
              }}
            />

            <TouchableHighlightRow
              variant="bordered"
              label={"Тип топлива"}
              onPress={handlePresentFuelTypeModalPress}
              selectedValue={selectedFuelType ?? undefined}
              rightIcon="chevron-down"
            />
            <FuelTypeModal
              ref={fuelTypeModalRef}
              onSelect={(fuelType) => {
                setValue("fuel_type", fuelType.value);
                setSelectedFuelType(fuelType.label);
                fuelTypeModalRef.current?.close({ duration: 150 });
              }}
            />

            <TouchableHighlightRow
              variant="bordered"
              label={"Тип кузова"}
              onPress={handlePresentBodyTypeModalPress}
              selectedValue={selectedBodyType ?? undefined}
              rightIcon="chevron-down"
            />
            <BodyTypeModal
              ref={bodyTypeModalRef}
              onSelect={(frameType) => {
                setValue("frame_type", frameType.value);
                setSelectedBodyType(frameType.label);
                bodyTypeModalRef.current?.close({ duration: 150 });
              }}
            />

            <TouchableHighlightRow
              variant="bordered"
              label={"Привод"}
              onPress={handlePresentDrivetrainModalPress}
              selectedValue={selectedDriveTrain ?? undefined}
              rightIcon="chevron-down"
            />
            <DrivetrainModal
              ref={drivetrainModalRef}
              onSelect={(driveTrain) => {
                setValue("drive_train", driveTrain.value);
                setSelectedDriveTrain(driveTrain.label);
                drivetrainModalRef.current?.close({ duration: 150 });
              }}
            />

            <TouchableHighlightRow
              variant="bordered"
              label={"Цвет"}
              onPress={handlePresentColorModalPress}
              selectedValue={selectedColor ?? undefined}
              rightIcon="chevron-down"
            />
            <ColorModal
              ref={colorModalRef}
              onSelect={(color) => {
                setValue("color", color.value);
                setSelectedColor(color.label);
                colorModalRef.current?.close({ duration: 150 });
              }}
            />

            <TouchableHighlightRow
              variant="bordered"
              label={"Объем двигателя"}
              onPress={handlePresentEngineCapacityModalPress}
              selectedValue={selectedEngineCapacity ? `${selectedEngineCapacity} л` : undefined}
              rightIcon="chevron-down"
            />
            <EngineCapacityModal
              ref={engineCapacityModalRef}
              onSelect={(engineCapacity) => {
                setValue("engine_capacity", engineCapacity);
                setSelectedEngineCapacity(engineCapacity);
              }}
            />

            <TouchableHighlightRow
              variant="bordered"
              label={"Мощность"}
              onPress={handlePresentPowerModalPress}
              selectedValue={selectedPower ? `${selectedPower} л.с.` : undefined}
              rightIcon="chevron-down"
            />
            <PowerModal
              ref={powerModalRef}
              onSelect={(power) => {
                setValue("power", power);
                setSelectedPower(power);
              }}
            />
            <Controller
              control={control}
              name="mileage"
              rules={{
                pattern: {
                  value: /^\d+$/,
                  message: "Введите только цифры",
                },
              }}
              render={({ field, fieldState: { error } }) => {
                return (
                  <InputField
                    ref={field.ref}
                    value={field.value.toString()}
                    onChange={field.onChange}
                    label={"Пробег (км)"}
                    keyboardType="numeric"
                    placeholder="50000"
                    error={error?.message}
                  />
                );
              }}
            />
          </View>
        </View>

        <View className="p-5 rounded-2xl mb-5 bg-surface dark:bg-surface-dark gap-y-3">
          <TouchableHighlightRow
            variant="bordered"
            label={"Состояние"}
            onPress={handlePresentConditionModalPress}
            selectedValue={selectedCondition ?? undefined}
            rightIcon="chevron-down"
          />
          <ConditionModal
            ref={conditionModalRef}
            onSelect={(condition) => {
              setValue("condition", condition.value);
              setSelectedCondition(condition.label);
              conditionModalRef.current?.close({ duration: 150 });
            }}
          />

          <Controller
            control={control}
            name="trade_allow"
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

          <TouchableHighlightRow
            variant="bordered"
            label={"Документы в порядке"}
            selectedValue={selectedDocumentOk !== undefined ? (selectedDocumentOk ? "Да" : "Нет") : undefined}
            onPress={handlePresentDocumentsOkModalPress}
            rightIcon="chevron-down"
          />
          <DocumentsOkModal
            ref={documentsOkModalRef}
            onSelect={(document) => {
              setValue("document_ok", document.value);
              setSelectedDocumentOk(document.value);
              documentsOkModalRef.current?.close({ duration: 150 });
            }}
          />

          <TouchableHighlightRow
            variant="bordered"
            label={"Количество владельцев"}
            onPress={handlePresentNumberOfOwnersModalPress}
            selectedValue={selectedNumberOfOwner ?? undefined}
            rightIcon="chevron-down"
          />
          <NumberOfOwnersModal
            ref={numberOfOwnersModalRef}
            onSelect={(numberOfOwner) => {
              setValue("number_of_owner", numberOfOwner.value);
              setSelectedNumberOfOwner(numberOfOwner.label);
              numberOfOwnersModalRef.current?.close({ duration: 150 });
            }}
          />

          <TouchableHighlightRow
            variant="bordered"
            label={"Продавец"}
            onPress={handlePresentSellerModalPress}
            rightIcon="chevron-down"
            selectedValue={selectedSeller ?? undefined}
          />
          <SellerModal
            ref={sellerModalRef}
            onSelect={(seller) => {
              setValue("seller", seller.value);
              setSelectedSeller(seller.label);
              sellerModalRef.current?.close({ duration: 150 });
            }}
          />
        </View>

        <View className="p-5 rounded-2xl mb-5 bg-surface dark:bg-surface-dark gap-y-3">
          <Controller
            control={control}
            name="description"
            rules={{
              required: "Описание обязательно",
            }}
            render={({ field }) => {
              return (
                <InputField
                  {...field}
                  label={"Описание"}
                  required
                  error={errors.description?.message}
                  multiline
                  textAlignVertical="top"
                  placeholder="Опишите состояние автомобиля, особенности, дополнительное оборудование..."
                />
              );
            }}
          />

          <TouchableHighlightRow variant="bordered" label="Добавить фотографии" onPress={handlePresentImagePickerModalPress} />
          <ImagePickerModal
            control={control}
            ref={imagePickerModalRef}
            onSelect={(images) => {
              setValue("images", images);
              imagePickerModalRef.current?.close();
            }}
          />

          {/** Display selected images */}
          <Controller
            control={control}
            name="images"
            render={({ field }) => {
              if (!field.value || field.value.length === 0) {
                return <View />;
              }

              return (
                <View className="mt-3">
                  <Text className="text-sm text-font-subtle dark:text-font-subtle-dark mb-2">
                    Выбранные фотографии ({field.value.length})
                  </Text>
                  <View className="flex-row flex-wrap gap-2">
                    {field.value.map((image, index) => (
                      <View key={index} className="relative">
                        <Image source={{ uri: image.uri }} className="w-20 h-20 rounded-lg" contentFit="cover" />
                        <Pressable
                          onPress={() => {
                            const newImages = field.value.filter((_, i) => i !== index);
                            setValue("images", newImages);
                          }}
                          className="absolute -top-2 -right-2 bg-red-500 rounded-full w-6 h-6 items-center justify-center"
                        >
                          <Text className="text-white text-xs font-bold">×</Text>
                        </Pressable>
                      </View>
                    ))}
                  </View>
                </View>
              );
            }}
          />
          <View className="flex-1 flex-row gap-x-2">
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

            <TouchableHighlightRow
              variant="bordered"
              label={"Валюта"}
              selectedValue={selectedCurrency ?? undefined}
              onPress={() => handlePresentCurrencyModalPress()}
              rightIcon="chevron-down"
            />
            <CurrencyModal
              ref={currencyModalRef}
              onSelect={(currency) => {
                setValue("currency", currency.value);
                setSelectedCurrency(currency.label);
                currencyModalRef.current?.close({ duration: 150 });
              }}
            />
          </View>

          {/** Region Selection */}
          <TouchableHighlightRow
            variant="bordered"
            label={"Регион"}
            selectedValue={selectedRegion ?? undefined}
            onPress={handlePresentRegionModalPress}
            rightIcon="chevron-down"
          />
          <RegionModal
            ref={regionModalRef}
            onChange={(region) => {
              setValue("region", region.slug || "");
              setSelectedRegion(region.name || "");
              regionModalRef.current?.close({ duration: 150 });
            }}
          />
        </View>

        {/* Кнопка создания */}
        <Button
          onPress={handleSubmit(onSubmit)}
          style={{ marginVertical: 20 }}
          // disabled={isSubmitting}
        >
          <Text>{"Создать объявление"}</Text>
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
        <Text className="text-3xl font-bold text-font dark:text-font-dark">Продать авто</Text>
        <Text className="text-base text-font-subtle dark:text-font-subtle-dark">Заполните информацию о вашем автомобиле</Text>
      </View>
    </View>
  );
};
