import React, {useState} from 'react';
import { useNavigation } from '@react-navigation/core'
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Alert,
    ScrollView,
    Modal,
    Dimensions,
    TextInput,
} from "react-native";
import {doc, getDoc,setDoc} from 'firebase/firestore';
import { useRoute } from '@react-navigation/native';

import { db } from '../../Config'
import { colors } from '../colors';
import TeamsModal from "../../components/TeamsModal";
import ScoreModal from "../../components/ScoreModal";
import ShowGroupStatisticsModal from "../../components/ShowGroupStatisticsModal";

export default function ViewChosenGroupScreen() {
    const route = useRoute();
    const navigation = useNavigation();
    const username = route.params.username;
    const groupsNames = route.params.groupList
    const groupsIDs = route.params.groupsIDS
    const groupInfo = route.params.groupInfo;
    const groupID = route.params.groupID;
    const allScores = groupInfo.scores
    const groupName = groupInfo.name;
    const groupMembers = groupInfo.group;
    const groupLeaders = groupInfo.leader;
    const team1 = groupInfo.team1;
    const team2 = groupInfo.team2;
    const [isModalVisible, setModalVisible] = useState(false);
    const [isScoreModalVisible, setScoreModalVisible] = useState(false);
    const [isStatisticsModalVisible, setStatisticsModalVisible] = useState(false);

    const scoresInScreen = 20;

    let team1wins = 0;
    let team2wins = 0;
    let numberOfgames = 0;
    for(let i=0;i<allScores.length;i++){
        numberOfgames += 1;
        if(allScores[i].team1Score > allScores[i].team2Score)team1wins++;
        else if(allScores[i].team1Score < allScores[i].team2Score) team2wins++;
    }
 
    const reverseAllScores = [...allScores].reverse();
    let loops = reverseAllScores.length > scoresInScreen ? scoresInScreen : reverseAllScores.length;
    let screenScores = [];
    for(let i=0;i<loops;i++){
        screenScores.push(reverseAllScores[i])
    }

    function toggleModalVisibility(){
        setModalVisible(!isModalVisible);
    }

    function toggleStatisticsModalVisibility(){
        setStatisticsModalVisible(!isStatisticsModalVisible)
    }

    function gotoGroupSettings(){
        const myDoc = doc(db, "HHcollection", username);
        getDoc(myDoc)
        .then((user)=>{
            let userFriends = user.data().friends;
            navigation.navigate("GroupSettings",{username,groupLeaders,team1,team2,groupID,groupMembers,groupsNames,groupsIDs,groupInfo,userFriends});navigation.navigate("GroupSettings",{username,groupLeaders,team1,team2,groupID,groupMembers,groupsNames,groupsIDs,groupInfo,userFriends});
        }).catch((error)=>{
            Alert.alert("","An Error has occured please try again later (error code: 2)");
        });
    }

    function gotoViewGroupsScreen(){
        navigation.navigate("ViewGroups",{username,groupsNames,groupsIDs});
    }

    function toggleScoreModalVisibility(){
        setScoreModalVisible(!isScoreModalVisible);
    }

    function handleAddScore(){
        if(groupLeaders.includes(username))toggleScoreModalVisibility();
        else Alert.alert("You can't add a score","Only team leaders can add a score!");
    }
   
    function addScore(score1,score2){
        const myDoc = doc(db, "Groups", groupID);

        const newScore = {
            'team1Score':score1,
            'team2Score':score2,
        }

        const scoreObject = {
            scores: [...allScores,newScore]
        };

        setDoc(myDoc, scoreObject, { merge: true })
        .then(() => {
            toggleScoreModalVisibility();
            navigation.navigate("ViewGroups",{username,groupsNames,groupsIDs});
            Alert.alert("","Score Added Successfully!");
        })
        .catch((error) => {
            Alert.alert("","An Error has occured please try again later (error code: 2)");
        })
    }

    let groupScores = screenScores.map((score,i) =>{
        return (
            <View key={i} style={styles.scoreView}>
                <Text style={styles.scoresText}>
                    <Text style={{color: score.team1Score > score.team2Score ? "green" : score.team1Score == score.team2Score ? "yellow" : "red"}}>Team1</Text> {score.team1Score}-{score.team2Score} 
                    <Text style={{color: score.team1Score > score.team2Score ? "red" : score.team1Score == score.team2Score ? "yellow" :  "green"}}> Team2</Text> 
                </Text>
            </View>
        );
    });

    return (
        <View style={styles.container}>
            <View style={styles.container2}>
                <TeamsModal 
                    team1={team1} 
                    team2={team2} 
                    groupLeaders={groupLeaders} 
                    toggleModalVisibility={toggleModalVisibility} 
                    isModalVisible={isModalVisible} 
                />

                <ScoreModal 
                    toggleScoreModalVisibility={toggleScoreModalVisibility} 
                    isScoreModalVisible={isScoreModalVisible}
                    addScore={addScore}
                    flag={false}
                />

                <ShowGroupStatisticsModal
                    toggleModalVisibility={toggleStatisticsModalVisibility} 
                    isModalVisible={isStatisticsModalVisible}
                    team1wins={team1wins}
                    team2wins={team2wins}
                    numberOfgames={numberOfgames}
                />
                
                <View style={styles.headerView}>
                    <TouchableOpacity onPress={gotoViewGroupsScreen}>
                        <Image 
                            style={styles.icons} 
                            source={require('../../assets/back-icon.png')}
                        />
                    </TouchableOpacity>

                    <View style={styles.rigthIconsView}>
                        <TouchableOpacity onPress={handleAddScore}>
                            <Image 
                                style={styles.icons2} 
                                source={require('../../assets/add_icon.png')}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={toggleStatisticsModalVisibility}>
                            <Image 
                                style={styles.icons2} 
                                source={require('../../assets/statistics-icon.png')}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={toggleModalVisibility}>
                            <Image 
                                style={styles.icons2} 
                                source={require('../../assets/team-icon.png')}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={gotoGroupSettings}>
                            <Image 
                                style={styles.icons2} 
                                source={require('../../assets/settings-icon.png')}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.mainViewStyle}>
                    <ScrollView>
                        <Text style={styles.groupNameStyle}>{groupName}</Text>
                        {groupScores}
                    </ScrollView>
                </View>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    btnsText:{
        fontSize:20,
        fontWeight: 'bold',
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
    },

    groupsView:{
        alignItems: "flex-start",
        flexDirection:'row',
        justifyContent:'space-between',
    },

    headerView:{
        marginBottom:20,
        alignItems:'baseline',
        flexDirection:"row",
    },

    icons:{
        width:45,
        height:30, 
        marginRight:20,
    },
    
    icons2:{
        width:30,
        height:30, 
        marginRight:20,
    },

    groupText:{
        fontSize:25,
        // fontFamily:'monospace',
        color:'white',
        marginRight:30,
    },

    groupNameStyle:{
        fontSize:28,
        // fontFamily:'monospace',
        color:'black',
        fontWeight:'bold',
        textAlign:'center',
        borderColor:colors.bgColor,
        borderBottomColor:colors.textColor,
        borderWidth: 2,
        marginBottom:20,
    },

    mainViewStyle:{
        alignItems: "center",
    },

    rigthIconsView:{
        width:"80%",
        flexDirection:'row',
        justifyContent:'flex-end',
    },

    pageTitle:{
        fontSize:30,
        borderColor:colors.bgColor,
        borderBottomColor:colors.textColor,
        borderWidth: 2,
    },

    scoresText:{
        fontSize:25,
        // fontFamily:'monospace',
        color:'white',  
    },

    scoreView:{
        marginBottom:15,
    },

    viewGroupBtn:{
        borderRadius: 7,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 30,
        backgroundColor: "white",
        paddingHorizontal:20,
        paddingVertical:5,
    },
});