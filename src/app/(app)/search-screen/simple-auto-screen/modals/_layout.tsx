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
        name="brand-auto-filter"
        options={{ title: "", presentation: "modal", headerShown: false }}
      />
      <Stack.Screen
        name="brand-auto-type-filter"
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
