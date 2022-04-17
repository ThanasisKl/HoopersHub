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
} from "react-native";

import { colors } from '../screens/colors';

const { width,height } = Dimensions.get("window");

export default function TeamsModal({team1,team2,groupLeaders,toggleModalVisibility,isModalVisible}){

    let team1Members = team1.map(member =>{
        return (
            <View key={member} style={styles.showTeamsView}>
                <Text style={styles.showMember}>{" "+member}</Text>
                {groupLeaders.includes(member) &&
                <Image 
                    style={styles.leaderIcon} 
                    source={require('../assets/crown-icon.png')}
                />}
            </View>
        );
    });

    let team2Members = team2.map(member =>{
        return (
            <View key={member} style={styles.showTeamsView}>
                <Text style={styles.showMember}>{" "+member}</Text>
                {groupLeaders.includes(member) &&
                <Image 
                    style={styles.leaderIcon} 
                    source={require('../assets/crown-icon.png')}
                />}
            </View>
        );
    });
    
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
                    <View style={styles.membersView}>
                        <ScrollView>
                            <Text style={styles.teamsTitle}>Team 1</Text>
                            {team1Members}
                            <Text style={styles.teamsTitle}>Team 2</Text>
                            {team2Members}
                        </ScrollView>
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
        height:height*0.8,
        width: width * 0.8,
        backgroundColor: "#fff",
        borderRadius: 7,
    },

    membersView:{
        marginLeft:10,
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