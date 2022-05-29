import React, {useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Modal,
    Image,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    TextInput,
} from "react-native";

import { colors } from '../screens/colors';

const { width,height } = Dimensions.get("window");

export default function TournamentHistoryModal({isHistoryModalVisible,toggleHistoryModalVisibility,history}){

    let historyList = history.map((score,i) =>{
        return (
            <View key={i} style={styles.scoreView}>
                <Text style={styles.scoresText}>
                    <Text style={{color: score.team1Score > score.team2Score ? "green" : score.team1Score == score.team2Score ? "yellow" : "red"}}>{score.team1Name}</Text>  {score.team1Score}-{score.team2Score} 
                    <Text style={{color: score.team1Score > score.team2Score ? "red" : score.team1Score == score.team2Score ? "yellow" :  "green"}}>  {score.team2Name}</Text> 
                </Text>
            </View>
        );
    });

    return (
        <Modal animationType="slide" 
            transparent visible={isHistoryModalVisible} 
            presentationStyle="overFullScreen" 
        >
            <View style={styles.viewWrapper}>
                <View style={styles.modalView}>
                    <View style={styles.xView}>
                        <TouchableOpacity onPress={toggleHistoryModalVisibility}>
                            <Image 
                                style={styles.xicon} 
                                source={require('../assets/x.png')}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.historyView}>
                        <Text style={styles.modalTitle}>Match History</Text>
                        {historyList}
                    </View>
                </View>
            </View>
        </Modal>
    );
 }

 const styles = StyleSheet.create({

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
        height: height * 0.95,
        width: width * 0.85,
        backgroundColor: "#fff",
        borderRadius: 7,
    },

    modalTitle:{
        fontSize:25,
        color:colors.darkRed,
        fontWeight:"bold",
        borderColor:colors.darkRed,
        borderBottomWidth:2,
        marginBottom:10,
    },

    historyView:{
        marginLeft:10,
        alignItems: "center",
        justifyContent: "center",
    },

    scoresText:{
        fontSize:20, 
    },

    scoreView:{
        alignItems: "center",
    },

    xicon:{
        width:20,
        height:20, 
        marginRight:10,
    },
 });