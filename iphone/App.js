import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import {Image} from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import NotificationScreen from './src/screens/NotificationScreen';
import Login from './src/screens/Login';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: '#157cdb',
          inactiveTintColor: '#262626',
        }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({color}) => (
              <Image source={require('./src/assets/home.png')} resizeMode='contain' style={{width: 20, height: 20}}/>),
      }}/>
        <Tab.Screen
          name="Notification"
          component={NotificationScreen}
          options={{
            tabBarIcon: ({color}) => (
              <Image source={require('./src/assets/notification.png')} resizeMode='contain' style={{width: 20, height: 20}}/>),
      }}/>
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({color}) => (
              <Image source={require('./src/assets/profile.png')} resizeMode='contain' style={{width: 20, height: 20}}/>),
      }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
