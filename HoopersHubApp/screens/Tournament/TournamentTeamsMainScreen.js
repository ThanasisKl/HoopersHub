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
    
    function gotoAddTournamentMembers(flag){
        const myDoc = doc(db, "HHcollection", username);
        getDoc(myDoc)
        .then((user)=>{
            const user_data = user.data();
            const friends_list = user_data.friends;
            const manually = flag;
            navigation.navigate("AddTournamentMembers",{username,friends_list,manually});
        }).catch((error)=>{
            Alert.alert("","An Error has occured please try again later");
        }); 
    }

    return (
        <View style={styles.container}>
            <View style={styles.iconView}>
                <TouchableOpacity onPress={()=>navigation.navigate("FriendlyTournamentMain",{username})}>
                    <Image 
                        style={styles.icons} 
                        source={require('../../assets/back-icon.png')}
                    />
                </TouchableOpacity>
            </View>
           
            <TouchableOpacity style={styles.buttons} onPress={() => gotoAddTournamentMembers(true)}>
                <Text style={styles.btnsText}>Select Teams Manually</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttons} onPress={() => gotoAddTournamentMembers(false)}>
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