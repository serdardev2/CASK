import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeStackNavigator from './HomeStackNavigator';
import Tab2Screen from '../screens/Tab2/Tab2Screen';
import Tab3Screen from '../screens/Tab3/Tab3Screen';
import HomeIcon from '../components/icons/HomeIcon';
import NotificationIcon from '../components/icons/NotificationIcon';
import HistoryIcon from '../components/icons/HistoryIcon';
import {Colors} from '../constants/colors';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.tabBar.activeTint,
        tabBarInactiveTintColor: Colors.tabBar.inactiveTint,
        tabBarStyle: {
          backgroundColor: Colors.tabBar.background,
          borderTopWidth: 1,
          borderTopColor: Colors.tabBar.borderTop,
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
        name="Push Notification"
        component={Tab2Screen}
        options={{
          tabBarLabel: 'Push Notification',
          headerStyle: {
            backgroundColor: Colors.header.background,
          },
          headerTintColor: Colors.header.tint,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          tabBarIcon: ({color, size}) => (
            <NotificationIcon color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={Tab3Screen}
        options={{
          tabBarLabel: 'History',
          headerStyle: {
            backgroundColor: Colors.header.background,
          },
          headerTintColor: Colors.header.tint,
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
