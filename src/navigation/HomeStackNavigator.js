import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import PhotoModeScreen from '../screens/HomeStack/PhotoModeScreen';
import VideoModeScreen from '../screens/HomeStack/VideoModeScreen';
import HomeScreen from '../screens/HomeStack/HomeScreen';
import TextModeScreen from '../screens/HomeStack/TextModeScreen';
import {Colors} from '../constants/colors';

const Stack = createStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.header.background,
        },
        headerTintColor: Colors.header.tint,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{title: 'Home'}}
      />
      <Stack.Screen
        name="TextMode"
        component={TextModeScreen}
        options={{title: 'Text Mode'}}
      />
      <Stack.Screen
        name="PhotoModeScreen"
        component={PhotoModeScreen}
        options={{title: 'Photo Mode'}}
      />
      <Stack.Screen
        name="VideoModeScreen"
        component={VideoModeScreen}
        options={{title: 'Video Mode'}}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
