import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {getCurrentFcmToken} from '../../notificationServices';
import {Colors} from '../../constants/colors';

const {width} = Dimensions.get('window');

const HomeScreen = ({navigation, route}) => {
  const [notificationData, setNotificationData] = useState(null);
  const [fcmToken, setFcmToken] = useState('');

  useEffect(() => {
    if (route.params?.notificationData) {
      setNotificationData(route.params.notificationData);
    }
    const token = getCurrentFcmToken();
    if (token) {
      setFcmToken(token);
    }
  }, [route.params]);

  const features = [
    {
      title: 'Text Notifications',
      description: 'Send text-only push notifications',
      icon: '📝',
      color: Colors.gradients.purple,
      onPress: () =>
        navigation.navigate('Push Notification', {selectedType: '1'}),
    },
    {
      title: 'Photo Notifications',
      description: 'Send notifications with images',
      icon: '📷',
      color: Colors.gradients.pink,
      onPress: () =>
        navigation.navigate('Push Notification', {selectedType: '2'}),
    },
    {
      title: 'Video Notifications',
      description: 'Send rich notifications with videos',
      icon: '🎥',
      color: Colors.gradients.blue,
      onPress: () =>
        navigation.navigate('Push Notification', {selectedType: '3'}),
    },
    {
      title: 'Notification History',
      description: 'View all your past notifications',
      icon: '📆',
      color: Colors.gradients.yellow,
      onPress: () => navigation.navigate('History'),
    },
  ];

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={Colors.gradients.primary}
          style={styles.headerGradient}>
          <View style={styles.header}>
            <Text style={styles.welcomeText}>Welcome to</Text>
            <Text style={styles.appTitle}>CASK Push Notification</Text>
            <Text style={styles.subtitle}>
              Experience the power of real-time notifications
            </Text>
          </View>
        </LinearGradient>

        {notificationData && (
          <View style={styles.notificationAlert}>
            <LinearGradient
              colors={Colors.gradients.purple}
              style={styles.alertGradient}>
              <Text style={styles.alertTitle}>New Notification</Text>
              <Text style={styles.alertMessage}>{notificationData.title}</Text>
              <Text style={styles.alertBody}>{notificationData.body}</Text>
            </LinearGradient>
          </View>
        )}

        <View style={styles.featuresContainer}>
          <Text style={styles.sectionTitle}>Features</Text>
          <View style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <TouchableOpacity
                key={index}
                style={styles.featureCard}
                onPress={feature.onPress}
                activeOpacity={0.8}>
                <LinearGradient
                  colors={feature.color}
                  style={styles.featureGradient}>
                  <Text style={styles.featureIcon}>{feature.icon}</Text>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDescription}>
                    {feature.description}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {fcmToken ? (
          <View style={styles.tokenContainer}>
            <Text style={styles.tokenTitle}>Device Token</Text>
            <View style={styles.tokenBox}>
              <Text style={styles.tokenText} numberOfLines={3}>
                {fcmToken}
              </Text>
            </View>
          </View>
        ) : null}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  headerGradient: {
    paddingTop: 40,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  header: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 18,
    color: Colors.text.white,
    opacity: Colors.opacity.light,
    marginBottom: 5,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.text.white,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: Colors.text.white,
    opacity: Colors.opacity.disabled,
    textAlign: 'center',
  },
  notificationAlert: {
    marginTop: -20,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  alertGradient: {
    padding: 20,
    borderRadius: 15,
    elevation: 5,
    shadowColor: Colors.shadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  alertTitle: {
    fontSize: 14,
    color: Colors.text.white,
    opacity: Colors.opacity.light,
    marginBottom: 5,
  },
  alertMessage: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.white,
    marginBottom: 8,
  },
  alertBody: {
    fontSize: 14,
    color: Colors.text.white,
    opacity: Colors.opacity.veryLight,
  },
  featuresContainer: {
    padding: 20,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: 20,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    width: (width - 50) / 2,
    marginBottom: 15,
  },
  featureGradient: {
    padding: 20,
    borderRadius: 15,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: Colors.shadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: Colors.opacity.dark,
    shadowRadius: 3.84,
  },
  featureIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text.white,
    textAlign: 'center',
    marginBottom: 5,
  },
  featureDescription: {
    fontSize: 12,
    color: Colors.text.white,
    opacity: Colors.opacity.light,
    textAlign: 'center',
  },
  tokenContainer: {
    margin: 20,
    marginTop: 10,
  },
  tokenTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: 10,
  },
  tokenBox: {
    backgroundColor: Colors.cardBackground,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border.light,
  },
  tokenText: {
    fontSize: 12,
    color: Colors.text.muted,
    fontFamily: 'monospace',
  },
});

export default HomeScreen;
