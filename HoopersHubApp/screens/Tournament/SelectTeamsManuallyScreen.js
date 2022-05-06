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



export default function SelectTeamsManuallyScreen() {
    const route = useRoute();
    const navigation = useNavigation();
    const username = route.params.username;
    const friends_list = route.params.friends_list;
    const groupList = route.params.groupList;
    const tournamentName = route.params.tournamentName;
    const outsiders = route.params.outsiders;
    const manually = true;
    const [selectedValue, setSelectedValue] = useState("8");
    const [showTeamsCreation,setShowTeamsCreation] = useState(false);
    const [teamsArray,setTeamsArray] = useState([]);

    useEffect(() => {
        let initialState = [];
        for(let i=1;i<=parseInt(selectedValue);i++){
            initialState.push(i);
        }
        setTeamsArray([...initialState])
    }, [selectedValue]);

    let initialState2 = [];
    for(let i=0;i<groupList.length;i++){
        initialState2.push(1);
    }
    const [playerTeam,setPlayerTeam] = useState([...initialState2]);

    function changeTeam(team,player){
        let newPlayerState = playerTeam;
        newPlayerState[getIndex(player)] = team;
        setPlayerTeam([...newPlayerState]);
    }

    function getTeams(){
        let teams = [];
        for(let i=1;i<=parseInt(selectedValue);i++){
            for(let j=0;j<playerTeam.length;j++){
                if(i === playerTeam[j]){
                    teams.push(groupList[j])
                }
            }
        }
        return teams;
    }

    function getProgram(){
        let program = [];
        let numOfTeams = parseInt(selectedValue);
        let index = 1;

        for(let i=0;i<parseInt(numOfTeams/2);i++){
            let teamObject = {
                team1: index,
                team2: index+1
            }
            program.push(teamObject);
            index += 2;
        }
        
        if((numOfTeams % 2) !== 0){
            let teamObject = {
                team1: numOfTeams,
                team2: null
            }
            program.push(teamObject);
        }

        return program;
    }

    function registerNewTournament(){
        const docID = uuid.v4();
        const myDoc = doc(db, "Tournaments", docID);
       
        let tournamentElements = { 
            "leader":username,
            "tournamentName":tournamentName,
            "history":[],
            "teams": getTeams(),
            "program":getProgram(),
            "currentGame":0,
            "numberofTeamMembers":parseInt(groupList.length/selectedValue),
            "outsiders":[...outsiders],
            "manually":true,
            "id":docID,
            "gameCounter":1,
            "numberOfTeams":parseInt(selectedValue),
            "teamsOut":[],
        }

        setDoc(myDoc, tournamentElements)
        .then(() => {
            for(let i=0;i<groupList.length;i++){
                if(!outsiders.includes(groupList[i])){
                    const myDoc2 = doc(db, "HHcollection", groupList[i]);
                    getDoc(myDoc2)
                    .then((user)=>{
                        let user_tournaments = user.data().tournaments;
                        let newTournamentsArray = [...user_tournaments,docID]

                        let TournamentObject = {
                            tournaments: newTournamentsArray
                        }
                
                        setDoc(myDoc2, TournamentObject, { merge: true })
                        .then(() => {
                            console.log(`Tournament Updated for ${groupList[i]}`)
                        })
                        .catch((error) => {
                            Alert.alert("","An Error has occured please try again later");
                        });
                    }).catch((error) => {
                            Alert.alert("","An Error has occured please try again later");
                    });
                }
                    
            }
            Alert.alert("","Tournament Created Successfully");
            navigation.navigate("FriendlyTournamentMain",{"username":username});
        })
        .catch((error)=>{
            console.log(error)
        });
    }
        


    function getIndex(uname){
        return groupList.indexOf(uname);
    }

    function checkTeams(){
        let flag = true;
        let counter = 0;
        let countPlayers = -1;
        for(let i=0;i<playerTeam.length;i++){
            if(i === 1){
                countPlayers = counter;
            }else if(i > 1 && countPlayers !== counter){
                flag = false;
                break;
            }
            counter = 0;

            for(let j=0;j<playerTeam.length;j++){
                if(playerTeam[i] === playerTeam[j]){
                    counter++;
                }
            }
        }
        
        if(!flag){
            Alert.alert("Teams Selection Problem","Each team must have the same number of players.")
        }else{
            let teamsNumber = parseInt(selectedValue);
            for(let k = 1;k<=teamsNumber;k++){
                let flag2 = false;
                for(let x=0;x<playerTeam.length;x++){
                    if (playerTeam[x] === k){
                        flag2 = true
                    }
                }

                if(!flag2){
                    flag = false;
                    break;
                }
            }
            if(flag) registerNewTournament();
            else Alert.alert("Teams Selection Problem","Each team must have the same number of players.")
        }
    }

    const renderTeamsList = () => {
        return teamsArray.map((teamNumber) => {
          return <Picker.Item label={"Team"+teamNumber} value={teamNumber} key={teamNumber} />
        })
    }


    let friendsList = groupList.map(uname =>{
        return (
            <View key={uname}>
                <View style={{flexDirection:"row"}}>
                    <Image style={styles.ballIcons} source={require('../../assets/basket-ball-icon.png')}/>
                    <Text style={styles.playerTitle}>{uname}</Text>
                </View>
                <Picker
                    selectedValue={playerTeam[getIndex(uname)]}
                    style={styles.picker4Players}
                    onValueChange={(itemValue, itemIndex) => changeTeam(itemValue,uname)}
                >
                    {renderTeamsList()}
                </Picker>
            </View>
        );
     }); 

    return (
        <View style={styles.container}>
            <View style={styles.container2}>

                <View style={styles.pageTitleView}>
                    <TouchableOpacity onPress={() => navigation.navigate("AddTournamentMembers",{username,friends_list,manually})}>
                        <Image 
                            style={styles.icons} 
                            source={require('../../assets/back-icon.png')}
                        />
                    </TouchableOpacity>
                </View>
                <Text style={styles.pickerText}>Select the number of teams                         </Text>
                <Picker
                    selectedValue={selectedValue}
                    style={styles.picker}
                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                >
                    <Picker.Item label="4" value="4" />
                    <Picker.Item label="5" value="5" />
                    <Picker.Item label="6" value="6" />
                    <Picker.Item label="7" value="7" />
                    <Picker.Item label="8" value="8" />
                    <Picker.Item label="9" value="9" />
                    <Picker.Item label="10" value="10" />
                    <Picker.Item label="11" value="11" />
                    <Picker.Item label="12" value="12" />
                    <Picker.Item label="13" value="13" />
                    <Picker.Item label="14" value="14" />
                    <Picker.Item label="15" value="15" />
                    <Picker.Item label="16" value="16" />
                </Picker>
                <TouchableOpacity style={styles.buttons} onPress={() => setShowTeamsCreation(true)}>
                    <Text style={styles.nextText}>Next</Text>
                </TouchableOpacity>
                {showTeamsCreation && 
                    <ScrollView>
                        <Text style={styles.teamsCreationTitle}>Choose team for every player</Text>
                        {friendsList}
                        <TouchableOpacity style={styles.createBtn} onPress={checkTeams}>
                            <Text style={styles.nextText}>Create Tournament</Text>
                        </TouchableOpacity>
                    </ScrollView>
                }
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