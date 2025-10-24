import React, { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, Alert, ScrollView, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useQuery, useMutation } from '@tanstack/react-query';
import { createAuthenticatedConfiguration } from '@/openapi/configurations';
import { UserApi } from '@/openapi/client';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useThemeStore } from '@/state/theme/useThemeStore';
import { useAuthStore } from '@/state/auth/useAuthStore';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileEditPage() {
  const router = useRouter();
  const { logout } = useAuthStore();
  const [profileForm, setProfileForm] = useState({
    avatar: '',
    firstName: '',
    lastName: '',
    bio: '',
    dob: '',
    phone: '',
    username: '',
  });
  const [saving, setSaving] = useState(false);
  const { isDark } = useThemeStore();
  const tabBarHeight = useBottomTabBarHeight();

  const backgroundNeutral = isDark ? '#CECED912' : '#0515240F';
  const textPrimary = isDark ? '#BFC1C4' : '#292A2E';
  const textSubtle = isDark ? '#A9ABAF' : '#505258';
  const brandBackground = isDark ? '#669DF1' : '#1868DB';
  const border = isDark ? '#333' : '#e0e0e0';

  const { data: userData } = useQuery({
    queryKey: ['user-profile'],
    queryFn: async () => {
      const userApi = new UserApi(createAuthenticatedConfiguration());
      return await userApi.getAppUserdomainPresentationGetmeGetme();
    },
  });

  useEffect(() => {
    if (userData) {
      setProfileForm({
        avatar: userData.avatar ?? '',
        firstName: userData.firstName ?? userData.name?.split(' ')[0] ?? '',
        lastName: userData.lastName ?? userData.name?.split(' ').slice(1).join(' ') ?? '',
        bio: userData.bio ?? '',
        dob: userData.dob ?? '',
        phone: userData.phone ?? '',
        username: userData.username ?? '',
      });
    }
  }, [userData]);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Разрешение требуется', 'Пожалуйста, предоставьте разрешение на доступ к фото для изменения аватара.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      allowsEditing: true,
    });
    if (!result.cancelled) {
      setProfileForm(prev => ({ ...prev, avatar: result.assets?.[0]?.uri ?? result.uri }));
    }
  };

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

  const handleAddAccount = () => {
    console.log('Добавить аккаунт');
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1">
        <ScrollView className="px-5 py-4" contentContainerStyle={{ paddingBottom: tabBarHeight + 24 }} showsVerticalScrollIndicator={false}>
          {/* Image */}
          {/* <View className="flex-1 items-center">
            <TouchableOpacity onPress={pickImage} activeOpacity={0.8}>
              <Image
                source={{ uri: profileForm.avatar || 'https://images.unsplash.com/photo-1633332755192-727a05c4013d' }}
                className="h-20 w-20 rounded-xl"
              />
              <View className="absolute bottom-0 right-0 rounded-full bg-background-selected p-1">
                <Ionicons name="camera" size={20} color="#fff" />
              </View>
            </TouchableOpacity>
          </View> */}

          {/* Name */}
          <View className="mb-6">
            <View className="mb-2 rounded-2xl" style={{ backgroundColor: backgroundNeutral }}>
              <TextInput
                value={profileForm.firstName}
                onChangeText={v => setProfileForm(p => ({ ...p, firstName: v }))}
                placeholder="Имя"
                placeholderTextColor={textSubtle}
                className="border-b p-3"
                style={{ color: textPrimary, borderBottomColor: border }}
              />
              <TextInput
                value={profileForm.lastName}
                onChangeText={v => setProfileForm(p => ({ ...p, lastName: v }))}
                placeholder="Фамилия"
                placeholderTextColor={textSubtle}
                className="p-3"
                style={{ color: textPrimary }}
              />
            </View>
            <Text className="pl-3 text-sm" style={{ color: textSubtle }}>
              Укажите имя и фамилию и, если хотите, добавьте фотографию для Вашего профиля.
            </Text>
          </View>

          {/* Bio */}
          <View className="mb-6">
            <TextInput
              value={profileForm.bio}
              onChangeText={v => setProfileForm(p => ({ ...p, bio: v }))}
              placeholder="О себе"
              multiline
              placeholderTextColor={textSubtle}
              className="mb-2 rounded-2xl p-3"
              style={{ color: textPrimary, backgroundColor: backgroundNeutral }}
              textAlignVertical="center"
            />
            <Text className="pl-3 text-sm" style={{ color: textSubtle }}>
              Расскажите немного о себе, чтобы другие пользователи могли узнать Вас лучше.
            </Text>
          </View>

          {/* Birth day */}
          <View className="mb-6">
            <TouchableOpacity
              className="mb-2 rounded-2xl p-3"
              style={{ backgroundColor: backgroundNeutral }}
              onPress={() => console.log('Change DOB')}
            >
              <Text className="text-base font-semibold" style={{ color: textPrimary }}>
                День рождения
              </Text>
            </TouchableOpacity>
            <Text className="pl-3 text-sm" style={{ color: textSubtle }}>
              Ваш день рождения могут видеть только вы.
            </Text>
          </View>

          {/* Phone & Login */}
          <View className="mb-6 rounded-2xl" style={{ backgroundColor: backgroundNeutral }}>
            <TouchableOpacity
              className="flex-row items-center border-b border-border/10 p-3 active:opacity-80 dark:border-border-dark/10"
              activeOpacity={0.7}
              onPress={() => console.log('Change Phone')}
            >
              <Text className="text-base font-semibold" style={{ color: textPrimary }}>
                Номер телефона
              </Text>
              <View className="flex-1" />
              <Text className="mr-2 text-sm font-medium" style={{ color: textSubtle }}>
                +373 60 123 456
              </Text>
              <Ionicons name="chevron-forward" size={20} color={textPrimary} />
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center p-3 active:opacity-80" activeOpacity={0.7} onPress={() => console.log('Change Phone')}>
              <Text className="text-base font-semibold" style={{ color: textPrimary }}>
                Имя пользователя
              </Text>
              <View className="flex-1" />
              <Text className="mr-2 text-sm font-medium" style={{ color: textSubtle }}>
                @username
              </Text>
              <Ionicons name="chevron-forward" size={20} color={textPrimary} />
            </TouchableOpacity>
          </View>

          {/* Accounts */}
          <View className="mb-6">
            <TouchableOpacity
              className="mb-2 items-center rounded-2xl p-3"
              style={{ backgroundColor: backgroundNeutral }}
              activeOpacity={0.8}
              onPress={handleAddAccount}
            >
              <Text className="text-base font-semibold text-font-brand">Добавить Аккаунт</Text>
            </TouchableOpacity>
            <Text className="pl-3 text-sm" style={{ color: textSubtle }}>
              Вы можете подключить несколько аккаунтов для удобного переключения между ними.
            </Text>
          </View>

          <TouchableOpacity
            className="items-center rounded-lg px-4 py-3"
            style={{ backgroundColor: brandBackground }}
            activeOpacity={0.8}
            onPress={handleSave}
            disabled={updateUserMutation.isPending}
          >
            <Text className="font-semibold text-white">{updateUserMutation.isPending ? 'Сохранение...' : 'Сохранить'}</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
