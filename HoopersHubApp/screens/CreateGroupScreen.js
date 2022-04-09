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
import {doc, getDoc,setDoc} from 'firebase/firestore';
import { useRoute } from '@react-navigation/native';

import { db } from '../Config'
import { colors } from './colors';


export default function GroupMainScreen() {
    const route = useRoute();
    const navigation = useNavigation();
    const username = route.params.username;

    function gotoGroupScreen(){
        navigation.navigate("GroupMain",{username});
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.container2}>
                <View style={styles.pageTitleView}>
                    <TouchableOpacity onPress={gotoGroupScreen}>
                        <Image 
                            style={styles.icons} 
                            source={require('../assets/back-icon.png')}
                        />
                    </TouchableOpacity>
                    <Text style={styles.pageTitle}>Add your Friends</Text>
                </View>
                <ScrollView>
                    {}
                </ScrollView>
                       
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.bgColor,
        flex: 1,
        alignItems: "flex-start",
        justifyContent: "flex-start",
    },

    container2: {
        marginTop:50,
        marginLeft:10,
    },
    
    icons:{
        width:45,
        height:30, 
        marginRight:20,
    },

    pageTitle:{
        fontSize:30,
        borderColor:colors.bgColor,
        borderBottomColor:colors.textColor,
        borderWidth: 2,
    },

    pageTitleView:{
        marginBottom:20,
        alignItems:'baseline',
        flexDirection:"row"
    }
   
});