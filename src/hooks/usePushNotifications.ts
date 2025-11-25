import { useState, useEffect } from 'react';
import * as Notifications from 'expo-notifications';

export const usePushNotifications = () => {
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
  const [notification, setNotification] = useState<Notifications.Notification | null>(null);

  useEffect(() => {
    // Get push token
    const getPushToken = async () => {
      try {
        const token = await Notifications.getExpoPushTokenAsync();
        setExpoPushToken(token.data);
      } catch (error) {
        console.error('Failed to get push token:', error);
      }
    };

    getPushToken();

    // Set up notification listeners
    const notificationListener = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Notification response:', response);
    });

    return () => {
      notificationListener.remove();
      responseListener.remove();
    };
  }, []);

  const sendLocalNotification = async (title: string, body: string) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
      },
      trigger: null, // Immediate
    });
  };

  return {
    expoPushToken,
    notification,
    sendLocalNotification,
  };
};
