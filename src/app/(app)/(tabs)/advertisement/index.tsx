import HeaderAuto from '@/assets/images/header-auto-icon.svg';
import HeaderMoto from '@/assets/images/header-moto-icon.svg';
import HeaderSpecAuto from '@/assets/images/header-specauto-icon.svg';
import { Button } from '@/components/ui/button';
import { CustomTheme } from '@/theme';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import clsx from 'clsx';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableHighlight, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '@/state/auth/useAuthStore';

export default function MyAdvertisement() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  const theme = useTheme() as CustomTheme;

  // if (!isAuthenticated) {
  //   return (
  //     <SafeAreaView className="flex-1 bg-background-page dark:bg-background-page-dark justify-center items-center">
  //       <Text className="text-font dark:text-font-dark text-center mx-10 mb-4">
  //         Войдите в аккаунт, чтобы просмотреть свои объявления
  //       </Text>
  //       <TouchableOpacity onPress={() => router.push("/sign-in")} className="bg-blue-500 py-3 px-6 rounded-lg">
  //         <Text className="text-white">Войти</Text>
  //       </TouchableOpacity>
  //     </SafeAreaView>
  //   );
  // }

  return (
    <SafeAreaView className="flex-1 bg-background-page dark:bg-background-page-dark">
      <View className="flex-1">
        {/* Title */}
        <View className="px-4 pb-6 pt-5">
          <Text className="text-2xl font-bold text-font dark:text-font-dark">Мои объявления</Text>
        </View>

        {/* Tabs */}
        <View className="flex-row justify-between rounded-lg bg-surface dark:bg-surface-dark">
          <Button style={{ flex: 1 }} appearance="subtle" title="Акутальные" isSelected={true} />
          <Button
            style={{ flex: 1 }}
            appearance="subtle"
            title="Архив"
            isSelected={false}
            onPress={() => router.push('/(app)/(tabs)/advertisement/archived')}
          />
        </View>

        {/* Content */}
        <View className="flex-1 items-center justify-center">
          <Ionicons name="newspaper-outline" size={64} className="mb-4" color={theme.colors.icon} />
          <Text className="mx-10 text-center text-font dark:text-font-dark">
            У вас нет активных объявлений
          </Text>
        </View>
      </View>

      {/* Bottom bar */}
      <View className="absolute bottom-0 left-0 right-0 rounded-t-3xl border-t border-border bg-surface px-4 pb-10 pt-6 shadow-lg dark:border-border-dark dark:bg-surface-dark">
        <Text className="mb-4 text-lg font-bold text-font dark:text-font-dark">
          Добавить объявление
        </Text>

        <View className="flex-row justify-center gap-x-3">
          <TouchableHighlight
            className={clsx('rounded-md bg-background-neutral p-2 dark:bg-background-neutral-dark')}
            onPress={() => {
              if (isAuthenticated) {
                router.push('/(app)/advertisement/simple-auto');
              } else {
                router.push('/sign-in');
              }
            }}
            activeOpacity={0.6}
            underlayColor="#DDDDDD"
          >
            <View className="flex-col items-center justify-center">
              <HeaderAuto />
              <Text className="text-font dark:text-font-dark">Автомобили</Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight
            className={clsx('rounded-md bg-background-neutral p-2 dark:bg-background-neutral-dark')}
            onPress={() => router.push('/(app)/advertisement/spec-auto')}
          >
            <View className="flex-col items-center justify-center">
              <HeaderSpecAuto />
              <Text className="text-font dark:text-font-dark">Спецтехника</Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight
            className={clsx('rounded-md bg-background-neutral p-2 dark:bg-background-neutral-dark')}
            onPress={() => router.push('/(app)/advertisement/motorbike')}
          >
            <View className="flex-col items-center justify-center">
              <HeaderMoto />
              <Text className="text-font dark:text-font-dark">Мототехника</Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight
            className={clsx('rounded-md bg-background-neutral p-2 dark:bg-background-neutral-dark')}
            onPress={() => router.push('/(app)/advertisement/details')}
          >
            <View className="flex-col items-center justify-center">
              <HeaderMoto />
              <Text className="text-font dark:text-font-dark">Запчасти</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    </SafeAreaView>
  );
}
