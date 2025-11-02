import { Stack } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

export default function AppLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="search-screen" options={{ headerShown: false }} />
      <Stack.Screen name="advertisement" options={{ headerShown: false }} />
      <Stack.Screen name="messages" options={{ headerShown: false }} />
      <Stack.Screen name="help-pages" options={{ headerShown: false }} />
      <Stack.Screen name="advertisement-info" options={{ headerShown: false }} />
    </Stack>
  );
}
