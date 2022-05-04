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
                <Text style={styles.btnsText}>Create Friendly Tournament</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttons}>
                <Text style={styles.btnsText}>View Friendly Tournament</Text>
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