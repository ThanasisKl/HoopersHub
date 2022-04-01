import React from 'react';
import { useNavigation } from '@react-navigation/core'
import {
    StyleSheet,
    Text,
    View,
    Alert,
    ScrollView,
    TouchableOpacity,
    Image,
} from "react-native";
import { useRoute } from '@react-navigation/native';
import {doc, getDoc,setDoc} from 'firebase/firestore';

import { db } from '../Config'
import { colors } from './colors';
import FriendRequest from '../components/FriendRequest'

export default function FriendRequestsScreen() {
    
    const route = useRoute();
    const username = route.params.username;
    const myDoc = doc(db, "HHcollection", username);
    const navigation = useNavigation();
    let requests_list = route.params.requests_list;

    function gotoHomeScreen(){
        navigation.navigate("Home",{"username":username});
    }
      
    function handleReguest(action,userRequest,setShowFriendRequest){//FIXME
        setShowFriendRequest(false);
        console.log(`${username} -> ${action} : ${userRequest}`)
        const myDoc2 = doc(db, "HHcollection", userRequest);

        if(action === "reject"){
            let newfriendRequestsArray = requests_list.filter(function(value, index, arr){ 
                return value !== userRequest;
            });

            let FriendRequestObject = {
                friendRequests: newfriendRequestsArray
            }
    
            setDoc(myDoc, FriendRequestObject, { merge: true })
            .then(() => {
                requests_list = newfriendRequestsArray;
                console.log("Rejected Successfully")
            })
            .catch((error) => {
                Alert.alert("","An Error has occured please try again later (error code: 4)");
            });
        }else{
            let newfriendRequestsArray = requests_list.filter(function(value, index, arr){ 
                return value !== userRequest;
            });

            let FriendRequestObject = {
                friendRequests: newfriendRequestsArray
            }
    
            setDoc(myDoc, FriendRequestObject, { merge: true })
            .then(() => {
                requests_list = newfriendRequestsArray;
                getDoc(myDoc)
                .then((user)=>{
                    let user_friends = user.data().friends;
                    setDoc(myDoc, FriendRequestObject, { merge: true })
                    .then(() => {
                        let newFriendsArray =  user_friends;
                        if (!newFriendsArray.includes(userRequest)){
                            newFriendsArray.push(userRequest);
                        }
            
                        let FriendRequestObject = {
                            friends: newFriendsArray
                        }
                        setDoc(myDoc, FriendRequestObject, { merge: true })
                        .then(()=>{
                            getDoc(myDoc2)
                            .then((user)=>{
                                let user2_friends = user.data().friends;
                                setDoc(myDoc2, FriendRequestObject, { merge: true })
                                .then(() => {
                                    let newFriendsArray2 =  user2_friends;
                                    if (!newFriendsArray2.includes(username)){
                                        newFriendsArray2.push(username);
                                    }
                                    
                        
                                    let FriendRequestObject2 = {
                                        friends: newFriendsArray2
                                    }
                                    setDoc(myDoc2, FriendRequestObject2, { merge: true })
                                    .then(()=>{
                                        console.log("Accepted Successfully")
                                    })
                                    .catch((error)=>{
                                        Alert.alert("","An Error has occured please try again later (error code: 11)");
                                    });
                                })
                                .catch((error)=>{
                                    Alert.alert("","An Error has occured please try again later (error code: 10)");
                                });
                            })
                            .catch((error)=>{
                                Alert.alert("","An Error has occured please try again later (error code: 9)");
                            })
                        })
                        .catch((error)=>{
                            Alert.alert("","An Error has occured please try again later (error code: 8)");
                        })
                    })
                    .catch((error)=>{
                        Alert.alert("","An Error has occured please try again later (error code: 7)");
                    });
                })
                .catch((error)=>{
                    Alert.alert("","An Error has occured please try again later (error code: 6)");
                });
                    
            })
            .catch((error) => {
                Alert.alert("","An Error has occured please try again later (error code: 5)");
            })
        }
    }
    

    let requests = requests_list.map(user =>{
        return (
            <FriendRequest userRequest={user} username={username} key={user} handleReguest={handleReguest}/>
        );
     });

    return (
        <View style={styles.container}>
            <View style={styles.mainScreen}>
                <View style={styles.pageTitleView}>
                    <TouchableOpacity onPress={gotoHomeScreen}>
                        <Image 
                            style={styles.icons} 
                            source={require('../assets/back-icon.png')}
                        />
                    </TouchableOpacity>
                    <Text style={styles.pageTitle}>Friend Requests</Text>
                </View>
                <ScrollView contentContainerStyle={styles.requestContainer}>
                    {requests}
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.bgColor,
      alignItems: "flex-start",
      justifyContent: 'flex-start',
    },

    icons:{
        width:45,
        height:30, 
        marginRight:20,
    },
    
    mainScreen:{
        marginTop:40,
        marginLeft:20,
    },

    pageTitle:{
        alignItems:'center',
        fontSize:30,
    },

    pageTitleView:{
        alignItems:'center',
        flexDirection:'row',
    },

    requestContainer:{
        alignItems: "flex-start",
        justifyContent: 'flex-start',
    },

    text:{
        fontSize:30,
    },
});