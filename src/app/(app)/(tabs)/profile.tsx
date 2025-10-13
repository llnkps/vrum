import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, TouchableOpacity, Switch, Image, Alert } from "react-native";
import FeatherIcon from "@expo/vector-icons/Feather";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/state/auth/useAuthStore";
import { useThemeStore } from "@/state/theme/useThemeStore";
import { usePreferencesStore, Language } from "@/state/preferences/usePreferencesStore";
import { createAuthenticatedConfiguration } from "@/openapi/configurations";
import { UserApi } from "@/openapi/client";
import i18n from "@/i18n";

export default function SettingsPage() {
  const router = useRouter();
  const { isAuthenticated, logout } = useAuthStore();
  const { isDark, toggleTheme } = useThemeStore();
  const { language, location, setLanguage, setLocation } = usePreferencesStore();

  const [form, setForm] = useState({
    emailNotifications: true,
    pushNotifications: false,
  });

  // Check authentication
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/sign-in");
    }
  }, [isAuthenticated, router]);

  // Fetch user data
  const { data: userData } = useQuery({
    queryKey: ["user-profile"],
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
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await logout();
          router.replace("/sign-in");
        },
      },
    ]);
  };

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  const getLanguageDisplayName = (lang: Language) => {
    const names = {
      en: "English",
      ro: "Română",
      ru: "Русский",
      uk: "Українська",
    };
    return names[lang];
  };

  if (!isAuthenticated) {
    return null; // Will redirect
  }

  return (
    <SafeAreaView className="flex-1 bg-background-neutral dark:bg-background-neutral-dark">
      {/* Header */}
      <View className="px-5 py-4 border-b border-border/10 dark:border-border-dark/10">
        <Text className="text-2xl font-bold text-font dark:text-font-dark">Настройки</Text>
      </View>

      {/* Content */}
      <ScrollView className="px-5 py-2" showsVerticalScrollIndicator={false}>
        {/* Account Section */}
        <View className="py-4">
          <Text className="text-sm font-semibold text-font-subtlest dark:text-font-subtlest-dark uppercase tracking-wide pl-3 mb-3">
            Аккаунт
          </Text>

          <TouchableOpacity
            className="flex-row items-center bg-surface dark:bg-surface-dark p-4 rounded-2xl active:opacity-80"
            activeOpacity={0.7}
          >
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=facearea&w=256&h=256&q=80",
              }}
              className="w-14 h-14 rounded-xl"
            />
            <View className="flex-1 ml-4">
              <Text className="text-base font-semibold text-font dark:text-font-dark">{userData?.name || "User"}</Text>
              <Text className="text-sm text-font-subtle dark:text-font-subtle-dark">{userData?.email || "user@example.com"}</Text>
            </View>
            <FeatherIcon name="chevron-right" size={20} color="#A9ABAF" />
          </TouchableOpacity>
        </View>

        {/* Preferences */}
        <View className="py-4">
          <Text className="text-sm font-semibold text-font-subtlest dark:text-font-subtlest-dark uppercase tracking-wide pl-3 mb-3">
            Предпочтения
          </Text>

          <View className="bg-surface dark:bg-surface-dark rounded-2xl overflow-hidden">
            {/* Dark Mode Toggle */}
            <View className="flex-row items-center px-4 py-4 border-b border-border/10 dark:border-border-dark/10">
              <Text className="text-base text-font dark:text-font-dark">Темная тема</Text>
              <View className="flex-1" />
              <Switch
                onValueChange={toggleTheme}
                value={isDark}
                trackColor={{
                  false: "#D3D5DA",
                  true: "#1868DB",
                }}
                thumbColor="#FFFFFF"
                ios_backgroundColor="#D3D5DA"
              />
            </View>

            {/* Language */}
            <TouchableOpacity
              className="flex-row items-center px-4 py-4 border-b border-border/10 dark:border-border-dark/10 active:opacity-80"
              activeOpacity={0.7}
              onPress={() => {
                const languages: Language[] = ["en", "ro", "ru", "uk"];
                const currentIndex = languages.indexOf(language);
                const nextIndex = (currentIndex + 1) % languages.length;
                handleLanguageChange(languages[nextIndex]);
              }}
            >
              <Text className="text-base text-font dark:text-font-dark">Язык</Text>
              <View className="flex-1" />
              <Text className="text-sm font-medium text-font-subtle dark:text-font-subtle-dark mr-2">
                {getLanguageDisplayName(language)}
              </Text>
              <FeatherIcon name="chevron-right" size={18} color="#A9ABAF" />
            </TouchableOpacity>

            {/* Location */}
            <TouchableOpacity
              className="flex-row items-center px-4 py-4 border-b border-border/10 dark:border-border-dark/10 active:opacity-80"
              activeOpacity={0.7}
              onPress={() => {
                Alert.prompt(
                  "Update Location",
                  "Enter your new location:",
                  [
                    { text: "Cancel", style: "cancel" },
                    {
                      text: "Update",
                      onPress: (newLocation?: string) => {
                        if (newLocation) {
                          updateLocationMutation.mutate(newLocation);
                        }
                      },
                    },
                  ],
                  "plain-text",
                  location
                );
              }}
            >
              <Text className="text-base text-font dark:text-font-dark">Местоположение</Text>
              <View className="flex-1" />
              <Text className="text-sm font-medium text-font-subtle dark:text-font-subtle-dark mr-2">{location}</Text>
              <FeatherIcon name="chevron-right" size={18} color="#A9ABAF" />
            </TouchableOpacity>

            {/* Email Notifications */}
            <View className="flex-row items-center px-4 py-4 border-b border-border/10 dark:border-border-dark/10">
              <Text className="text-base text-font dark:text-font-dark">Email уведомления</Text>
              <View className="flex-1" />
              <Switch
                onValueChange={(val) => setForm({ ...form, emailNotifications: val })}
                value={form.emailNotifications}
                trackColor={{
                  false: "#D3D5DA",
                  true: "#1868DB",
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
                onValueChange={(val) => setForm({ ...form, pushNotifications: val })}
                value={form.pushNotifications}
                trackColor={{
                  false: "#D3D5DA",
                  true: "#1868DB",
                }}
                thumbColor="#FFFFFF"
                ios_backgroundColor="#D3D5DA"
              />
            </View>
          </View>
        </View>

        {/* Resources */}
        <View className="py-4">
          <Text className="text-sm font-semibold text-font-subtlest dark:text-font-subtlest-dark uppercase tracking-wide pl-3 mb-3">
            Ресурсы
          </Text>

          <View className="bg-surface dark:bg-surface-dark rounded-2xl overflow-hidden">
            {["Связаться с нами", "Сообщить об ошибке", "Оценить в App Store", "Условия и конфиденциальность"].map(
              (item, index) => (
                <TouchableOpacity
                  key={index}
                  className={`flex-row items-center px-4 py-4 active:opacity-80 ${
                    index !== 3 ? "border-b border-border/10 dark:border-border-dark/10" : ""
                  }`}
                  activeOpacity={0.7}
                >
                  <Text className="text-base text-font dark:text-font-dark">{item}</Text>
                  <View className="flex-1" />
                  <FeatherIcon name="chevron-right" size={18} color="#A9ABAF" />
                </TouchableOpacity>
              )
            )}
          </View>
        </View>

        {/* Logout */}
        <View className="py-4">
          <TouchableOpacity
            className="flex-row items-center bg-surface dark:bg-surface-dark px-4 py-4 justify-center rounded-2xl active:opacity-80"
            activeOpacity={0.7}
            onPress={handleLogout}
          >
            <Text className="text-base font-semibold text-font-danger dark:text-font-danger-dark">Выйти из аккаунта</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View className="py-8 items-center">
          <Text className="text-xs text-center text-font-subtlest dark:text-font-subtlest-dark">App Version 2.24 #50491</Text>
          <Text className="text-xs text-center text-font-subtlest dark:text-font-subtlest-dark mt-1">Сделано с ❤️ в Молдове</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
