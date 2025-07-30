import {getApp} from '@react-native-firebase/app';
import {getMessaging, getToken} from '@react-native-firebase/messaging';

let fcmToken = null;

export async function getFcmToken() {
  const firebaseApp = getApp();

  const messaging = getMessaging(firebaseApp);

  const token = await getToken(messaging);
  fcmToken = token;
  return token;
}

export function getCurrentFcmToken() {
  return fcmToken;
}
