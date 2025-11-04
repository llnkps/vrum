import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useMutation } from '@tanstack/react-query';
import { useAuthContext } from '@/context/AuthContext';
import { useTheme } from '@react-navigation/native';
import { CustomTheme } from '@/theme';

export default function FeedbackPage() {
  const router = useRouter();
  const { user } = useAuthContext();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState(user?.email || '');

  const theme = useTheme() as CustomTheme;

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
    <ScrollView className="px-5 py-4" showsVerticalScrollIndicator={false}>
      <View className="mb-6">
        <Text className="mb-2 ml-3 text-xl" style={{ color: theme.colors.text }}>
          Заголовок
        </Text>
        <TextInput
          className="rounded-2xl border p-3"
          style={{ borderColor: theme.colors.border, backgroundColor: theme.colors.backgroundNeutral, color: theme.colors.text }}
          placeholder="Краткий заголовок..."
          placeholderTextColor={theme.colors.textSubtle}
          value={title}
          onChangeText={setTitle}
        />
        <Text className="pl-3 text-sm" style={{ color: theme.colors.textSubtle }}>
          Кратко опишите суть вашего отзыва
        </Text>
      </View>

      <View className="mb-6">
        <Text className="mb-2 ml-3 text-xl" style={{ color: theme.colors.text }}>
          Ваш email (опционально)
        </Text>
        <TextInput
          className="rounded-2xl border p-3"
          style={{ borderColor: theme.colors.border, backgroundColor: theme.colors.backgroundNeutral, color: theme.colors.text }}
          placeholder="email@example.com"
          placeholderTextColor={theme.colors.textSubtle}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <Text className="pl-3 text-sm" style={{ color: theme.colors.textSubtle }}>
          Мы свяжемся с вами по этому адресу, если потребуется дополнительная информация.
        </Text>
      </View>

      <View className="mb-6">
        <Text className="mb-2 ml-3 text-xl" style={{ color: theme.colors.text }}>
          Описание проблемы
        </Text>
        <TextInput
          className="rounded-2xl border p-3"
          placeholder="Подробное описание..."
          style={{ borderColor: theme.colors.border, backgroundColor: theme.colors.backgroundNeutral, color: theme.colors.text }}
          placeholderTextColor={theme.colors.textSubtle}
          multiline
          numberOfLines={4}
          value={description}
          onChangeText={setDescription}
        />
        <Text className="pl-3 text-sm" style={{ color: theme.colors.textSubtle }}>
          Пожалуйста, предоставьте как можно больше деталей, чтобы мы могли лучше понять вашу проблему.
        </Text>
      </View>

      <TouchableOpacity
        className="mb-2 items-center rounded-2xl p-3"
        style={{ backgroundColor: theme.colors.backgroundNeutral }}
        onPress={handleSubmit}
        disabled={sendFeedbackMutation.isPending}
      >
        <Text className="font-semibold" style={{ color: '#1868DB' }}>
          {sendFeedbackMutation.isPending ? 'Отправка...' : 'Отправить'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
