import { CheckboxRectButton } from '@/components/global/CheckboxRectButton';
import CloseIcon from '@/components/global/CloseIcon';
import { BottomSheetRef } from '@/components/global/CustomBottomSheetModal';
import { OptimizedImageList } from '@/components/global/OptimizedImageList/OptimizedImageList';
import OptimizedImagePickerModal from '@/components/global/OptimizedImagePickerModal/OptimizedImagePickerModal';
import { TouchableHighlightRow } from '@/components/global/TouchableHighlightRow/TouchableHighlightRow';
import { CustomRectButton } from '@/components/ui/button';
import { InputField } from '@/components/ui/input/InputField/InputField';
import { useAuthContext } from '@/context/AuthContext';
import { useToast } from '@/hooks/useToast';
import { useSimpleAutoFormContext } from '@/modules/advertisement/simple-auto/SimpleAutoFormProvider';
import { useSimpleAutoAdvertisementCreateMutate } from '@/modules/advertisement/simple-auto/useSimpleAutoAdvertisementCreateMutate';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ColorCreateBottomSheetControllerWrapper } from '@/components/create/ColorCreateBottomSheet';
import { ConditionCreateBottomSheetControllerWrapper } from '@/components/create/ConditionCreateBottomSheet';
import { CurrencyCreateBottomSheetControllerWrapper } from '@/components/create/CurrencyCreateBottomSheet';
import { DocumentsOkCreateBottomSheetControllerWrapper } from '@/components/create/DocumentsOkCreateBottomSheet';
import { DrivetrainCreateBottomSheetControllerWrapper } from '@/components/create/DrivetrainCreateBottomSheet';
import { EngineCapacityCreateBottomSheetControllerWrapper } from '@/components/create/EngineCapacityCreateBottomSheet';
import { BodyTypeCreateBottomSheetControllerWrapper } from '@/components/create/FrameTypeCreateBottomSheet';
import { FuelTypeCreateBottomSheetControllerWrapper } from '@/components/create/FuelTypeCreateBottomSheet';
import { NumberOfOwnersCreateBottomSheetControllerWrapper } from '@/components/create/NumberOfOwnersCreateBottomSheet';
import { PowerCreateBottomSheetControllerWrapper } from '@/components/create/PowerCreateBottomSheet';
import { RegionCreateBottomSheetControllerWrapper } from '@/components/create/RegionCreateBottomSheet';
import { SellerCreateBottomSheetControllerWrapper } from '@/components/create/SellerCreateBottomSheet';
import { TransmissionCreateBottomSheetControllerWrapper } from '@/components/create/TransmissionCreateBottomSheet';
import { YearCreateBottomSheetControllerWrapper } from '@/components/create/YearCreateBottomSheet';
import { LoaderIndicator } from '@/components/global/LoaderIndicator';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

type FormValues = {
  description: string;
  price: string;
  images: ImagePicker.ImagePickerAsset[];

  brand?: number;
  model?: number;
  generationId?: number;
  releaseYear?: number;
  region: string;
  currency: string;

  mileage: string;
  transmission_type: string;
  fuel_type: string;
  frame_type: string;
  drivetrain_type: string; // привод
  color: string;
  power: number;
  engine_capacity: number;

  trade_allow: boolean;
  condition: string;
  number_of_owner: string;
  document_type: string;
  seller: string;
};

