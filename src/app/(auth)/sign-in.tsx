import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { ActivityIndicator, Alert, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { Ionicons } from '@expo/vector-icons';
import * as AuthSession from 'expo-auth-session';
import { useAuthStore } from '@/state/auth/useAuthStore';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

interface LoginForm {
  email: string;
  password: string;
}

export default function Index() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login, isAuthenticated } = useAuthStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    mode: 'onChange',
  });

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/(app)/(tabs)/search-tab');
    }
  }, [isAuthenticated, router]);

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    try {
      await login(data.email, data.password);
      router.replace('/(app)/(tabs)/search-tab');
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const redirectUri = AuthSession.makeRedirectUri();
      const request = new AuthSession.AuthRequest({
        clientId: 'YOUR_GOOGLE_CLIENT_ID', // Replace with your Google OAuth client ID
        scopes: ['openid', 'profile', 'email'],
        responseType: AuthSession.ResponseType.Token,
        redirectUri,
        prompt: AuthSession.Prompt.SelectAccount,
      });

      const result = await request.promptAsync({
        authorizationEndpoint: 'https://accounts.google.com/oauth/v2/auth',
      });

      if (result.type === 'success') {
        // Handle successful Google login
        // You might need to send the token to your backend
        console.log('Google token:', result.params.access_token);
        // For now, assume login success
        router.replace('/(app)/(tabs)');
      }
    } catch (error) {
      console.error('Google sign in error:', error);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-surface dark:bg-surface-dark">
        <KeyboardAwareScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}
          enableOnAndroid={true}
          extraScrollHeight={100}
        >
          {loading && <ActivityIndicator size="large" />}
          <View className="mx-auto w-full max-w-md items-center gap-8 px-4">
            <Image
              source={require('@/assets/images/preview-logo.png')}
              style={{
                width: '100%',
                height: 400,
                aspectRatio: 1,
              }}
              tintColor="#FF6F61"
              resizeMode="contain"
            />
            <Text className="mb-2 text-3xl font-bold text-font dark:text-font-dark">Your journey starts here</Text>

            <View className="w-full gap-4">
              <Controller
                control={control}
                rules={{
                  required: 'Email is required',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Invalid email address',
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder="Email"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    className="w-full rounded-lg border border-gray-300 bg-white p-3"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                )}
                name="email"
              />
              {errors.email && <Text className="text-red-500">{errors.email.message}</Text>}

              <Controller
                control={control}
                rules={{
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder="Password"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    secureTextEntry
                    className="w-full rounded-lg border border-gray-300 bg-white p-3"
                  />
                )}
                name="password"
              />
              {errors.password && <Text className="text-red-500">{errors.password.message}</Text>}

              <TouchableOpacity className="w-full rounded-lg bg-blue-500 py-3" onPress={handleSubmit(onSubmit)} disabled={loading}>
                <Text className="text-center font-semibold text-white">Sign In</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="w-full flex-row items-center justify-center rounded-lg border border-gray-300 bg-white py-3"
                onPress={handleGoogleSignIn}
              >
                <Ionicons name="logo-google" size={24} color="black" className="mr-2" />
                <Text className="ml-2 text-center font-semibold text-black">Continue with Google</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => router.push('/sign-up')}>
                <Text className="text-center text-blue-500">Don&apos;t have an account? Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
