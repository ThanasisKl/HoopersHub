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

export default function ShowGroupStatisticsModal({isModalVisible,toggleModalVisibility,team1wins,team2wins,numberOfgames}){
    let team1Rate,team2Rate,drawRate;
    if(numberOfgames!==0){
        team1Rate = ((team1wins/numberOfgames)*100).toFixed(2);
        team2Rate = ((team2wins/numberOfgames)*100).toFixed(2);
        drawRate = (((numberOfgames - team1wins - team2wins)/numberOfgames)*100).toFixed(2);
    }

    return (
        <Modal animationType="slide" 
            transparent visible={isModalVisible} 
            presentationStyle="overFullScreen" 
            onDismiss={toggleModalVisibility}
        >
            <View style={styles.viewWrapper}>
                <View style={styles.modalView}>
                    <View style={styles.xView}>
                        <TouchableOpacity onPress={toggleModalVisibility}>
                            <Image 
                                style={styles.xicon} 
                                source={require('../assets/x.png')}
                            />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={styles.textStyle}>Overall Score: 
                            <Text style={[{color:colors.bgColor}]}> {team1wins} - {team2wins} {team1wins>team2wins ? "(team1 on the lead)" : team1wins<team2wins ? "(team2 on the lead)" :"" }</Text>
                        </Text>
                        <Text style={styles.textStyle}>Team1 Win Rate: <Text style={[{color:colors.bgColor}]}>{team1Rate}{numberOfgames!==0 && "%"}</Text></Text>
                        <Text style={styles.textStyle}>Team2 Win Rate: <Text style={[{color:colors.bgColor}]}>{team2Rate}{numberOfgames!==0 && "%"}</Text></Text>
                        <Text style={styles.textStyle}>Draw Rate: <Text style={[{color:colors.bgColor}]}>{drawRate}{numberOfgames!==0 && "%"}</Text></Text>
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
        alignItems: "flex-start",
        justifyContent: "flex-start",
        position: "absolute",
        top: "15%",
        left: "50%",
        elevation: 5,
        transform: [{ translateX: -(width * 0.4) }, 
                    { translateY: -90 }],
        height:220,
        width: width * 0.85,
        backgroundColor: "#fff",
        borderRadius: 7,
    },

    xicon:{
        width:20,
        height:20, 
        marginRight:10,
    },

    textStyle:{
        fontSize:20,
        fontWeight: 'bold',
        color:colors.textColor,
        marginBottom:10,
        marginLeft:10,
    },

 });