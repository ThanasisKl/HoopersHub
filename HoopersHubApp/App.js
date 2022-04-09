import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import FriendRequestsScreen from './screens/FriendRequestsScreen';
import RatingScreen from './screens/RatingScreen';
import GroupMainScreen from './screens/GroupMainScreen';
import CreateGroupScreen from './screens/CreateGroupScreen';
import TestingScreen from './screens/TestingScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen}/> 
        <Stack.Screen options={{ headerShown: false }} name="Register" component={RegisterScreen}/>
        <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen}/>
        <Stack.Screen options={{ headerShown: false }} name="FriendRequests" component={FriendRequestsScreen}/>
        <Stack.Screen options={{ headerShown: false }} name="Rating" component={RatingScreen}/>
        <Stack.Screen options={{ headerShown: false }} name="GroupMain" component={GroupMainScreen}/>
        <Stack.Screen options={{ headerShown: false }} name="CreateGroup" component={CreateGroupScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}