import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useMutation } from '@tanstack/react-query';
import { useThemeStore } from '@/state/theme/useThemeStore';
import { useAuthStore } from '@/state/auth/useAuthStore';

export default function FeedbackPage() {
  const router = useRouter();
  const { isDark } = useThemeStore();
  const { user } = useAuthStore();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState(user?.email || '');

  const backgroundNeutral = isDark ? '#CECED912' : '#0515240F';
  const textPrimary = isDark ? '#BFC1C4' : '#292A2E';
  const textSubtle = isDark ? '#A9ABAF' : '#505258';
  const border = isDark ? '#333' : '#e0e0e0';

  const sendFeedbackMutation = useMutation({
    mutationFn: async (data: { title: string; description: string; email: string }) => {
      // Симуляция API-вызова (замените на реальный)
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Feedback sent:', data);
      return data;
    },
    onSuccess: () => {
      Alert.alert('Спасибо!', 'Ваш отзыв отправлен.', [{ text: 'OK', onPress: () => router.back() }]);
    },
    onError: () => {
      Alert.alert('Ошибка', 'Не удалось отправить отзыв. Попробуйте позже.');
    },
  });

  const handleSubmit = () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert('Ошибка', 'Пожалуйста, заполните заголовок и описание.');
      return;
    }
    sendFeedbackMutation.mutate({ title, description, email });
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1">
        <ScrollView className="px-5 py-4" showsVerticalScrollIndicator={false}>
          <View className="mb-6">
            <Text className="mb-2 ml-3 text-xl" style={{ color: textPrimary }}>
              Заголовок
            </Text>
            <TextInput
              className="rounded-2xl border p-3"
              style={{ borderColor: border, backgroundColor: backgroundNeutral, color: textPrimary }}
              placeholder="Краткий заголовок..."
              placeholderTextColor={textSubtle}
              value={title}
              onChangeText={setTitle}
            />
            <Text className="pl-3 text-sm" style={{ color: textSubtle }}>
              Кратко опишите суть вашего отзыва
            </Text>
          </View>

          <View className="mb-6">
            <Text className="mb-2 ml-3 text-xl" style={{ color: textPrimary }}>
              Ваш email (опционально)
            </Text>
            <TextInput
              className="rounded-2xl border p-3"
              style={{ borderColor: border, backgroundColor: backgroundNeutral, color: textPrimary }}
              placeholder="email@example.com"
              placeholderTextColor={textSubtle}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <Text className="pl-3 text-sm" style={{ color: textSubtle }}>
              Мы свяжемся с вами по этому адресу, если потребуется дополнительная информация.
            </Text>
          </View>

          <View className="mb-6">
            <Text className="mb-2 ml-3 text-xl" style={{ color: textPrimary }}>
              Описание проблемы
            </Text>
            <TextInput
              className="rounded-2xl border p-3"
              placeholder="Подробное описание..."
              style={{ borderColor: border, backgroundColor: backgroundNeutral, color: textPrimary }}
              placeholderTextColor={textSubtle}
              multiline
              numberOfLines={4}
              value={description}
              onChangeText={setDescription}
            />
            <Text className="pl-3 text-sm" style={{ color: textSubtle }}>
              Пожалуйста, предоставьте как можно больше деталей, чтобы мы могли лучше понять вашу проблему.
            </Text>
          </View>

          <TouchableOpacity
            className="mb-2 items-center rounded-2xl p-3"
            style={{ backgroundColor: backgroundNeutral }}
            onPress={handleSubmit}
            disabled={sendFeedbackMutation.isPending}
          >
            <Text className="font-semibold" style={{ color: '#1868DB' }}>
              {sendFeedbackMutation.isPending ? 'Отправка...' : 'Отправить'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
