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
import { useThemeStore } from '@/state/theme/useThemeStore';
import { MyDarkTheme, MyLightTheme } from '@/theme';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { ThemeProvider } from '@react-navigation/native';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import { NotificationProvider } from '@/context/NotificationContext';
import { AuthProvider } from '@/context/AuthContext';
import { KeyboardProvider } from 'react-native-keyboard-controller';

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
  const [loadedFonts] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loadedFonts) {
      SplashScreen.hideAsync();
    }
  }, [loadedFonts]);

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
      <KeyboardProvider statusBarTranslucent navigationBarTranslucent>
        <AuthProvider>
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
        </AuthProvider>
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
