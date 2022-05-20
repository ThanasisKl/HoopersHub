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
import uuid from 'react-native-uuid';
import {doc, getDoc,setDoc} from 'firebase/firestore';
import { useRoute } from '@react-navigation/native';

import { db } from '../../Config'
import { colors } from '../colors';

export default function ShowTournamentTeamsScreen() {
    const route = useRoute();
    const navigation = useNavigation();
    const username = route.params.username;
    const friends_list = route.params.friends_list;
    const groupList = route.params.groupList;
    const tournamentName = route.params.tournamentName;
    const numberOfTeams = parseInt(route.params.selectedValue);
    const membersPerTeam = groupList.length / numberOfTeams;
    const outsiders = route.params.outsiders;
    let manually = route.params.manually;

    const [dataFetched,setDataFetch] = useState(false);
    const [loadingMessage,setLoadingMessage] = useState("Creating Teams...");
    const [finalTeam,setFinalTeam] = useState([]);
    const [tournamentsMembers,setTournamentsMembers] = useState("");
    const [flag,setFlag] = useState(true);

    let teamsArray = [];
    let teamMembers = [];
   
    if (!dataFetched){
    let averagePlayersScores = [];
    let playersLevel = [];
    let playersHeigth = [];
    let playersWeigth = [];
    let playersScores = [];
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
                    let scoreSum = 0;
                    let averageObj = averagePlayersScores[j];
                    let height = playersHeigth[j];
                    let weigth = playersWeigth[j];
                    let level = playersLevel[j];
                    //  --new code--
                    let attack = 0;
                    let defense = 0;
                    // --end new code--
                    
                    if(averageObj === undefined || Object.keys(averageObj).length === 0){
                        //scoreSum += fromHeigth2Stars(height) * 3.5 + fromWeigth2Stars(height,weigth) * 2 + fromLevel2Stars(level) * 4.5;

                        //  --new code--
                        attack += fromStars2NewRange(35,fromHeigth2Stars(height)) + fromStars2NewRange(25,fromWeigth2Stars(height,weigth)) + fromStars2NewRange(40,fromLevel2Stars(level)) ;
                        defense += attack;
                        // --end new code--
                    }else{
                        // //ratings
                        // scoreSum += averageObj.averageBlocks * 0.7 + averageObj.averageDefense * 0.8 + averageObj.averageThreepoints * 1 + averageObj.averageTwopoints * 1 + averageObj.averageRebounds * 0.7 + averageObj.averageAtheleticism * 0.8 + averageObj.averageTeam_player * 0.8 + averageObj.averageOverall_score * 0.7;
                        
                        // //players level (beginner,professional)
                        // scoreSum += fromLevel2Stars(level)*1.6;
                        // //players heigth
                        // scoreSum += fromHeigth2Stars(height) * 1.2;
                        // //player weigth
                        // scoreSum += fromWeigth2Stars(height,weigth) * 0.7;

                        //  --new code--
                        attack += fromStars2NewRange(15,fromHeigth2Stars(height)) + fromStars2NewRange(10,fromWeigth2Stars(height,weigth)) + fromStars2NewRange(17,fromLevel2Stars(level));
                        defense += attack;
                        attack += fromStars2NewRange(14,averageObj.averageThreepoints) + fromStars2NewRange(14,averageObj.averageTwopoints) + fromStars2NewRange(10,averageObj.averageAtheleticism) + fromStars2NewRange(10,averageObj.averageTeam_player) + fromStars2NewRange(10,averageObj.averageOverall_score);
                        defense += fromStars2NewRange(11,averageObj.averageBlocks) + fromStars2NewRange(13,averageObj.averageRebounds) + fromStars2NewRange(10,averageObj.averageAtheleticism) + fromStars2NewRange(10,averageObj.averageOverall_score) + fromStars2NewRange(14,averageObj.averageDefense);
                        // --end new code--
                    }
                    // console.log("score:",scoreSum,"->",groupList[j])
                    // playersScores.push(scoreSum);

                    //  --new code--
                    console.log("Attack:",attack," Defense:",defense,"->",groupList[j]);
                    let scoreObject = {
                        "name": groupList[j],
                        "attack": attack,
                        "defense": defense
                    };
                    playersScores.push(scoreObject);
                    // --end new code--
                }

                //  --new code--
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
                        team_number = numberOfTeams;
                    }

                    for(let k=0; k<numberOfTeams;k++){
                        if(switch_tactic){
                            player_removed = scoresBasedOnDefense.pop().name;
                            scoresBasedOnAttack = scoresBasedOnAttack.filter(scoreObj => scoreObj.name !== player_removed);
                        }else{
                            player_removed = scoresBasedOnAttack.pop().name;
                            scoresBasedOnDefense = scoresBasedOnDefense.filter(scoreObj => scoreObj.name !== player_removed);
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
                for(let h=1; h<=numberOfTeams;h++){
                    for(let k=0; k<team_list.length;k++){
                        if(h === num_team_list[k]){
                            actual_team_list.push(team_list[k])
                        }
                    }
                }
                // console.log("team_list:");
                // console.log(actual_team_list);
                setFinalTeam([...actual_team_list]);
                setDataFetch(true);

                //  --end new code--
               
                // let scoresSum = 0;
                // for (let score in playersScores) {
                //     scoresSum += playersScores[score];
                // }
                // let averagePlayerScore = scoresSum / playersScores.length;  // calculate the average score per player

                // let teamsScores = [];
                // let start = 0;                     //bad players index
                // let end = playersScores.length-1;  //good players index
                // let playersScores2 = [...playersScores]
                // playersScores2.sort();
                // for(let k=0; k<numberOfTeams;k++){
                //     let teamScoreSum = 0;  
                //     teamsScores.push(playersScores2[end]);//add the best player in the team
                //     teamScoreSum += playersScores2[end];
                //     end--;
                //     for(let x=0;x<membersPerTeam-1;x++){
                //         if(teamScoreSum > (x+1) * averagePlayerScore){ //if team score is higher from the average score then take a bad player
                //             teamsScores.push(playersScores2[start]);
                //             teamScoreSum += playersScores2[start];
                //             start++;
                //         }else{                                       //else take a good payer
                //             teamsScores.push(playersScores2[end]);  
                //             teamScoreSum += playersScores2[end];
                //             end--;
                //         }
                //     }
                // }

                // let teams = [];
                // for(let j2 in teamsScores){
                //     for (let j in playersScores){
                //         if (teamsScores[j2] === playersScores[j] && !teams.includes(groupList[j])){
                //             teams.push(groupList[j]);
                //             break;
                //         }
                //     }
                // }
                
                // setFinalTeam([...teams]);
                // setDataFetch(true);
            }
        }).catch((error) => {
            Alert.alert("","An Error has occured please try again later");
            console.log(error)
        });      
    }}

    if(dataFetched && flag){
        for(let i=1;i<=numberOfTeams;i++){
            teamsArray.push(i)
            let memberObj = {
                members: findTeam(i,finalTeam)
            }
            teamMembers.push(memberObj);
        }
        setFlag(false);

        let tournamentsMembers1 = teamsArray.map(team =>{
            return (
                <View key={team}>
                
                     <View style={styles.tournamentView}>
                        <View style={styles.teamView}>
                            <Image style={styles.ballIcons} source={require('../../assets/basket-ball-icon.png')}/>
                            <Text style={styles.teamText}>Team{team}</Text>
                        </View>
                        {getMembers(team)}
                    </View> 
                </View>
            );
        }); 
        setTournamentsMembers(tournamentsMembers1);
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

    function findTeam(teamNumber,teams){
        let teamMember = [];
        let team = 1
        for(let i=1;i<=teams.length;i++){
            if (team === teamNumber)teamMember.push(teams[i-1])
            if (teamMember.length === membersPerTeam)break;
            if(i % membersPerTeam === 0)team++;
        }
        return teamMember;
    }

    function getMembers(team){
        let members= teamMembers[team-1].members.map(member =>{
            return (
                <View key={member} style={{flexDirection:"row"}}>
                    <Text style={styles.memberStyle}>{member}</Text>
                </View>
            );
        });
        return members;
    }

    function getProgram(){
        let program = [];
        let index = 1;
        for(let i=0;i<parseInt(numberOfTeams/2);i++){
            let teamObject = {
                team1: index,
                team2: index+1
            }
            program.push(teamObject);
            index += 2;
        }
        
        if((numberOfTeams % 2) !== 0){
            let teamObject = {
                team1: numberOfTeams,
                team2: null
            }
            program.push(teamObject);
        }

        return program;
    }

    function handleOK(){
        const docID = uuid.v4();
        const myDoc = doc(db, "Tournaments", docID);
       
        let tournamentElements = { 
            "leader":username,
            "tournamentName":tournamentName,
            "history":[],
            "teams": finalTeam,
            "program": getProgram(),
            "currentGame":0,
            "numberofTeamMembers": membersPerTeam,
            "outsiders":[],
            "manually":false,
            "id":docID,
            "gameCounter":1,
            "numberOfTeams":numberOfTeams,
            "teamsOut":[],
        }

        setDoc(myDoc, tournamentElements)
        .then(() => {
            for(let i=0;i<groupList.length;i++){
                
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
            Alert.alert("","Tournament Created Successfully");
            navigation.navigate("FriendlyTournamentMain",{"username":username});
        })
        .catch((error)=>{
            console.log(error)
        });
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
                        <ScrollView>
                            {tournamentsMembers}
                       
                            <View style={styles.btnView}>
                                <TouchableOpacity style={styles.button} onPress={handleSelectTeamsManually}>
                                    <Text style={styles.btnText2}>Select Teams Manually</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={handleOK}>
                                    <Text style={styles.btnText}>OK</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
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

    tournamentView:{
        alignItems: "center",
    },

    teamView:{
        flexDirection:"row",
        alignItems:"center",
        marginBottom:3
        ,marginTop:8,
    },

    ballIcons:{
        width:20,
        height:20,
        marginRight:7,
    },

    teamText :{
        fontSize:28,
        letterSpacing:4,
        fontWeight: "bold",
    },

    memberStyle:{
        fontSize:22,
        color:colors.textColor,
    },
});