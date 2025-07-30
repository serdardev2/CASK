import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeStackNavigator from './HomeStackNavigator';
import Tab2Screen from '../screens/Tab2/Tab2Screen';
import Tab3Screen from '../screens/Tab3/Tab3Screen';
import HomeIcon from '../components/icons/HomeIcon';
import NotificationIcon from '../components/icons/NotificationIcon';
import HistoryIcon from '../components/icons/HistoryIcon';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#141e30',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e0e0e0',
        },
      }}>
      <Tab.Screen
        name="Tab1"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: 'Home',
          headerShown: false,
          tabBarIcon: ({color, size}) => <HomeIcon color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Tab2"
        component={Tab2Screen}
        options={{
          tabBarLabel: 'Push Notification',
          headerStyle: {
            backgroundColor: '#141e30',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          tabBarIcon: ({color, size}) => (
            <NotificationIcon color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Tab3"
        component={Tab3Screen}
        options={{
          tabBarLabel: 'History',
          headerStyle: {
            backgroundColor: '#141e30',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          tabBarIcon: ({color, size}) => (
            <HistoryIcon color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
