import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Switch, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useThemeStore } from '@/state/theme/useThemeStore';
import { usePreferencesStore, Language } from '@/state/preferences/usePreferencesStore';
import { createAuthenticatedConfiguration } from '@/openapi/configurations';
import { UserApi } from '@/openapi/client';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { CustomTheme } from '@/theme';
import { useAuthContext } from '@/context/AuthContext';

export default function SettingsPage() {
  const router = useRouter();
  const { isAuthenticated, logout } = useAuthContext();
  const { isDark, toggleTheme } = useThemeStore();
  const { language, location, setLocation } = usePreferencesStore();
  const tabBarHeight = useBottomTabBarHeight();

  const [form, setForm] = useState({
    emailNotifications: true,
    pushNotifications: false,
  });
  const theme = useTheme() as CustomTheme;

  const menuItems = [
    {
      label: 'Помощь и поддержка',
      type: 'navigate' as const,
      route: '/(app)/help-pages/support' as const,
    },
    {
      label: 'О приложении',
      type: 'navigate' as const,
      route: '/(app)/help-pages/about' as const,
    },
    {
      label: 'Обратная связь',
      type: 'navigate' as const,
      route: '/(app)/help-pages/feedback' as const,
    },
    {
      label: 'Оценить в App Store',
      type: 'external' as const,
      action: () => {
        // Логика открытия App Store
        // Linking.openURL('https://apps.apple.com/app/your-app-id');
        console.log('Open App Store');
      },
    },
  ];

  // Check authentication
  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     router.replace('/sign-in');
  //   }
  // }, [isAuthenticated, router]);

  // Fetch user data
  const { data: userData } = useQuery({
    queryKey: ['user-profile'],
    queryFn: async () => {
      const userApi = new UserApi(createAuthenticatedConfiguration());
      return await userApi.getAppUserdomainPresentationGetmeGetme();
    },
    enabled: isAuthenticated,
  });

  // Update location mutation
  const updateLocationMutation = useMutation({
    mutationFn: async (newLocation: string) => {
      // Here you would call your API to update location
      // For now, just update local state
      setLocation(newLocation);
      return newLocation;
    },
  });

  const handleLogout = async () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          await logout();
          router.replace('/sign-in');
        },
      },
    ]);
  };

  const getLanguageDisplayName = (lang: Language) => {
    const names = {
      en: 'English',
      ro: 'Română',
      ru: 'Русский',
      uk: 'Українська',
    };
    return names[lang];
  };

  // if (!isAuthenticated) {
  //   return null; // Will redirect
  // }
  useEffect(() => {
    console.log('isDark changed in index.tsx:', isDark);
  }, [isDark]);

  return (
    <SafeAreaView className="flex-1">
      {/* Content */}
      <ScrollView className="px-5 py-4" contentContainerStyle={{ paddingBottom: tabBarHeight }} showsVerticalScrollIndicator={false}>
        {/* Account Section */}
        <View className="mb-6 flex-1">
          <Text className="mb-1 pl-3 text-lg font-semibold uppercase" style={{ color: theme.colors.text }}>
            Аккаунт
          </Text>

          <TouchableOpacity
            className="flex-row items-center rounded-2xl p-3 active:opacity-80 "
            activeOpacity={0.7}
            onPress={() => router.push('/(app)/(tabs)/profile/profile-edit')}
            style={{ backgroundColor: theme.colors.backgroundNeutral }}
          >
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=facearea&w=256&h=256&q=80',
              }}
              className="h-16 w-16 rounded-full"
            />
            <View className="ml-4 flex-1">
              <Text className="text-base font-semibold" style={{ color: theme.colors.text }}>
                {userData?.name || 'User'}
              </Text>
              <Text className="text-sm" style={{ color: theme.colors.textSubtle }}>
                {userData?.email || 'user@example.com'}
              </Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={20} color={theme.colors.textSubtle} />
          </TouchableOpacity>
        </View>

        {/* Preferences */}
        <View className="mb-6">
          <Text className="mb-1 pl-3 text-lg font-semibold uppercase" style={{ color: theme.colors.textSubtle }}>
            Предпочтения
          </Text>

          <View className="rounded-2xl" style={{ backgroundColor: theme.colors.backgroundNeutral }}>
            {/* Dark Mode Toggle */}
            <View className="flex-row items-center border-b p-3" style={{ borderBottomColor: theme.colors.border }}>
              <Text className="text-base" style={{ color: theme.colors.text }}>
                Темная тема
              </Text>
              <View className="flex-1" />
              <Switch
                onValueChange={toggleTheme}
                value={isDark}
                trackColor={{
                  false: '#D3D5DA',
                  true: '#1868DB',
                }}
                thumbColor="#FFFFFF"
                ios_backgroundColor="#D3D5DA"
              />
            </View>

            {/* Language */}
            <TouchableOpacity
              className="flex-row items-center border-b p-3"
              style={{ borderBottomColor: theme.colors.border }}
              activeOpacity={0.7}
              onPress={() => router.push('/(app)/(tabs)/profile/language-select')}
            >
              <Text className="text-base" style={{ color: theme.colors.text }}>
                Язык
              </Text>
              <View className="flex-1" />
              <Text className="mr-2 text-sm font-medium" style={{ color: theme.colors.textSubtle }}>
                {getLanguageDisplayName(language)}
              </Text>
              <Ionicons name="chevron-forward" size={20} color={theme.colors.textSubtle} />
            </TouchableOpacity>

            {/* Location */}
            <TouchableOpacity
              className="flex-row items-center border-b p-3"
              style={{ borderBottomColor: theme.colors.border }}
              activeOpacity={0.7}
              onPress={() => {
                Alert.prompt(
                  'Update Location',
                  'Enter your new location:',
                  [
                    { text: 'Cancel', style: 'cancel' },
                    {
                      text: 'Update',
                      onPress: (newLocation?: string) => {
                        if (newLocation) {
                          updateLocationMutation.mutate(newLocation);
                        }
                      },
                    },
                  ],
                  'plain-text',
                  location
                );
              }}
            >
              <Text className="text-base" style={{ color: theme.colors.text }}>
                Местоположение
              </Text>
              <View className="flex-1" />
              <Text className="mr-2 text-sm font-medium" style={{ color: theme.colors.textSubtle }}>
                {location}
              </Text>
              <Ionicons name="chevron-forward" size={20} color={theme.colors.textSubtle} />
            </TouchableOpacity>

            {/* Email Notifications */}
            <View className="flex-row items-center border-b p-3" style={{ borderBottomColor: theme.colors.border }}>
              <Text className="text-base" style={{ color: theme.colors.text }}>
                Email уведомления
              </Text>
              <View className="flex-1" />
              <Switch
                onValueChange={val => setForm({ ...form, emailNotifications: val })}
                value={form.emailNotifications}
                trackColor={{
                  false: '#D3D5DA',
                  true: '#1868DB',
                }}
                thumbColor="#FFFFFF"
                ios_backgroundColor="#D3D5DA"
              />
            </View>

            {/* Push Notifications */}
            <View className="flex-row items-center p-3">
              <Text className="text-base" style={{ color: theme.colors.text }}>
                Push уведомления
              </Text>
              <View className="flex-1" />
              <Switch
                onValueChange={val => setForm({ ...form, pushNotifications: val })}
                value={form.pushNotifications}
                trackColor={{
                  false: '#D3D5DA',
                  true: '#1868DB',
                }}
                thumbColor="#FFFFFF"
                ios_backgroundColor="#D3D5DA"
              />
            </View>
          </View>
        </View>

        {/* Resources */}
        <View className="mb-6">
          <Text className="mb-1 pl-3 text-lg font-semibold uppercase" style={{ color: theme.colors.textSubtle }}>
            Ресурсы
          </Text>

          <View className="rounded-2xl" style={{ backgroundColor: theme.colors.backgroundNeutral }}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                className={`flex-row items-center p-3 ${index !== menuItems.length - 1 ? 'border-b' : ''}`}
                style={index !== menuItems.length - 1 ? { borderBottomColor: theme.colors.border } : undefined}
                activeOpacity={0.7}
                onPress={() => {
                  if (item.type === 'navigate' && item.route) {
                    router.push(item.route);
                  } else if (item.type === 'external' && item.action) {
                    item.action();
                  }
                }}
              >
                <Text className="text-base" style={{ color: theme.colors.text }}>
                  {item.label}
                </Text>
                <View className="flex-1" />
                <Ionicons name="chevron-forward-outline" size={20} color={theme.colors.textSubtle} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Logout */}
        <View>
          <TouchableOpacity
            className="items-center justify-center rounded-2xl p-3"
            style={{ backgroundColor: theme.colors.backgroundNeutral }}
            activeOpacity={0.7}
            onPress={handleLogout}
          >
            <Text className="text-base font-semibold" style={{ color: theme.colors.textDanger }}>
              Выйти из аккаунта
            </Text>
          </TouchableOpacity>

          {/* <TouchableOpacity
              className="flex-row items-center justify-center rounded-2xl bg-background-neutral px-4 py-4 active:opacity-80 dark:bg-background-neutral-dark"
              activeOpacity={0.7}
              onPress={handleDeleteAccount}
            >
              <Text className="text-base font-semibold text-red-600 dark:text-red-400">Удалить аккаунт</Text>
            </TouchableOpacity> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
