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


export default function ViewTournamentsScreen() {
    const route = useRoute();
    const navigation = useNavigation();
    const username = route.params.username;
    const tournamentIDS = route.params.tournamentIDS;
    const tournamentNames = route.params.tournamentNames;

    function gotoViewChosenGroupScreen(tournamentID){
        const myDoc = doc(db, "Tournaments", tournamentID);
        getDoc(myDoc)
        .then((tournament)=>{
            const tournamentInfo = tournament.data();
            navigation.navigate("ViewChosenTournament",{username,tournamentInfo,tournamentIDS,tournamentNames});
        }).catch((error)=>{
            Alert.alert("","An Error has occured please try again later");
        });
    }

    function getIndex(id){
        return tournamentIDS.indexOf(id);
    }

    let tournaments = tournamentIDS.map(id =>{
        return (
            <View key={id}>
                <View style={styles.tournamentView}>
                    <Text style={styles.tournamentText}>{tournamentNames[getIndex(id)]}</Text>
                    <TouchableOpacity style={styles.viewTournamentBtn} onPress={() => gotoViewChosenGroupScreen(id)}>
                        <Text style={styles.btnsText}>View</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    });

    
    
    return (
        <View style={styles.container}>
            <View style={styles.container2}>
                <View style={styles.headerView}>
                    <TouchableOpacity onPress={() => navigation.navigate("FriendlyTournamentMain",{username})}>
                        <Image 
                            style={styles.icons} 
                            source={require('../../assets/back-icon.png')}
                        />
                    </TouchableOpacity>
                    <Text style={styles.pageTitle}>Your Tournaments</Text>
                </View>
                <ScrollView>
                    {tournaments}
                </ScrollView>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    btnsText:{
        fontSize:20,
        fontWeight: 'bold',
    },

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
        flexDirection:'row',
        justifyContent:'space-between',
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

    tournamentText:{
        fontSize:25,
        color:'white',
        marginRight:30,
    },

    pageTitle:{
        fontSize:30,
        borderColor:colors.bgColor,
        borderBottomColor:colors.textColor,
        borderWidth: 2,
    },

    viewTournamentBtn:{
        borderRadius: 7,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 30,
        backgroundColor: "white",
        paddingHorizontal:20,
        paddingVertical:5,
    },
   
});