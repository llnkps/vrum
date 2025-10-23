import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useQuery, useMutation } from '@tanstack/react-query';
import { createAuthenticatedConfiguration } from '@/openapi/configurations';
import { UserApi } from '@/openapi/client';

export default function ProfileEditPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  
  const { data: userData } = useQuery({
    queryKey: ['user-profile'],
    queryFn: async () => {
      const userApi = new UserApi(createAuthenticatedConfiguration());
      return await userApi.getAppUserdomainPresentationGetmeGetme();
    },
  });


  const updateUserMutation = useMutation({
    mutationFn: async (updatedData: { name: string; email: string }) => {
      const UserApi = new UserApi(createAuthenticatedConfiguration());
      // Предполагаем, что есть метод для обновления, например:
      // return await userApi.updateUser(updatedData);
      // Пока что просто симулируем
      return updatedData;
    },
    onSuccess: () => {
      Alert.alert('Успех', 'Данные обновлены');
      router.back();
    },
    onError: () => {
      Alert.alert('Ошибка', 'Не удалось обновить данные');
    },
  });

  const handleSave = () => {
    updateUserMutation.mutate({ name, email });
  };

  React.useEffect(() => {
    if (userData) {
      setName(userData.name || '');
      setEmail(userData.email || '');
      setPhone(userData.phone || '');
    }
  }, [userData]);

  const textInputStyle =
    'border border-border dark:border-border-dark rounded-lg px-5 py-4 mb-4 text-font dark:text-font-dark bg-surface dark:bg-surface-dark';

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 p-5">
        <Text className="mb-5 text-2xl font-bold text-font dark:text-font-dark">Настройки аккаунта</Text>

        <TextInput className={textInputStyle} placeholder="Имя" value={name} onChangeText={setName} />

        <TextInput className={textInputStyle} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />

        <TextInput className={textInputStyle} placeholder="Телефон" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />

        <TextInput className={textInputStyle} placeholder="Новый пароль" value={password} onChangeText={setPassword} secureTextEntry />

        <TouchableOpacity
          className="mt-4 items-center rounded-lg bg-background-brand-bold px-4 py-3 active:bg-background-brand-bold-pressed dark:bg-background-brand-bold-dark dark:active:bg-background-brand-bold-dark-pressed"
          activeOpacity={0.8}
          onPress={handleSave}
          disabled={updateUserMutation.isPending}
        >
          <Text className="font-semibold text-white">{updateUserMutation.isPending ? 'Сохранение...' : 'Сохранить'}</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
