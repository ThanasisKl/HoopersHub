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

export default function ScoreModal({isScoreModalVisible,toggleScoreModalVisibility,addScore}){

    const [inputScore1,setInputScore1] = useState(-1);
    const [inputScore2,setInputScore2] = useState(-1);
    const [showWarning,setShowWarning] = useState(false);

    function checkInputScore(){
        if(!isNaN(inputScore1) && !isNaN(inputScore2)){
            addScore(parseInt(inputScore1),parseInt(inputScore2));
        }else if(inputScore1 !== -1 && inputScore2 !== -1){
            setShowWarning(true);
        }
    }

    function closeScoreModal(){
        setShowWarning(false);
        toggleScoreModalVisibility();
    }

    return (
        <Modal animationType="slide" 
            transparent visible={isScoreModalVisible} 
            presentationStyle="overFullScreen" 
            onDismiss={toggleScoreModalVisibility}
        >
            <View style={styles.viewWrapper}>
                <View style={styles.modalView}>
                    <View style={styles.xView}>
                        <TouchableOpacity onPress={closeScoreModal}>
                            <Image 
                                style={styles.xicon} 
                                source={require('../assets/x.png')}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.scoreView}>
                        <Text style={styles.textScore}>Team1</Text>
                        <TextInput
                            style={styles.textInput} 
                            onChangeText={(value) => setInputScore1(value)}
                            keyboardType='numeric'
                            maxLength={3}  
                        />
                        <Text style={styles.textScore}> - </Text>
                        <TextInput
                            style={styles.textInput} 
                            onChangeText={(value) => setInputScore2(value)}
                            keyboardType='numeric'
                            maxLength={3} 
                        />
                        <Text style={styles.textScore}>Team2</Text>
                    </View>
                    <TouchableOpacity style={styles.buttons} onPress={checkInputScore}>
                        <Text style={styles.btnsText}>Add Score</Text>   
                    </TouchableOpacity>
                    {showWarning && <Text style={styles.warningStyle}>Please give numbers as input for score</Text>}
                </View>
            </View>
        </Modal>
    );
 }

 const styles = StyleSheet.create({

    textInput: {
        width: 50,
        height:50,
        borderRadius: 5,
        borderColor: "rgba(0, 0, 0, 0.2)",
        borderWidth: 1,
        marginBottom: 8,
        textAlign:'center',
        fontSize:20,
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
        width: width * 0.85,
        backgroundColor: "#fff",
        borderRadius: 7,
    },

    textScore:{
        fontSize:20,
        fontWeight:'bold',
        marginBottom:10,
        marginHorizontal:5.,
    },

    scoreView:{
        marginLeft:10,
        flexDirection:"row",
        alignItems: "center",
        justifyContent: "center",
    },

    xicon:{
        width:20,
        height:20, 
        marginRight:10,
    },

    buttons: {
        width: "40%",
        borderRadius: 7,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        marginBottom:10,
        backgroundColor: colors.bgColor,
    },

    btnsText:{
        fontSize:20,
        fontWeight: 'bold',
        color:'white',
    },

    warningStyle:{
        color:"red",
        textAlign:"center",
    }

 });