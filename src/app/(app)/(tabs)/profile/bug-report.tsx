import { useRouter } from 'expo-router';
import { useAuthStore } from '@/state/auth/useAuthStore';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Alert, ScrollView, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function BugReportPage() {
  const router = useRouter();
  const { user } = useAuthStore();

  const [description, setDescription] = useState('');
  const [email, setEmail] = useState(user?.email || '');

  const reportBugMutation = useMutation({
    mutationFn: async (data: { description: string; email: string }) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Bug reported:', data);
      return data;
    },
    onSuccess: () => {
      Alert.alert('Спасибо!', 'Ваш отчет об ошибке был отправлен.', [{ text: 'OK', onPress: () => router.back() }]);
    },
    onError: () => {
      Alert.alert('Ошибка', 'Не удалось отправить отчет об ошибке. Пожалуйста, попробуйте еще раз.');
    },
  });

  const handleSubmit = () => {
    if (!description.trim()) {
      Alert.alert('Ошибка', 'Пожалуйста, опишите проблему перед отправкой.');
      return;
    }
    reportBugMutation.mutate({ description, email });
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1">
        <ScrollView className="px-5 py-4" showsHorizontalScrollIndicator={false}>
          <Text className="mb-2 text-lg text-font-subtle dark:text-font-subtle-dark">Описание</Text>
          <TextInput
            className="mb-4 rounded-lg border border-border bg-background-neutral p-3 text-font dark:border-border-dark dark:bg-background-neutral-dark dark:text-font-dark"
            placeholder="Опишите проблему..."
            placeholderTextColor="#A9ABAF"
            multiline
            numberOfLines={4}
            value={description}
            onChangeText={setDescription}
          />

          <Text className="mb-2 text-lg text-font-subtle dark:text-font-subtle-dark">Ваш Email</Text>
          <TextInput
            className="mb-6 rounded-lg border border-border bg-background-neutral p-3 text-font dark:border-border-dark dark:bg-background-neutral-dark dark:text-font-dark"
            placeholder="email@example.com"
            placeholderTextColor="#A9ABAF"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TouchableOpacity
            className="mt-4 items-center rounded-lg bg-background-brand-bold px-4 py-3 active:bg-background-brand-bold-pressed dark:bg-background-brand-bold-dark dark:active:bg-background-brand-bold-dark-pressed"
            activeOpacity={0.8}
            onPress={handleSubmit}
            disabled={reportBugMutation.isPending}
          >
            <Text className="font-semibold text-white">{reportBugMutation.isPending ? 'Сохранение...' : 'Сохранить'}</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
