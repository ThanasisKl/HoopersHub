import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginRegister/LoginScreen';
import HomeScreen from './screens/Main/HomeScreen';
import RegisterScreen from './screens/LoginRegister/RegisterScreen';
import FriendRequestsScreen from './screens/Main/FriendRequestsScreen';
import RatingScreen from './screens/Rating/RatingScreen';
import GroupMainScreen from './screens/Groups/GroupMainScreen';
import CreateGroupScreen from './screens/Groups/CreateGroupScreen';
import CreateTeamsScreen from './screens/Groups/CreateTeamsScreen';
import ViewGroupsScreen from './screens/Groups/ViewGroupsScreen';
import ViewChosenGroupScreen from './screens/Groups/ViewChosenGroupScreen';
import GroupSettingsScreen from './screens/Groups/GroupSettingsScreen';
import TrainingMainScreen from './screens/Training/TrainingMainScreen';
import TrainingSessionScreen from './screens/Training/TrainingSessionScreen';
import TrainingHistoryScreen from './screens/Training/TrainingHistoryScreen';
import FriendlyTournamentMainScreen from './screens/Tournament/FriendlyTournamentMainScreen';
import AddTournamentMembersScreen from './screens/Tournament/AddTournamentMembersScreen';
import TournamentTeamsMainScreen from './screens/Tournament/TournamentTeamsMainScreen';
import SelectTeamsManuallyScreen from './screens/Tournament/SelectTeamsManuallyScreen';
import ViewTournamentsScreen from './screens/Tournament/ViewTournamentsScreen';
import ViewChosenTournamentScreen from './screens/Tournament/ViewChosenTournamentScreen';
import ShowTournamentMembersScreen from './screens/Tournament/ShowTournamentMembersScreen';
import ShowTournamentTeamsScreen from './screens/Tournament/ShowTournamentTeamsScreen';


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
        <Stack.Screen options={{ headerShown: false }} name="CreateTeams" component={CreateTeamsScreen}/>
        <Stack.Screen options={{ headerShown: false }} name="ViewGroups" component={ViewGroupsScreen}/>
        <Stack.Screen options={{ headerShown: false }} name="ViewChosenGroup" component={ViewChosenGroupScreen}/>
        <Stack.Screen options={{ headerShown: false }} name="GroupSettings" component={GroupSettingsScreen}/>
        <Stack.Screen options={{ headerShown: false }} name="TrainingMain" component={TrainingMainScreen}/>
        <Stack.Screen options={{ headerShown: false }} name="TrainingSession" component={TrainingSessionScreen}/>
        <Stack.Screen options={{ headerShown: false }} name="TrainingHistory" component={TrainingHistoryScreen}/>
        <Stack.Screen options={{ headerShown: false }} name="FriendlyTournamentMain" component={FriendlyTournamentMainScreen}/>
        <Stack.Screen options={{ headerShown: false }} name="AddTournamentMembers" component={AddTournamentMembersScreen}/>
        <Stack.Screen options={{ headerShown: false }} name="TournamentTeamsMain" component={TournamentTeamsMainScreen}/>
        <Stack.Screen options={{ headerShown: false }} name="SelectTeamsManually" component={SelectTeamsManuallyScreen}/>
        <Stack.Screen options={{ headerShown: false }} name="ViewTournaments" component={ViewTournamentsScreen}/>
        <Stack.Screen options={{ headerShown: false }} name="ViewChosenTournament" component={ViewChosenTournamentScreen}/>
        <Stack.Screen options={{ headerShown: false }} name="ShowTournamentMembers" component={ShowTournamentMembersScreen}/>
        <Stack.Screen options={{ headerShown: false }} name="ShowTournamentTeams" component={ShowTournamentTeamsScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}