import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Clipboard,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import BottomNav from '../components/BottomNav';
import { clearUser } from '../services/authStorage';
import { clearHealthData, clearTodoList } from '../services/healthData';
import { registerForPushNotificationsAsync } from '../services/notificationService';
import styles from './styles/accounts.styles';

const Accounts = () => {
  const user = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    pfp: 'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
  };

  const [expoPushToken, setExpoPushToken] = useState<string>('Loading...');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    (async () => {
      const token = await registerForPushNotificationsAsync();
      setExpoPushToken(token || 'Unavailable');
    })();
  }, []);

  const showSnackbar = (msg: string) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      Alert.alert('', msg);
    }
  };

  const handleLogout = async () => {
    try {
      await clearUser();
      await clearHealthData(); 
      await clearTodoList();
      showSnackbar('Logged out successfully');
      router.replace('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      showSnackbar('Error logging out');
    }
  };

  const handleCopyToken = () => {
    Clipboard.setString(expoPushToken);
    setCopied(true);
    showSnackbar('Expo push token copied!');
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.content}>
          {/* Profile */}
          <View style={styles.profileContainer}>
            <Image source={{ uri: user.pfp }} style={styles.profilePic} />
            <View style={styles.profileText}>
              <Text style={styles.name}>{user.name}</Text>
              <Text style={styles.email}>{user.email}</Text>
            </View>
          </View>

          {/* Account */}
          <View style={styles.optionRow}>
            <Ionicons name="person-circle-outline" size={24} color="#444" />
            <Text style={styles.optionText}>Account</Text>
          </View>

          <View style={styles.divider} />

          {/* Logout */}
          <TouchableOpacity onPress={handleLogout} style={styles.logoutRow}>
            <Text style={[styles.optionText, { color: 'red' }]}>Logout</Text>
            <Ionicons name="chevron-forward" size={20} color="red" />
          </TouchableOpacity>

          <View style={styles.flexSpacer} />

          {/* Expo Push Token */}
          <TouchableOpacity onPress={handleCopyToken} activeOpacity={0.7}>
            <Text
              style={[
                styles.pushToken,
                copied && styles.pushTokenCopied
              ]}
              numberOfLines={2}
              ellipsizeMode="middle"
              selectable
            >
              {copied ? 'Copied!' : 'Tap to copy push token:\n' + expoPushToken}
            </Text>
          </TouchableOpacity>

          {/* Version */}
          <Text style={styles.versionText}>Proactively v1.0.0</Text>
        </View>
      </ScrollView>
      <BottomNav currentRoute="/accounts" />
    </SafeAreaView>
  );
};

export default Accounts;
