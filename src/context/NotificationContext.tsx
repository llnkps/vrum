import { registerForPushNotificationsAsync } from '@/utils/registerForPushNotificationsAsync';
import * as Notifications from 'expo-notifications';
import React, { createContext, ReactNode, useContext, useEffect, useRef, useState } from 'react';
import Constants from 'expo-constants';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import { PushTokenApi, RegisterPushTokenRequestPlatformEnum } from '@/openapi/client';
import { createAuthenticatedConfiguration } from '@/openapi/configurations';
import { useAuthContext } from '@/context/AuthContext';

interface NotificationContextType {
  expoPushToken: string | null;
  notification: Notifications.Notification | null;
  error: Error | null;
  retryPermissions: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const auth = useAuthContext();

  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
  const [notification, setNotification] = useState<Notifications.Notification | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const registerToken = async () => {
    setError(null);
    try {
      const token = await registerForPushNotificationsAsync();
      setExpoPushToken(token);

      // Register token on backend
      // TODO check if authenticated before registering
      if (auth.isAuthenticated) {
        try {
          const pushTokenApi = new PushTokenApi(createAuthenticatedConfiguration());
          await pushTokenApi.registerPushToken({
            registerPushTokenRequest: {
              expoPushToken: token,
              platform: Platform.OS as RegisterPushTokenRequestPlatformEnum,
              deviceId: Constants.installationId || 'unknown',
              deviceName: Device.modelName || null,
            },
          });
        } catch (error) {
          console.error('Failed to register push token:', error);
        }
      }
    } catch (error) {
      setError(error as Error);
    }
  };

  useEffect(() => {
    registerToken();

    const notificationListener = Notifications.addNotificationReceivedListener(notification => {
      console.log('🔔 Notification Received: ', notification);
      setNotification(notification);
    });

    const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(
        '🔔 Notification Response: ',
        JSON.stringify(response, null, 2),
        JSON.stringify(response.notification.request.content.data, null, 2)
      );
      // Handle the notification response here
    });

    return () => {
      notificationListener.remove();
      responseListener.remove();
    };
  }, []);

  return (
    <NotificationContext.Provider value={{ expoPushToken, notification, error, retryPermissions: registerToken }}>
      {children}
    </NotificationContext.Provider>
  );
};
