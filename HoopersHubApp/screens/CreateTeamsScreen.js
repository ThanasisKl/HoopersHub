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
    TextInput,
} from "react-native";
import {doc, getDoc,setDoc} from 'firebase/firestore';
import { useRoute } from '@react-navigation/native';

import { db } from '../Config'
import { colors } from './colors';


export default function CreateTeamsScreen() {
    const route = useRoute();
    const navigation = useNavigation();
    const username = route.params.username;
    const groupList = [...route.params.groupList,username];
    const groupName = route.params.groupName;
    
    return (
        <View style={styles.container}>
            <Text>Username: {username}</Text>
            <Text>Group list: {groupList}</Text>
            <Text>Group name: {groupName}</Text>
        </View>
    );
}


const styles = StyleSheet.create({ 
    container: {
        flex: 1,
        backgroundColor: colors.bgColor,
        alignItems: "center",
        justifyContent: "center",
      },
});