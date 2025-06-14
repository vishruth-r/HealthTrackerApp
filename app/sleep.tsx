import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Image,
  Keyboard,
  Platform,
  SafeAreaView,
  StatusBar,
  Text,
  ToastAndroid,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { getHealthData, updateHealthData } from '../services/healthData';
import styles from './styles/sleep.styles';
const sleepIcon = require('../assets/images/sleep-icon.png');

const Sleep = () => {
  const navigation = useNavigation();
  const [sleepHours, setSleepHours] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    getHealthData().then(data => {
      if (!mounted) return;
      if (data.sleep) {
        setSleepHours(Math.round(data.sleep));
      }
    });
    return () => { mounted = false; };
  }, []);

  const showSnackbar = useCallback((message: string) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      Alert.alert('', message);
    }
  }, []);

  const incrementHours = useCallback(() => {
    setSleepHours(prev => (prev < 24 ? prev + 1 : prev));
  }, []);

  const decrementHours = useCallback(() => {
    setSleepHours(prev => (prev > 0 ? prev - 1 : prev));
  }, []);

  const saveSleepHours = useCallback(async () => {
    try {
      setLoading(true);
      await updateHealthData({ sleep: sleepHours });
      showSnackbar('Data saved successfully');
    } catch (e) {
      Alert.alert('Error', 'Failed to save data.');
    } finally {
      setLoading(false);
    }
  }, [sleepHours, showSnackbar]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <View style={styles.appBar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.appBarTitle}>Sleep</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.container}>
          {/* Sleep Input Box */}
          <View style={styles.sleepBox}>
            <TouchableOpacity onPress={decrementHours} style={styles.iconBtn} disabled={sleepHours <= 0}>
              <View style={styles.iconWrapper}>
                <Ionicons name="remove" size={28} color="#4384E6" />
              </View>
            </TouchableOpacity>

            <View style={styles.centerContent}>
              <Image source={sleepIcon} style={styles.sleepIcon} resizeMode="contain" />
              <Text style={styles.sleepText}>{sleepHours} hours</Text>
            </View>

            <TouchableOpacity onPress={incrementHours} style={styles.iconBtn} disabled={sleepHours >= 24}>
              <View style={styles.iconWrapper}>
                <Ionicons name="add" size={28} color="#4384E6" />
              </View>
            </TouchableOpacity>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={[styles.submitBtn, loading && { opacity: 0.7 }]}
            onPress={saveSleepHours}
            disabled={loading}
          >
            <Text style={styles.submitText}>{loading ? 'Saving...' : 'Submit'}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};


export default Sleep;
