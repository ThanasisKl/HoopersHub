import React, {useState} from 'react';
import { useNavigation } from '@react-navigation/core'
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Alert,
} from "react-native";
import {doc, getDoc} from 'firebase/firestore';
import { useRoute } from '@react-navigation/native';

import { db } from '../../Config'
import { colors } from '../colors';


export default function TournamentTeamsMainScreen() {
    const route = useRoute();
    const navigation = useNavigation();
    const username = route.params.username;
    const groupList = route.params.groupList;
    const friends_list = route.params.friends_list;
    const tournamentName = route.params.tournamentName;
    
    function gotoSelectTeams(){
        navigation.navigate("SelectTeamsManually",{username,friends_list});
    }

    return (
        <View style={styles.container}>
            <View style={styles.iconView}>
                <TouchableOpacity onPress={()=>navigation.navigate("AddTournamentMembers",{username,friends_list})}>
                    <Image 
                        style={styles.icons} 
                        source={require('../../assets/back-icon.png')}
                    />
                </TouchableOpacity>
            </View>
           
            <TouchableOpacity style={styles.buttons} onPress={gotoSelectTeams}>
                <Text style={styles.btnsText}>Select Teams Manually</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttons}>
                <Text style={styles.btnsText}>Create Teams Automatically</Text>
            </TouchableOpacity>
            
        </View>
    );
}


const styles = StyleSheet.create({
    buttons: {
        width: "70%",
        borderRadius: 7,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 30,
        backgroundColor: "white",
        
    },

    btnsText:{
        fontSize:20,
        fontWeight: 'bold',
        textAlign:'center',
    },

    container: {
      flex: 1,
      backgroundColor: colors.bgColor,
      alignItems: "center",
      justifyContent: "center",
    },
    
    icons:{
        width:45,
        height:30, 
        marginRight:20,
        marginTop:40,
        marginLeft:20,
    },

    iconView:{
        position: 'absolute',
        top:0,
        alignSelf: "flex-start",
        flexDirection:"row"
    },   
});