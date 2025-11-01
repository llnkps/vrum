import React, { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, Alert, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useQuery, useMutation } from '@tanstack/react-query';
import { createAuthenticatedConfiguration } from '@/openapi/configurations';
import { UserApi } from '@/openapi/client';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useAuthContext } from '@/context/AuthContext';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { CustomTheme } from '@/theme';

export default function ProfileEditPage() {
  const router = useRouter();
  const { logout } = useAuthContext();
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
  const tabBarHeight = useBottomTabBarHeight();

  const theme = useTheme() as CustomTheme;

  // const brandBackground = isDark ? '#669DF1' : '#1868DB';

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
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Permission required', 'Permission to access camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
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
          <View className="mb-2 rounded-2xl" style={{ backgroundColor: theme.colors.backgroundNeutral }}>
            <TextInput
              value={profileForm.firstName}
              onChangeText={v => setProfileForm(p => ({ ...p, firstName: v }))}
              placeholder="Имя"
              placeholderTextColor={theme.colors.textSubtle}
              className="border-b p-3"
              style={{ color: theme.colors.text, borderBottomColor: theme.colors.border }}
            />
            <TextInput
              value={profileForm.lastName}
              onChangeText={v => setProfileForm(p => ({ ...p, lastName: v }))}
              placeholder="Фамилия"
              placeholderTextColor={theme.colors.textSubtle}
              className="p-3"
              style={{ color: theme.colors.text }}
            />
          </View>
          <Text className="pl-3 text-sm" style={{ color: theme.colors.textSubtle }}>
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
            placeholderTextColor={theme.colors.textSubtle}
            className="mb-2 rounded-2xl p-3"
            style={{ color: theme.colors.text, backgroundColor: theme.colors.backgroundNeutral }}
            textAlignVertical="center"
          />
          <Text className="pl-3 text-sm" style={{ color: theme.colors.textSubtle }}>
            Расскажите немного о себе, чтобы другие пользователи могли узнать Вас лучше.
          </Text>
        </View>

        {/* Birth day */}
        <View className="mb-6">
          <TouchableOpacity
            className="mb-2 rounded-2xl p-3"
            style={{ backgroundColor: theme.colors.backgroundNeutral }}
            onPress={() => console.log('Change DOB')}
          >
            <Text className="text-base font-semibold" style={{ color: theme.colors.text }}>
              День рождения
            </Text>
          </TouchableOpacity>
          <Text className="pl-3 text-sm" style={{ color: theme.colors.textSubtle }}>
            Ваш день рождения могут видеть только вы.
          </Text>
        </View>

        {/* Phone & Login */}
        <View className="mb-6 rounded-2xl" style={{ backgroundColor: theme.colors.backgroundNeutral }}>
          <TouchableOpacity
            className="flex-row items-center border-b border-border/10 p-3 active:opacity-80 dark:border-border-dark/10"
            activeOpacity={0.7}
            onPress={() => console.log('Change Phone')}
          >
            <Text className="text-base font-semibold" style={{ color: theme.colors.text }}>
              Номер телефона
            </Text>
            <View className="flex-1" />
            <Text className="mr-2 text-sm font-medium" style={{ color: theme.colors.textSubtle }}>
              +373 60 123 456
            </Text>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.text} />
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center p-3 active:opacity-80" activeOpacity={0.7} onPress={() => console.log('Change Phone')}>
            <Text className="text-base font-semibold" style={{ color: theme.colors.text }}>
              Имя пользователя
            </Text>
            <View className="flex-1" />
            <Text className="mr-2 text-sm font-medium" style={{ color: theme.colors.textSubtle }}>
              @username
            </Text>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.text} />
          </TouchableOpacity>
        </View>

        {/* Accounts */}
        <View className="mb-6">
          <TouchableOpacity
            className="mb-2 items-center rounded-2xl p-3"
            style={{ backgroundColor: theme.colors.backgroundNeutral }}
            activeOpacity={0.8}
            onPress={handleAddAccount}
          >
            <Text className="text-base font-semibold text-font-brand">Добавить Аккаунт</Text>
          </TouchableOpacity>
          <Text className="pl-3 text-sm" style={{ color: theme.colors.textSubtle }}>
            Вы можете подключить несколько аккаунтов для удобного переключения между ними.
          </Text>
        </View>

        <TouchableOpacity
          className="items-center rounded-lg px-4 py-3"
          style={{ backgroundColor: theme.colors.backgroundNeutral }}
          activeOpacity={0.8}
          onPress={handleSave}
          disabled={updateUserMutation.isPending}
        >
          <Text className="font-semibold text-white">{updateUserMutation.isPending ? 'Сохранение...' : 'Сохранить'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
