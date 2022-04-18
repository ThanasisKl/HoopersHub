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

import { db } from '../Config'
import { colors } from './colors';


export default function ViewGroupsScreen() {
    const route = useRoute();
    const navigation = useNavigation();
    const username = route.params.username;
    const groupList = route.params.groupsNames;
    const groupsIDS = route.params.groupsIDs;

    function gotoGroupScreen(){
        navigation.navigate("GroupMain",{username});
    }

    function handleViewGroup(groupID){//FIXME
        // console.log(groupList[getIndex(groupID)]);
        const myDoc = doc(db, "Groups", groupID);
        getDoc(myDoc)
        .then((group)=>{
            const groupInfo = group.data();
            navigation.navigate("ViewChosenGroup",{username,groupInfo,groupID,groupList,groupsIDS});
        }).catch((error)=>{
            Alert.alert("","An Error has occured please try again later (error code:)");
        });
    }

    function getIndex(id){
        return groupsIDS.indexOf(id);
    }

    let group = groupsIDS.map(id =>{
        return (
            <View key={id}>
                <View style={styles.groupsView}>
                    <Text style={styles.groupText}>{groupList[getIndex(id)]}</Text>
                    <TouchableOpacity style={styles.viewGroupBtn} onPress={()=>handleViewGroup(id)}>
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
                    <TouchableOpacity onPress={gotoGroupScreen}>
                        <Image 
                            style={styles.icons} 
                            source={require('../assets/back-icon.png')}
                        />
                    </TouchableOpacity>
                    <Text style={styles.pageTitle}>Your Groups</Text>
                </View>
                <ScrollView>
                    {group}
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

    groupsView:{
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

    groupText:{
        fontSize:25,
        fontFamily:'monospace',
        color:'white',
        marginRight:30,
    },

    pageTitle:{
        fontSize:30,
        borderColor:colors.bgColor,
        borderBottomColor:colors.textColor,
        borderWidth: 2,
    },

    viewGroupBtn:{
        borderRadius: 7,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 30,
        backgroundColor: "white",
        paddingHorizontal:20,
        paddingVertical:5,
    },
   
});