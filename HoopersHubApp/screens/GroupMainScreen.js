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

import { db } from '../Config'
import { colors } from './colors';


export default function GroupMainScreen() {
    const route = useRoute();
    const navigation = useNavigation();
    const username = route.params.username;

    function gotoHomeScreen(){
        navigation.navigate("Home",{"username":username});
    }

    function gotoCreateGroupScreen(){
        const myDoc = doc(db, "HHcollection", username);
        getDoc(myDoc)
        .then((user)=>{
            const user_data = user.data();
            const friends_list = user_data.friends;
            navigation.navigate("CreateGroup",{username,friends_list});
        }).catch((error)=>{
            Alert.alert("","An Error has occured please try again later (error code:)");
        }); 
    }

    function gotoViewGroupsScreen(){ //FIXME
        const myDoc = doc(db, "HHcollection", username);
        getDoc(myDoc)
        .then((user)=>{
            const user_data = user.data();
            const groupsIDs = user_data.groups;
            const myDoc = doc(db, "HHcollection", username);

            let groupsNames = [];
            for(let i=0;i<groupsIDs.length;i++){
                const myDoc2 = doc(db, "Groups", groupsIDs[i]);
                getDoc(myDoc2)
                .then((group)=>{
                    groupsNames.push(group.data().name);
                    if (i === groupsIDs.length-1){
                        navigation.navigate("ViewGroups",{username,groupsNames,groupsIDs});
                    }
                }).catch((error)=>{
                    Alert.alert("","An Error has occured please try again later (error code:)");
                });
            }
        }).catch((error)=>{
            Alert.alert("","An Error has occured please try again later (error code:)");
        }); 
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.iconView}>
                <TouchableOpacity onPress={gotoHomeScreen}>
                    <Image 
                        style={styles.icons} 
                        source={require('../assets/back-icon.png')}
                    />
                </TouchableOpacity>
            </View>
           
            <TouchableOpacity style={styles.buttons} onPress={gotoCreateGroupScreen}>
                <Text style={styles.btnsText}>Create New Group</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttons} onPress={gotoViewGroupsScreen}>
                <Text style={styles.btnsText}>View Your Groups</Text>
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
    },

   
});