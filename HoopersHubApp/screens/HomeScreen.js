import React, {useState} from 'react';
import { useNavigation } from '@react-navigation/core'
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    TouchableOpacity,
    Modal,
    Dimensions,
    Alert,
} from "react-native";
import {doc, getDoc,setDoc} from 'firebase/firestore';

import { db } from '../Config'
import { colors } from './colors';

const { width } = Dimensions.get("window");

export default function HomeScreen({route}) {
    const navigation = useNavigation();
    const { username} = route.params;
    console.log("Hello " + username)

    const [isModalVisible, setModalVisible] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [messageIcon, setMessageIcon] = useState(require('../assets/message-icon.png'));

    const myDoc2 = doc(db, "HHcollection", username);
    getDoc(myDoc2)
    .then((user)=>{
        let user_data = user.data();
        let requests_list = user_data.friendRequests;
        if (requests_list.length > 0){
            console.log('In')
            setMessageIcon(require('../assets/message-icon2.png'));
        }else{
            setMessageIcon(require('../assets/message-icon.png'));
        }
    });

  
    function toggleModalVisibility(){
        setModalVisible(!isModalVisible);
    };

    function logout(){
        navigation.navigate('Login')
    }

    function gotoMessageScreen(){
        const myDoc = doc(db, "HHcollection", username);
        getDoc(myDoc)
        .then((user)=>{
            let user_data = user.data();
            let requests_list = user_data.friendRequests;
            navigation.navigate("FriendRequests",{username,requests_list});
        }).catch((error)=>{
            Alert.alert("","An Error has occured please try again later (error code: 3)");
        });
    }

    function gotoRatingScreen(){
        const myDoc = doc(db, "HHcollection", username);
        getDoc(myDoc)
        .then((user)=>{
            const user_data = user.data();
            const friends_list = user_data.friends;
            const myRatings = user_data.myRatings;
            navigation.navigate("Rating",{username,friends_list,myRatings});
        }).catch((error)=>{
            Alert.alert("","An Error has occured please try again later (error code: 12)");
        });
    }

    async function sendFriendRequest(){
        toggleModalVisibility();
        const input = inputValue;
        setInputValue("");
        if(input === username){
            Alert.alert("","You can't make your self a friend");  
        }else if (input !== ""){
            const myDoc = doc(db, "HHcollection", input);
            const query_result = await getDoc(myDoc);
            let credentials = query_result.data();
            if (credentials !== undefined){
                let newfriendRequestsArray = credentials.friendRequests;
                
                if(newfriendRequestsArray.includes(username)){
                    Alert.alert("","You already send a friend request to that user"); 
                }else if(credentials.friends.includes(username)){
                    Alert.alert("","You already have that friend");
                }else{
                    newfriendRequestsArray.push(username);
                    let FriendRequestObject = {
                        friendRequests: newfriendRequestsArray
                    }
    
                    setDoc(myDoc, FriendRequestObject, { merge: true })
                    .then(() => {
                        Alert.alert("","Request Sent!");
                    })
                    .catch((error) => {
                        Alert.alert("","An Error has occured please try again later (error code: 2)");
                    })
                }
                
               
            }else{
                Alert.alert("",`The user with username ${input} does not  exist`);
            }
        }
    }
    
    return (
        <View style={styles.container}>
            <Modal animationType="slide" 
                   transparent visible={isModalVisible} 
                   presentationStyle="overFullScreen" 
                   onDismiss={toggleModalVisibility}
            >
                
                <View style={styles.viewWrapper}>
                    <View style={styles.modalView}>
                        <View style={styles.xView}>
                            <TouchableOpacity onPress={toggleModalVisibility}>
                                <Image 
                                    style={styles.icons2} 
                                    source={require('../assets/x.png')}
                                />
                            </TouchableOpacity>
                        </View>
                        <TextInput placeholder="Enter the username of your friend" 
                            value={inputValue} style={styles.textInput} 
                            onChangeText={(value) => setInputValue(value)} 
                        />
                        <Button title="Send" style={styles.btnStyle}
                            onPress={sendFriendRequest}
                            color={colors.bgColor} />
                    </View>
                </View>
            </Modal>

            <View style={styles.upperContainer}>
                <TouchableOpacity onPress={gotoMessageScreen}>
                    <Image 
                        style={styles.icons} 
                        source={messageIcon}
                    />
                </TouchableOpacity>

                <TouchableOpacity  onPress={toggleModalVisibility}>
                    <Image 
                        style={styles.icons} 
                        source={require('../assets/friend_requests-icon.png')}
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={logout}>
                    <Image 
                        style={styles.icons} 
                        source={require('../assets/logout-icon.png')}
                    />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.buttons}>
                <Text style={styles.btnsText}>Training</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttons}>
                <Text style={styles.btnsText}>Create Group</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttons}>
                <Text style={styles.btnsText}>Search Team Nearby</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttons}>
                <Text style={styles.btnsText}>Create Tournament</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttons} onPress={gotoRatingScreen}>
                <Text style={styles.btnsText}>Rate Friend</Text>
            </TouchableOpacity>
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
    
    buttons: {
        width: "70%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
        backgroundColor: "white",
    },

    btnsText:{
        fontSize:20,
    },

    upperContainer:{
        flex: 1,
        position:'absolute',
        top:50,
        justifyContent:'flex-end',
        alignSelf:'flex-end',
        flexDirection:'row'
    },

    icons:{
        width:30,
        height:30, 
        marginRight:20,
    },

    icons2:{
        width:20,
        height:20, 
        marginBottom:20,
    },

    xView:{
        alignSelf:"flex-end",
        marginRight:10,
    },

    viewWrapper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
    modalView: {
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: "50%",
        left: "50%",
        elevation: 5,
        transform: [{ translateX: -(width * 0.4) }, 
                    { translateY: -90 }],
        height: 180,
        width: width * 0.8,
        backgroundColor: "#fff",
        borderRadius: 7,
    },
    textInput: {
        width: "80%",
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderColor: "rgba(0, 0, 0, 0.2)",
        borderWidth: 1,
        marginBottom: 8,
    },
});

