import React, {useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from "react-native";

import { colors } from '../screens/colors';

export default function FriendRequest({userRequest,username,handleReguest}){
    
    const [showFriendRequest, setShowFriendRequest] = useState(true);

    let request = (
            <View style={styles.requestContainer}>
                <Text style={styles.namesText}>{userRequest}</Text>
                <View style={styles.btnContainer}>
    
                    <TouchableOpacity style={[styles.btnStyle,styles.acceptOpacity]} 
                        onPress={() => handleReguest("accept",userRequest,setShowFriendRequest)}
                    >
                        <Text style={[styles.btnTextStyle,styles.acceptBtn]}>ACCEPT</Text>
                    </TouchableOpacity>
    
                    <TouchableOpacity style={styles.btnStyle} 
                        onPress={() => handleReguest("reject",userRequest,setShowFriendRequest)}
                    >
                        <Text style={[styles.btnTextStyle,styles.rejectBtn]}>REJECT</Text>
                    </TouchableOpacity>
                </View>
            </View>
    );

    if(!showFriendRequest)request=<View></View>;
    return (
        request
    );
 }

 const styles = StyleSheet.create({
    acceptBtn:{
        color:"green",
    },

    acceptOpacity:{
        marginRight:10,
    },

    btnContainer:{
        flexDirection:"row",
        marginBottom:10,
    },

    btnStyle:{
        paddingLeft:10,
        paddingRight:10,
        flexDirection:'row',
        backgroundColor: "white",
        borderRadius: 10,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
    },

    btnTextStyle:{
        flexDirection:'row',
    },

    namesText:{
        fontSize:23,
        marginTop:20,
        marginBottom: 5,
        flexDirection:"row",
    },

    rejectBtn:{
        color:"red",
    },

    requestContainer:{
        borderWidth: 2,
        borderColor:colors.bgColor,
        borderBottomColor:"white",
    },
 });