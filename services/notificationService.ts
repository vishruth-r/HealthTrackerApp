import messaging from '@react-native-firebase/messaging';
import { router } from 'expo-router';

// Request permission and get the device token (FCM)
export async function registerForPushNotificationsAsync(): Promise<string | undefined> {
  try {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (!enabled) {
      console.warn('Push notification permission not granted.');
      return;
    }

    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log('FCM Token:', fcmToken);
      return fcmToken;
    } else {
      console.warn('Failed to get FCM token');
      return;
    }
  } catch (error) {
    console.error('Error getting push token', error);
    return;
  }
}

// Listen for notifications (foreground + tap responses)
export function setupNotificationListeners() {
  // Foreground message
  const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
    console.log('[NotificationService] onMessage triggered');
    console.log('FCM Notification Received in foreground:', remoteMessage);
    // Show a local notification if needed (optional)
  });

  // Taps on notifications when app is in background/quit
  const unsubscribeOnNotificationOpenedApp = messaging().onNotificationOpenedApp(remoteMessage => {
    console.log('[NotificationService] onNotificationOpenedApp triggered');
    console.log('Notification caused app to open from background state:', remoteMessage);
    handleNavigationFromNotification(remoteMessage?.data);
  });

  // Initial notification if app is launched by tapping the notification
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      console.log('[NotificationService] getInitialNotification resolved');
      if (remoteMessage) {
        console.log('App opened from quit state via notification:', remoteMessage);
        handleNavigationFromNotification(remoteMessage?.data);
      }
    });

  // Optionally return unsubscribe functions for cleanup
  return () => {
    unsubscribeOnMessage();
    unsubscribeOnNotificationOpenedApp();
  };
}

// Navigate based on custom data
function handleNavigationFromNotification(data: any) {
  if (!data) return;

  if (
    (data.screen === 'appointmentDetails' || data.screen === '/appointmentDetails') &&
    data.appointmentData
  ) {
    try {
      const parsedData =
        typeof data.appointmentData === 'string'
          ? JSON.parse(data.appointmentData)
          : data.appointmentData;

      router.push({
        pathname: '/appointmentDetails',
        params: parsedData as Record<string, any>,
      });
    } catch (err) {
      console.error('Failed to parse appointmentData:', err);
    }
  } else {
    console.log('Unhandled notification route/data:', data);
  }
}
