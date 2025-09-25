import React, { useState } from "react";
import { ScrollView, View, Text, TouchableOpacity, Switch, Image } from "react-native";
import FeatherIcon from "@expo/vector-icons/Feather";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function SettingsPage() {
  const [form, setForm] = useState({
    emailNotifications: true,
    pushNotifications: false,
  });

  return (
    <SafeAreaProvider>
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
                <Text className="text-base font-semibold text-font dark:text-font-dark">John Doe</Text>
                <Text className="text-sm text-font-subtle dark:text-font-subtle-dark">john@example.com</Text>
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
              {/* Language */}
              <TouchableOpacity
                className="flex-row items-center px-4 py-4 border-b border-border/10 dark:border-border-dark/10 active:opacity-80"
                activeOpacity={0.7}
              >
                <Text className="text-base text-font dark:text-font-dark">Язык</Text>
                <View className="flex-1" />
                <Text className="text-sm font-medium text-font-subtle dark:text-font-subtle-dark mr-2">English</Text>
                <FeatherIcon name="chevron-right" size={18} color="#A9ABAF" />
              </TouchableOpacity>

              {/* Location */}
              <TouchableOpacity
                className="flex-row items-center px-4 py-4 border-b border-border/10 dark:border-border-dark/10 active:opacity-80"
                activeOpacity={0.7}
              >
                <Text className="text-base text-font dark:text-font-dark">Местоположение</Text>
                <View className="flex-1" />
                <Text className="text-sm font-medium text-font-subtle dark:text-font-subtle-dark mr-2">
                  Los Angeles, CA
                </Text>
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
                    false: "#D3D5DA", // border
                    true: "#1868DB", // interactive-primary
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
            >
              <Text className="text-base font-semibold text-font-danger dark:text-font-danger-dark">
                Выйти из аккаунта
              </Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View className="py-8 items-center">
            <Text className="text-xs text-center text-font-subtlest dark:text-font-subtlest-dark">
              App Version 2.24 #50491
            </Text>
            <Text className="text-xs text-center text-font-subtlest dark:text-font-subtlest-dark mt-1">
              Сделано с ❤️ в Молдове
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
