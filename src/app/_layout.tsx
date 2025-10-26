import '@/i18n'; // Import your i18n configuration
import 'react-native-reanimated';
import './globals.css';

import { useFonts } from 'expo-font';
import { router, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { LogBox, Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as Notifications from 'expo-notifications';

import { AuthenticationException } from '@/openapi/auth-utils';
import { useAuthStore } from '@/state/auth/useAuthStore';
import { useThemeStore } from '@/state/theme/useThemeStore';
import { MyDarkTheme, MyLightTheme } from '@/theme';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { ThemeProvider } from '@react-navigation/native';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import { NotificationProvider } from '@/context/NotificationContext';

// const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;
// if (!publishableKey) {
//   throw new Error(
//     'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env'
//   );
// }
LogBox.ignoreLogs(['Clerk: Clerk has been loaded with development keys']);

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error: any) => {
      console.log('-----------');
      console.log('-----------');
      console.log(error);
      console.log('-----------');
      console.log(error instanceof AuthenticationException);
      if (error instanceof AuthenticationException) {
        router.push('/sign-in');
        console.log('PUSHING TO SIGN IN');
      }
    },
  }),
  defaultOptions: {
    queries: {
      // staleTime: 60 * 60 * 1000,
      retry: false,
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

  // useEffect(() => {
  //   // Request notification permissions
  //   const requestPermissions = async () => {
  //     const { status } = await Notifications.requestPermissionsAsync();
  //     if (status !== 'granted') {
  //       console.log('Notification permissions not granted');
  //       return;
  //     }

  //     // Get Expo push token
  //     try {
  //       const token = await Notifications.getExpoPushTokenAsync();
  //       console.log('Expo Push Token:', token.data);
  //       // TODO: Send token to backend API
  //       // Example: await api.updateUserDeviceToken({ deviceToken: token.data });
  //     } catch (error) {
  //       console.error('Failed to get push token:', error);
  //     }
  //   };

  //   requestPermissions();

  //   // Set up notification handler
  //   const subscription = Notifications.addNotificationReceivedListener(notification => {
  //     console.log('Notification received:', notification);
  //   });

  //   const responseSubscription = Notifications.addNotificationResponseReceivedListener(response => {
  //     console.log('Notification response:', response);
  //   });

  //   return () => {
  //     subscription.remove();
  //     responseSubscription.remove();
  //   };
  // }, []);

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
      <NotificationProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider value={isDark ? MyDarkTheme : MyLightTheme}>
            <BottomSheetModalProvider>
              <InitialLayout />
            </BottomSheetModalProvider>
          </ThemeProvider>
        </QueryClientProvider>
        {Platform.OS === 'ios' && <Toast />}
      </NotificationProvider>
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
