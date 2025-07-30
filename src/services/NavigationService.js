import {createNavigationContainerRef} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

export function navigateToHomeStackScreen(screenName, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate('Home');
    setTimeout(() => {
      navigationRef.navigate(screenName, params);
    }, 100);
  }
}

export function getCurrentRoute() {
  if (navigationRef.isReady()) {
    return navigationRef.getCurrentRoute();
  }
  return null;
}
