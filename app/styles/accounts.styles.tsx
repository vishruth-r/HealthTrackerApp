import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logoutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  profilePic: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
    backgroundColor: '#F0F0F0',
  },
  profileText: {
    flexDirection: 'column',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
  },
  email: {
    fontSize: 14,
    color: '#666',
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    gap: 12,
  },
  optionText: {
    fontSize: 16,
    color: '#444',
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 8,
  },
  flexSpacer: {
    flex: 1,
  },
  versionText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#aaa',
    marginBottom: 12,
  },
  pushToken: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    marginBottom: 8,
    marginHorizontal: 8,
    paddingVertical: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 6,
    overflow: 'hidden',
  },
  pushTokenCopied: {
    color: '#4384E6',
  },
});

export default styles;
