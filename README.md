# CASK Push Notification App

A modern React Native application for managing and testing push notifications with Firebase Cloud Messaging (FCM).

## 🚀 Getting Started

Follow the steps below to run the project on your local machine.

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Xcode (for iOS development)
- Android Studio (for Android development)
- CocoaPods (for iOS dependencies)

### 1. Install Dependencies

Navigate to the project directory and install dependencies:

```bash
npm install
```

### 2. Environment Setup

Create a `.env` file in the root directory based on `.env.example`:

```bash
cp .env.example .env
```

Add your Firebase configuration and API keys to the `.env` file.

### 3. iOS Setup

Navigate to the iOS folder and install the necessary CocoaPods dependencies:

```bash
cd ios && pod install
```

Run the project on iOS:

```bash
npm run ios
```

Or open the project in Xcode:
- Open `ios/CASKRNChallenge.xcworkspace` in Xcode
- Select a simulator or physical device
- Press the Run button

### 4. Android Setup

Run the project on Android:

```bash
npm run android
```

Make sure you have an Android emulator running or a physical device connected.

## 📱 Application Flow

### 1. Home Screen
- **Dashboard view** with quick access to different notification types
- **Device token display** for debugging purposes
- **Feature cards** for navigating to different notification modes:
  - Text Notifications
  - Photo Notifications
  - Video Notifications
  - Notification History

### 2. Push Notification Screen
- **Send test notifications** with configurable delay
- **Select notification type**:
  - Text Mode: Simple text notifications
  - Photo Mode: Notifications with images
  - Video Mode: Rich notifications with video content
- **Real-time FCM token validation**
- **Toast feedback** for successful or failed notification sending

### 3. Notification History
- **View all received notifications** in a chronological list
- **Notification details** including:
  - Title and body text
  - Notification type indicator
  - Thumbnail preview for media content
  - Timestamp
- **Interactive features**:
  - Tap to view full notification details
  - Swipe or long-press to delete individual notifications
  - Clear all notifications at once
- **Pull-to-refresh** functionality

### 4. Notification Detail Screens
- **Text Mode Screen**: Display text-only notifications
- **Photo Mode Screen**: View notifications with full-size images
- **Video Mode Screen**: Play video content from YouTube URLs

## 🛠 Tech Stack

- **React Native** 0.74.2
- **Firebase Cloud Messaging** for push notifications
- **React Navigation** for app navigation
- **AsyncStorage** for local data persistence
- **React Native Linear Gradient** for modern UI
- **React Native Toast Message** for user feedback
- **FlashList** for performant lists

## 📋 Features

- ✅ Real-time push notification handling
- ✅ Support for text, image, and video notifications
- ✅ Notification history with local storage
- ✅ Modern UI with gradient designs
- ✅ Custom toast notifications
- ✅ Pull-to-refresh functionality
- ✅ Swipe-to-delete notifications
- ✅ Environment variable configuration
- ✅ iOS and Android support


### Permissions

The app requires the following permissions:
- **Push Notifications**: To receive and display notifications
- **Internet Access**: To communicate with Firebase services