export default function AddCarPage() {
  console.log('RENDERING ADD CAR PAGE');
  const router = useRouter();
  const { isAuthenticated } = useAuthContext();
  const { showToast } = useToast();

  // Memoize context values to prevent unnecessary re-renders
  const { selectedBrand, selectedModel, selectedGeneration } = useSimpleAutoFormContext();

  // Memoize authentication check
  const authCheck = useMemo(() => {
    if (!isAuthenticated) {
      return () =>
        Alert.alert('Authentication Required', 'You need to be logged in to create an advertisement.', [
          { text: 'Login', onPress: () => router.push('/sign-in') },
          { text: 'Cancel', onPress: () => router.back() },
        ]);
    }
    return null;
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (authCheck) authCheck();
  }, [authCheck]);

  const mutateAdvertisement = useSimpleAutoAdvertisementCreateMutate({
    onSuccess: data => {
      console.log('Advertisement created successfully:', data);
      showToast('Объявление успешно создано', 'success');
      // reset();
      router.push('/(app)/(tabs)/advertisement');
    },
    onError: async error => {
      console.error('Error creating advertisement:', error);
      const jsonError = await error.response.json();
      console.log(jsonError);
      if (jsonError.errors) {
        for (const [field, message] of Object.entries(jsonError.errors)) {
          setError(field as keyof FormValues, { message: String(message) });
        }
      }
    },
  });

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
    setError,
  } = useForm<FormValues>({
    defaultValues: {
      description: '',
      price: '',
      currency: '',
      images: [],
      brand: undefined,
      model: undefined,
      generationId: undefined,
      releaseYear: undefined,
      region: '',

      mileage: '',
      fuel_type: '',
      transmission_type: '',
      frame_type: '',
      drivetrain_type: '',
      engine_capacity: 0,
      power: 0,
      color: '',

      trade_allow: false,
      condition: '',
      seller: '',
      document_type: '',
    },
  });

  // Form submit handler
  const onSubmit = async (data: FormValues) => {
    console.log(data);

    try {
      // Validate required fields
      if (!selectedBrand?.id || !selectedModel?.id || !data.releaseYear || !data.region) {
        showToast('Пожалуйста, заполните все обязательные поля', 'error');
        return;
      }

      // Validate images
      if (!data.images || data.images.length === 0) {
        showToast('Пожалуйста, добавьте хотя бы одно фото', 'error');
        return;
      }
      const formData = new FormData();

      // Add main fields with validation
      formData.append('description', (data.description || '').trim());
      formData.append('price', data.price.toString());
      formData.append('currency', data.currency);
      formData.append('region', data.region);

      // Add car details
      formData.append('brand', selectedBrand.id.toString());
      formData.append('model', selectedModel.id.toString());
      formData.append('generationId', selectedGeneration?.id.toString());
      formData.append('modificationId', selectedGeneration?.modification?.id.toString());
      formData.append('releaseYear', data.releaseYear.toString());

      if (data.mileage && !isNaN(Number(data.mileage))) {
        formData.append('mileage', data.mileage);
      }

      if (data.transmission_type) {
        formData.append('transmission_type', data.transmission_type);
      }

      if (data.fuel_type) {
        formData.append('fuel_type', data.fuel_type);
      }

      if (data.frame_type) {
        formData.append('frame_type', data.frame_type);
      }

      if (data.drivetrain_type) {
        formData.append('drivetrain_type', data.drivetrain_type);
      }

      if (data.color) {
        formData.append('color', data.color);
      }

      if (data.power && !isNaN(Number(data.power))) {
        formData.append('power', data.power.toString());
      }

      if (data.engine_capacity && !isNaN(Number(data.engine_capacity))) {
        formData.append('engine_capacity', data.engine_capacity.toString());
      }

      // Add additional info with validation
      formData.append('trade_allow', data.trade_allow);

      if (data.condition) {
        formData.append('condition', data.condition);
      }

      if (data.number_of_owner) {
        formData.append('number_of_owner', data.number_of_owner.toString());
      }

      if (data.document_type) {
        formData.append('document_type', data.document_type);
      }

      if (data.seller) {
        formData.append('seller', data.seller);
      }

      // Add images with validation
      data.images.forEach((image, index) => {
        if (!image.uri) return;

        const fileExtension = image.uri.split('.').pop()?.toLowerCase();
        if (!fileExtension) return;

        if (!['jpg', 'jpeg', 'png'].includes(fileExtension)) {
          throw new Error(`Неподдерживаемый формат изображения: ${fileExtension}`);
        }

        formData.append('images', {
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
      console.error('Error submitting form:', error);
      Alert.alert('Ошибка', 'Произошла ошибка при создании объявления. Попробуйте еще раз.', [{ text: 'OK' }]);
    } finally {
      // setIsSubmitting(false);
    }
  };

  const onInvalid = (errors: any) => {
    console.log('Form validation errors:', errors);
    showToast('Пожалуйста, исправьте ошибки в форме', 'error');
  };

  // Memoize brand/model IDs to prevent unnecessary effect runs
  const brandId = useMemo(() => selectedBrand?.id, [selectedBrand?.id]);
  const modelId = useMemo(() => selectedModel?.id, [selectedModel?.id]);
  const generationId = useMemo(() => selectedGeneration?.id, [selectedGeneration?.id]);

  useEffect(() => {
    if (brandId) {
      setValue('brand', brandId);
    }
  }, [brandId, setValue]);

  useEffect(() => {
    if (modelId) {
      setValue('model', modelId);
    }
  }, [modelId, setValue]);

  useEffect(() => {
    if (generationId) {
      setValue('generationId', generationId);
    }
  }, [generationId, setValue]);

  const imagePickerModalRef = useRef<BottomSheetRef>(null);

  const handlePresentImagePickerModalPress = useCallback(() => {
    imagePickerModalRef.current?.present();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-background-page dark:bg-background-page-dark">
      <KeyboardAwareScrollView bottomOffset={80} extraKeyboardSpace={10} keyboardShouldPersistTaps="handled" keyboardDismissMode="on-drag">
        <Header />

        {/* Основная информация */}
        <View className="mb-5 gap-y-3 rounded-2xl bg-surface p-5 dark:bg-surface-dark">
          <View className="mb-5 flex-row items-center">
            <Text className="text-xl font-bold text-font dark:text-font-dark">Основная информация</Text>
          </View>
          {/** Brand Selection */}
          <Controller
            control={control}
            name="brand"
            rules={{
              required: 'Выберите марку',
            }}
            render={({ field: _field, fieldState: { error } }) => (
              <TouchableHighlightRow
                variant="bordered"
                label={'Марка'}
                selectedValue={selectedBrand?.name ?? undefined}
                onPress={() => router.push('/(app)/advertisement/simple-auto/brand-auto-modal')}
                rightIcon="chevron-right"
                required
                error={error?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="model"
            rules={{
              required: 'Выберите модель',
            }}
            render={({ field: _field, fieldState: { error } }) => (
              <TouchableHighlightRow
                variant="bordered"
                label={'Модель'}
                selectedValue={selectedModel?.name ?? undefined}
                onPress={() => router.push('/(app)/advertisement/simple-auto/brand-auto-type-modal')}
                rightIcon="chevron-right"
                disabled={!selectedBrand}
                required
                error={error?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="generationId"
            rules={{
              required: 'Выберите поколение',
            }}
            render={({ field: _field, fieldState: { error } }) => (
              <TouchableHighlightRow
                variant="bordered"
                label={'Поколение'}
                selectedValue={
                  selectedGeneration?.generation
                    ? `${selectedGeneration.generation} поколение ${selectedGeneration?.modification?.yearStart} - ${
                        selectedGeneration?.modification?.yearEnd ?? 'н.в.'
                      }, рестайлинг ${selectedGeneration?.modification?.restyling}`
                    : undefined
                }
                onPress={() => router.push('/(app)/advertisement/simple-auto/generation-modal')}
                rightIcon="chevron-right"
                disabled={!selectedModel}
                required
                error={error?.message}
              />
            )}
          />

          {/** Year Selection */}
          <Controller
            control={control}
            name="releaseYear"
            rules={{
              required: 'Выберите год выпуска',
            }}
            render={({ field, fieldState: { error } }) => (
              <YearCreateBottomSheetControllerWrapper value={field.value} onChange={field.onChange} error={error?.message} />
            )}
          />
        </View>

        {/* Характеристики автомобиля */}
        <View className="mb-5 rounded-2xl bg-surface p-5 dark:bg-surface-dark">
          <View className="mb-5 flex-row items-center">
            <Text className="text-xl font-bold text-font dark:text-font-dark">Характеристики</Text>
          </View>
          <View className="gap-y-3">
            <Controller
              control={control}
              name="transmission_type"
              rules={{
                required: 'Выберите коробку передач',
              }}
              render={({ field, fieldState: { error } }) => (
                <TransmissionCreateBottomSheetControllerWrapper value={field.value} onChange={field.onChange} error={error?.message} />
              )}
            />
            <Controller
              control={control}
              name="fuel_type"
              rules={{
                required: 'Выберите тип топлива',
              }}
              render={({ field, fieldState: { error } }) => (
                <FuelTypeCreateBottomSheetControllerWrapper value={field.value} onChange={field.onChange} error={error?.message} />
              )}
            />
            <Controller
              control={control}
              name="frame_type"
              rules={{
                required: 'Выберите тип кузова',
              }}
              render={({ field, fieldState: { error } }) => (
                <BodyTypeCreateBottomSheetControllerWrapper value={field.value} onChange={field.onChange} error={error?.message} />
              )}
            />
            <Controller
              control={control}
              name="drivetrain_type"
              rules={{
                required: 'Выберите привод',
              }}
              render={({ field, fieldState: { error } }) => (
                <DrivetrainCreateBottomSheetControllerWrapper value={field.value} onChange={field.onChange} error={error?.message} />
              )}
            />
            <Controller
              control={control}
              name="color"
              rules={{
                required: 'Выберите цвет',
              }}
              render={({ field, fieldState: { error } }) => (
                <ColorCreateBottomSheetControllerWrapper value={field.value} onChange={field.onChange} error={error?.message} />
              )}
            />
            <Controller
              control={control}
              name="engine_capacity"
              rules={{
                required: 'Выберите объем двигателя',
              }}
              render={({ field, fieldState: { error } }) => (
                <EngineCapacityCreateBottomSheetControllerWrapper value={field.value} onChange={field.onChange} error={error?.message} />
              )}
            />
            <Controller
              control={control}
              name="power"
              rules={{
                required: 'Выберите мощность',
              }}
              render={({ field, fieldState: { error } }) => (
                <PowerCreateBottomSheetControllerWrapper value={field.value} onChange={field.onChange} error={error?.message} />
              )}
            />

            <Controller
              control={control}
              name="mileage"
              rules={{
                required: 'Пробег обязателен',
                pattern: {
                  value: /^\d+$/,
                  message: 'Введите только цифры',
                },
              }}
              render={({ field, fieldState: { error } }) => {
                return (
                  <InputField
                    ref={field.ref}
                    value={field.value.toString()}
                    onChange={field.onChange}
                    label={'Пробег (км)'}
                    keyboardType="numeric"
                    placeholder="50000"
                    error={error?.message}
                    required
                  />
                );
              }}
            />
          </View>
        </View>

        <View className="mb-5 gap-y-3 rounded-2xl bg-surface p-5 dark:bg-surface-dark">
          <Controller
            control={control}
            name="trade_allow"
            render={({ field }) => {
              return (
                <CheckboxRectButton
                  label="Обмен возможен"
                  value={field.value}
                  onPress={() => field.onChange(!field.value)} // toggle value
                />
              );
            }}
          />
          <Controller
            control={control}
            name="condition"
            rules={{
              required: 'Выберите состояние',
            }}
            render={({ field, fieldState: { error } }) => (
              <ConditionCreateBottomSheetControllerWrapper value={field.value} onChange={field.onChange} error={error?.message} />
            )}
          />
          <Controller
            control={control}
            name="document_type"
            rules={{
              required: 'Выберите состояние документов',
            }}
            render={({ field, fieldState: { error } }) => (
              <DocumentsOkCreateBottomSheetControllerWrapper value={field.value} onChange={value => field.onChange(value)} error={error?.message} />
            )}
          />
          <Controller
            control={control}
            name="number_of_owner"
            rules={{
              required: 'Выберите количество владельцев',
            }}
            render={({ field, fieldState: { error } }) => (
              <NumberOfOwnersCreateBottomSheetControllerWrapper value={field.value} onChange={field.onChange} error={error?.message} />
            )}
          />
          <Controller
            control={control}
            name="seller"
            rules={{
              required: 'Выберите продавца',
            }}
            render={({ field, fieldState: { error } }) => (
              <SellerCreateBottomSheetControllerWrapper value={field.value} onChange={field.onChange} error={error?.message} />
            )}
          />
        </View>

        <View className="mb-5 gap-y-3 rounded-2xl bg-surface p-5 dark:bg-surface-dark">
          <Controller
            control={control}
            name="description"
            rules={{
              required: 'Описание обязательно',
            }}
            render={({ field }) => {
              return (
                <InputField
                  {...field}
                  label={'Описание'}
                  required
                  error={errors.description?.message}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                  placeholder="Опишите состояние автомобиля, особенности, дополнительное оборудование..."
                />
              );
            }}
          />
          <Controller
            control={control}
            name="price"
            rules={{
              required: 'Цена обязательна',
              min: {
                value: 0,
                message: 'Цена должна быть больше 0',
              },
              pattern: {
                value: /^\d+$/,
                message: 'Введите только цифры',
              },
            }}
            render={({ field }) => {
              return (
                <InputField
                  ref={field.ref}
                  value={field.value.toString()}
                  onChange={e => field.onChange(e)}
                  label={'Цена'}
                  keyboardType="numeric"
                  placeholder="1500"
                  required
                  wrapperStyle={{ flex: 1 }}
                />
              );
            }}
          />
          <Controller
            control={control}
            name="currency"
            rules={{
              required: 'Выберите валюту',
            }}
            render={({ field, fieldState: { error } }) => (
              <CurrencyCreateBottomSheetControllerWrapper value={field.value} onChange={field.onChange} error={error?.message} />
            )}
          />
          <Controller
            control={control}
            name="region"
            rules={{
              required: 'Выберите регион',
            }}
            render={({ field, fieldState: { error } }) => (
              <RegionCreateBottomSheetControllerWrapper value={field.value} onChange={field.onChange} error={error?.message} />
            )}
          />
          <TouchableHighlightRow
            variant="bordered"
            label="Добавить фотографии"
            onPress={handlePresentImagePickerModalPress}
            rightIcon="chevron-down"
            required
            error={errors.images?.message}
          />
          <OptimizedImagePickerModal
            ref={imagePickerModalRef}
            currentImageCount={control._formValues.images?.length || 0}
            onSelect={images => {
              setValue('images', images);
              imagePickerModalRef.current?.close();
            }}
          />

          {/** Display selected images with drag and drop */}
          <Controller
            control={control}
            name="images"
            rules={{
              validate: value => {
                if (!value || value.length === 0) {
                  return 'Добавьте хотя бы одно фото';
                }
                return true;
              },
            }}
            render={({ field, fieldState: { error } }) => {
              // Show error message
              if (error?.message) {
                return (
                  <View>
                    <Text className="mb-2 text-sm text-red-500">{error.message}</Text>
                    {field.value && field.value.length > 0 && (
                      <OptimizedImageList
                        images={field.value.map(img => ({ uri: img.uri }))}
                        onReorder={reorderedImages => {
                          // Convert back to ImagePickerAsset format, keeping original properties
                          const reorderedAssets = reorderedImages.map(simpleImg => {
                            const originalAsset = field.value.find(asset => asset.uri === simpleImg.uri);
                            return originalAsset || { uri: simpleImg.uri, width: 0, height: 0 };
                          });
                          setValue('images', reorderedAssets);
                        }}
                        onDelete={index => {
                          const newImages = field.value.filter((_, i) => i !== index);
                          setValue('images', newImages);
                        }}
                        maxImages={10}
                      />
                    )}
                  </View>
                );
              }

              if (!field.value || field.value.length === 0) {
                return <View />;
              }

              return (
                <OptimizedImageList
                  images={field.value.map(img => ({ uri: img.uri }))}
                  onReorder={reorderedImages => {
                    // Convert back to ImagePickerAsset format, keeping original properties
                    const reorderedAssets = reorderedImages.map(simpleImg => {
                      const originalAsset = field.value.find(asset => asset.uri === simpleImg.uri);
                      return originalAsset || { uri: simpleImg.uri, width: 0, height: 0 };
                    });
                    setValue('images', reorderedAssets);
                  }}
                  onDelete={index => {
                    const newImages = field.value.filter((_, i) => i !== index);
                    setValue('images', newImages);
                  }}
                  maxImages={10}
                />
              );
            }}
          />
        </View>

        <View className="px-4 py-2">
          <CustomRectButton onPress={() => handleSubmit(onSubmit, onInvalid)()} appearance="primary">
            {mutateAdvertisement.isPending ? <LoaderIndicator /> : <Text className="text-center font-semibold text-white">Создать объявление</Text>}
          </CustomRectButton>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const Header = () => {
  const router = useRouter();

  return (
    <View className="mb-4 flex-row items-center">
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
