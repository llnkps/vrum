import 'react-native-reanimated';
import './globals.css';
import '@/i18n'; // Import your i18n configuration

import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { ActivityIndicator, LogBox, Text, useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { tokenCache } from '@/utils/cache';
import { useReactQueryDevTools } from '@dev-plugins/react-query';
import { DarkTheme, DefaultTheme, ThemeProvider, useTheme } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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
  // const { isLoaded, isSignedIn } = { isLoaded: true, isSignedIn: true }; // useAuth();
  // const router = useRouter();


  const [loadedFonts] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  // // const segments = useSegments();
  // // useReactQueryDevTools(queryClient);
  console.log(loadedFonts)
  useEffect(() => {
    if (loadedFonts) {
      SplashScreen.hideAsync();
    }
  }, [loadedFonts]);

  // useEffect(() => {
  //   // if (!loaded) return;

  //   // const inAuthGroup = segments[1] === '(authenticated)';
  //   // console.log(isSignedIn && !inAuthGroup, inAuthGroup, segments);

  //   const timeout = setTimeout(() => {
  //     if (isSignedIn) {
  //       router.replace('/(app)/(authenticated)/(tabs)');
  //     }
  //   }, 0);

  //   return () => clearTimeout(timeout)

  // }, [isLoaded, isSignedIn, router]);

  // console.log(!isLoaded)

  // return (
  //   <Stack screenOptions={{ headerShown: false }}>
  //     <Stack.Screen name="login" />
  //   </Stack>
  // );


  // const { data: session } = authClient.useSession();
  const isAuthenticated = true;
  console.log("INITIAL LAYOUT", isAuthenticated)
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen name="(app)" />
      </Stack.Protected>
      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
    </Stack>
  );

};

const RootLayout = () => {
  const colorScheme = useColorScheme();
  const theme = useTheme();
  console.log("ROOT LAYOUT", theme, colorScheme)
  return (
    <GestureHandlerRootView className="flex-1">
      <QueryClientProvider client={queryClient}>
        <ThemeProvider value={colorScheme === 'dark' ? MyDarkTheme : MyLightTheme}>
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



// for navigation elements: tab, header
const MyLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#FFFFFF",
    text: "#292A2E",
    primary: "#1868DB",
    tabBarActiveTintColor: "#0d6c9a",
    tabBarInactiveTintColor: "#8E8E93",
  },
};

const MyDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: "#000",
    text: "#BFC1C4",
    primary: "#669DF1",
    tabBarActiveTintColor: "#BFC1C4",
    tabBarInactiveTintColor: "#6B6E76",
  },
};
