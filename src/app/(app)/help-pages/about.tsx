import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Linking, Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Constants from 'expo-constants';
import { useThemeStore } from '@/state/theme/useThemeStore';
import { Ionicons } from '@expo/vector-icons';

export default function AboutPage() {
  const { isDark } = useThemeStore();
  const router = useRouter();

  const backgroundNeutral = isDark ? '#CECED912' : '#0515240F';
  const textPrimary = isDark ? '#BFC1C4' : '#292A2E';
  const textSubtle = isDark ? '#A9ABAF' : '#505258';
  const border = isDark ? '#333' : '#e0e0e0';

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
      <SafeAreaView className="flex-1">
        <ScrollView className="px-5 py-4" showsVerticalScrollIndicator={false}>
          <View className="mb-6 rounded-2xl p-3" style={{ backgroundColor: backgroundNeutral }}>
            <Text className="mb-2 text-base" style={{ color: textPrimary }}>
              Версия приложения
            </Text>
            <Text className="text-sm" style={{ color: textSubtle }}>
              {appVersion}
            </Text>
          </View>

          <TouchableOpacity className="flex-row items-center border-b p-3" style={{ borderBottomColor: border }} onPress={openTerms}>
            <Ionicons name="document-outline" size={24} color={textPrimary} />
            <Text className="ml-4 text-base" style={{ color: textPrimary }}>
              Условия использования
            </Text>
            <View className="flex-1" />
            <Ionicons name="open-outline" size={20} color={textPrimary} />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center p-3" onPress={openPrivacy}>
            <Ionicons name="shield-outline" size={24} color={textPrimary} />
            <Text className="ml-4 text-base" style={{ color: textPrimary }}>
              Политика конфиденциальности
            </Text>
            <View className="flex-1" />
            <Ionicons name="chevron-forward-outline" size={20} color={textPrimary} />
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
