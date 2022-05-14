import React, {useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Modal,
    Image,
    TouchableOpacity,
    Dimensions,
} from "react-native";

import { colors } from '../screens/colors';

const { width,height } = Dimensions.get("window");

export default function TrainingResultsModal({isModalVisible,toggleModalVisibility,results,setNewSave}){
    
    let resultsSum = 0;
    for(let i=0; i<results.length; i++){
        resultsSum += results[i];
    }

    let trainingLVL;
    if(resultsSum <= 5){
        trainingLVL = ["Beginner","grey"];
    }else if(resultsSum <= 10){
        trainingLVL = ["Normal","#6f6f6f"];
    }else if(resultsSum <= 14){
        trainingLVL = ["Rising Star","green"];
    }else if(resultsSum <= 17){
        trainingLVL = ["Professional","purple"];
    }else{
       trainingLVL = ["Legend","#015dad"];
    }

    function closeModal(){
        toggleModalVisibility(!isModalVisible);
    }

    const handleSave = () => {
        toggleModalVisibility();
        setNewSave(true);
    }

    return (
        <Modal animationType="slide" 
            transparent visible={isModalVisible} 
            presentationStyle="overFullScreen" 
        >
            <View style={styles.viewWrapper}>
                <View style={styles.modalView}>
                    <View style={styles.xView}>
                        <TouchableOpacity onPress={closeModal}>
                            <Image 
                                style={styles.xicon} 
                                source={require('../assets/x.png')}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.mainView}>
                        <Text style={styles.shots}>Shots: {resultsSum}/21</Text>
                        <Text  style={{fontSize:20,color:trainingLVL[1],fontWeight:"bold"}}>{trainingLVL[0]}</Text>
                    </View>
                    <TouchableOpacity style={styles.buttons} onPress={handleSave} >
                        <Text style={styles.btnsText}>SAVE</Text>   
                    </TouchableOpacity>
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
        height:200,
        width: width * 0.85,
        backgroundColor: "#fff",
        borderRadius: 7,
    },

    mainView:{
        marginLeft:10,
        alignItems: "center",
        justifyContent: "center",
    },

    xicon:{
        width:20,
        height:20, 
        marginRight:10,
    },

    buttons: {
        width: "30%",
        borderRadius: 7,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        marginBottom:10,
        backgroundColor: colors.darkRed,
    },

    btnsText:{
        fontSize:20,
        fontWeight: 'bold',
        color:'white',
    },

    shots:{
        fontSize:24,
        fontWeight:"bold",
    },
});