import {Platform} from 'react-native';
import {
  checkNotifications,
  requestNotifications,
} from 'react-native-permissions';

export async function checkNotificationPermission() {
  const {status, settings} = await checkNotifications();
  return {status, settings};
}

export async function requestNotificationPermission() {
  const options = Platform.OS === 'ios' ? ['alert', 'sound', 'badge'] : [];
  const {status, settings} = await requestNotifications(options);
  return {status, settings};
}
