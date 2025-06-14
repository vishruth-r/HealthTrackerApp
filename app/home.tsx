import { Ionicons } from '@expo/vector-icons';
import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Easing, Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';

import BottomNav from '@/components/BottomNav';
import {
  TodoItem,
  getHealthData,
  getTodoList,
  setInitialTodoList,
  updateTodoItem
} from '../services/healthData';
import styles from './styles/home.styles';

const profileImage = 'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250';
const movingImage = require('../assets/images/splash-icon.png');

const Home = () => {
  const [steps, setSteps] = useState<number | undefined>();
  const [height, setHeight] = useState<number | undefined>();
  const [weight, setWeight] = useState<number | undefined>();
  const [sleep, setSleep] = useState<number | undefined>();
  const [todoList, setTodoList] = useState<TodoItem[]>([]);
  const [healthScore, setHealthScore] = useState<number>(2740);
  const navigation = useNavigation<NavigationProp<any>>();

  // Animation setup
  const animatedValue = useRef(new Animated.Value(0)).current;
  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    const loopAnimation = () => {
      animatedValue.setValue(0);
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 6000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => loopAnimation());
    };
    loopAnimation();
  }, []);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, screenWidth + 100],
  });

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        const health = await getHealthData();
        setSteps(health.steps);
        setSleep(health.sleep);
        setHeight(health.height);
        setWeight(health.weight);

        await setInitialTodoList(); // One-time init if needed
        const todos = await getTodoList();
        setTodoList(todos);

        // Reset health score to base when refocusing
        setHealthScore(2740);
      };
      fetchData();
    }, [])
  );

  const getBMI = () => {
    if (!height || !weight) return undefined;
    const heightM = height / 100;
    return weight / (heightM * heightM);
  };

  const bmi = getBMI()?.toFixed(2);
  const maxScore = 3000;
  const scorePercent = healthScore / maxScore;
  const completedCount = todoList.filter(item => item.completed).length;

  // Update healthScore when todoList changes
  useEffect(() => {
    // 2740 base + 20 * completedCount
    setHealthScore(2740 + completedCount * 20);
  }, [completedCount]);

  const toggleCheckbox = async (index: number) => {
    const updatedList = [...todoList];
    updatedList[index].completed = !updatedList[index].completed;
    setTodoList(updatedList);
    await updateTodoItem(updatedList[index]);
    // healthScore will update via useEffect above
  };

  const getScoreColor = (percent: number) => {
    percent = Math.max(0, Math.min(1, percent));
    const stops = [
      { pct: 0, color: [255, 128, 144] },
      { pct: 0.5, color: [255, 218, 104] },
      { pct: 1, color: [117, 222, 141] },
    ];
    let lower = stops[0], upper = stops[stops.length - 1];
    for (let i = 1; i < stops.length; i++) {
      if (percent <= stops[i].pct) {
        lower = stops[i - 1];
        upper = stops[i];
        break;
      }
    }
    const range = upper.pct - lower.pct;
    const rangePct = range === 0 ? 0 : (percent - lower.pct) / range;
    const color = lower.color.map((c, i) =>
      Math.round(c + (upper.color[i] - c) * rangePct)
    );
    return `rgb(${color[0]},${color[1]},${color[2]})`;
  };

  return (
    <View style={styles.screenWrapper}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9F9F9" />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.topBar}>
          <Image source={{ uri: profileImage }} style={styles.avatar} />
          <Text style={styles.userName}>Ethan Harkinson</Text>
          <View style={{ position: 'relative' }}>
            <Ionicons name="notifications-outline" size={24} color="white" />
            <View style={styles.notificationDot} />
          </View>
        </View>

        <View style={styles.healthScoreContainer}>
            <Animated.Image
    source={movingImage}
    style={[styles.movingImage, { transform: [{ translateX }] }]}
    resizeMode="contain"
  />
          <Text style={styles.healthScoreLabel}>Health Score</Text>
          <Text style={styles.healthScoreValue}>{healthScore.toLocaleString()}</Text>
          <Text style={styles.healthScoreInfo}>This score is for information purposes only.</Text>

          <View style={styles.gradientWrapper}>
            <LinearGradient
              colors={['#FF8090', '#FFDA68', '#75DE8D']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradientBar}
            />
            <Ionicons
              name="caret-down"
              size={24}
              color={getScoreColor(scorePercent)}
              style={[styles.arrow, { left: `${scorePercent * 100}%` }]}
            />
          </View>

          <View style={styles.scaleLabels}>
            {[0, 600, 1200, 1800, 2400, 3000].map((val) => (
              <Text key={val} style={styles.scaleText}>{val}</Text>
            ))}
          </View>
        </View>

        {/* Appointment Card */}
        <View style={styles.curvedSection}>
          <TouchableOpacity
            style={styles.appointmentCard}
            onPress={() =>
              router.push({
                pathname: '/appointmentDetails',
                params: {
                  profileUrl: 'https://img.freepik.com/free-photo/hubsche-arztin-mit-verschrankten-armen_23-2147648686.jpg',
                  status: 'UPCOMING',
                  drName: 'Laurie Simons, MD, DipABLM',
                  drDetails: 'Internal Medicine',
                  date: 'Thu, December 21, 2024',
                  time: '10:00 AM PST',
                  meetingUrl: 'https://meet.google.com/abc-defg-hij',
                },
              })
            }
          >
            <Ionicons name="chevron-forward" size={20} color="#B0B0B0" style={styles.forwardArrow} />
            <View style={styles.upcomingTag}>
              <Text style={styles.upcomingText}>UPCOMING</Text>
            </View>
            <View style={styles.appointmentInfo}>
              <View style={{ flex: 1 }}>
                <Text style={styles.doctorName}>
                  Laurie Simons <Text style={styles.doctorTitle}>MD, DipABL...</Text>
                </Text>
                <Text style={styles.doctorSpec}>Internal medicine</Text>
                <Text style={styles.appointmentTime}>Thu, December 21, 2024 | 10:00 AM PST</Text>
              </View>
              <Image source={{ uri: 'https://img.freepik.com/free-photo/hubsche-arztin-mit-verschrankten-armen_23-2147648686.jpg' }} style={styles.doctorImage} />
            </View>
          </TouchableOpacity>

          {/* Overview Cards */}
          <Text style={styles.overviewTitle}>Health Overview</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.overviewScrollContainer}>
            <TouchableOpacity style={styles.overviewCardBlue} onPress={() => router.push('/steps')}>
              <Ionicons name="chevron-forward" size={20} color="#999" style={styles.cardChevron} />
              <Text style={styles.overviewLabel}>Steps</Text>
              <Text style={styles.overviewStatusBlue}>{steps !== undefined ? 'Updated' : 'No data'}</Text>
              <Text style={styles.overviewValueBlue}>
                {steps !== undefined ? steps.toLocaleString() : '-'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.overviewCardYellow} onPress={() => router.push('/bmi')}>
              <Ionicons name="chevron-forward" size={20} color="#999" style={styles.cardChevron} />
              <Text style={styles.overviewLabel}>BMI</Text>
              <Text style={styles.overviewStatusYellow}>{bmi !== undefined ? 'Updated' : 'No data'}</Text>
              <Text style={styles.overviewValueYellow}>
                {bmi !== undefined ? <>{bmi} <Text style={styles.bmiUnit}>kg/m²</Text></> : '-'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.overviewCardOrange} onPress={() => router.push('/sleep')}>
              <Ionicons name="chevron-forward" size={20} color="#999" style={styles.cardChevron} />
              <Text style={styles.overviewLabel}>Sleep</Text>
              <Text style={styles.overviewStatusOrange}>{sleep !== undefined ? 'Updated' : 'No data'}</Text>
              <Text style={styles.overviewValueOrange}>
                {sleep !== undefined ? <>{sleep} <Text style={styles.sleepUnit}>hours</Text></> : '-'}
              </Text>
            </TouchableOpacity>
          </ScrollView>

          {/* To-Do Section */}
          <Text style={styles.todoTitle}>Let's check off your to dos</Text>
          <Text style={styles.todoProgress}>{completedCount}/{todoList.length} completed</Text>
          <View style={styles.progressBarWrapper}>
            <View style={[styles.progressBarFill, { width: `${(completedCount / todoList.length) * 100}%` }]} />
          </View>

          {todoList.map((item, index) => {
            const isLast = index === todoList.length - 1;
            return (
              <TouchableOpacity
                key={index}
                style={[styles.todoItem, isLast && { marginBottom: 0 }]}
                onPress={() => toggleCheckbox(index)}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={item.completed ? 'checkbox' : 'square-outline'}
                  size={20}
                  color={item.completed ? '#49A275' : '#999'}
                  style={styles.checkboxIcon}
                />
                <View>
                  <Text style={styles.todoText}>{item.task}</Text>
                  <Text style={styles.todoMeta}>{item.assigned_by} • {item.date}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
      <BottomNav currentRoute="/home" />
    </View>
  );
};

export default Home;
