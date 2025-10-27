import { CustomTheme } from '@/theme';
import { useTheme } from '@react-navigation/native';
import { Stack, useRouter } from 'expo-router';
import { Text, TouchableOpacity } from 'react-native';

export default function HelpPagesLayout() {
  const router = useRouter();

  const theme = useTheme() as CustomTheme;

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerTintColor: theme.colors.headerTintColor,
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={{ color: theme.colors.headerTintColor, fontSize: 16 }}>Назад</Text>
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen
        name="support"
        options={{
          title: 'Помощь и поддержка',
        }}
      />
      <Stack.Screen
        name="about"
        options={{
          title: 'О приложении',
        }}
      />
      <Stack.Screen
        name="feedback"
        options={{
          title: 'Обратная связь',
        }}
      />
      <Stack.Screen
        name="privacy"
        options={{
          title: 'Условия и конфиденциальность',
        }}
      />
    </Stack>
  );
}
