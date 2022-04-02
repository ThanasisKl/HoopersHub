import { StatusBar } from "expo-status-bar";
import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import {doc, getDoc} from 'firebase/firestore';

import { db } from '../Config'
import {colors} from "./colors";
import RateSkill from "../components/RateSkill";
import RateFriend from "../components/RateFriend";


export default function RatingScreen() {
    const route = useRoute();
    const username = route.params.username;
    const friends = route.params.friends_list;

    function extendRating(uname){
        const index = getIndex(uname);
        hideRating[index] = ! hideRating[index];
        setHideRating([...hideRating])
    }

    function getIndex(uname){
        return friends.indexOf(uname);
    }

    let initialState = [];
    for (let i=1; i<= friends.length;i++){
        initialState.push(false);
    }
    let [hideRating,setHideRating] = useState(initialState);
    
    let friendsList = friends.map(uname =>{
        return (
            <View key={uname}>
                <View style={styles.friendsListStyle}>
                    <Text style={styles.friendText}>{uname}</Text>
                    <TouchableOpacity style={styles.btnStyle} onPress={()=>extendRating(uname)}>
                        <Text style={styles.btnText}>+</Text>
                    </TouchableOpacity>
                </View>
                {hideRating[getIndex(uname)] && <RateFriend friendUname={uname}/>}
            </View>
        );
     }); 

    return (
        <View style={styles.container}>
            <View style={styles.container2}>
                <View style={styles.pageTitleView}>
                    <Text style={styles.pageTitle}>Rate your Friend</Text>
                </View>
                <ScrollView>
                    {friendsList}
                </ScrollView>
                       
            </View>
        </View>  
    );
}

const styles = StyleSheet.create({
    btnContainer:{
        alignItems: "center",
        justifyContent: "center",
        marginLeft:40,
    },

    btnStyle:{
        borderRadius: 5,
        paddingHorizontal:10,
        backgroundColor: "white",
        marginTop:8,
        marginLeft:7,

    },

    btnText:{
        color: colors.textColor,
        fontSize:18,
    },

    container:{
        backgroundColor: colors.bgColor,
        flex: 1,
        alignItems: "flex-start",
        justifyContent: "flex-start",
    },

    container2: {
        marginTop:50,
        marginLeft:10,
    },

    friendsListStyle:{
        alignItems: "flex-start",
        justifyContent: "flex-start",
        flexDirection:'row',
        justifyContent: "space-around",
        marginBottom: 10,
    },

    friendText:{
        fontSize:25,
    },

    pageTitle:{
        fontSize:30,
    },

    pageTitleView:{
        borderColor:colors.bgColor,
        borderBottomColor:colors.textColor,
        borderWidth: 2,
        marginBottom:20,
        alignItems:'baseline',
    }
});