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
import { set } from 'react-native-reanimated';

import { colors } from '../screens/colors';

const { width,height } = Dimensions.get("window");

export default function ShotsModal({isShotsModalVisible,toggleShotsModalVisibility,btnNumber,results,setResults}){

    const [shotsInTarget,setShotsInTarget] = useState(null);
    const [showWarning,setShowWarning] = useState(false);

    function checkInput(){
        if(!isNaN(shotsInTarget) && parseInt(shotsInTarget) >= 0 && parseInt(shotsInTarget) <= 3){
            setShowWarning(false);
            toggleShotsModalVisibility(0);
            // console.log(results);
            // let newResults = results;
            // newResults[btnNumber-1] = shotsInTarget;
            // setResults([...newResults])
        }else{
            setShowWarning(true);
        }
    }

    function closeScoreModal(){
        setShowWarning(false);
        toggleShotsModalVisibility(0);
    }

    return (
        <Modal animationType="slide" 
            transparent visible={isShotsModalVisible} 
            presentationStyle="overFullScreen" 
            onDismiss={toggleShotsModalVisibility}
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
                    <View style={styles.shotsView}>
                        <Text style={styles.shotNumber}>{btnNumber}</Text>
                        <TextInput
                            style={styles.textInput} 
                            onChangeText={(shots) => setShotsInTarget(shots)}
                            keyboardType='numeric'
                            maxLength={1}  
                        />
                    </View>
                    <TouchableOpacity style={styles.buttons} onPress={checkInput}>
                        <Text style={styles.btnsText}>OK</Text>   
                    </TouchableOpacity>
                    {showWarning && <Text style={styles.warningStyle}>Please give a number between 0-3</Text>}
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

    shotNumber:{
        fontSize:30,
        fontWeight:'bold',
        marginBottom:10,
        marginHorizontal:5,
        backgroundColor:"#962020",
        color:"white",
        width:40,
        height:40,
        textAlign:"center",
        borderRadius:20,
        marginRight:15,
    },

    shotsView:{
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
        width: "30%",
        borderRadius: 7,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        marginBottom:10,
        backgroundColor: '#962020',
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