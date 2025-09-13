import { Slot, Stack, useRouter } from 'expo-router';
import { Text, TouchableOpacity, useColorScheme } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { opacity } from 'react-native-reanimated/lib/typescript/Colors';
import { useTheme } from '@react-navigation/native';

export default function SearchFilterLayout() {
  const router = useRouter();
  const colorScheme = useColorScheme();

  // TODO: change color based on theme from colorScheme
  const theme = useTheme();

  console.log(colorScheme)
  const commonOptions = {
    headerShown: true,
    // headerTransparent: true,
    headerBackVisible: false,
    headerLeft: () => (
      <TouchableOpacity
        onPress={() => router.dismiss()}
        className="p-2"
      >
        <Ionicons name="close" size={22} color="white" />
      </TouchableOpacity>
    ),
    animation: "slide_from_bottom",
    sheetGrabberVisible: false,
    sheetInitialDetentIndex: 1,
    sheetAllowedDetents: [0.5, 1.0],
    headerStyle: {
      backgroundColor: theme.colors.backgroundPage
    }
  };

  return (
    <Stack>
      <Stack.Screen name="model-gen" options={{ title: "", presentation: "formSheet", ...commonOptions }} />
      <Stack.Screen name="settings" options={{ title: "Advanced Filters", presentation: "formSheet", ...commonOptions }} />
      <Stack.Screen name="modal" options={{ title: "", presentation: 'modal', headerShown: false }} />
      <Stack.Screen name="modal-model" options={{ title: "", presentation: 'modal', headerShown: false }} />
    </Stack>
  )
}
