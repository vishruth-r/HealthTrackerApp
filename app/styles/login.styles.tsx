import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  headerContainer: {
    marginTop: 50,
    marginBottom: 12,
  },
  loginTo: {
    fontSize: 20,
    fontWeight: '500',
    color: '#000',
    marginBottom: 2,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  proactively: {
    fontSize: 30,
    fontWeight: '700',
    color: '#4384E6',
    marginRight: 8,
  },
  logo: {
    height: 32,
    width: 32,
    resizeMode: 'contain',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 52,
    fontSize: 16,
    marginBottom: 8,
    backgroundColor: '#FAFAFA',
    color: '#222', 
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 8,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 52,
    marginBottom: 8,
    backgroundColor: '#FAFAFA',
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    color: '#222', // Ensure password text is always visible (dark color)
  },
  loginButton: {
    backgroundColor: '#4384E6',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 16,
    elevation: 1,
    shadowColor: '#4384E6',
    shadowOpacity: 0.08,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  orText: {
    marginHorizontal: 8,
    color: '#666',
    fontSize: 14,
  },
  socialButtons: {
    gap: 12,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderWidth: 1.2,
    borderRadius: 8,
    backgroundColor: '#FFF',
  },
  socialText: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default styles;
