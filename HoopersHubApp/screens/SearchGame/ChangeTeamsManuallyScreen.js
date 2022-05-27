import React, {useState,useEffect} from 'react';
import { useNavigation } from '@react-navigation/core'
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Image,
    TouchableOpacity,
    Alert,
    ScrollView,
} from "react-native";
import {doc, getDoc, setDoc } from 'firebase/firestore';
import { useRoute } from '@react-navigation/native';

import { db } from '../../Config'
import { colors } from './../colors';
import {Picker} from '@react-native-picker/picker';

export default function ChangeTeamsManuallyScreen() { 
    const route = useRoute();
    const navigation = useNavigation();
    const username = route.params.username;
    const lobbyID = route.params.lobbyID;
    const lobbyData = route.params.lobbyData;



    let initialStateTeams = [];

    lobbyData.team_1.map(playerName =>{
        let data = {username:playerName,
                    team:"1"}
        initialStateTeams.push(data)
    })

    lobbyData.team_2.map(playerName =>{
        let data = {username:playerName,
                    team:"2"}
        initialStateTeams.push(data)
    })

    const [teamsState,setTeamsState] = useState([...initialStateTeams])

    function getTeam(username){
        let playersTeam = null;
        teamsState.find(function(player){
            if(player.username == username){
                playersTeam = player.team
            }
        })
        return playersTeam
    }

    function changeTeams(username,itemValue){
        let modifiedTeam = [...teamsState];
        modifiedTeam.find(function(player){
            if(player.username == username){
                console.log("old team: "+ player.team + " new team: "+ itemValue)
                player.team = itemValue;
            }
        })
        setTeamsState(modifiedTeam)
    }

    let teamsShown = initialStateTeams.map(player => {
        let username = player.username;
        // console.log(getTeam(username))
        return (
            <View key={username}>
                <View style={{flexDirection:"row"}}>
                    <Image style={styles.ballIcons} source={require('../../assets/basket-ball-icon.png')}/>
                    <Text style={styles.playerTitle}>{username}</Text>
                </View>
                <Picker
                    selectedValue={getTeam(username)}
                    style={styles.picker4Players}
                    onValueChange={(itemValue, itemIndex) => changeTeams(username,itemValue)}
                >
                    <Picker.Item label="Team 1" value="1" />
                    <Picker.Item label="Team 2" value="2" />
                </Picker>
            </View>
        );
    })

    function gotoLobbyScreen(){
        navigation.navigate("GameLobby",{username,lobbyData,lobbyID});
    }


    function checkTeams(){
        let playersTeam1 = 0;
        let playersTeam2 = 0;
        teamsState.map(player => {
            if (player.team =='1'){
                playersTeam1++
            }else {
                playersTeam2++
            }
        })
        if (Math.abs(playersTeam1 - playersTeam2) <= 1 ){
            let newTeam1=[]
            let newTeam2=[]
            teamsState.map(player => {
                if (player.team =='1'){
                    newTeam1.push(player.username)
                }else {
                    newTeam2.push(player.username)
                }
            const myDoc = doc(db, "Games", lobbyID);
            const new_teams = {team_1 :newTeam1,
                team_2:newTeam2}
            setDoc(myDoc,new_teams,{merge: true})
            .then(()=>{
                Alert.alert("Success","Teams are changed");
                getDoc(myDoc)
                .then((game)=>{
                    const lobbyData = game.data();
                    navigation.navigate("GameLobby",{username,lobbyData,lobbyID});
                })
                .catch((error) =>{
                        console.log(error)
            }).catch((error) =>{
                console.log(error)
            });
            
        })
    })} else {
        Alert.alert("Unbalanced Teams","Please pick an even number of members for the two teams!");
    }}


    return (
        <View style={styles.container}>
            <View style={styles.iconView}>
                <TouchableOpacity onPress={gotoLobbyScreen}>
                    <Image 
                        style={styles.icons} 
                        source={require('../../assets/back-icon.png')}
                    />
                </TouchableOpacity>
            </View>
            <View>
                <ScrollView>
                            <Text style={styles.teamsCreationTitle}>Choose team for every player</Text>
                            {teamsShown}
                            <TouchableOpacity style={styles.createBtn} onPress={checkTeams}>
                                <Text style={styles.nextText}>Change Teams</Text>
                            </TouchableOpacity>
                </ScrollView>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    buttons: {
        borderRadius: 25,
        borderWidth:2,
        borderColor:colors.textColor,
        backgroundColor: "white",
        textAlign:'center',
        alignItems:"center",
        width:100,
        paddingVertical:14,
        marginTop:20,
        marginLeft:"auto",
        marginRight:"auto",
    },

    createBtn:{
        borderRadius: 12,
        borderWidth:2,
        borderColor:colors.textColor,
        backgroundColor: "white",
        textAlign:'center',
        alignItems:"center",
        width:"75%",
        paddingVertical:14,
        marginTop:20,
        marginBottom:10,
        marginLeft:"auto",
        marginRight:"auto",
    },

    ballIcons:{
        width:20,
        height:20,
        marginRight:7,
    },

    nextText:{
        fontSize:20,
        fontWeight:"bold",
        color:colors.textColor,
    },

    btnsText:{
        fontSize:20,
        fontWeight: 'bold',
        textAlign:'center',
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
        flex:1,
    },
    
    icons:{
        width:45,
        height:30, 
        marginRight:20,
    },

    iconView:{
        position: 'absolute',
        top:0,
        alignSelf: "flex-start",
    },
    
    pageTitleView:{
        marginBottom:20,
        alignItems:'baseline',
        flexDirection:"row"
    },

    picker:{ 
        height: 50, 
        width: 150 ,
        backgroundColor:"white",
        color:"black"
    },

    picker4Players:{
        height: 50, 
        width: 150 ,
        color:"black",
        marginBottom:10,
        backgroundColor:"white",
    },

    pickerText:{
        fontSize:23,
        marginBottom:5,
        fontWeight:"bold",
        color:colors.textColor,
    },

    playerTitle:{
        fontSize:20,
        fontWeight:"bold",
        marginBottom:10,
    },

    teamsCreationTitle:{
        fontSize:23,
        marginBottom:5,
        marginTop:10,
        fontWeight:"bold",
        color:colors.textColor,
    },
});