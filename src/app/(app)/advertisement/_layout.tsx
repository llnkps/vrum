import { Stack } from 'expo-router';

export default function ModalsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        presentation: 'modal',
        animation: 'slide_from_bottom',
      }}
    >
      <Stack.Screen name="simple-auto" />
      <Stack.Screen name="spec-auto" />
      <Stack.Screen name="motorbike" />
      <Stack.Screen name="details" />
    </Stack>
  );
}
