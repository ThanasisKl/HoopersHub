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
} from "react-native";
import {doc, getDoc,setDoc} from 'firebase/firestore';
import { useRoute } from '@react-navigation/native';

import SelectTeamModal from "../components/SelectTeamModal";
import ScoreModal from "../components/ScoreModal";
import { db } from '../Config'
import { colors } from './colors';

export default function GroupSettingsScreen() { //simazema kai inputs scores state
    const route = useRoute();
    const navigation = useNavigation();
    const username = route.params.username;
    const groupLeaders = route.params.groupLeaders;
    const team1 = route.params.team1;
    const team2 = route.params.team2;
    const groupID = route.params.groupID;
    const groupMembers = route.params.groupMembers;
    const groupList = route.params.groupsNames;
    const groupsIDS = route.params.groupsIDs;
    const groupInfo = route.params.groupInfo;
    const friends = route.params.userFriends;

    const myDoc = doc(db, "Groups", groupID);
    const myDoc2 = doc(db, "HHcollection", username);

    const [showMembers,setShowMembers] = useState(false);
    const [showFriends,setShowFriends] = useState(false);
    const [showModal,setShowModal] = useState(false);
    const [showTeams,setShowTeams] = useState(false);
    const [member,setMember] = useState("");
    const [isScoreModalVisible, setScoreModalVisible] = useState(false);

    function gotoViewChosenGroupScreen(){
        navigation.navigate("ViewChosenGroup",{username,groupList,groupsIDS,groupInfo,groupID});
    }

    function toggleModalVisibility(){
        setShowModal(!showModal);
    }

    function toggleScoreModalVisibility(){
        setScoreModalVisible(!isScoreModalVisible);
    }


    function updateMember(member){
        setMember(member)
        setShowModal(!showModal);
    }

    function addMember(){
        setShowFriends(!showFriends);
        let flag = true;
        for(let i=0;i<friends.length;i++){
            if(!groupMembers.includes(friends[i])){
                flag = false;
            }
        }
        if(flag){
            Alert.alert("","All your Friends are in the group so you can't add someone")
        }
    }


    function addLeader(){
        setShowMembers(!showMembers)
        if(groupLeaders.length === groupMembers.length){
            Alert.alert("","All members are leaders so you can't make a new leader");
        }
    }

    function addScore(score1,score2){
        const newScore = {
            'team1Score':score1,
            'team2Score':score2,
        }

        const scoreObject = {
            scores: [...groupInfo.scores,newScore]
        };

        setDoc(myDoc, scoreObject, { merge: true })
        .then(() => {
            toggleScoreModalVisibility();
            let groupsIDs = groupsIDS;
            let groupsNames = groupList;
            navigation.navigate("ViewGroups",{username,groupsNames,groupsIDs});
            Alert.alert("","Latest Score Updated Successfully!");
        })
        .catch((error) => {
            Alert.alert("","An Error has occured please try again later");
        })
    }

    function deleteLatestScore(score1,score2){
        let newScores = [];
        for(let i=0;i<groupInfo.scores.length-1;i++){
            newScores.push(groupInfo.scores[i]);
        }

        const scoreObject = {
            scores: [...newScores]
        };

        setDoc(myDoc, scoreObject, { merge: true })
        .then(() => {
            console.log("Latest Score Deleted");
            groupInfo.scores = newScores;
            addScore(score1,score2);
        })
        .catch((error) => {
            Alert.alert("","An Error has occured please try again later");
        })
    }

    function handleSwitchTeams(member){
        let newTeam1 = [...team1];
        let newTeam2 = [...team2];
        if(team1.includes(member)){
            newTeam2.push(member)
            newTeam1 = newTeam1.filter(uname => uname !== member)
        }else{
            newTeam1.push(member)
            newTeam2 = newTeam2.filter(uname => uname !== member)
        }
        const teamObject = {
            team1:newTeam1,
            team2:newTeam2
        };

        setDoc(myDoc, teamObject, { merge: true })
        .then(() => {
            Alert.alert("","Member Switch Team Successfully");
            groupInfo.team1 = newTeam1;
            groupInfo.team2 = newTeam2;
            navigation.navigate("ViewChosenGroup",{username,groupList,groupsIDS,groupInfo,groupID});
        }).catch((error)=>{
            Alert.alert("","An Error has occured please try again later");
        });
    }


    function handleAddMember(team){
        const newMember = member;
        const myDoc3 = doc(db, "HHcollection", newMember);
        let groupObject;
        if(team === "team1"){
            groupObject = {
                group:[...groupMembers,newMember],
                team1:[...team1,newMember],
            };
        }else{
            groupObject = {
                group:[...groupMembers,newMember],
                team2:[...team2,newMember],
            };
        }

        setDoc(myDoc, groupObject, { merge: true })
        .then(() => {
            getDoc(myDoc3)
            .then((user)=>{
                let user_groups = user.data().groups;
                let newUserGroups = [...user_groups,groupID]
                
                const groupsObject = {
                    groups:newUserGroups,
                }

                setDoc(myDoc3, groupsObject, { merge: true })
                .then(() => {
                    Alert.alert("","You added a new group member successfully");
                    groupInfo.group =  [...groupMembers,newMember];
                    if(team === "team1")groupInfo.team1 =  [...team1,newMember];
                    else groupInfo.team2 =  [...team2,newMember];
                    navigation.navigate("ViewChosenGroup",{username,groupList,groupsIDS,groupInfo,groupID});
                }).catch((error)=>{
                    Alert.alert("","An Error has occured please try again later");
                });
            }).catch((error)=>{
                Alert.alert("","An Error has occured please try again later");
            });
        }).catch((error)=>{
            Alert.alert("","An Error has occured please try again later");
        });
    }

    function handleAddNewLeader(newLeader){
        Alert.alert("Warning",`Are you sure you want to make ${newLeader} a new leader?`,
            [{text: "Yes" , onPress: () => addNewLeader(newLeader)},
            { text: "No"}]
        );
    }

    function addNewLeader(newLeader){
        const newLeaders = [...groupLeaders,newLeader];
        const leaderObject = {
            leader:newLeaders,
        };

        setDoc(myDoc, leaderObject, { merge: true })
        .then(() => {
            Alert.alert("","New leader added successfully");
            groupInfo.leader = [...newLeaders];
            navigation.navigate("ViewChosenGroup",{username,groupList,groupsIDS,groupInfo,groupID});
        }).catch((error)=>{
            Alert.alert("","An Error has occured please try again later");
        });
    }


    function handleLeaveGroup(){
        if(groupLeaders.length === 1 && groupLeaders.includes(username)){
            Alert.alert("Warning","You are the only leader in this group. If you want to leave, first you have to make another member a leader and then you can leave the group.");
        }else{
            Alert.alert("Warning",`Are you sure you want to leave ${groupInfo.name}`,
                [{text: "Yes" , onPress: leaveGroup},
                { text: "No"}]
            );
        }
    }

    function leaveGroup(){
        let newGroup = groupMembers.filter(uname => uname !== username);
        let newTeam1 = team1.filter(uname => uname !== username);
        let newTeam2 = team2.filter(uname => uname !== username);
        let newLeaders = groupLeaders.filter(uname => uname !== username);

        const groupObject = {
            group:newGroup,
            leader:newLeaders,
            team1:newTeam1,
            team2:newTeam2,
        };

        setDoc(myDoc, groupObject, { merge: true })
        .then(() => {
            getDoc(myDoc2)
            .then((user)=>{
                let user_groups = user.data().groups;
                let newUserGroups = user_groups.filter(group_id => group_id !== groupID);
                const groupsObject = {
                    groups:newUserGroups
                }

                setDoc(myDoc2, groupsObject, { merge: true })
                .then(() => {
                    Alert.alert("","You left the group successfully");
                    navigation.navigate("GroupMain",{username});
                }).catch((error)=>{
                    Alert.alert("","An Error has occured please try again later");
                });
                    
            }).catch((error)=>{
                    Alert.alert("","An Error has occured please try again later (error code: 12)");
            });
        })
        .catch((error) => {
            Alert.alert(error);
        });
    }

    let notLeaders = [];
    for(let i=0;i<groupMembers.length;i++){
        if(!groupLeaders.includes(groupMembers[i]))notLeaders.push(groupMembers[i])
    }

    const notLeaderGroup = notLeaders.map(member=>{
        return (
            <View key={member} style={styles.notLeadersView}>
                <Text style={styles.notLeaderText}>{member}</Text>
                <TouchableOpacity style={styles.addBtn} onPress={() => handleAddNewLeader(member)}>
                    <Text  style={styles.btnText}>ADD</Text>
                </TouchableOpacity>
            </View>
        );
    });

    let friendsNotInGroup = [];
    for(let i=0;i<friends.length;i++){
        if(!groupMembers.includes(friends[i]))friendsNotInGroup.push(friends[i])
    }

    const userFriends = friendsNotInGroup.map(member=>{
        return (
            <View key={member} style={styles.notLeadersView}>
                <Text style={styles.notLeaderText}>{member}</Text>
                <TouchableOpacity style={styles.addBtn} onPress={()=>updateMember(member)}>
                    <Text  style={styles.btnText}>ADD</Text>
                </TouchableOpacity>
            </View>
        );
    });

    const groupUsernames = groupMembers.map(member=>{
        return (
            <View key={member} style={styles.notLeadersView}>
                <Text style={styles.notLeaderText}>{member}<Text style={{fontSize:17}}>{team1.includes(member) ? " (team1)" : " (team2)"}</Text></Text>
                <TouchableOpacity style={styles.addBtn} onPress={() => handleSwitchTeams(member)}>
                    <Text style={styles.btnText}>Switch</Text>
                </TouchableOpacity>
            </View>
        );
    });
    
    return (
        <View style={styles.container}>
            <View style={styles.container2}>
            <SelectTeamModal
                    toggleModalVisibility={toggleModalVisibility} 
                    isModalVisible={showModal} 
                    handleAddMember={handleAddMember}
            />

            <ScoreModal 
                toggleScoreModalVisibility={toggleScoreModalVisibility} 
                isScoreModalVisible={isScoreModalVisible}
                addScore={addScore}
                flag={true}
                deleteLatestScore={deleteLatestScore}
            />

            <View style={styles.headerView}>
                <TouchableOpacity onPress={gotoViewChosenGroupScreen}>
                    <Image 
                        style={styles.icons} 
                        source={require('../assets/back-icon.png')}
                    />
                </TouchableOpacity>
                <Text style={styles.pageTitle}>Settings</Text>
            </View>
                <TouchableOpacity style={styles.leaveBtn} onPress={handleLeaveGroup}>
                    <Text style={styles.leaveText}>Leave Group</Text>
                    <Image 
                        style={styles.icons2} 
                        source={require('../assets/logout-icon.png')}
                    />
                </TouchableOpacity>
                {groupLeaders.includes(username) &&
                <View>
                    <TouchableOpacity style={styles.leaveBtn} onPress={toggleScoreModalVisibility}>
                        <Text style={styles.addText}>Update Latest Score</Text>
                        <Image 
                            style={styles.deleteStyle} 
                            source={require('../assets/update-icon.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.leaveBtn} onPress={addMember}>
                        <Text style={styles.addText}>Add New Member</Text>
                        <Image 
                            style={styles.crownStyle} 
                            source={require('../assets/friend_requests-icon.png')}
                        />
                    </TouchableOpacity>
                    {showFriends&& 
                        <View style={styles.notLeadersStyles}>
                            <ScrollView>{userFriends}</ScrollView>
                        </View>
                    }
                    <TouchableOpacity style={styles.leaveBtn} onPress={() => setShowTeams(!showTeams)}>
                        <Text style={styles.addText}>Change Member's Team</Text>
                        <Image 
                            style={styles.switchStyle} 
                            source={require('../assets/switch-icon.png')}
                        />
                    </TouchableOpacity>
                   
                    {showTeams && 
                        <View style={styles.notLeadersStyles}>
                            <ScrollView>{groupUsernames}</ScrollView>
                        </View>
                    }
                    <TouchableOpacity style={styles.leaveBtn} onPress={addLeader}>
                        <Text style={styles.addText}>Add Leader</Text>
                        <Image 
                            style={styles.crownStyle} 
                            source={require('../assets/crown-icon.png')}
                        />
                    </TouchableOpacity>
                    {showMembers && 
                        <View style={styles.notLeadersStyles}>
                            <ScrollView>{notLeaderGroup}</ScrollView>
                        </View>
                    }
                </View>}
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    addText:{
        color: "black",
        fontSize:25,
        fontWeight:"bold",
        marginLeft:10,
        marginTop:20,
    },

    addBtn:{
        borderRadius: 5,
        backgroundColor: "white",
        justifyContent:'center',        
        alignItems:'center',
        paddingHorizontal:10,
    },

    btnText:{
        fontWeight:'bold',
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

    headerView:{
        marginBottom:20,
        alignItems:'baseline',
        flexDirection:"row",
    },

    leaveText:{
        color: "red",
        fontSize:25,
        fontWeight:"bold",
        marginLeft:10,
    },

    leaveBtn:{
        flexDirection:"row",
        alignItems:'center',
    },

    notLeadersStyles:{
        marginLeft:20,
    },

    notLeaderText:{
        fontSize:22,
        color:"white",
    },

    notLeadersView:{
        flexDirection:'row',
        justifyContent:"space-between",
        marginTop:10,
    },

    pageTitle:{
        fontSize:30,
        borderColor:colors.bgColor,
        borderBottomColor:colors.textColor,
        borderWidth: 2,
    },

    icons:{
        width:45,
        height:30, 
        marginRight:20,
    },

    icons2:{
        width:25,
        height:25, 
        marginLeft:20,
    },

    crownStyle:{
        width:30,
        height:30  , 
        marginLeft:20,
        marginTop:20,
    },

    deleteStyle:{
        width:30,
        height:32, 
        marginLeft:20,
        marginTop:20,
    },

    switchStyle:{
        width:35,
        height:29 , 
        marginLeft:20,
        marginTop:20,
    },
});