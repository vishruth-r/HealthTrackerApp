import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
  flexGrow: 1,
  paddingBottom: 20,
},
movingImage:{
          width: 180,
          height: 180,
          position: 'absolute',
          top: -5,
          left: -100, 
          transform: [{ translateX: 0 }],
          zIndex: 1,
          opacity: 0.3,
        },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#204CBB',
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },  

  userName: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
    
  },

  healthScoreContainer: {
    backgroundColor: '#204CBB',
    paddingBottom: 40,
    position: 'relative',
  },

  bgOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    opacity: 0.15,
  },

  healthScoreLabel: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '300',
    paddingLeft: 20,
    marginTop: 20,
  },

  healthScoreValue: {

    fontSize: 36,
    fontWeight: '700',
    color: '#fff',
    paddingLeft: 20,
    marginTop: 16,
  },

  healthScoreInfo: {
    fontSize: 12,
    color: '#E0E0E0',
    paddingLeft: 20,
    marginTop: 5,
  },

  gradientWrapper: {
    marginTop: 40,
    marginHorizontal: 30,
    position: 'relative',
  },

  gradientBar: {
    height: 20,
    borderRadius: 10,
  },

  arrow: {
    position: 'absolute',
    top: -20,
    marginLeft: -12,
  },

  tickLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    paddingHorizontal: 30,
  },

  tickText: {
    fontSize: 10,
    color: '#fff',
  },

  curvedSection: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -26,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  
  overviewTitle: {
  fontSize: 18,
  fontWeight: '600',
  marginTop: 24,
  marginBottom: 10,
  color: '#000',
},

overviewScrollContainer: {
  paddingRight: 16,
  gap: 12,
},

overviewCardBlue: {
  width: 140,
  backgroundColor: '#EDF1FD',
  borderRadius: 16,
  padding: 16,
  marginRight: 2,
  position: 'relative',
},

overviewCardYellow: {
  width: 140,
  backgroundColor: '#FEF7E3',
  borderRadius: 16,
  padding: 16,
  marginRight: 2,
  position: 'relative',
},

overviewCardOrange: {
  width: 140,
  backgroundColor: '#FFECC8',
  borderRadius: 16,
  padding: 16,
  marginRight: 2,
  position: 'relative',
},

cardChevron: {
  position: 'absolute',
  top: 12,
  right: 12,
},

overviewLabel: {
  fontSize: 14,
  fontWeight: '500',
  color: '#333',
  marginTop: 4,
},

overviewStatus: {
  fontSize: 12,
  color: '#999',
  marginTop: 4,
},

overviewValue: {
  fontSize: 24,
  fontWeight: '600',
  color: '#000',
  marginTop: 8,
},
bmiUnit: {
  fontSize: 12,
  color: '#666',
  fontWeight: '400',
},

sleepUnit: {
  fontSize: 12,
  color: '#666',
  fontWeight: '400',
},

// STATUS COLORS
overviewStatusBlue: {
  fontSize: 12,
  color: '#204CBB',
  marginTop: 4,
},
overviewStatusYellow: {
  fontSize: 12,
  color: '#E6A700',
  marginTop: 4,
},
overviewStatusOrange: {
  fontSize: 12,
  color: '#C17300',
  marginTop: 4,
},

// VALUE COLORS
overviewValueBlue: {
  fontSize: 24,
  fontWeight: '600',
  color: '#204CBB',
  marginTop: 8,
},
overviewValueYellow: {
  fontSize: 24,
  fontWeight: '600',
  color: '#E6A700',
  marginTop: 8,
},
overviewValueOrange: {
  fontSize: 24,
  fontWeight: '600',
  color: '#C17300',
  marginTop: 8,
},


  appointmentCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginTop: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    position: 'relative',
  },

  upcomingTag: {
    backgroundColor: '#3A9B78',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },

  upcomingText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },

  appointmentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  doctorName: {
    fontSize: 16,
    fontWeight: '600',
  },

  doctorTitle: {
    fontWeight: '400',
    fontSize: 14,
  },

  doctorSpec: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },

  appointmentTime: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },

  doctorImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginLeft: 10,
  },

  forwardArrow: {
    position: 'absolute',
    top: 16,
    right: 16,
  },

  // To-do section

  todoHeader: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 30,
    marginBottom: 5,
  },

checkboxIcon: {
  marginRight: 12,
  padding: 2,
},


  todoStatus: {
    fontSize: 14,
    color: '#666',
  },

  progressBar: {
    height: 12,
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    overflow: 'hidden',
    marginVertical: 10,
  },

  progressFill: {
    height: '100%',
    backgroundColor: '#77C69F',
    borderRadius: 8,
  },

todoItem: {
  flexDirection: 'row',
  alignItems: 'center',
  borderWidth: 0.5,
  borderColor: '#D0D0D0',
  borderRadius: 10,
  padding: 12,
  marginBottom: 12,
  backgroundColor: '#FFF',
},


  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#204CBB',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  checkboxChecked: {
    backgroundColor: '#49A275',
  },

todoText: {
  fontSize: 14,
  color: '#222',
  fontWeight: '500',
},
todoMeta: {
  fontSize: 12,
  color: '#888',
  marginTop: 2,
},


  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  navIcon: {
    width: 24,
    height: 24,
    marginBottom: 4,
  },

  navLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#204CBB',
  },
  // Background image style used in health score container
healthBg: {
  position: 'absolute',
  width: '100%',
  height: '100%',
  resizeMode: 'cover',
  opacity: 0.15,
},

// Scale tick label wrapper and individual text styles
scaleLabels: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 6,
  paddingHorizontal: 30,
},

scaleText: {
  fontSize: 10,
  color: '#fff',
},

// To-do section additional styles
todoTitle: {
  fontSize: 18,
  fontWeight: '700',
  marginTop: 30,
  marginBottom: 5,
},

todoProgress: {
  fontSize: 14,
  color: '#666',
},

progressBarWrapper: {
  height: 10,
  backgroundColor: '#E0E0E0',
  borderRadius: 6,
  overflow: 'hidden',
  marginTop: 10,
  marginBottom: 16,
},

progressBarFill: {
  height: '100%',
  backgroundColor: '#49A275',
  borderRadius: 6,
},


// Bottom nav misnamed style fix
navText: {
  fontSize: 12,
  fontWeight: '500',
  color: '#204CBB',
},
screenWrapper: {
  flex: 1,
  backgroundColor: '#F9F9F9',
},
notificationDot: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: 'red',
    borderWidth: 1.5,
    borderColor: '#204CBB',
    zIndex: 2,
  },
});

