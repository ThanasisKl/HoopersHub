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
import uuid from 'react-native-uuid';

import { db } from '../../Config'
import { colors } from '../colors';

export default function ShowTournamentTeamsScreen() {
    const route = useRoute();
    const navigation = useNavigation();
    const username = route.params.username;
    const friends_list = route.params.friends_list;
    const groupList = route.params.groupList;
    const tournamentName = route.params.tournamentName;
    const outsiders = route.params.outsiders;
    let manually = route.params.manually;
    let dataFetched = false;

    const [loadingMessage,setLoadingMessage] = useState("Getting Players Scores From Database...");

    let scoresArray = [];
    let playersScores = [];
    let averageScoresPerPlayer = []; 
    for(let i=0;i<groupList.length;i++){
        const myDoc = doc(db, "HHcollection", groupList[i]);
        getDoc(myDoc)
        .then((user)=>{
            let user_ratings = user.data().ratings;
            console.log(user.data())
            scoresArray.push(user_ratings);
            if(i === groupList.length-1){
                for(let i=0;i<groupList.length;i++){
                    //initialize variables(sums)
                    for(let j=0;j<scoresArray.length;j++){
                        //iterate ratings
                    }
                    //divisions
                    //push object
                }
            }
        }).catch((error) => {
            Alert.alert("","An Error has occured please try again later");
        });      
    }
    //console.log("lol")

    function handleOK(){
        navigation.navigate("FriendlyTournamentMain",{username})
    }

    function handleSelectTeamsManually(){
        manually = true;
        navigation.navigate("SelectTeamsManually",{username,friends_list,groupList,tournamentName,outsiders,manually})
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.container2}>
                {dataFetched && 
                    <View>
                        <View style={styles.pageTitleView}>
                            <Text style={styles.pageTitle}>The teams have created</Text>
                        </View>
                        <View style={styles.btnView}>
                            <TouchableOpacity style={styles.button} onPress={handleSelectTeamsManually}>
                                <Text style={styles.btnText2}>Select Teams Manually</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={handleOK}>
                                <Text style={styles.btnText}>OK</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
                {!dataFetched && 
                    <View style={{flex:1}}>
                        <View style={styles.messageView}>
                            <Text style={styles.messageText}>{loadingMessage}</Text>
                        </View>
                    </View>
                }
            </View>
        </View>
    );
}


const styles = StyleSheet.create({

    button: {
        borderRadius: 7,
        borderWidth:2,
        borderColor:colors.textColor,
        backgroundColor: "white",
        alignItems:"center",
        justifyContent:'center',
        width:110,
        paddingVertical:14,
        marginTop:20,
        marginLeft:"auto",
        marginRight:"auto",
    },

    btnText:{
        fontSize:20,
        fontWeight:"bold",
        color:colors.textColor,
        textAlign:'center',
    },

    
    btnText2:{
        fontSize:15,
        textAlign:'center',
        fontWeight:"bold",
        color:"red",
    },

    btnView:{
        // marginTop:"auto",
        // marginBottom:"20%",
        flexDirection:"row",
    },

    container: {
      flex: 1,
      backgroundColor: colors.bgColor,
      alignItems: "center",
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

    messageView:{
        marginBottom:"auto",
        marginTop:"100%",
    },

    messageText:{
        fontSize:23,
        color:"black",
        textAlign:"center",
    },

    pageTitleView:{
        marginBottom:20,
        flexDirection:"row",
    },

    pageTitle:{
        fontSize:24,
        borderColor:colors.bgColor,
        borderBottomColor:colors.textColor,
        borderWidth: 2,
        fontWeight:"bold",
        color:"black",
        paddingHorizontal:30,
    },

});