import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_KEY = 'loggedInUser';

export const saveUser = async (user: { email: string }) => {
  try {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (error) {
    console.error('Error saving user data:', error);
    throw error;
  }
};

export const getUser = async (): Promise<{ email: string } | null> => {
  try {
    const json = await AsyncStorage.getItem(USER_KEY);
    return json ? JSON.parse(json) : null;
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
};

export const clearUser = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(USER_KEY);
  } catch (error) {
    console.error('Error clearing user data:', error);
    throw error;
  }
};
