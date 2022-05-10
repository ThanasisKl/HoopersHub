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
    const numberOfTeams = parseInt(route.params.selectedValue);
    const membersPerTeam = groupList.length / numberOfTeams;
    const outsiders = route.params.outsiders;
    let manually = route.params.manually;

    const [dataFetched,setDataFetch] = useState(false);
    const [loadingMessage,setLoadingMessage] = useState("Getting Players Scores From Database...");

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
    
    // const [teamsArray,setTeamsArray] = useState([]);
    // const [teamMembers,setTeamMembers] = useState([]);
    teamsArray = [];
    teamMembers= [];
    if (!dataFetched){
    let averagePlayersScores = [];
    let playersLevel = [];
    let playersHeigth = [];
    let playersWeigth = [];
    let playersScores = [];
    for(let i=0;i<groupList.length;i++){
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
                    
                    if(averageObj === undefined || Object.keys(averageObj).length === 0){
                        scoreSum += fromHeigth2Stars(height) * 3.5 + fromWeigth2Stars(height,weigth) * 2 + fromLevel2Stars(level) * 4.5;
                        //console.log(groupList[i],scoresSum)
                    }else{
                        //ratings
                        scoreSum += averageObj.averageBlocks * 0.7 + averageObj.averageDefense * 0.8 + averageObj.averageThreepoints * 1 + averageObj.averageTwopoints * 1 + averageObj.averageRebounds * 0.7 + averageObj.averageAtheleticism * 0.8 + averageObj.averageTeam_player * 0.8 + averageObj.averageOverall_score * 0.7;
                        
                        //players level (beginner,professional)
                        scoreSum += fromLevel2Stars(level)*1.6;
                        //players heigth
                        scoreSum += fromHeigth2Stars(height) * 1.2;
                        //player weigth
                        scoreSum += fromWeigth2Stars(height,weigth) * 0.7;
                    }
                    console.log("score:",scoreSum,"->",groupList[j])
                    playersScores.push(scoreSum);
                }
               
                let scoresSum = 0;
                for (let score in playersScores) {
                    scoresSum += playersScores[score];
                }
                let averagePlayerScore = scoresSum / playersScores.length;

                let teamsScores = [];
                let start = 0;
                let end = playersScores.length-1;
                let playersScores2 = [...playersScores]
                playersScores2.sort();
                for(let k=0; k<numberOfTeams;k++){
                    let teamScoreSum = 0;
                    teamsScores.push(playersScores2[end]);
                    teamScoreSum += playersScores2[end];
                    end--;
                    for(let x=0;x<membersPerTeam-1;x++){
                        if(teamScoreSum > (x+1) * averagePlayerScore){
                            teamsScores.push(playersScores2[start]);
                            teamScoreSum += playersScores2[start];
                            start++;
                        }else{
                            teamsScores.push(playersScores2[end]);
                            teamScoreSum += playersScores2[end];
                            end--;
                        }
                    }
                }

                let teams = [];
                for(let j2 in teamsScores){
                    for (let j in playersScores){
                        if (teamsScores[j2] === playersScores[j] && !teams.includes(groupList[j])){
                            teams.push(groupList[j]);
                            break;
                        }
                    }
                }
                console.log(teams)
                // let teamsArrayTemp = [];
                // let teamMembersTempt = [];
                for(let i=1;i<=numberOfTeams;i++){
                    teamsArray.push(i)
                    let memberObj = {
                        members: findTeam(i,teams)
                    }
                    teamMembers.push(memberObj);
                }
                // setTeamsArray([...teamsArrayTemp]);
                // setTeamMembers([...teamMembersTempt]);

                // numberTitle = ([...teamsArray]);
                // memberS = ([...teamMembers]);

                setDataFetch(true);
            }
        }).catch((error) => {
            Alert.alert("","An Error has occured please try again later");
            console.log(error)
        });      
    }}

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

    const [tournamentsMembers,setTournamentsMembers] = useState("");
    const [flag,setFlag] = useState(true);
    if(dataFetched && flag){
        setFlag(false);
        console.log("in")
        console.log(teamsArray);
        let tournamentsMembers1 = teamsArray.map(team =>{
            return (
                <View key={team}>
                
                     <View style={styles.tournamentView}>
                        <View style={styles.teamView}>
                            <Image style={styles.ballIcons} source={require('../../assets/basket-ball-icon.png')}/>
                            <Text style={[styles.tournamentText,{color : teamsOut.includes(team) ? "red" : "white",textDecorationLine: teamsOut.includes(team) ? "line-through" : "none" }]}>Team{team}</Text>
                        </View>
                        {getMembers(team)}
                    </View> 
                    <Text style={{fontSize:30}}>LOLOL</Text>
                </View>
            );
        }); 
        setTournamentsMembers(tournamentsMembers1);
    }

    // console.log(tournamentsMembers)

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