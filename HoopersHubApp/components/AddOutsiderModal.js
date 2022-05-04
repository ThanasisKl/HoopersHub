import React, {useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Modal,
    Image,
    TouchableOpacity,
    Dimensions,
    TextInput,
} from "react-native";

import { colors } from '../screens/colors';

const { width,height } = Dimensions.get("window");

export default function AddOutsiderModal({isModalVisible,toggleModalVisibility,friends,setFriends,btnIcon,setBtnIcon,username,outsiders,setOutsiders}){

    const [name,setName] = useState("");
    const [showWarning,setShowWarning] = useState(false);

    function checkInputScore(){
        if(name !== "" && name.length > 0 && name.length <= 15 && name!== username && !friends.includes(name)){
            setFriends([...friends,name]);
            setBtnIcon([...btnIcon,"+"]);
            setOutsiders([...outsiders,name]);
            toggleModalVisibility();
        }else{
            setShowWarning(true);
        }
    }

    function closeModal(){
        setShowWarning(false);
        toggleModalVisibility();
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
                    <View style={styles.scoreView}>
                        <TextInput
                            style={styles.textInput} 
                            onChangeText={(value) => setName(value)}
                            placeholder=" Outsider's Name"
                        />
                    </View>
                    <TouchableOpacity style={styles.buttons} onPress={checkInputScore}>
                        <Text style={styles.btnsText}>ADD</Text>   
                    </TouchableOpacity>
                    {showWarning && <Text style={styles.warningStyle}>Please give a name that does not exists in your friend list and contain 15 characters</Text>}
                </View>
            </View>
        </Modal>
    );
 }

 const styles = StyleSheet.create({

    textInput: {
        width: "80%",
        height:40,
        borderRadius: 5,
        borderColor: "rgba(0, 0, 0, 0.2)",
        borderWidth: 1,
        marginBottom: 8,
        fontSize:20,
        marginTop:20,
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
        top: "20%",
        left: "50%",
        elevation: 5,
        transform: [{ translateX: -(width * 0.4) }, 
                    { translateY: -90 }],
        height:220,
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
        width: "30%",
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