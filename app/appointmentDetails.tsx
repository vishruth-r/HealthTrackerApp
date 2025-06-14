import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles/appointmentDetails.styles';

const SPACER_WIDTH = 24;
const PLACEHOLDER_IMAGE = 'https://www.gravatar.com/avatar/?d=mp&s=250';

type AppointmentParams = {
  profileUrl?: string;
  status?: string;
  drName?: string;
  drDetails?: string;
  date?: string;
  time?: string;
  meetingUrl?: string;
};

const AppointmentDetails = () => {
  const router = useRouter();
  const params = useLocalSearchParams() as AppointmentParams;

  const profileUrl = params.profileUrl ?? PLACEHOLDER_IMAGE;
  const status = params.status ?? 'Upcoming';
  const drName = params.drName ?? 'Doctor';
  const drDetails = params.drDetails ?? '';
  const date = params.date ?? '';
  const time = params.time ?? '';
  const meetingUrl = params.meetingUrl ?? '';

  const handleJoinMeeting = async () => {
    if (meetingUrl) {
      try {
        await Linking.openURL(meetingUrl);
      } catch (e) {
        // Optionally show an error message to the user
        // e.g., Alert.alert('Error', 'Unable to open meeting link.');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      {/* Top App Bar */}
      <View style={styles.appBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.appBarTitle}>Appointment Details</Text>
        <View style={{ width: SPACER_WIDTH }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Status Tag */}
        <View style={styles.statusTag}>
          <Text style={styles.statusText}>{status}</Text>
        </View>

        {/* Doctor Image */}
        <Image source={{ uri: profileUrl }} style={styles.profilePic} />

        {/* Appointment Heading */}
        <Text style={styles.heading}>
          Your upcoming appointment with
        </Text>
        <Text style={styles.drheading}>{drName}</Text>

        <View style={styles.headerBanner}>
          <Text style={styles.headerBannerText}>Appointment</Text>
        </View>

        {/* Date & Time */}
        <Text style={styles.dateTimeText}>{date} | {time}</Text>
        <View style={styles.dividerLine} />

        {/* Meeting Link Section */}
        {meetingUrl ? (
          <View style={styles.linkSection}>
            <Text style={styles.meetingLabel}>Meeting link:</Text>
            <TouchableOpacity onPress={handleJoinMeeting}>
              <Text style={styles.meetingLink}>{meetingUrl}</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </ScrollView>

      {/* Join Meeting Button */}
      <TouchableOpacity
        style={[styles.joinButton, !meetingUrl && { opacity: 0.5 }]}
        onPress={handleJoinMeeting}
        disabled={!meetingUrl}
      >
        <Text style={styles.joinButtonText}>
          Join Meeting
        </Text>
        <Ionicons name="arrow-forward" size={18} color="white" style={[styles.iconRight, { transform: [{ rotate: '315deg' }] }]} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AppointmentDetails;
