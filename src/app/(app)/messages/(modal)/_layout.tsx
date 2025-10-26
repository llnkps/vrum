import { Stack } from 'expo-router';

export default function ModalsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="chat-room" options={{ presentation: 'modal', headerShown: false }} />
    </Stack>
  );
}
