import { Stack, useRouter } from 'expo-router';
import { useColorScheme } from 'react-native';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

export default function AppLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="search-screen" options={{ headerShown: false }} />
      <Stack.Screen name="advertisement" options={{ headerShown: false }} />

      {/* <Stack.Screen
        name="buy-car"
        options={{
          title: 'Buy Car',
          headerShown: false,
        }}
      /> */}

      {/* <Stack.Screen
        name="course/[slug]/index"
        options={{
          headerShown: true,
          headerTransparent: true,
          headerBackVisible: false,
          title: '',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.dismiss()}
              className="p-2 bg-white/25 rounded-full">
              <Ionicons name="close" size={22} color="black" />
            </TouchableOpacity>
          ),
          presentation: 'formSheet',
          gestureDirection: 'vertical',
          animation: 'slide_from_bottom',
          sheetGrabberVisible: false,
          sheetInitialDetentIndex: 1,
          sheetAllowedDetents: [0.5, 1.0],
        }}
      />
      <Stack.Screen
        name="course/[slug]/[lesson]"
        options={{
          headerShown: false,
        }}
      /> */}
    </Stack>
  );
}
