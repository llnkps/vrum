import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CloseIcon from '@/components/global/CloseIcon';
import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/context/AuthContext';
import * as ImagePicker from 'expo-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

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
  const router = useRouter();
  const { isAuthenticated } = useAuthContext();

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     Alert.alert(
  //       'Authentication Required',
  //       'You need to be logged in to create an advertisement.',
  //       [
  //         { text: 'Login', onPress: () => router.push('/sign-in') },
  //         { text: 'Cancel', onPress: () => router.back() },
  //       ]
  //     );
  //   }
  // }, [isAuthenticated]);

  // const mutateAdvertisement = useSimpleAutoAdvertisementCreateMutate({
  //   onSuccess: data => {
  //     console.log('Advertisement created successfully:', data);
  //     // reset();
  //     // router.push("/(app)/(tabs)/advertisement");
  //   },
  //   onError: async error => {
  //     console.error('Error creating advertisement:', error);
  //     const jsonError = await error.response.json();

  //     if (jsonError.errors) {
  //       for (const [field, message] of Object.entries(jsonError.errors)) {
  //         setError(field, { message });
  //       }
  //     }
  //   },
  // });

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
      releaseYear: undefined,
      region: '',

      mileage: '',
      fuel_type: '',
      transmission_type: '',
      frame_type: '',
      drive_train: '',
      engine_capacity: 0,
      power: 0,
      color: '',

      trade_allow: false,
      condition: '',
      seller: '',
    },
  });

  // Form submit handler
  const onSubmit = async (data: FormValues) => {};

  return (
    <SafeAreaView className="flex-1 bg-background-page dark:bg-background-page-dark">
      <KeyboardAwareScrollView>
        <Header />

        {/* Основная информация */}
        <View className="mb-5 gap-y-3 rounded-2xl bg-surface p-5 dark:bg-surface-dark">
          <View className="mb-5 flex-row items-center">
            <Text className="text-xl font-bold text-font dark:text-font-dark">Детали объявления</Text>
          </View>
        </View>

        {/* Кнопка создания */}
        <Button
          onPress={handleSubmit(onSubmit)}
          style={{ marginVertical: 20 }}
          // disabled={isSubmitting}
        >
          <Text>{'Создать объявление'}</Text>
        </Button>
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
        <Text className="text-3xl font-bold text-font dark:text-font-dark">Продать запчасть</Text>
        <Text className="text-base text-font-subtle dark:text-font-subtle-dark">Заполните информацию о вашей запчасти</Text>
      </View>
    </View>
  );
};
