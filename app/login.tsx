// LoginScreen.tsx
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import styles from './styles/login.styles';

const MOCK_EMAIL = 'patient@example.com';
const MOCK_PASSWORD = 'password123';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [loginError, setLoginError] = useState('');

  const validateEmail = (value: string) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(value);
  };

  const handleLogin = () => {
  setEmailError('');
  setLoginError('');

  // Empty field validations
  if (!email.trim() && !password.trim()) {
    setEmailError('Email is required.');
    setLoginError('Password is required.');
    return;
  }

  if (!email.trim()) {
    setEmailError('Email is required.');
    return;
  }

  if (!password.trim()) {
    setLoginError('Password is required.');
    return;
  }

  if (!validateEmail(email)) {
    setEmailError('Please enter a valid email address.');
    return;
  }

  // Incorrect credentials
  if (email !== MOCK_EMAIL || password !== MOCK_PASSWORD) {
    setLoginError('Email or password is incorrect.');
    return;
  }

};

  return (
    <View style={styles.container}>
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
        placeholder="Email"
        placeholderTextColor="#999"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setEmailError('');
        }}
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      {/* Password Field */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          placeholderTextColor="#999"
          autoCapitalize='none'
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setLoginError('');
          }}
        />
        <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)}>
          <Ionicons
            name={showPassword ? 'eye-off' : 'eye'}
            size={20}
            color="#666"
          />
        </TouchableOpacity>
      </View>
      {loginError ? <Text style={styles.errorText}>{loginError}</Text> : null}

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
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
          style={[styles.socialButton, { borderColor: '#DB4437' }]}
          onPress={() => console.log('Google login')}
        >
          <FontAwesome name="google" size={20} color="#DB4437" />
          <Text style={styles.socialText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.socialButton, { borderColor: '#000' }]}
          onPress={() => console.log('Apple login')}
        >
          <FontAwesome name="apple" size={20} color="#000" />
          <Text style={styles.socialText}>Continue with Apple</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.socialButton, { borderColor: '#3b5998' }]}
          onPress={() => console.log('Facebook login')}
        >
          <FontAwesome name="facebook" size={20} color="#3b5998" />
          <Text style={styles.socialText}>Continue with Facebook</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
