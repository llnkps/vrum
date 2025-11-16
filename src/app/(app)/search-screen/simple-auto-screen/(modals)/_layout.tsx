import { Stack } from 'expo-router';

export default function ModalsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="simple-auto-modal" options={{ presentation: 'modal', headerShown: false }} />
      <Stack.Screen name="brand-auto-filter" options={{ presentation: 'modal', headerShown: false }} />
      <Stack.Screen name="model-filter" options={{ presentation: 'modal', headerShown: false }} />
      <Stack.Screen name="generation-filter" options={{ presentation: 'modal', headerShown: false }} />
      <Stack.Screen
        name="settings"
        options={{
          // presentation: 'modal',
          headerShown: false,
          animation: 'default',
        }}
      />
    </Stack>
  );
}
