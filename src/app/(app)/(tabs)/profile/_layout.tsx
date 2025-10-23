import { useThemeStore } from '@/state/theme/useThemeStore';
import { Stack } from 'expo-router';

export default function ProfileLayout() {
  const { isDark } = useThemeStore();
  const backgroundColor = isDark ? '#000' : '#fff';
  const headerTintColor = isDark ? '#BFC1C4' : '#292A2E';

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor,
        },
        headerTintColor,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          // headerShown: false,
          title: 'Настройки',
        }}
      />
      <Stack.Screen
        name="profile-edit"
        options={{
          title: 'Аккаунт',
          headerBackTitle: 'Назад',
        }}
      />
      <Stack.Screen
        name="language-select"
        options={{
          title: 'Выбор языка',
          headerBackTitle: 'Назад',
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="bug-report"
        options={{
          title: 'Сообщить об ошибке',
          headerBackTitle: 'Назад',
        }}
      />
    </Stack>
  );
}
