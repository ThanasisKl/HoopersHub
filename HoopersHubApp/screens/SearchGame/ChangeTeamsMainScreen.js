import React, {useState,useEffect} from 'react';
import { useNavigation } from '@react-navigation/core'
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Image,
    TouchableOpacity,
    Alert,
} from "react-native";
import {doc, getDoc, setDoc } from 'firebase/firestore';
import { useRoute } from '@react-navigation/native';

import { db } from '../../Config'
import { colors } from './../colors';

export default function ChangeTeamsMainScreen() { 
    const route = useRoute();
    const navigation = useNavigation();
    const username = route.params.username;
    const lobbyID = route.params.lobbyID;
    const lobbyData = route.params.lobbyData;

    function gotoLobbyScreen(){
        navigation.navigate("GameLobby",{username,lobbyID,lobbyData})
    }

    function gotoChangeTeamsManually(){
        navigation.navigate("ChangeTeamsManually",{username,lobbyID,lobbyData})
    }

    function changeTeamsAutomatically(){
        
    }

    return (
        <View style={styles.container}>
            <View style={styles.iconView}>
                <TouchableOpacity onPress={gotoLobbyScreen}>
                    <Image 
                        style={styles.icons} 
                        source={require('../../assets/back-icon.png')}
                    />
                </TouchableOpacity>
            </View>
           
            <TouchableOpacity style={styles.buttons} onPress={gotoChangeTeamsManually}>
                <Text style={styles.btnsText}>Change teams manually</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttons} onPress={changeTeamsAutomatically}>
                <Text style={styles.btnsText}>Change teams automatically</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({

    btnStyle:{
        width: "5%",
        borderRadius: 40,
        height: 65,
        width: 65,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal:15,
        borderColor:colors.darkRed,
        borderWidth: 2,
    },

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
    },

    btnsView:{
        alignSelf: "center",
        marginTop:"auto",
        marginBottom:"30%",
        flexDirection:"row",
        flexWrap: 'wrap',
        justifyContent:"center",
    },

    container: {
        flex: 1,
        backgroundColor: colors.bgColor,
        alignItems: "center",
        justifyContent: "center",
      },

    // finishBtn:{
    //     width: "40%",
    //     borderRadius: 7,
    //     height: 50,
    //     alignItems: "center",
    //     justifyContent: "center",
    //     marginTop: 20,
    //     marginBottom:10,
    //     backgroundColor: 'white',
    //     borderColor:"black",
    //     borderWidth: 2.5,
    // },

    finishText:{
        fontSize:25,
        fontWeight: 'bold',
        color:'black',
    },

    icons:{
        width:45,
        height:30, 
        marginRight:20,
        marginTop:30,
        marginLeft:20,
    },

    iconView:{
        position: 'absolute',
        top:0,
        alignSelf: "flex-start",
        flexDirection:"row"
    },

    image: {
        flex: 1,
    },

    pageTitle:{
        fontSize:30,
        fontWeight:"bold",
        color:colors.darkRed,
        marginBottom:40,
        textAlign:"center"
    },
   
});