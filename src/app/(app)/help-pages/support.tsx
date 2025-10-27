import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Linking, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { CustomTheme } from '@/theme';

export default function SupportPage() {
  const theme = useTheme() as CustomTheme;

  const openFAQ = () => {
    const url = 'https://your-app-faq-url.com'; // Замените на реальный URL FAQ
    Linking.openURL(url).catch(() => Alert.alert('Ошибка', 'Не удалось открыть ссылку.'));
  };

  const openSupport = () => {
    const url = 'https://your-app-support-url.com'; // Замените на реальный URL службы поддержки
    Linking.openURL(url).catch(() => Alert.alert('Ошибка', 'Не удалось открыть ссылку.'));
  };

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="px-5 py-4" showsVerticalScrollIndicator={false}>
        <TouchableOpacity className="flex-row items-center border-b p-3" style={{ borderBottomColor: theme.colors.border }} onPress={openFAQ}>
          <Ionicons name="help-circle-outline" size={24} color={theme.colors.text} />
          <Text className="ml-4 text-base" style={{ color: theme.colors.text }}>
            Часто задаваемые вопросы (FAQ)
          </Text>
          <View className="flex-1" />
          <Ionicons name="open-outline" size={20} color={theme.colors.text} />
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center p-3" onPress={openSupport}>
          <Ionicons name="headset-outline" size={24} color={theme.colors.text} />
          <Text className="ml-4 text-base" style={{ color: theme.colors.text }}>
            Служба поддержки
          </Text>
          <View className="flex-1" />
          <Ionicons name="open-outline" size={20} color={theme.colors.text} />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
