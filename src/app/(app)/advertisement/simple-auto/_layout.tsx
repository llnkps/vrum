import { FilterProvider } from "@/modules/advertisement/simple-auto/FilterProvider";
import { Stack } from "expo-router";

export default function ModalsLayout() {
  return (
    <FilterProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          presentation: "modal",
          animation: "slide_from_bottom",
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="brand-auto-modal" />
        <Stack.Screen name="brand-auto-type-modal" />
      </Stack>
    </FilterProvider>
  );
}
