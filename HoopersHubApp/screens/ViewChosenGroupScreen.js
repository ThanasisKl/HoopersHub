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

import { db } from '../Config'
import { colors } from './colors';
import TeamsModal from "../components/TeamsModal";

const { width,height } = Dimensions.get("window");

export default function ViewChosenGroupScreen() {
    const route = useRoute();
    const navigation = useNavigation();
    const username = route.params.username;
    const groupInfo = route.params.groupInfo;
    const groupID = route.params.groupID;
    const scores = groupInfo.scores
    const groupName = groupInfo.name;
    const groupLeaders = groupInfo.leader;
    const team1 = groupInfo.team1;
    const team2 = groupInfo.team2;
    const [isModalVisible, setModalVisible] = useState(false);
    const [isScoreModalVisible, setScoreModalVisible] = useState(false);
    const [inputScore1,setInputScore1] = useState(-1);
    const [inputScore2,setInputScore2] = useState(-1);


    function toggleModalVisibility(){
        setModalVisible(!isModalVisible);
    }

    function toggleScoreModalVisibility(){
        setScoreModalVisible(!isScoreModalVisible);
    }
   
    function addScore(score1,score2){
        const myDoc = doc(db, "Groups", groupID);

        const newScore = {
            'team1Score':score1,
            'team2Score':score2,
        }

        const scoreObject = {
            scores: [...scores,newScore]
        };

        setDoc(myDoc, scoreObject, { merge: true })
        .then(() => {
            Alert.alert("","Score Added Successfully!");
        })
        .catch((error) => {
            Alert.alert("","An Error has occured please try again later (error code: 2)");
        })
    }

    let groupScores = scores.map(score =>{
        return (
            <View key={score} style={styles.scoreView}>
                <Text style={styles.scoresText}>
                    <Text style={{color: score.team1Score >= score.team2Score ? "green" :  "red"}}>Team1</Text> {score.team1Score}-{score.team2Score} 
                    <Text style={{color: score.team1Score > score.team2Score ? "red" :  "green"}}> Team2</Text> 
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
                <Modal animationType="slide" 
                    transparent visible={isScoreModalVisible} 
                    presentationStyle="overFullScreen" 
                    onDismiss={toggleScoreModalVisibility}
                >
                    <View style={styles.viewWrapper}>
                        <View style={styles.modalView}>
                            <View style={styles.xView}>
                                <TouchableOpacity onPress={toggleScoreModalVisibility}>
                                    <Image 
                                        style={styles.xicon} 
                                        source={require('../assets/x.png')}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.membersView}>
                                <Text>Team1</Text>
                                <TextInput
                                    style={styles.textInput} 
                                    onChangeText={(value) => setInputScore1(value)}
                                    keyboardType='numeric'
                                    maxLength={3}  
                                />
                                <Text> - </Text>
                                <TextInput
                                    style={styles.textInput} 
                                    onChangeText={(value) => setInputScore2(value)}
                                    keyboardType='numeric'
                                    maxLength={3} 
                                />
                                <Text>Team2</Text>
                            </View>
                        </View>
                    </View>
                </Modal>
                
                <View style={styles.headerView}>
                    <TouchableOpacity>
                        <Image 
                            style={styles.icons} 
                            source={require('../assets/back-icon.png')}
                        />
                    </TouchableOpacity>

                    <View style={styles.rigthIconsView}>
                        <TouchableOpacity onPress={toggleScoreModalVisibility}>
                            <Image 
                                style={styles.icons2} 
                                source={require('../assets/add_icon.png')}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Image 
                                style={styles.icons2} 
                                source={require('../assets/settings-icon.png')}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={toggleModalVisibility}>
                            <Image 
                                style={styles.icons2} 
                                source={require('../assets/team-icon.png')}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <ScrollView>
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
        fontFamily:'monospace',
        color:'white',
        marginRight:30,
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
        fontFamily:'monospace',
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
    
    //---

    textInput: {
        width: 50,
        height:50,
        borderRadius: 5,
        borderColor: "rgba(0, 0, 0, 0.2)",
        borderWidth: 1,
        marginBottom: 8,
        textAlign:'center'
    },

    xView:{
        alignSelf:"flex-end",
        marginTop:5,
    },

    viewWrapper: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.2)",
    },

    modalView: {
        alignItems: "center",
        justifyContent: "flex-start",
        position: "absolute",
        top: "15%",
        left: "50%",
        elevation: 5,
        transform: [{ translateX: -(width * 0.4) }, 
                    { translateY: -90 }],
        height:200,
        width: width * 0.8,
        backgroundColor: "#fff",
        borderRadius: 7,
    },

    membersView:{
        marginLeft:10,
        flexDirection:"row",
        alignItems: "center",
        justifyContent: "center",
    },

    teamsTitle:{
        fontSize:25,
        color:'black',
        fontWeight:'bold',
        marginTop:10,
    },

    xicon:{
        width:20,
        height:20, 
        marginRight:10,
    },

    showMember:{
        fontSize:20,
        fontFamily:'monospace',
        color:colors.bgColor,
    },

    showTeamsView:{
        flexDirection:'row',
        justifyContent:'space-between',
    },

    leaderIcon:{
        width:20,
        height:20, 
        marginTop :4,
    },
});