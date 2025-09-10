import 'react-native-reanimated';
import './globals.css';

import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { ActivityIndicator, LogBox, Text, useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { tokenCache } from '@/utils/cache';
import { useReactQueryDevTools } from '@dev-plugins/react-query';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import '@/i18n'; // Import your i18n configuration

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

export const unstable_settings = {
  initialRouteName: 'index',
};

const InitialLayout = () => {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const { isLoaded, isSignedIn } = { isLoaded: true, isSignedIn: true }; // useAuth();
  const router = useRouter();
  const segments = useSegments();
  useReactQueryDevTools(queryClient);

  useEffect(() => {
    if (loaded && isLoaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded, isLoaded]);

  useEffect(() => {
    if (!loaded) return;

    const inAuthGroup = segments[1] === '(authenticated)';
    console.log(isSignedIn && !inAuthGroup, inAuthGroup, segments);
    if (isSignedIn && !inAuthGroup) {
      router.replace('/(app)/(authenticated)/(tabs)');
    }
  }, [isLoaded, isSignedIn, loaded]);

  if (!isLoaded || !loaded) {
    return <ActivityIndicator />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="(app)" />
    </Stack>
  );
};

const RootLayout = () => {
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <InitialLayout />
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
