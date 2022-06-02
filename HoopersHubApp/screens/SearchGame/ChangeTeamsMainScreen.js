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
} from "react-native";
import {doc, getDoc, setDoc } from 'firebase/firestore';
import { useRoute } from '@react-navigation/native';

import { db } from '../../Config'
import { colors } from './../colors';

export default function ChangeTeamsMainScreen() { 
    const route = useRoute();
    const navigation = useNavigation();
    const username = route.params.username;
    const lobbyID = route.params.lobbyID;
    const lobbyData = route.params.lobbyData;
    const [dataFetched,setDataFetch] = useState(false);
    const [finalTeamFlag,setFinalTeamFlag] = useState(false);
    const [loadingMessage,setLoadingMessage] = useState("Creating Teams...");
    const [finalTeam,setFinalTeam] = useState([]);
    const [tournamentsMembers,setTournamentsMembers] = useState("");
    const [flag,setFlag] = useState(true);
    const membersPerTeam = (lobbyData.team_2.length + lobbyData.team_1.length )/ 2;

    function gotoLobbyScreen(){
        navigation.navigate("GameLobby",{username,lobbyID,lobbyData})
    }

    function gotoChangeTeamsManually(){
        navigation.navigate("ChangeTeamsManually",{username,lobbyID,lobbyData})
    }

    function fromStars2NewRange(maxRange,value){
        let new_value = 0;
        if (value > maxRange){
            new_value = maxRange;
        }else if(value >= 0){
            let oldRange =  5;
            let newRange = maxRange;
            new_value = (((value) * newRange)/oldRange);
        }

        return new_value;
    }

    function fromHeigth2Stars(height){
        const heigthRange = [165,200];
        const starsRange = [0,5];
        let stars = 0;
        if (height > heigthRange[1]){
            stars = 5
        }else if(height >= heigthRange[0]){
            let oldRange =  heigthRange[1] - heigthRange[0];
            let newRange = starsRange[1] - starsRange[0];
            stars = (((height - heigthRange[0]) * newRange)/oldRange) + starsRange[0];
        }
        
        return stars;
    }

    function fromWeigth2Stars(heigth,weigth){
        let heigth_m = heigth/100;
        const bmi = weigth / (heigth_m^2);
        let stars = 0;

        if(bmi < 16 ){         //severe thinness
            stars = 0;
        }else if(bmi < 17){    //moderate thinness
            stars = 1;
        }else if(bmi <= 18.5){ //mild thinness
            stars = 2.5;
        }else if(bmi <= 25){   //normal
            stars = 5;
        }else if(bmi <= 30){   //overweight
            stars = 3.75;
        }else if(bmi <= 35){   //obese class 1
            stars = 2;
        }else if(bmi <= 40){   //obese class 2
            stars = 1;
        }else{                 //obese class 3
            stars = 0;
        }
        
        return stars;
    }

    function fromLevel2Stars(level){
        return level ? 2 : 5;
    }

    function changeTeamsAutomatically(){


        let groupList = [];

        lobbyData.team_1.map(playerName =>{
            let data = playerName
            groupList.push(data)
        })
    
        lobbyData.team_2.map(playerName =>{
            let data = playerName
            groupList.push(data)
        })

    
        console.log(groupList)

    
    
        let teamsArray = [];
        let teamMembers = [];
       
        if (!dataFetched && !finalTeamFlag){
        let averagePlayersScores = [];
        let playersLevel = [];
        let playersHeigth = [];
        let playersWeigth = [];
        let playersScores = [];
        console.log("---------------------Players---------------------");
        for(let i=0;i<groupList.length;i++){  // for every player get his average ratings,weight,heigth and level
            const myDoc = doc(db, "HHcollection", groupList[i]);
            getDoc(myDoc)
            .then((user)=>{
                let user_data = user.data();
                averagePlayersScores.push(user_data.averageRatings);
                playersLevel.push(user_data.beginner);
                playersHeigth.push(user_data.heigth);
                playersWeigth.push(user_data.weight);
    
                if(i === groupList.length-1){
                    for(let j=0;j<groupList.length;j++){ // calculating score for each player
                        let averageObj = averagePlayersScores[j];
                        let height = playersHeigth[j];
                        let weigth = playersWeigth[j];
                        let level = playersLevel[j];
                        let attack = 0;
                        let defense = 0;
                        
                        if(averageObj === undefined || Object.keys(averageObj).length === 0){
                            attack += fromStars2NewRange(35,fromHeigth2Stars(height)) + fromStars2NewRange(18,fromWeigth2Stars(height,weigth)) + fromStars2NewRange(47,fromLevel2Stars(level)) ;
                            defense += attack;
                        }else{
                            attack += fromStars2NewRange(15,fromHeigth2Stars(height)) + fromStars2NewRange(7,fromWeigth2Stars(height,weigth)) + fromStars2NewRange(20,fromLevel2Stars(level));
                            defense += attack;
                            attack += fromStars2NewRange(14,averageObj.averageThreepoints) + fromStars2NewRange(14,averageObj.averageTwopoints) + fromStars2NewRange(10,averageObj.averageAtheleticism) + fromStars2NewRange(10,averageObj.averageTeam_player) + fromStars2NewRange(10,averageObj.averageOverall_score);
                            defense += fromStars2NewRange(11,averageObj.averageBlocks) + fromStars2NewRange(13,averageObj.averageRebounds) + fromStars2NewRange(10,averageObj.averageAtheleticism) + fromStars2NewRange(10,averageObj.averageOverall_score) + fromStars2NewRange(14,averageObj.averageDefense);
                        }
    
                        console.log("Attack:",attack," Defense:",defense,"->",groupList[j]);
                        let scoreObject = {
                            "name": groupList[j],
                            "attack": attack,
                            "defense": defense
                        };
                        playersScores.push(scoreObject);
                    }
    
                    let scoresBasedOnAttack = [...playersScores];
                    scoresBasedOnAttack.sort((a, b) => {
                        return b.attack - a.attack;
                    }).reverse();
    
                    let scoresBasedOnDefense = [...playersScores];
                    scoresBasedOnDefense.sort((a, b) => {
                        return b.defense - a.defense;
                    }).reverse(); 
    
                    let team_list = [];
                    let num_team_list = [];
                    let team_number;
                    let switch_tactic = true;
                    let player_removed;
                    for(let h=0; h<membersPerTeam;h++){
                        switch_tactic = !switch_tactic;
    
                        if(!switch_tactic){
                            team_number = 1;
                        }else{
                            team_number = 2;
                        }
    
                        for(let k=0; k<2;k++){
                            if(switch_tactic){
                                player_removed = scoresBasedOnDefense.pop();
                                scoresBasedOnAttack = scoresBasedOnAttack.filter(scoreObj => scoreObj.name !== player_removed.name);
                            }else{
                                player_removed = scoresBasedOnAttack.pop();
                                scoresBasedOnDefense = scoresBasedOnDefense.filter(scoreObj => scoreObj.name !== player_removed.name);
                            }
                            team_list.push(player_removed);
                            num_team_list.push(team_number);
                            if(!switch_tactic){
                                team_number++;
                            }else{
                                team_number--;
                            }
                        }
                    }
    
                    let actual_team_list = [];
                    let actual_team_list2 = [];
                    for(let h=1; h<=2;h++){
                        for(let k=0; k<team_list.length;k++){
                            if(h === num_team_list[k]){
                                actual_team_list.push(team_list[k].name);
                                actual_team_list2.push(team_list[k])
                            }
                        }
                    }
    
                    console.log("----------------------Teams----------------------");
                    let teamInfo;
                    let new_team_1;
                    let new_team_2;
                    for(let team_number=1;team_number<=2;team_number++){
                        teamInfo = findTeam2(team_number,actual_team_list2);
                        if (team_number == 1){
                            new_team_1 = teamInfo[0]
                        } else {
                            new_team_2 = teamInfo[0]
                        }
                        console.log(`Team${team_number}`);
                        console.log(teamInfo[0]);
                        console.log(`Attack: ${teamInfo[1]}`);
                        console.log(`Defense: ${teamInfo[2]}`);
                        console.log("------------------------------------");
                    }
                    
                    setFinalTeamFlag(true);
                    setFinalTeam([...actual_team_list]);
                    setDataFetch(true);

                    
                    const new_teams = {team_1 :new_team_1,
                    team_2:new_team_2}
                    lobbyData.team_1 = new_team_1
                    lobbyData.team_2 = new_team_2
                    const myDoc = doc(db, "Games", lobbyID);
                    setDoc(myDoc,new_teams,{merge: true})
                    .then(()=>{
                            Alert.alert("Completed!","Team auto balanced.");
                            navigation.navigate("GameLobby",{username,lobbyID,lobbyData});
                    }).catch((error) =>{
                        console.log(error)
                    });
                }
            }).catch((error) => {
                Alert.alert("","An Error has occured please try again later");
                console.log(error)
            });      
        }}
        
    }


    function findTeam2(teamNumber,teams){
        let teamMember = [];
        let team = 1
        let attack = 0;
        let defense = 0;
        for(let i=1;i<=teams.length;i++){
            if (team === teamNumber){
                teamMember.push(teams[i-1].name);
                attack += teams[i-1].attack;
                defense += teams[i-1].defense;
            }
            if (teamMember.length === membersPerTeam)break;
            if(i % membersPerTeam === 0)team++;
        }
        return [teamMember,attack,defense];
    }

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
           
            <TouchableOpacity style={styles.buttons} onPress={gotoChangeTeamsManually}>
                <Text style={styles.btnsText}>Change teams manually</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttons} onPress={changeTeamsAutomatically}>
                <Text style={styles.btnsText}>Change teams automatically</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({

    btnStyle:{
        width: "5%",
        borderRadius: 40,
        height: 65,
        width: 65,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal:15,
        borderColor:colors.darkRed,
        borderWidth: 2,
    },

    buttons: {
        width: "70%",
        borderRadius: 7,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 30,
        backgroundColor: "white",
        
    },

    btnsText:{
        fontSize:20,
        fontWeight: 'bold',
    },

    btnsView:{
        alignSelf: "center",
        marginTop:"auto",
        marginBottom:"30%",
        flexDirection:"row",
        flexWrap: 'wrap',
        justifyContent:"center",
    },

    container: {
        flex: 1,
        backgroundColor: colors.bgColor,
        alignItems: "center",
        justifyContent: "center",
      },

    // finishBtn:{
    //     width: "40%",
    //     borderRadius: 7,
    //     height: 50,
    //     alignItems: "center",
    //     justifyContent: "center",
    //     marginTop: 20,
    //     marginBottom:10,
    //     backgroundColor: 'white',
    //     borderColor:"black",
    //     borderWidth: 2.5,
    // },

    finishText:{
        fontSize:25,
        fontWeight: 'bold',
        color:'black',
    },

    icons:{
        width:45,
        height:30, 
        marginRight:20,
        marginTop:30,
        marginLeft:20,
    },

    iconView:{
        position: 'absolute',
        top:0,
        alignSelf: "flex-start",
        flexDirection:"row"
    },

    image: {
        flex: 1,
    },

    pageTitle:{
        fontSize:30,
        fontWeight:"bold",
        color:colors.darkRed,
        marginBottom:40,
        textAlign:"center"
    },
   
});