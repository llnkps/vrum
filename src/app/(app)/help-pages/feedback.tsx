import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import FeatherIcon from '@expo/vector-icons/Feather';
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
      <SafeAreaView className="flex-1 bg-background-page dark:bg-background-page-dark">
        <ScrollView className="px-5 py-4" showsVerticalScrollIndicator={false}>
          <Text className="mb-2 text-sm text-font-subtle dark:text-font-subtle-dark">Заголовок</Text>
          <TextInput
            className="mb-4 rounded-lg border border-border bg-background-neutral p-3 text-font dark:border-border-dark dark:bg-background-neutral-dark dark:text-font-dark"
            placeholder="Краткий заголовок..."
            placeholderTextColor="#A9ABAF"
            value={title}
            onChangeText={setTitle}
          />

          <Text className="mb-2 text-sm text-font-subtle dark:text-font-subtle-dark">Описание проблемы</Text>
          <TextInput
            className="mb-4 rounded-lg border border-border bg-background-neutral p-3 text-font dark:border-border-dark dark:bg-background-neutral-dark dark:text-font-dark"
            placeholder="Подробное описание..."
            placeholderTextColor="#A9ABAF"
            multiline
            numberOfLines={6}
            value={description}
            onChangeText={setDescription}
          />

          <Text className="mb-2 text-sm text-font-subtle dark:text-font-subtle-dark">Ваш email (опционально)</Text>
          <TextInput
            className="mb-6 rounded-lg border border-border bg-background-neutral p-3 text-font dark:border-border-dark dark:bg-background-neutral-dark dark:text-font-dark"
            placeholder="email@example.com"
            placeholderTextColor="#A9ABAF"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <TouchableOpacity className="bg-primary items-center rounded-lg py-3" onPress={handleSubmit} disabled={sendFeedbackMutation.isPending}>
            <Text className="font-semibold text-white">{sendFeedbackMutation.isPending ? 'Отправка...' : 'Отправить'}</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
