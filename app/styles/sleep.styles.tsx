import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  appBar: {
    paddingTop: Platform.OS === 'android' ? 42 : 0,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  appBarTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  container: {
    padding: 20,
  },
  sleepBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 24,
    justifyContent: 'space-between',
  },
  iconBtn: {
    padding: 4,
    
  },
  iconWrapper: {
    backgroundColor: '#E9F0FF',
    padding: 10,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#4F65CB',
  },
  centerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sleepIcon: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  sleepText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
  },
  submitBtn: {
    marginTop: 40,
    backgroundColor: '#4384E6',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  submitText: {
    color: 'white',
    fontSize: 16,
  },
});

export default styles;

// No changes needed in styles for status bar visibility
// Make sure to add <StatusBar /> in your sleep.tsx page