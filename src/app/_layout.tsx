import 'react-native-reanimated';
import './globals.css';
import '@/i18n'; // Import your i18n configuration

import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { LogBox, useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { MyDarkTheme, MyLightTheme } from '@/theme';
import { ThemeProvider } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useThemeStore } from '@/state/theme/useThemeStore';
import { useAuthStore } from '@/state/auth/useAuthStore';

// const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;
// if (!publishableKey) {
//   throw new Error(
//     'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env'
//   );
// }
LogBox.ignoreLogs(['Clerk: Clerk has been loaded with development keys']);

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 60 * 1000,
    },
  },
});

const InitialLayout = () => {
  const { checkAuth } = useAuthStore();

  const [loadedFonts] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loadedFonts) {
      SplashScreen.hideAsync();
    }
  }, [loadedFonts]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(app)" />
      <Stack.Screen name="(auth)" />
    </Stack>
  );
};

const RootLayout = () => {
  const { isDark } = useThemeStore();

  return (
    <GestureHandlerRootView className="flex-1">
      <QueryClientProvider client={queryClient}>
        <ThemeProvider value={isDark ? MyDarkTheme : MyLightTheme}>
          <BottomSheetModalProvider>
            <InitialLayout />
          </BottomSheetModalProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
  // return (
  //   <ClerkProvider
  //     tokenCache={tokenCache}
  //     publishableKey={publishableKey}
  //     waitlistUrl="http://localhost:8081/">
  //     <GestureHandlerRootView style={{ flex: 1 }}>
  //       <ClerkLoaded>
  //         <QueryClientProvider client={queryClient}>
  //           <StrapiProvider>
  //             <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
  //               <InitialLayout />
  //             </ThemeProvider>
  //           </StrapiProvider>
  //         </QueryClientProvider>
  //       </ClerkLoaded>
  //     </GestureHandlerRootView>
  //   </ClerkProvider>
  // );
};

export default RootLayout;
