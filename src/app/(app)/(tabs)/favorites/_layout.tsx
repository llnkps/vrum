import { CustomTheme } from '@/theme';
import { useTheme } from '@react-navigation/native';
import { Stack } from 'expo-router';

export default function FavoriteStackLayout() {
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
          title: 'Избранное',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="sort-select"
        options={{
          title: 'Сортировать по',
          headerBackTitle: 'Отмена',
          presentation: 'modal',
        }}
      />
    </Stack>
  );
}
