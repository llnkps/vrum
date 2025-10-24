import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Linking, Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useThemeStore } from '@/state/theme/useThemeStore';
import { Ionicons } from '@expo/vector-icons';

export default function SupportPage() {
  const { isDark } = useThemeStore();

  const textPrimary = isDark ? '#BFC1C4' : '#292A2E';
  const border = isDark ? '#333' : '#e0e0e0';

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
      <SafeAreaView className="flex-1">
        <ScrollView className="px-5 py-4" showsVerticalScrollIndicator={false}>
          <TouchableOpacity className="flex-row items-center border-b p-3" style={{ borderBottomColor: border }} onPress={openFAQ}>
            <Ionicons name="help-circle-outline" size={24} color={textPrimary} />
            <Text className="ml-4 text-base" style={{ color: textPrimary }}>
              Часто задаваемые вопросы (FAQ)
            </Text>
            <View className="flex-1" />
            <Ionicons name="open-outline" size={20} color={textPrimary} />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center p-3" onPress={openSupport}>
            <Ionicons name="headset-outline" size={24} color={textPrimary} />
            <Text className="ml-4 text-base" style={{ color: textPrimary }}>
              Служба поддержки
            </Text>
            <View className="flex-1" />
            <Ionicons name="open-outline" size={20} color={textPrimary} />
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
