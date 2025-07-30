import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import MainTabNavigator from './src/navigation/MainTabNavigator';
import {requestNotificationPermission} from './src/permissions';
import {getFcmToken} from './src/notificationServices';
import {getApp} from '@react-native-firebase/app';
import {
  getMessaging,
  onMessage,
  getInitialNotification,
  onNotificationOpenedApp,
} from '@react-native-firebase/messaging';
import {
  navigationRef,
  navigateToTab1Screen,
} from './src/services/NavigationService';
import {NotificationStorage} from './src/services/NotificationStorage';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.notificationOpenedListener = null;
    this.messageListener = null;
  }

  handleNotification = async remoteMessage => {
    await NotificationStorage.saveNotification(remoteMessage);

    if (remoteMessage?.data?.pn_type) {
      const pnType = remoteMessage.data.pn_type;
      const notificationData = {
        title: remoteMessage.notification?.title,
        body: remoteMessage.notification?.body,
        notification_id: remoteMessage.data.notification_id,
        pn_type: pnType,
        fullData: remoteMessage,
      };

      switch (pnType) {
        case '1':
          navigateToTab1Screen('Screen1', {notificationData});
          break;
        case '2':
          navigateToTab1Screen('Screen2', {notificationData});
          break;
        case '3':
          navigateToTab1Screen('Screen3', {notificationData});
          break;
        default:
      }
    }
  };

  async componentDidMount() {
    await requestNotificationPermission();
    await getFcmToken();

    const firebaseApp = getApp();
    const messaging = getMessaging(firebaseApp);

    this.messageListener = onMessage(messaging, remoteMessage => {
      this.handleNotification(remoteMessage);
    });

    this.notificationOpenedListener = onNotificationOpenedApp(
      messaging,
      remoteMessage => {
        this.handleNotification(remoteMessage);
      },
    );

    const initialNotification = await getInitialNotification(messaging);
    if (initialNotification) {
      setTimeout(() => {
        this.handleNotification(initialNotification);
      }, 500);
    }
  }

  componentWillUnmount() {
    if (this.notificationOpenedListener) {
      this.notificationOpenedListener();
    }
    if (this.messageListener) {
      this.messageListener();
    }
  }

  render() {
    return (
      <SafeAreaProvider>
        <NavigationContainer ref={navigationRef}>
          <MainTabNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }
}
