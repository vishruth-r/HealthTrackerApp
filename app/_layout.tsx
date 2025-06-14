import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { registerForPushNotificationsAsync, setupNotificationListeners } from '../services/notificationService';

export default function Layout() {
  useEffect(() => {
    registerForPushNotificationsAsync();
    setupNotificationListeners();
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <Stack
            screenOptions={{
                headerShown: false
            }}
        />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

