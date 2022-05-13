import React, {useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Alert,
} from "react-native";
import {doc, getDoc,setDoc} from 'firebase/firestore';

import { db } from '../Config'
import RateSkill from "./RateSkill";
import { colors } from '../screens/colors';

export default function RateFriend({friendUname,username,message}){

    const [skill1State,setskill1State] = useState([false,false,false,false,false]);
    const [skill2State,setskill2State] = useState([false,false,false,false,false]);
    const [skill3State,setskill3State] = useState([false,false,false,false,false]);
    const [skill4State,setskill4State] = useState([false,false,false,false,false]);
    const [skill5State,setskill5State] = useState([false,false,false,false,false]);
    const [skill6State,setskill6State] = useState([false,false,false,false,false]);
    const [skill7State,setskill7State] = useState([false,false,false,false,false]);
    const [skill8State,setskill8State] = useState([false,false,false,false,false]);

    const myDoc = doc(db, "HHcollection", friendUname);
    const myDoc2 = doc(db, "HHcollection", username);

    function countStars(starsArray){ 
        /*takes an array with boolean values and converts it to stars that represents. 
        For example [true,true,false,false,false] is 2 stars*/
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
        /*when you submit the rate of a friend first checks if you already have 
        rated this friend before and it's true then replace the new rating with the old one.*/
        getDoc(myDoc)
        .then((user)=>{
            let user_ratings = user.data().ratings;
            user_ratings = user_ratings.filter(rating => rating.from !== username);

            let friendratings = { 
                "from":username,
                "blocks":countStars(skill1State),
                "defense":countStars(skill7State),
                "threepoints":countStars(skill2State),
                "twopoints":countStars(skill3State),
                "rebounds":countStars(skill4State),
                "team_player":countStars(skill5State),
                "athleticism":countStars(skill8State),
                "overall_score":countStars(skill6State), 
            }
            user_ratings.push(friendratings);

            let ratingsObject = {
                ratings : user_ratings
            }

            setDoc(myDoc, ratingsObject, { merge: true })
            .then(() => {
                getDoc(myDoc2)
                .then((user)=>{
                    let my_ratings = user.data().myRatings;
                    my_ratings = my_ratings.filter(rating => rating.to !== friendUname);
        
                    let friendratings = { 
                        "to":friendUname,
                        "blocks":countStars(skill1State),
                        "defense":countStars(skill7State),
                        "threepoints":countStars(skill2State),
                        "twopoints":countStars(skill3State),
                        "rebounds":countStars(skill4State),
                        "team_player":countStars(skill5State),
                        "athleticism":countStars(skill8State),
                        "overall_score":countStars(skill6State), 
                    }
                    my_ratings.push(friendratings);
        
                    let ratingsObject = {
                        myRatings : my_ratings
                    }
        
                    setDoc(myDoc2, ratingsObject, { merge: true })
                    .then(() => {
                        Alert.alert("","Rating added successfully");
                    })
                    .catch((error) => {
                        Alert.alert("","An Error has occured please try again later (error code: 15)");
                    });
                })
                .catch((error)=>{
                    Alert.alert("","An Error has occured please try again later (error code: 16)");
                });
            })
            .catch((error) => {
                Alert.alert("","An Error has occured please try again later (error code: 13)");
            });
        })
        .catch((error)=>{
            Alert.alert("","An Error has occured please try again later (error code: 14)");
        })
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

    function setSkill7(state){
        setskill7State(state);
    }

    function setSkill8(state){
        setskill8State(state);
    }

    
    return (
        <View style={styles.viewContainer}>
            <RateSkill skill="Blocks" getSkill={setSkill1}/>
            <RateSkill skill="Defense" getSkill={setSkill7}/>
            <RateSkill skill="3 Points" getSkill={setSkill2}/>
            <RateSkill skill="2 Points" getSkill={setSkill3}/>
            <RateSkill skill="Rebounds" getSkill={setSkill4}/>
            <RateSkill skill="Athleticism" getSkill={setSkill8}/>
            <RateSkill skill="Team Player" getSkill={setSkill5}/>
            <RateSkill skill="Overall Score" getSkill={setSkill6}/>
            {message && <Text style={styles.messageStyle}>You already have rated this friend. If you rate him again the new rating will replace the old one.</Text>}
            <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.btnStyle} onPress={submitRate}>
                    <Text style={styles.btnText}>Submit Rating</Text>
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
        borderRadius: 10,
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

    messageStyle:{
        color:"red",
        textAlign:'center'
    },

 });