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

import { db } from '../Config'
import { colors } from './colors';

export default function GroupSettingsScreen() {
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
    const friends = ['thanasis2','thanasis3'];

    const myDoc = doc(db, "Groups", groupID);
    const myDoc2 = doc(db, "HHcollection", username);

    const [showMembers,setShowMembers] = useState(false);
    const [showFriends,setShowFriends] = useState(false);

    function gotoViewChosenGroupScreen(){
        navigation.navigate("ViewChosenGroup",{username,groupList,groupsIDS,groupInfo,groupID});
    }

    function handleAddMember(){

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
                <TouchableOpacity style={styles.addBtn}>
                    <Text  style={styles.btnText}>ADD</Text>
                </TouchableOpacity>
            </View>
        );
    });
    
    return (
        <View style={styles.container}>
            <View style={styles.container2}>
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
                    <TouchableOpacity style={styles.leaveBtn} onPress={() => setShowFriends(!showFriends)}>
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
                    <TouchableOpacity style={styles.leaveBtn} onPress={()=>setShowMembers(!showMembers)}>
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
});