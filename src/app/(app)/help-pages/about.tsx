import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Linking, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { CustomTheme } from '@/theme';

export default function AboutPage() {
  const router = useRouter();

  const theme = useTheme() as CustomTheme;

  const appVersion = Constants.expoConfig?.version || '1.0.0'; // Или из package.json

  const openTerms = () => {
    const url = 'https://your-app-terms-url.com'; // Замените на реальный URL условий использования
    Linking.openURL(url).catch(() => Alert.alert('Ошибка', 'Не удалось открыть ссылку.'));
  };

  const openPrivacy = () => {
    router.push('/(app)/help-pages/privacy'); // Или внешняя ссылка: Linking.openURL('https://your-app-privacy-url.com')
  };

  return (
    <ScrollView className="px-5 py-4" showsVerticalScrollIndicator={false}>
      <View className="mb-6 rounded-2xl p-3" style={{ backgroundColor: theme.colors.backgroundNeutral }}>
        <Text className="mb-2 text-base" style={{ color: theme.colors.text }}>
          Версия приложения
        </Text>
        <Text className="text-sm" style={{ color: theme.colors.textSubtle }}>
          {appVersion}
        </Text>
      </View>

      <TouchableOpacity className="flex-row items-center border-b p-3" style={{ borderBottomColor: theme.colors.border }} onPress={openTerms}>
        <Ionicons name="document-outline" size={24} color={theme.colors.text} />
        <Text className="ml-4 text-base" style={{ color: theme.colors.text }}>
          Условия использования
        </Text>
        <View className="flex-1" />
        <Ionicons name="open-outline" size={20} color={theme.colors.text} />
      </TouchableOpacity>

      <TouchableOpacity className="flex-row items-center p-3" onPress={openPrivacy}>
        <Ionicons name="shield-outline" size={24} color={theme.colors.text} />
        <Text className="ml-4 text-base" style={{ color: theme.colors.text }}>
          Политика конфиденциальности
        </Text>
        <View className="flex-1" />
        <Ionicons name="chevron-forward-outline" size={20} color={theme.colors.text} />
      </TouchableOpacity>
    </ScrollView>
  );
}
