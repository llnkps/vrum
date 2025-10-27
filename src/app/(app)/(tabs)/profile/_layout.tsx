import { CustomTheme } from '@/theme';
import { useTheme } from '@react-navigation/native';
import { Stack } from 'expo-router';

export default function ProfileLayout() {
  const theme = useTheme() as CustomTheme;

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerTintColor: theme.colors.headerTintColor,
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
