import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Linking, Alert } from 'react-native';
import FeatherIcon from '@expo/vector-icons/Feather';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Constants from 'expo-constants';
import { useThemeStore } from '@/state/theme/useThemeStore';

export default function AboutPage() {
  const { isDark } = useThemeStore();
  const router = useRouter();

  const appVersion = Constants.expoConfig?.version || '1.0.0'; // Или из package.json

  const openTerms = () => {
    const url = 'https://your-app-terms-url.com'; // Замените на реальный URL условий использования
    Linking.openURL(url).catch(() => Alert.alert('Ошибка', 'Не удалось открыть ссылку.'));
  };

  const openPrivacy = () => {
    router.push('/(app)/help-pages/privacy'); // Или внешняя ссылка: Linking.openURL('https://your-app-privacy-url.com')
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-background-page dark:bg-background-page-dark">
        <ScrollView className="px-5 py-4" showsVerticalScrollIndicator={false}>
          <View className="mb-6">
            <Text className="mb-2 text-base text-font dark:text-font-dark">Версия приложения</Text>
            <Text className="text-sm text-font-subtle dark:text-font-subtle-dark">{appVersion}</Text>
          </View>

          <TouchableOpacity className="flex-row items-center border-b border-border py-4 dark:border-border-dark" onPress={openTerms}>
            <FeatherIcon name="file-text" size={24} color={isDark ? '#BFC1C4' : '#292A2E'} />
            <Text className="ml-4 text-base text-font dark:text-font-dark">Условия использования</Text>
            <View className="flex-1" />
            <FeatherIcon name="external-link" size={20} color="#A9ABAF" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center py-4" onPress={openPrivacy}>
            <FeatherIcon name="shield" size={24} color={isDark ? '#BFC1C4' : '#292A2E'} />
            <Text className="ml-4 text-base text-font dark:text-font-dark">Политика конфиденциальности</Text>
            <View className="flex-1" />
            <FeatherIcon name="chevron-right" size={20} color="#A9ABAF" />
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
