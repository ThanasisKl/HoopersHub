import React, {useState} from 'react';
import { useNavigation } from '@react-navigation/core'
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Alert,
    ScrollView,
} from "react-native";
import {doc, getDoc} from 'firebase/firestore';
import { useRoute } from '@react-navigation/native';

import { db } from '../../Config'
import { colors } from '../colors';


export default function ShowTournamentMembersScreen() {
    const route = useRoute();
    const navigation = useNavigation();
    const username = route.params.username;
    const tournamentIDS = route.params.tournamentIDS;
    const tournamentNames = route.params.tournamentNames;
    const tournamentInfo = route.params.tournamentInfo;
    const numberOfTeams = tournamentInfo.numberOfTeams;
    const teams = tournamentInfo.teams;
    const teamsOut = tournamentInfo.teamsOut;
    const numberofTeamMembers = tournamentInfo.numberofTeamMembers;
  
    let teamsArray = [];
    let teamMembers = [];
    for(let i=1;i<=numberOfTeams;i++){
        teamsArray.push(i)
        let memberObj = {
            members: findTeam(i)
        }
        teamMembers.push(memberObj);
    }

    function findTeam(teamNumber){
        let teamMember = [];
        let team = 1
        for(let i=1;i<=teams.length;i++){
            if (team === teamNumber)teamMember.push(teams[i-1])
            if (teamMember.length === numberofTeamMembers)break;
            if(i % numberofTeamMembers === 0)team++;
        }
        return teamMember;
    }

    function getMembers(team){
        let members= teamMembers[team-1].members.map(member =>{
            return (
                <View key={member} style={{flexDirection:"row"}}>
                    <Text style={styles.memberStyle}>{member}</Text>
                </View>
            );
        });
        return members;
    }

    let tournamentsMembers = teamsArray.map(team =>{
        return (
            <View key={team}>
                <View style={styles.tournamentView}>
                    <View style={styles.teamView}>
                        <Image style={styles.ballIcons} source={require('../../assets/basket-ball-icon.png')}/>
                        <Text style={[styles.tournamentText,{color : teamsOut.includes(team) ? "red" : "white",textDecorationLine: teamsOut.includes(team) ? "line-through" : "none" }]}>Team{team}</Text>
                    </View>
                    {getMembers(team)}
                </View>
            </View>
        );
    }); 
    
    return (
        <View style={styles.container}>
            <View style={styles.container2}>
                <View style={styles.headerView}>
                    <TouchableOpacity onPress={() => navigation.navigate("ViewChosenTournament",{username,tournamentIDS,tournamentNames,tournamentInfo})}>
                        <Image 
                            style={styles.icons} 
                            source={require('../../assets/back-icon.png')}
                        />
                    </TouchableOpacity>
                    <Text style={styles.pageTitle}>Tournament Members</Text>
                </View>
                <ScrollView>
                    {tournamentsMembers}
                </ScrollView>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({

    container: {
      flex: 1,
      backgroundColor: colors.bgColor,
      alignItems: "flex-start",
      justifyContent: "flex-start",
    },

    container2: {
        marginTop:50,
        marginLeft:10,
    },

    tournamentView:{
        alignItems: "flex-start",
        marginLeft:"10%"
    },

    headerView:{
        marginBottom:20,
        alignItems:'baseline',
        flexDirection:"row",
    },

    icons:{
        width:45,
        height:30, 
        marginRight:20,
    },

    ballIcons:{
        width:20,
        height:20,
        marginRight:7,
    },

    tournamentText:{
        fontSize:30,
        letterSpacing:4,
    },

    pageTitle:{
        fontSize:26,
        borderColor:colors.bgColor,
        borderBottomColor:colors.textColor,
        borderWidth: 2,
    },

    memberStyle:{
        fontSize:22,
        marginLeft:25,
        color:colors.textColor,

    },

    teamView:{
        flexDirection:"row",
        alignItems:"center",
        marginBottom:3
        ,marginTop:8,
    }
   
});