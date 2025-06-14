import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Keyboard,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { COLORS } from '../constants/Colors';
import { saveUser } from '../services/authStorage';
import styles from './styles/login.styles';

const MOCK_EMAIL = 'patient@example.com';
const MOCK_PASSWORD = 'password123';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = useCallback((value: string) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(value);
  }, []);

  const handleLogin = useCallback(async () => {
    setEmailError('');
    setLoginError('');

    if (!email.trim() && !password.trim()) {
      setEmailError('Email is required.');
      setLoginError('Password is required.');
      return;
    }

    if (!email.trim()) {
      setEmailError('Email is required.');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    if (!password.trim()) {
      setLoginError('Password is required.');
      return;
    }

    if (email !== MOCK_EMAIL || password !== MOCK_PASSWORD) {
      setLoginError('Email or password is incorrect.');
      return;
    }

    try {
      setLoading(true);
      await saveUser({ email });
      router.replace('/home');
    } catch (error) {
      console.error(error);
      Alert.alert('Login Failed', 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [email, password, validateEmail]);

  const toggleShowPassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.loginTo}>Login to</Text>
          <View style={styles.brandRow}>
            <Text style={styles.proactively}>proactively</Text>
            <Image
              source={require('../assets/images/login-icon.png')}
              style={styles.logo}
            />
          </View>
        </View>

        <Text style={styles.subtitle}>
          Login as a patient using your registered email.
        </Text>
        {/* Email Field */}
        <TextInput
          style={styles.input}
          placeholder={MOCK_EMAIL}
          placeholderTextColor={COLORS.textGrey}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setEmailError('');
          }}
          returnKeyType="next"
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        {/* Password Field */}
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder={MOCK_PASSWORD}
            placeholderTextColor={COLORS.textGrey}
            autoCapitalize="none"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setLoginError('');
            }}
            
            returnKeyType="done"
          />
          <TouchableOpacity onPress={toggleShowPassword}>
            <Ionicons
              name={showPassword ? 'eye-off' : 'eye'}
              size={20}
              color={COLORS.iconGrey}
            />
          </TouchableOpacity>
        </View>
        {loginError ? <Text style={styles.errorText}>{loginError}</Text> : null}

        {/* Login Button */}
        <TouchableOpacity
          style={[styles.loginButton, loading && { opacity: 0.6 }]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.loginButtonText}>Login</Text>
          )}
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.line} />
          <Text style={styles.orText}>or</Text>
          <View style={styles.line} />
        </View>

        {/* Social Buttons */}
        <View style={styles.socialButtons}>
          <TouchableOpacity
            style={[styles.socialButton, { borderColor: COLORS.google }]}
            onPress={() => console.log('Google login')}
          >
            <FontAwesome name="google" size={20} color={COLORS.google} />
            <Text style={styles.socialText}>Continue with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.socialButton, { borderColor: COLORS.black }]}
            onPress={() => console.log('Apple login')}
          >
            <FontAwesome name="apple" size={20} color={COLORS.black} />
            <Text style={styles.socialText}>Continue with Apple</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.socialButton, { borderColor: COLORS.facebook }]}
            onPress={() => console.log('Facebook login')}
          >
            <FontAwesome name="facebook" size={20} color={COLORS.facebook} />
            <Text style={styles.socialText}>Continue with Facebook</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
