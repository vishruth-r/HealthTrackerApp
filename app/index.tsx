// app/index.tsx
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { getUser } from '../services/authStorage';
// Removed registerForPushNotificationsAsync import

const { height } = Dimensions.get('window');

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const checkLogin = async () => {

      const user = await getUser();

      setTimeout(() => {
        if (user) {
          router.replace('/home');
        } else {
          router.replace('/login');
        }
      }, 2000);
    };

    checkLogin();
  }, []);

  return (
    <LinearGradient
      colors={['#204CBB', '#00AB9A']}
      start={{ x: 0.1, y: 1 }}
      end={{ x: 0.9, y: 0 }}
      style={styles.container}
    >
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/images/splash-icon.png')}
          style={styles.logo}
        />
      </View>

      <Text style={styles.poweredText}>Powered by Proactively</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 40,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  logo: {
    width: 160,
    height: 160,
    resizeMode: 'contain',
  },
  poweredText: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.85,
    marginBottom: height < 700 ? 20 : 40,
  },
});