import { useThemeStore } from '@/state/theme/useThemeStore';
import { Stack, useRouter } from 'expo-router';
import { Text, TouchableOpacity } from 'react-native';

export default function HelpPagesLayout() {
  const { isDark } = useThemeStore();
  const backgroundColor = isDark ? '#000' : '#fff';
  const headerTintColor = isDark ? '#BFC1C4' : '#292A2E';
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor,
        },
        headerTintColor,
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={{ color: headerTintColor, fontSize: 16 }}>Назад</Text>
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
      <Stack.Screen
        name="bug-report"
        options={{
          title: 'Связаться с нами',
        }}
      />
    </Stack>
  );
}
