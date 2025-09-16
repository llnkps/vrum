import { Stack, useRouter } from 'expo-router';

import CloseIcon from '@/components/global/CloseIcon';

export default function SearchFilterLayout() {
  const router = useRouter();

  const commonOptions = {
    headerShown: true,
    // headerTransparent: true,
    headerBackVisible: false,
    headerLeft: () => (
      <CloseIcon onPress={() => router.dismiss} />
    ),
    animation: "slide_from_bottom",
    // sheetGrabberVisible: false,
    sheetInitialDetentIndex: 1,
    sheetAllowedDetents: [0.5, 1.0],
    headerStyle: {
      // backgroundColor: theme.colors.backgroundPage
    }
  };

  return (
    <Stack>
      <Stack.Screen
        name="brand-auto-filter"
        options={{ title: "", presentation: 'modal', headerShown: false }}
      />
      <Stack.Screen
        name="brand-auto-type-filter"
        options={{ title: "", presentation: 'modal', headerShown: false }}
      />

      <Stack.Screen
        name="year-filter"
        options={{
          title: "HELLO WORLD",
          headerShown: false,
          presentation: "formSheet",
          animation: "slide_from_bottom",
          gestureDirection: "vertical",
          sheetGrabberVisible: true,
          sheetInitialDetentIndex: 0,
          sheetAllowedDetents: [.5, .75, 1],
          sheetCornerRadius: 20,
          sheetExpandsWhenScrolledToEdge: true,
          sheetElevation: 24,
        }}
      />

      <Stack.Screen name="model-gen" options={{ title: "", presentation: "formSheet", ...commonOptions }} />
      <Stack.Screen name="settings" options={{ title: "Advanced Filters", presentation: "formSheet", ...commonOptions }} />
    </Stack>
  )
}
