import * as Notifications from 'expo-notifications';

// Request permissions if not already granted
export const requestNotificationPermissions = async () => {
  const { status } = await Notifications.getPermissionsAsync();
  if (status !== 'granted') {
    const { status: newStatus } = await Notifications.requestPermissionsAsync();
    return newStatus === 'granted';
  }
  return true;
};

// Schedule a local notification
export const scheduleLocalNotification = async (title: string, body: string, trigger: Notifications.NotificationTriggerInput = null) => {
  const hasPermission = await requestNotificationPermissions();
  if (!hasPermission) {
    console.warn('Notification permissions not granted');
    return null;
  }

  const notificationId = await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      sound: 'default',
      priority: Notifications.AndroidNotificationPriority.HIGH,
    },
    trigger,
  });

  return notificationId;
};

// Cancel a scheduled notification
export const cancelNotification = async (notificationId: string) => {
  await Notifications.cancelScheduledNotificationAsync(notificationId);
};

// Get all scheduled notifications
export const getScheduledNotifications = async () => {
  return await Notifications.getAllScheduledNotificationsAsync();
};

// Show an immediate notification (for in-app alerts)
export const showImmediateNotification = async (title: string, body: string) => {
  return await scheduleLocalNotification(title, body, null);
};

// Example: Schedule a notification for later
export const scheduleDelayedNotification = async (title: string, body: string, secondsFromNow: number) => {
  const trigger = {
    type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
    seconds: secondsFromNow,
    repeats: false,
  } as Notifications.TimeIntervalTriggerInput;
  return await scheduleLocalNotification(title, body, trigger);
};
