import { Stack } from "expo-router";

export default function ModalsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="brand-auto-modal-filter" options={{ presentation: "modal", headerShown: false }} />
      <Stack.Screen name="brand-auto-modal-type-filter" options={{ presentation: "modal", headerShown: false }} />
      <Stack.Screen name="generation-modal-filter" options={{ presentation: "modal", headerShown: false }} />
      <Stack.Screen
        name="settings"
        options={{
          presentation: "modal",
          headerShown: false,
          animation: "default",
        }}
      />
    </Stack>
  );
}
