import { StatusBar } from "expo-status-bar";
import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react';
// import Stars from 'react-native-stars';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Pressable,
    TouchableOpacity,
    KeyboardAvoidingView,
} from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import {doc, getDoc} from 'firebase/firestore';

import { db } from '../Config'
import {colors} from "./colors";
import RateSkill from "../components/RateSkill";


export default function RatingScreen() {
    const route = useRoute();
    const username = route.params.username;
    // const [showStarFilled, setShowStarFilled] = useState([false,false,false,false,false]);
    console.log(username)

    // function handleStar(numberOfStar){
    //     console.log(numberOfStar);
    //     let newStarState = [false,false,false,false,false];
    //     for(let i=0;i<numberOfStar;i++){
    //         newStarState[i] = true;
    //     }
    //     setShowStarFilled(newStarState);
    // }

    return (
        <View style={styles.container}>
            <View style={styles.container2}>
                <RateSkill skill="3 shot"/>
                <RateSkill skill="2 shot"/>
                <RateSkill skill="team player"/>
                <RateSkill skill="other stuff"/>
            </View>
        </View>  
    );
}

const styles = StyleSheet.create({
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
});