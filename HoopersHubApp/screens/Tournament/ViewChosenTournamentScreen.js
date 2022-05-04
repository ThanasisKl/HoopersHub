import React, {useState,useEffect} from 'react';
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
import {Picker} from '@react-native-picker/picker';
import {doc, getDoc,setDoc} from 'firebase/firestore';
import { useRoute } from '@react-navigation/native';

import { db } from '../../Config'
import { colors } from '../colors';



export default function ViewChosenTournamentScreen() {
    const route = useRoute();
    const navigation = useNavigation();
    const username = route.params.username;
    const tournamentInfo = route.params.tournamentInfo;
    const tournamentIDS = route.params.tournamentIDS;
    const tournamentNames = route.params.tournamentNames;

    return (
        <View style={styles.container}>
            <View style={styles.container2}>

                <View style={styles.pageTitleView}>
                    <TouchableOpacity onPress={() => navigation.navigate("ViewTournaments",{username,tournamentIDS,tournamentNames})}>
                        <Image 
                            style={styles.icons} 
                            source={require('../../assets/back-icon.png')}
                        />
                    </TouchableOpacity>

                    <View style={styles.rigthIconsView}>
                        <TouchableOpacity>
                            <Image 
                                style={styles.icons2} 
                                source={require('../../assets/history-icon.png')}
                            />
                        </TouchableOpacity>
                    </View>
                   
                </View>
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
        flex:1,
    },
    
    icons:{
        width:45,
        height:30, 
        marginRight:20,
    },

    icons2:{
        width:35,
        height:35, 
        marginRight:20,
    },
    
    pageTitleView:{
        marginBottom:20,
        alignItems:'baseline',
        flexDirection:"row",
    },

    rigthIconsView:{
        width:"82%",
        flexDirection:'row',
        justifyContent:'flex-end',
    },
});