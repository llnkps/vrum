import { Stack } from 'expo-router';

export default function AdvertisementLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="archived" />
    </Stack>
  );
}
