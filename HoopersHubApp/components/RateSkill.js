import React, {useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
} from "react-native";
import { AntDesign } from '@expo/vector-icons';

export default function RateSkill({skill,getSkill}){
    const [showStarFilled, setShowStarFilled] = useState([false,false,false,false,false]);

    function handleStar(numberOfStar){  //when you press a star it becomes black and all the previous stars become black too
        let newStarState = [false,false,false,false,false];
        for(let i=0;i<numberOfStar;i++){
            newStarState[i] = true;
        }
        setShowStarFilled(newStarState);
        getSkill(newStarState);
    }
    
    return (
        <View style={styles.rateSkillContainer}>

            <Text style={styles.usernameStyle}>{skill}</Text>

            <View style={styles.starsView}>
                <AntDesign style={styles.starStyle} name={showStarFilled[0] ? "star": "staro"} size={26} color="black" onPress={()=>handleStar(1)}/>
                <AntDesign style={styles.starStyle} name={showStarFilled[1] ? "star": "staro"} size={26} color="black" onPress={()=>handleStar(2)}/>
                <AntDesign style={styles.starStyle} name={showStarFilled[2] ? "star": "staro"} size={26} color="black" onPress={()=>handleStar(3)}/>
                <AntDesign style={styles.starStyle} name={showStarFilled[3] ? "star": "staro"} size={26} color="black" onPress={()=>handleStar(4)}/>
                <AntDesign style={styles.starStyle} name={showStarFilled[4] ? "star": "staro"} size={26} color="black" onPress={()=>handleStar(5)}/>
            </View>

        </View>
    );
 }

 const styles = StyleSheet.create({

    rateSkillContainer:{
        flexDirection:"row",
        marginBottom:10,
        justifyContent:'flex-end',
    },

    usernameStyle:{
        fontSize:23,
        marginRight:15,
    },

    starStyle:{
        marginRight:5,
    },

    starsView:{
        display:'flex',
        flexDirection:'row',
    },
 });