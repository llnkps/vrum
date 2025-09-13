import { Slot, Stack, useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

export default function SearchFilterLayout() {

  const router = useRouter();

  const commonOptions = {
    headerShown: true,
    // headerTransparent: true,
    headerBackVisible: false,
    headerLeft: () => (
      <TouchableOpacity
        onPress={() => router.dismiss()}
        className="p-2 bg-white/25 rounded-full"
      >
        <Ionicons name="close" size={22} color="black" />
      </TouchableOpacity>
    ),
    presentation: "formSheet",
    gestureDirection: "vertical",
    animation: "slide_from_bottom",
    sheetGrabberVisible: false,
    sheetInitialDetentIndex: 1,
    sheetAllowedDetents: [0.5, 1.0],
  };

  return (
    <Stack>
      <Stack.Screen name="model-gen" options={{ title: "Something easy", ...commonOptions }} />
      <Stack.Screen name="settings" options={{ title: "Advanced Filters", ...commonOptions }} />
    </Stack>
  )
}
