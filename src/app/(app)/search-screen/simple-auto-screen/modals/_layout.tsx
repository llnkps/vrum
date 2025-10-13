import { Stack } from "expo-router";

export default function ModalsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        presentation: "modal",
        animation: "slide_from_bottom",
      }}
    >
      <Stack.Screen
        name="brand-auto-modal-filter"
        options={{ title: "", presentation: "modal", headerShown: false }}
      />
      <Stack.Screen
        name="brand-auto-modal-type-filter"
        options={{ title: "", presentation: "modal", headerShown: false }}
      />
      <Stack.Screen
        name="generation-modal-filter"
        options={{ title: "", presentation: "modal", headerShown: false }}
      />
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
