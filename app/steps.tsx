// pages/Steps.tsx
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Keyboard,
  Platform,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { getHealthData, updateHealthData } from '../services/healthData';
import styles from './styles/steps.styles';

const Steps = () => {
  const navigation = useNavigation();
  const [steps, setSteps] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    getHealthData().then(data => {
      if (!mounted) return;
      if (data.steps) {
        setSteps(String(data.steps));
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

  const saveSteps = useCallback(async () => {
    const s = parseInt(steps);
    if (!s || s <= 0) {
      Alert.alert('Invalid input', 'Please enter a valid step count.');
      return;
    }
    try {
      setLoading(true);
      await updateHealthData({ steps: s });
      showSnackbar('Steps data saved successfully');
    } catch (e) {
      Alert.alert('Error', 'Failed to save steps.');
    } finally {
      setLoading(false);
    }
  }, [steps, showSnackbar]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <View style={styles.appBar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.appBarTitle}>Steps</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.container}>
          {/* Steps Input */}
          <Text style={styles.label}>Steps Count:</Text>
          <View style={styles.inputWrapper}>
            <View style={styles.inlineInput}>
              <TextInput
                keyboardType="numeric"
                value={steps}
                onChangeText={text => setSteps(text.replace(/[^0-9]/g, '').slice(0, 6))}
                style={styles.input}
                placeholderTextColor="#999"
                maxLength={6}
                returnKeyType="done"
              />
              <Text style={styles.unit}>steps</Text>
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={[styles.submitBtn, loading && { opacity: 0.7 }]}
            onPress={saveSteps}
            disabled={loading}
          >
            <Text style={styles.submitText}>{loading ? 'Saving...' : 'Submit'}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Steps;
