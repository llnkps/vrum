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
          headerShown: false,
          title: 'Профиль',
        }}
      />
      <Stack.Screen
        name="profile-edit"
        options={{
          title: 'Аккаунт',
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
    </Stack>
  );
}
