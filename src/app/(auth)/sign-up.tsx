import { ResponseError } from '@/openapi/client';
import { useAuthContext } from '@/context/AuthContext';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { InputField } from '@/components/ui/input';

interface SignupForm {
  email: string;
  tel: string;
  password: string;
  repeatPassword: string;
}

export default function Index() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();
  const { signup } = useAuthContext();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignupForm>({
    mode: 'onChange',
  });

  const password = watch('password');
  const onSubmit = async (data: SignupForm) => {
    if (data.password !== data.repeatPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }
    setLoading(true);
    setErrorMessage(null); // Clear previous errors
    try {
      await signup(data.email, data.tel, data.password);
      router.replace('/activation-message');
    } catch (error: any) {
      console.log(error);
      if (error.response?.status === 400) {
        setErrorMessage('This email is already registered. Please use a different email or try signing in.');
      } else {
        setErrorMessage('An error occurred during signup. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-surface dark:bg-surface-dark">
        <KeyboardAwareScrollView
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            extraKeyboardSpace={100}
            keyboardShouldPersistTaps="handled"
          >
            {loading && <ActivityIndicator size="large" />}
            <View className="mx-auto w-full max-w-md items-center gap-8 px-4">
              <Image
                source={require('@/assets/images/preview-logo.png')}
                style={{
                  width: '100%',
                  height: 300,
                  aspectRatio: 1,
                }}
                tintColor="#FF6F61"
                resizeMode="contain"
              />
              <Text className="mb-2 text-3xl font-bold text-font dark:text-font-dark">Create Account</Text>

              <View className="w-full gap-4">
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Invalid email address',
                    },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <InputField
                      placeholder="Email"
                      onBlur={onBlur}
                      onChange={onChange}
                      value={value}
                      className="w-full rounded-lg border border-gray-300 bg-white p-3"
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  )}
                />
                {errors.email && <Text className="text-red-500">{errors.email.message}</Text>}

                <Controller
                  name="tel"
                  control={control}
                  rules={{
                    required: 'Phone number is required',
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <InputField
                      placeholder="Phone Number"
                      onBlur={onBlur}
                      onChange={onChange}
                      value={value}
                      className="w-full rounded-lg border border-gray-300 bg-white p-3"
                      keyboardType="phone-pad"
                    />
                  )}
                />
                {errors.tel && <Text className="text-red-500">{errors.tel.message}</Text>}

                <Controller
                  control={control}
                  name="password"
                  rules={{
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters',
                    },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <InputField
                      placeholder="Password"
                      onBlur={onBlur}
                      onChange={onChange}
                      value={value}
                      secureTextEntry
                      className="w-full rounded-lg border border-gray-300 bg-white p-3"
                    />
                  )}
                />
                {errors.password && <Text className="text-red-500">{errors.password.message}</Text>}

                <Controller
                  name="repeatPassword"
                  control={control}
                  rules={{
                    required: 'Please repeat your password',
                    validate: value => value === password || 'Passwords do not match',
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <InputField
                      placeholder="Repeat Password"
                      onBlur={onBlur}
                      onChange={onChange}
                      value={value}
                      secureTextEntry
                      className="w-full rounded-lg border border-gray-300 bg-white p-3"
                    />
                  )}
                />
                {errors.repeatPassword && <Text className="text-red-500">{errors.repeatPassword.message}</Text>}

                {errorMessage && (
                  <View className="rounded-lg bg-red-50 p-3 dark:bg-red-900/20">
                    <Text className="text-red-600 dark:text-red-400">{errorMessage}</Text>
                  </View>
                )}

                <TouchableOpacity className="w-full rounded-lg bg-blue-500 py-3" onPress={handleSubmit(onSubmit)} disabled={loading}>
                  <Text className="text-center font-semibold text-white">Sign Up</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.push('/sign-in')}>
                  <Text className="text-center text-blue-500">Already have an account? Sign In</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAwareScrollView>
        </SafeAreaView>
    </SafeAreaProvider>
  );
}
