import React, {useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from "react-native";
import { AntDesign } from '@expo/vector-icons';
import RateSkill from "./RateSkill";

import { colors } from '../screens/colors';

export default function RateFriend(){
    const [skill1State,setskill1State] = useState([false,false,false,false,false]);
    const [skill2State,setskill2State] = useState([false,false,false,false,false]);
    const [skill3State,setskill3State] = useState([false,false,false,false,false]);
    const [skill4State,setskill4State] = useState([false,false,false,false,false]);
    const [skill5State,setskill5State] = useState([false,false,false,false,false]);
    const [skill6State,setskill6State] = useState([false,false,false,false,false]);
    
    function countStars(starsArray){
        if (starsArray[4]=== true){
            return 5;
        }else if (starsArray[3]=== true){
            return 4;
        }else if(starsArray[2]=== true){
            return 3;
        }else if(starsArray[1]=== true){
            return 2;
        }else if(starsArray[0]=== true){
            return 1;
        }else{
            return 0;
        }
    }

    function submitRate(){
        console.log(countStars(skill1State),countStars(skill2State),countStars(skill3State),countStars(skill4State),countStars(skill5State),countStars(skill6State));
    }

    function setSkill1(state){
        setskill1State(state);
    }

    function setSkill2(state){
        setskill2State(state);
    }

    function setSkill3(state){
        setskill3State(state);
    }

    function setSkill4(state){
        setskill4State(state);
    }

    function setSkill5(state){
        setskill5State(state);
    }

    function setSkill6(state){
        setskill6State(state);
    }

    
    return (
        <View>
            <RateSkill skill="Blocks" getSkill={setSkill1}/>
            <RateSkill skill="3 Points" getSkill={setSkill2}/>
            <RateSkill skill="2 Points" getSkill={setSkill3}/>
            <RateSkill skill="Rebounds" getSkill={setSkill4}/>
            <RateSkill skill="Team Player" getSkill={setSkill5}/>
            <RateSkill skill="Overall Score" getSkill={setSkill6}/>

            <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.btnStyle} onPress={submitRate}>
                    <Text style={styles.btnText}>Sumbit Rating</Text>
                </TouchableOpacity>
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
        borderRadius: 25,
        paddingHorizontal:30,
        paddingVertical:15,
        marginTop: 30,
        marginBottom: 15,
        backgroundColor: "white",
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

 });