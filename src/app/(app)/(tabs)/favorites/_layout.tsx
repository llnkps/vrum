// app/(tabs)/home/_layout.tsx
import { Stack } from "expo-router";

export default function FavoriteStackLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="subscription" />
    </Stack>
  );
}
