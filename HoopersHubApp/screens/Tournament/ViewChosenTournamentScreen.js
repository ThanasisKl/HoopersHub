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
import ConfettiCannon from 'react-native-confetti-cannon';

import { db } from '../../Config'
import { colors } from '../colors';
import ScoreModal from "../../components/ScoreModal";
import TeamsModal from '../../components/TeamsModal';
import TournamentHistoryModal from '../../components/TournamentHistoryModal';



export default function ViewChosenTournamentScreen() {
    const route = useRoute();
    const navigation = useNavigation();
    const username = route.params.username;
    const tournamentInfo = route.params.tournamentInfo;
    const tournamentIDS = route.params.tournamentIDS;
    const tournamentNames = route.params.tournamentNames;
    const gameCounter = tournamentInfo.gameCounter;
    const program = tournamentInfo.program;
    const currentGame = tournamentInfo.currentGame;
    const history = tournamentInfo.history;
    const tournamentID = tournamentInfo.id;
    const teams = tournamentInfo.teams;
    const leader = tournamentInfo.leader;
    const numberofTeamMembers = tournamentInfo.numberofTeamMembers;
    const teamsOut = tournamentInfo.teamsOut;
    const team1Name = `Team${program[currentGame].team1}`;
    const team2Name = `Team${program[currentGame].team2}`;
    const team1Members = findTeam(program[currentGame].team1);
    const team2Members = findTeam(program[currentGame].team2);
    const tournamentFinished = program.length === 1 && program[0].team2 === null;

    const [isScoreModalVisible, setScoreModalVisible] = useState(false);
    const [isHistoryModalVisible, setHistoryModalVisible] = useState(false);
    const [is2TeamsModalVisible, set2TeamsModalVisible] = useState(false);
    const [confettiTime,setConfettiTime] = useState(false);

    let [flag,setFlag] = useState(true);
    if(tournamentFinished && flag){
        setFlag(false);
        setConfettiTime(true);

        setTimeout(() => {
            setConfettiTime(false)
        },5000)
    };

    function toggleScoreModalVisibility(){
        setScoreModalVisible(!isScoreModalVisible);
    }

    function toggleHistoryModalVisibility(){
        setHistoryModalVisible(!isHistoryModalVisible);
    }

    function toggle2TeamsModalVisibility(){
        set2TeamsModalVisible(!is2TeamsModalVisible)
    }

    function handleAddScore(){
        if (leader  === username)toggleScoreModalVisibility();
        else Alert.alert("Warning","Only a leader can add a new score");
    }

    function findTeam(teamNumber){
        let teamMember = [];
        let team = 1
        for(let i=1;i<=teams.length;i++){
            if (team === teamNumber)teamMember.push(teams[i-1])
            if (teamMember.length === numberofTeamMembers)break;
            if(i % numberofTeamMembers === 0)team++;
        }
        return teamMember;
    }


    function addScore(score1,score2){
        const myDoc = doc(db, "Tournaments", tournamentID);

        const newScore = {
            'team1Name': team1Name,
            'team2Name': team2Name,
            'team1Score': score1,
            'team2Score': score2,
        }

        const team1Number = program[currentGame].team1
        const team2Number = program[currentGame].team2

        let loserTeam = team1Number ;
        if(score1 > score2){
            loserTeam = team2Number;
        }

        let winnerTeam = team1Number;
        if(score1 < score2){
            winnerTeam =  team2Number;
        }

        let newProgram = program;
        newProgram.reverse().pop();
        newProgram.reverse();

        const programObject = {
            'team1':winnerTeam,
            'team2':null
        };
        newProgram.push(programObject);

        let nullcounter = 0;
        for(let i=0;i<newProgram.length;i++){
            if(newProgram[i].team2 === null)nullcounter++
        }

        if(nullcounter === 2){
            let nullteams = [];
            for(let i=0;i<newProgram.length;i++){
                if(program[i].team2 === null){
                    nullteams.push(program[i].team1);
                }
            }
            program.pop();
            program.pop();

            const newProgramElement = {
                'team1':nullteams[0],
                'team2':nullteams[1],
            };
            newProgram.push(newProgramElement);
        }

        const tournamentObject = {
            history: [...history,newScore],
            gameCounter: gameCounter+1,
            teamsOut: [...teamsOut,loserTeam],
            program: newProgram
        };

        setDoc(myDoc, tournamentObject, { merge: true })
        .then(() => {
            toggleScoreModalVisibility();
            navigation.navigate("ViewTournaments",{username,tournamentIDS,tournamentNames});
            Alert.alert("","Score Added Successfully!");
        })
        .catch((error) => {
            Alert.alert("","An Error has occured please try again later (error code: 2)");
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.container2}>
                <ScoreModal 
                    toggleScoreModalVisibility={toggleScoreModalVisibility} 
                    isScoreModalVisible={isScoreModalVisible}
                    addScore={addScore}
                    flag={false}
                    team1Name={team1Name}
                    team2Name={team2Name}
                    tournamentFlag={true}
                />

                <TournamentHistoryModal 
                    toggleHistoryModalVisibility={toggleHistoryModalVisibility} 
                    isHistoryModalVisible={isHistoryModalVisible}
                    history={history}
                />

                <TeamsModal 
                    team1={team1Members} 
                    team2={team2Members} 
                    groupLeaders={leader} 
                    toggleModalVisibility={toggle2TeamsModalVisibility} 
                    isModalVisible={is2TeamsModalVisible} 
                />

                <View style={styles.pageTitleView}>
                    <TouchableOpacity onPress={() => navigation.navigate("ViewTournaments",{username,tournamentIDS,tournamentNames})}>
                        <Image 
                            style={styles.icons} 
                            source={require('../../assets/back-icon.png')}
                        />
                    </TouchableOpacity>

                    <View style={styles.rigthIconsView}>
                        <TouchableOpacity onPress={() => navigation.navigate("ShowTournamentMembers",{username,tournamentIDS,tournamentNames,tournamentInfo})}>
                            <Image 
                                style={styles.icons2} 
                                source={require('../../assets/team-icon.png')}
                            />
                        </TouchableOpacity> 

                        <TouchableOpacity onPress={toggleHistoryModalVisibility}>
                            <Image 
                                style={styles.icons2} 
                                source={require('../../assets/history-icon.png')}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                {!tournamentFinished &&
                    <View style={styles.container3}>
                        <Text style={[styles.gameText,{color: program.length === 1 ? "yellow" : colors.darkRed}]}>{program.length === 1 ? "Final" : "Game " + gameCounter}</Text>
                        <TouchableOpacity onPress={toggle2TeamsModalVisibility}>
                            <Text style={styles.teamsText}>{team1Name} - {team2Name}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={handleAddScore}>
                                <Text style={styles.btnsText}>Add Score</Text>
                        </TouchableOpacity>
                    </View>
                }
                {tournamentFinished &&
                    <View style={styles.container3}>
                        {confettiTime && <ConfettiCannon count={300} origin={{x: -10, y: 0}} fadeOut={true} />}
                        <Text style={[styles.gameText,{color: "yellow",textAlign:"center"}]}>{team1Name} WON!</Text>
                        <Image 
                            style={styles.trophyIcon} 
                            source={require('../../assets/trophy-icon.png')}
                        />
                    </View>
                }
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    button:{
        
        borderRadius: 7,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        paddingHorizontal:55,
        paddingVertical:12,
        marginTop:"auto",
        marginBottom:"30%",
        borderColor:colors.darkRed,
        borderWidth:3,
    },

    btnsText:{
        fontSize:25,
        fontWeight: 'bold',
        color:colors.darkRed,
    },

    container: {
      flex: 1,
      backgroundColor: colors.bgColor,
      alignItems: "center",
      justifyContent: "center",
    },

    container2: {
        marginTop:50,
        marginLeft:10,
        flex:1,
        alignItems: "center",
    },

    container3: {
        marginLeft:10,
        flex:1,
        alignItems: "center",
    },

    gameText:{
        fontWeight:"bold",
        fontSize:35,
        marginTop:"30%",
        letterSpacing:5,
    },

    teamsText:{
        // fontWeight:"bold",
        fontSize:30,
        marginTop:"15%",
        color: "white",
        letterSpacing:6,
        borderBottomWidth:2,
        borderTopWidth:2,
        borderColor:"white",

    },

    trophyIcon:{
        marginTop:"10%",
        width:300,
        height:300,
    },
    
    icons:{
        width:45,
        height:30, 
        marginRight:20,
    },

    icons2:{
        width:35,
        height:35, 
        marginRight:20,
    },
    
    pageTitleView:{
        marginBottom:20,
        alignItems:'baseline',
        flexDirection:"row",
    },

    rigthIconsView:{
        width:"82%",
        flexDirection:'row',
        justifyContent:'flex-end',
    },
});