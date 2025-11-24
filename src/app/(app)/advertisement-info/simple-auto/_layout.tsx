import { Stack } from 'expo-router';

export default function SimpleAutoInfoLayout() {
  return (
    <Stack>
      <Stack.Screen name="[id]" options={{ headerShown: false }} />
      <Stack.Screen name="specs" options={{ headerShown: true, title: 'Характеристики', headerBackTitle: 'Назад' }} />
    </Stack>
  );
}
