# 🩺 Proactively Health App – React Native Implementation


This React Native mobile application was developed as part of the **Proactively App Development Task**. It is a feature-rich health tracking platform built with a strong focus on usability, responsiveness, and local-first performance. The app implements key features outlined in the design, including health metrics tracking, authentication, push notifications, and animated UI components.


---

## ✅ Features Implemented

### 🔐 Authentication & Session Management
- Login functionality with hardcoded credentials.
- Session persistence using local storage.
- Automatic redirection to Home on app restart if logged in.
- Logout functionality to clear session and return to login.

### 🏠 Home Screen
- **Custom Header** following the Figma design.
- **Health Score Banner**:
  - Progress bar with gradient fill based on score.
  - Animated arrow indicating score progress (moves from left to right).
  - Health score dynamically increases as To-Do list tasks are completed.

- **Upcoming Appointment Card**:
  - Displays doctor's name, time, and date of the next appointment.

- **Health Overview Section**:
  - **Steps Card**: Input steps manually; persists across sessions.
  - **BMI Card**: Takes height and weight; calculates BMI.
  - **Sleep Card**: Add/remove hours using custom buttons.

- **To-Do List with Progress Bar**:
  - Task checklist with interactive toggle.
  - Progress bar reflects completed tasks.
  - Completion of tasks increases the health score.

### 📅 Appointment Details Screen
- Displays full appointment info including doctor name, image, time, and date.
- "Join Meeting" button opens a Google Meet link using device intent.
- Screen is accessible via notification tap or in-app card.

### 🔔 Push Notifications (FCM)
- Integrated with Firebase Cloud Messaging.
- Handles notifications in all app states (foreground, background, killed).
- Clicking a notification:
  - Opens the app if closed.
  - Navigates to the Appointment Details screen with correct data.

- Notification payload includes appointment details and screen target.
- Can be tested using Postman with FCM HTTP v1 API.

### 👤 Account Screen
- Displays static profile image and user name.
- Shows the device's **FCM Token**, which can be copied for testing purposes.
- Logout button clears the session and navigates back to login.

---

## ✨ Bonus Features
- 🔁 **Animated Health Banner Logo**: Logo moves from left to right and loops.
- 🎯 **Task-Driven Score Logic**: Completing items in the To-Do list directly increases the health score.
- 📋 **FCM Token Display**: Easily accessible and copyable from the Account screen for push testing.

---

## 🧪 Notes
- All user inputs (steps, BMI, sleep, tasks) are saved locally and restored on app restart.
- All screens follow the Figma design in layout, spacing, color, and interactivity.
- Notifications include deep linking logic based on payload.
