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
} from "react-native";
import {doc, getDoc} from 'firebase/firestore';
import { useRoute } from '@react-navigation/native';

import { db } from '../Config'
import { colors } from './colors';


export default function ViewChosenGroupScreen() {
    const route = useRoute();
    const navigation = useNavigation();
    const username = route.params.username;
    const groupInfo = route.params.groupInfo;
    const groupName = groupInfo.name;
    const groupLeaders = groupInfo.leader;
    const scores = ['20-16','20-6','0-16'] 

    // console.log(groupInfo);
    
    return (
        <View style={styles.container}>
            <View style={styles.container2}>
                <View style={styles.headerView}>
                    <TouchableOpacity>
                        <Image 
                            style={styles.icons} 
                            source={require('../assets/back-icon.png')}
                        />
                    </TouchableOpacity>
                    <View style={styles.rigthIconsView}>
                        <TouchableOpacity>
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

                        <TouchableOpacity>
                            <Image 
                                style={styles.icons2} 
                                source={require('../assets/team-icon.png')}
                            />
                        </TouchableOpacity>
                    </View>
                    
                    {/* <Text style={styles.pageTitle}>{groupName}</Text> */}
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

    viewGroupBtn:{
        borderRadius: 7,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 30,
        backgroundColor: "white",
        paddingHorizontal:20,
        paddingVertical:5,
    },
   
});