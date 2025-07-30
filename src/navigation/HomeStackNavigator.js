import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Screen2 from '../screens/HomeStack/Screen2';
import Screen3 from '../screens/HomeStack/Screen3';
import Screen1 from '../screens/HomeStack/Screen1';

const Stack = createStackNavigator();

const Tab1StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#141e30',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="Screen1"
        component={Screen1}
        options={{title: 'Home'}}
      />
      <Stack.Screen
        name="Screen2"
        component={Screen2}
        options={{title: 'Push Notification'}}
      />
      <Stack.Screen
        name="Screen3"
        component={Screen3}
        options={{title: 'History'}}
      />
    </Stack.Navigator>
  );
};

export default Tab1StackNavigator;
