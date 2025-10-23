import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Linking, Alert } from 'react-native';
import FeatherIcon from '@expo/vector-icons/Feather';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useThemeStore } from '@/state/theme/useThemeStore';

export default function SupportPage() {
  const { isDark } = useThemeStore();

  const openFAQ = () => {
    const url = 'https://your-app-faq-url.com'; // Замените на реальный URL FAQ
    Linking.openURL(url).catch(() => Alert.alert('Ошибка', 'Не удалось открыть ссылку.'));
  };

  const openSupport = () => {
    const url = 'https://your-app-support-url.com'; // Замените на реальный URL службы поддержки
    Linking.openURL(url).catch(() => Alert.alert('Ошибка', 'Не удалось открыть ссылку.'));
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-background-page dark:bg-background-page-dark">
        <ScrollView className="px-5 py-4" showsVerticalScrollIndicator={false}>
          <TouchableOpacity className="flex-row items-center border-b border-border py-4 dark:border-border-dark" onPress={openFAQ}>
            <FeatherIcon name="help-circle" size={24} color={isDark ? '#BFC1C4' : '#292A2E'} />
            <Text className="ml-4 text-base text-font dark:text-font-dark">Часто задаваемые вопросы (FAQ)</Text>
            <View className="flex-1" />
            <FeatherIcon name="external-link" size={20} color="#A9ABAF" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center py-4" onPress={openSupport}>
            <FeatherIcon name="headphones" size={24} color={isDark ? '#BFC1C4' : '#292A2E'} />
            <Text className="ml-4 text-base text-font dark:text-font-dark">Служба поддержки</Text>
            <View className="flex-1" />
            <FeatherIcon name="external-link" size={20} color="#A9ABAF" />
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
