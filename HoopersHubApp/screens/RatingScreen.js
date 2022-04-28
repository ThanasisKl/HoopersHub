import { StatusBar } from "expo-status-bar";
import { useNavigation } from '@react-navigation/core'
import React, {useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Image,
} from "react-native";
import { useRoute } from '@react-navigation/native';

import {colors} from "./colors";
import RateFriend from "../components/RateFriend";


export default function RatingScreen() { 
    const route = useRoute();
    const navigation = useNavigation();
    const username = route.params.username;
    const friends = route.params.friends_list;
    const my_ratings = route.params.myRatings;

    function gotoHomeScreen(){
        navigation.navigate("Home",{"username":username});
    }

    function extendRating(uname){  // when you press the + icon extends the rate block
        const index = getIndex(uname);
        hideRating[index] = ! hideRating[index];
        setHideRating([...hideRating])
    }

    function getIndex(uname){
        return friends.indexOf(uname);
    }

    let alreadyRated =[];
    let initialState = [];
    for (let i=0; i< friends.length;i++){  //initilizes the state of + buttons for all friends and checks if a friend has rated before
        initialState.push(false);
        let flag = false;
        for(let j=0;j<my_ratings.length;j++){
            if(my_ratings[j].to===friends[i]){
                flag = true;
                break;
            }
        }

        if(flag)alreadyRated.push(true)
        else alreadyRated.push(false)
    }
    
    let [ratedBefore,setRatedBefore] = useState(alreadyRated);
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
                {hideRating[getIndex(uname)] && <RateFriend friendUname={uname} username={username} message={ratedBefore[getIndex(uname)]}/>}
            </View>
        );
     }); 

    return (
        <View style={styles.container}>
            <View style={styles.container2}>
                <View style={styles.pageTitleView}>
                    <TouchableOpacity onPress={gotoHomeScreen}>
                        <Image 
                            style={styles.icons} 
                            source={require('../assets/back-icon.png')}
                        />
                    </TouchableOpacity>
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
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom: 10,
    },

    friendText:{
        fontSize:25,
        // fontFamily:'monospace',
        color:'white',
    },

    icons:{
        width:45,
        height:30, 
        marginRight:20,
    },

    pageTitle:{
        fontSize:30,
        borderColor:colors.bgColor,
        borderBottomColor:colors.textColor,
        borderWidth: 2,
    },

    pageTitleView:{
        marginBottom:20,
        alignItems:'baseline',
        flexDirection:"row"
    }
});