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
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 8,
  },
  inputWrapper: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    width: '80%',
    height: 80,
    paddingHorizontal: 12,
    justifyContent: 'flex-end',
    marginBottom: 16,
  },
  inlineInput: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  input: {
    minWidth: 40,
    fontSize: 40,
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
  },
  unit: {
    fontSize: 18,
    color: '#777',
    fontWeight: '500',
    marginLeft: 2,
    marginBottom: 16,
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
    fontWeight: '600',
  },
});

export default styles;
// No changes needed in styles for status bar visibility
// Make sure to add <StatusBar /> in your steps.tsx page