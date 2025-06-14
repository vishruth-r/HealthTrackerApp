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
import styles from './styles/bmi.styles';

const BMI = () => {
  const navigation = useNavigation();
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    getHealthData().then(data => {
      if (!mounted) return;
      if (data.height) setHeight(data.height.toString());
      if (data.weight) setWeight(data.weight.toString());
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

  const saveHeightWeight = useCallback(async () => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    if (!h || !w || h <= 0 || w <= 0) {
      Alert.alert('Invalid input', 'Please enter valid height and weight.');
      return;
    }
    try {
      setLoading(true);
      await updateHealthData({ height: h, weight: w });
      showSnackbar('Data saved successfully');
    } catch (e) {
      Alert.alert('Error', 'Failed to save data.');
    } finally {
      setLoading(false);
    }
  }, [height, weight, showSnackbar]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <View style={styles.appBar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.appBarTitle}>BMI</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.container}>
          {/* Weight Input */}
          <Text style={styles.label}>Body Weight:</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              keyboardType="numeric"
              value={weight}
              onChangeText={text => setWeight(text.replace(/[^0-9]/g, '').slice(0, 3))}
              style={styles.input}
              placeholderTextColor="#999"
              returnKeyType="next"
              blurOnSubmit={false}
              maxLength={3}
            />
            <Text style={styles.unit}>kgs</Text>
          </View>

          {/* Height Input */}
          <Text style={styles.label}>Height:</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              keyboardType="numeric"
              value={height}
              onChangeText={text => setHeight(text.replace(/[^0-9]/g, '').slice(0, 3))}
              style={styles.input}
              placeholderTextColor="#999"
              returnKeyType="done"
              maxLength={3}
            />
            <Text style={styles.unit}>cms</Text>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={[styles.submitBtn, loading && { opacity: 0.7 }]}
            onPress={saveHeightWeight}
            disabled={loading}
          >
            <Text style={styles.submitText}>
              {loading ? 'Saving...' : 'Submit'}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default BMI;
