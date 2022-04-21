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

export default function SelectTeamModal({isModalVisible,toggleModalVisibility,handleAddMember}){

    const [showWarning,setShowWarning] = useState(false);
    const [btnBorder1,setBtnBorder1] = useState(false);
    const [btnBorder2,setBtnBorder2] = useState(false);

    function closeModal(){
        setShowWarning(false);
        toggleModalVisibility();
    }

    function changeBtnBorder(team){
        if(team === "team1"){
            setBtnBorder1(!btnBorder1);
            if(btnBorder2)setBtnBorder2(!btnBorder2);
        }else{
            setBtnBorder2(!btnBorder2);
            if(btnBorder1)setBtnBorder1(!btnBorder1);
        }
    }

    function addMemberBtnPressed(){
        if(!btnBorder1 && !btnBorder2){
            setShowWarning(true);
        }else{
            if (btnBorder1){
                handleAddMember("team1")
            }else{
                handleAddMember("team2")
            }
        }
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
                        <TouchableOpacity onPress={closeModal}>
                            <Image 
                                style={styles.xicon} 
                                source={require('../assets/x.png')}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.mainView}>

                        <TouchableOpacity 
                            style={[styles.btnStyle,{borderColor:btnBorder1 ? colors.textColor : "white",borderWidth:btnBorder1 ? 4 : 0}]}
                            onPress={() => changeBtnBorder("team1")}
                        >
                            <Text style={styles.btnText}>Team 1</Text>
                        </TouchableOpacity> 

                        <TouchableOpacity 
                            style={[styles.btnStyle,{borderColor:btnBorder2 ? colors.textColor : "white",borderWidth:btnBorder2 ? 4 : 0}]}
                            onPress={() => changeBtnBorder("team2")}
                        >
                            <Text style={styles.btnText}>Team 2</Text>
                        </TouchableOpacity> 
                    </View>
                    <TouchableOpacity style={styles.buttons} onPress={addMemberBtnPressed}>
                        <Text style={styles.btnsText}>Add Member</Text>   
                    </TouchableOpacity>
                    {showWarning && <Text style={styles.warningStyle}>Please select a team</Text>}
                </View>
            </View>
        </Modal>
    );
 }

 const styles = StyleSheet.create({

    btnText:{
        color: colors.textColor,
        fontSize:18,
        fontWeight :'bold',
    },

    btnStyle:{
        borderRadius: 5,
        paddingHorizontal:23,
        paddingVertical:5,
        backgroundColor: colors.bgColor,
        marginTop:8,
        marginLeft:7,
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

    mainView:{
        flexDirection:"row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom:20,
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
        fontSize:18,
        fontWeight: 'bold',
        color:'white',
    },

    warningStyle:{
        color:"red",
        textAlign:"center",
    }

 });