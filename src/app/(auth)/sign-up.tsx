import { ResponseError } from "@/openapi/client";
import { useAuthStore } from "@/state/auth/useAuthStore";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator, Alert, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";

interface SignupForm {
  email: string;
  tel: string;
  password: string;
  repeatPassword: string;
}

export default function Index() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { signup } = useAuthStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm<SignupForm>({
    mode: "onChange",
  });

  const password = watch("password");
  const onSubmit = async (data: SignupForm) => {
    if (data.password !== data.repeatPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      await signup(data.email, data.tel, data.password);
      router.replace("/activation-message");
    } catch (error: any) {

      const jsonError = await error.response.json();

      if (jsonError.errors) {
        for (const [field, message] of Object.entries(jsonError.errors)) {
          setError(field, { message });
        }
      }

      Alert.alert("Error", "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-surface dark:bg-surface-dark">
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignItems: "center" }}
        enableOnAndroid={true}
        extraScrollHeight={180}
      >
        {loading && <ActivityIndicator size="large" />}
        <View className="w-full items-center gap-8 max-w-md mx-auto px-4">
          <Image
            source={require("@/assets/images/preview-logo.png")}
            style={{
              width: "100%",
              height: 300,
              aspectRatio: 1,
            }}
            tintColor="#FF6F61"
            resizeMode="contain"
          />
          <Text className="text-3xl font-bold text-font dark:text-font-dark mb-2">Create Account</Text>

          <View className="w-full gap-4">
            <Controller
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Email"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-white"
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
                required: "Phone number is required",
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Phone Number"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-white"
                  keyboardType="phone-pad"
                />
              )}
              name="tel"
            />
            {errors.tel && <Text className="text-red-500">{errors.tel.message}</Text>}

            <Controller
              control={control}
              rules={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Password"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry
                  className="w-full p-3 border border-gray-300 rounded-lg bg-white"
                />
              )}
              name="password"
            />
            {errors.password && <Text className="text-red-500">{errors.password.message}</Text>}

            <Controller
              control={control}
              rules={{
                required: "Please repeat your password",
                validate: (value) => value === password || "Passwords do not match",
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Repeat Password"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry
                  className="w-full p-3 border border-gray-300 rounded-lg bg-white"
                />
              )}
              name="repeatPassword"
            />
            {errors.repeatPassword && <Text className="text-red-500">{errors.repeatPassword.message}</Text>}

            <TouchableOpacity className="w-full bg-blue-500 py-3 rounded-lg" onPress={handleSubmit(onSubmit)} disabled={loading}>
              <Text className="text-white text-center font-semibold">Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/sign-in")}>
              <Text className="text-center text-blue-500">Already have an account? Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
