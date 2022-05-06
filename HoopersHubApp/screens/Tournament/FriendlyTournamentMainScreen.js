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

export default function FriendlyTournamentMainScreen() {
    const route = useRoute();
    const navigation = useNavigation();
    const username = route.params.username;

    function gotoViewTournamentsScreen(){
        const myDoc = doc(db, "HHcollection", username);
        getDoc(myDoc)
        .then((user)=>{
            const user_data = user.data();
            const tournamentIDS = user_data.tournaments;
            const myDoc = doc(db, "HHcollection", username);

            if (tournamentIDS.length === 0){
                Alert.alert("No Tournaments Found","You are not in a tournament. You can create one or a friend of yours can add you to a tournament")
            }else{
                let tournamentNames = [];
                for(let i=0;i<tournamentIDS.length;i++){
                    const myDoc2 = doc(db, "Tournaments", tournamentIDS[i]);
                    getDoc(myDoc2)
                    .then((tournament)=>{
                        tournamentNames.push(tournament.data().tournamentName);
                        if (i === tournamentIDS.length-1){
                            navigation.navigate("ViewTournaments",{username,tournamentNames,tournamentIDS});
                        }
                    }).catch((error)=>{
                        Alert.alert("","An Error has occured please try again later (error code:)");
                    });
                }
            }
        }).catch((error)=>{
            Alert.alert("","An Error has occured please try again later (error code:)");
        }); 
    }

    return (
        <View style={styles.container}>
            <View style={styles.iconView}>
                <TouchableOpacity onPress={() => navigation.navigate("Home",{"username":username})}>
                    <Image 
                        style={styles.icons} 
                        source={require('../../assets/back-icon.png')}
                    />
                </TouchableOpacity>
            </View>
           
            <TouchableOpacity style={styles.buttons} onPress={() => navigation.navigate("TournamentTeamsMain",{username})}>
                <Text style={styles.btnsText}>Create Tournament</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttons} onPress={gotoViewTournamentsScreen}>
                <Text style={styles.btnsText}>View Tournament</Text>
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