import HeaderAuto from '@/assets/images/header-auto-icon.svg';
import HeaderBreak from '@/assets/images/header-break-icon.svg';
import HeaderMoto from '@/assets/images/header-moto-icon.svg';
import HeaderSpecAuto from '@/assets/images/header-specauto-icon.svg';
import { SelectableButton } from '@/components/ui/button';
import { useAuthContext } from '@/context/AuthContext';
import { CustomTheme } from '@/theme';
import { Ionicons } from '@expo/vector-icons';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useTheme } from '@react-navigation/native';
import clsx from 'clsx';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AdvertisementScreen() {
  const router = useRouter();
  const { isAuthenticated } = useAuthContext();
  const theme = useTheme() as CustomTheme;
  const tabBarHeight = useBottomTabBarHeight();
  const [tab, setTab] = React.useState<'actual' | 'archived'>('actual');

  console.log('isAuthenticated', isAuthenticated);
  // Authentication is now handled at the tab level

  return (
    <>
      <SafeAreaView className="flex-1">
        <View className="px-4 pb-6 pt-5">
          <Text className="text-2xl font-bold" style={{ color: theme.colors.text }}>
            Мои объявления
          </Text>
        </View>

        <View className="flex-row rounded-lg bg-surface dark:bg-surface-dark">
          <SelectableButton appearance="subtle" title="Актуальные" isSelected={tab === 'actual'} onPress={() => setTab('actual')} />
          <SelectableButton appearance="subtle" title="Архив" isSelected={tab === 'archived'} onPress={() => setTab('archived')} />
        </View>
      </SafeAreaView>

      <View style={{ flex: 1, paddingBottom: tabBarHeight }}>
        <View className="flex-1 items-center justify-center">
          <Ionicons name="newspaper-outline" size={64} className="mb-4" color={theme.colors.icon} />
          <Text className="mx-10 text-center" style={{ color: theme.colors.text }}>
            У вас нет активных объявлений
          </Text>
        </View>

        {/* Bottom bar */}
        <View
          className="rounded-t-3xl border-t px-4 pb-10 pt-6 shadow-lg"
          style={{ borderColor: theme.colors.border, backgroundColor: theme.colors.surface }}
        >
          <Text className="mb-4 text-lg font-bold" style={{ color: theme.colors.text }}>
            Добавить объявление
          </Text>

          <View className="flex-row justify-center gap-x-3">
            <TouchableHighlight
              className={clsx('rounded-md p-2')}
              style={{ backgroundColor: theme.colors.backgroundNeutral }}
              onPress={() => {
                if (isAuthenticated) {
                  router.push('/(app)/advertisement/simple-auto');
                } else {
                  router.replace('/sign-in');
                }
              }}
              activeOpacity={0.6}
              underlayColor="#DDDDDD"
            >
              <View className="flex-col items-center justify-center">
                <HeaderAuto />
                <Text style={{ color: theme.colors.text }}>Автомобили</Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight
              className={clsx('rounded-md p-2')}
              style={{ backgroundColor: theme.colors.backgroundNeutral }}
              onPress={() => router.push('/(app)/advertisement/spec-auto')}
            >
              <View className="flex-col items-center justify-center">
                <HeaderSpecAuto />
                <Text style={{ color: theme.colors.text }}>Спецтехника</Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight
              className={clsx('rounded-md p-2')}
              style={{ backgroundColor: theme.colors.backgroundNeutral }}
              onPress={() => router.push('/(app)/advertisement/motorbike')}
            >
              <View className="flex-col items-center justify-center">
                <HeaderMoto />
                <Text style={{ color: theme.colors.text }}>Мототехника</Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight
              className={clsx('rounded-md p-2')}
              style={{ backgroundColor: theme.colors.backgroundNeutral }}
              onPress={() => router.push('/(app)/advertisement/details')}
            >
              <View className="flex-col items-center justify-center">
                <HeaderBreak />
                <Text style={{ color: theme.colors.text }}>Запчасти</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </>
  );
}
