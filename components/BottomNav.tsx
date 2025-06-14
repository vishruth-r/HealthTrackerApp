import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const BottomNav = ({ currentRoute }: { currentRoute: string }) => {
  const router = useRouter();

  const isHome = currentRoute === '/home';
  const isProfile = currentRoute === '/accounts';

  return (
    <View style={styles.bottomNav}>
      {/* Home */}
      <TouchableOpacity onPress={() => router.replace('/home')} style={styles.navItem}>
        <Image
          source={
            isHome
              ? require('../assets/images/home-active.png')
              : require('../assets/images/home-inactive.png')
          }
          style={styles.icon}
        />
        <Text style={[styles.label, isHome && styles.activeLabel]}>Home</Text>
      </TouchableOpacity>

      {/* Profile */}
      <TouchableOpacity onPress={() => router.replace('/accounts')} style={styles.navItem}>
        <Image
          source={
            isProfile
              ? require('../assets/images/account-active.png')
              : require('../assets/images/account-inactive.png')
          }
          style={styles.icon}
        />
        <Text style={[styles.label, isProfile && styles.activeLabel]}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomNav;

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  navItem: {
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  label: {
    fontSize: 12,
    color: '#333',
    marginTop: 4,
  },
  activeLabel: {
    color: '#6156B2',
    fontWeight: 'bold',
  },
});
