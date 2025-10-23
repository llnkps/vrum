import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Switch, Image, Alert } from 'react-native';
import FeatherIcon from '@expo/vector-icons/Feather';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@/state/auth/useAuthStore';
import { useThemeStore } from '@/state/theme/useThemeStore';
import { usePreferencesStore, Language } from '@/state/preferences/usePreferencesStore';
import { createAuthenticatedConfiguration } from '@/openapi/configurations';
import { UserApi } from '@/openapi/client';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

export default function SettingsPage() {
  const router = useRouter();
  const { isAuthenticated, logout } = useAuthStore();
  const { isDark, toggleTheme } = useThemeStore();
  const { language, location, setLocation } = usePreferencesStore();
  const tabBarHeight = useBottomTabBarHeight();

  const [form, setForm] = useState({
    emailNotifications: true,
    pushNotifications: false,
  });

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

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1">
        {/* Content */}
        <ScrollView className="px-5 py-4" contentContainerStyle={{ paddingBottom: tabBarHeight - 40 }} showsVerticalScrollIndicator={false}>
          {/* Account Section */}
          <View className="flex-1 ">
            <Text className="mb-3 pl-3 text-base font-semibold uppercase tracking-wide text-font-subtlest dark:text-font-subtlest-dark">Аккаунт</Text>

            <TouchableOpacity
              className="flex-row items-center rounded-2xl bg-background-neutral p-4 active:opacity-80 dark:bg-background-neutral-dark"
              activeOpacity={0.7}
              onPress={() => router.push('/(app)/(tabs)/profile/profile-edit')}
            >
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=facearea&w=256&h=256&q=80',
                }}
                className="h-14 w-14 rounded-xl"
              />
              <View className="ml-4 flex-1">
                <Text className="text-base font-semibold text-font dark:text-font-dark">{userData?.name || 'User'}</Text>
                <Text className="text-sm text-font-subtle dark:text-font-subtle-dark">{userData?.email || 'user@example.com'}</Text>
              </View>
              <FeatherIcon name="chevron-right" size={20} color="#A9ABAF" />
            </TouchableOpacity>
          </View>

          {/* Preferences */}
          <View className="py-4">
            <Text className="mb-3 pl-3 text-base font-semibold uppercase tracking-wide text-font-subtlest dark:text-font-subtlest-dark">
              Предпочтения
            </Text>

            <View className="overflow-hidden rounded-2xl bg-background-neutral dark:bg-background-neutral-dark">
              {/* Dark Mode Toggle */}
              <View className="flex-row items-center border-b border-border/10 px-4 py-4 dark:border-border-dark/10">
                <Text className="text-base text-font dark:text-font-dark">Темная тема</Text>
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
                className="flex-row items-center border-b border-border/10 px-4 py-4 active:opacity-80 dark:border-border-dark/10"
                activeOpacity={0.7}
                // onPress={() => {
                //   const languages: Language[] = ['en', 'ro', 'ru', 'uk'];
                //   const currentIndex = languages.indexOf(language);
                //   const nextIndex = (currentIndex + 1) % languages.length;
                //   handleLanguageChange(languages[nextIndex]);
                // }}
                onPress={() => router.push('/(app)/(tabs)/profile/language-select')}
              >
                <Text className="text-base text-font dark:text-font-dark">Язык</Text>
                <View className="flex-1" />
                <Text className="mr-2 text-sm font-medium text-font-subtle dark:text-font-subtle-dark">{getLanguageDisplayName(language)}</Text>
                <FeatherIcon name="chevron-right" size={18} color="#A9ABAF" />
              </TouchableOpacity>

              {/* Location */}
              <TouchableOpacity
                className="flex-row items-center border-b border-border/10 px-4 py-4 active:opacity-80 dark:border-border-dark/10"
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
                <Text className="text-base text-font dark:text-font-dark">Местоположение</Text>
                <View className="flex-1" />
                <Text className="mr-2 text-sm font-medium text-font-subtle dark:text-font-subtle-dark">{location}</Text>
                <FeatherIcon name="chevron-right" size={18} color="#A9ABAF" />
              </TouchableOpacity>

              {/* Email Notifications */}
              <View className="flex-row items-center border-b border-border/10 px-4 py-4 dark:border-border-dark/10">
                <Text className="text-base text-font dark:text-font-dark">Email уведомления</Text>
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
              <View className="flex-row items-center px-4 py-4">
                <Text className="text-base text-font dark:text-font-dark">Push уведомления</Text>
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
          <View className="py-4">
            <Text className="mb-3 pl-3 text-base font-semibold uppercase tracking-wide text-font-subtlest dark:text-font-subtlest-dark">Ресурсы</Text>

            <View className="overflow-hidden rounded-2xl bg-background-neutral dark:bg-background-neutral-dark">
              {menuItems.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  className={`flex-row items-center px-4 py-4 active:opacity-80 ${
                    index !== menuItems.length - 1 ? 'border-b border-border/10 dark:border-border-dark/10' : ''
                  }`}
                  activeOpacity={0.7}
                  onPress={() => {
                    if (item.type === 'navigate' && item.route) {
                      router.push(item.route);
                    } else if (item.type === 'external' && item.action) {
                      item.action();
                    }
                  }}
                >
                  <Text className="text-base text-font dark:text-font-dark">{item.label}</Text>
                  <View className="flex-1" />
                  <FeatherIcon name="chevron-right" size={18} color="#A9ABAF" />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Logout */}
          <View className="py-4">
            <TouchableOpacity
              className="mb-4 flex-row items-center justify-center rounded-2xl bg-background-neutral px-4 py-4 active:opacity-80 dark:bg-background-neutral-dark"
              activeOpacity={0.7}
              onPress={handleLogout}
            >
              <Text className="text-base font-semibold text-font-danger dark:text-font-danger-dark">Выйти из аккаунта</Text>
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
    </SafeAreaProvider>
  );
}
