import React, {useState} from 'react';
import { useNavigation } from '@react-navigation/core'
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Image,
    TouchableOpacity,
    Alert,
} from "react-native";
import {doc, getDoc} from 'firebase/firestore';
import { useRoute } from '@react-navigation/native';

import { db } from '../../Config'
import { colors } from './../colors';


export default function SearchGameMainScreen() {
    const route = useRoute();
    const navigation = useNavigation();
    const username = route.params.username;
    const [showShotsModal,setShowShotsModal] = useState(false);
    const [btnPressed,setBtnPressed] = useState(0);

    function gotoHomeScreen(){
        navigation.navigate("Home",{"username":username});
    }

    // function toggleModalVisibility(number){
    //     setBtnPressed(number);
    //     setShowShotsModal(!showShotsModal);
    // }

    function handleFinish(){
        console.log(results);//fixme
        /*
            beginner
            regular
            great
            rising star
            professional
            legend
        */ 
    }

    function gotoCreateGameScreen(){
        const myDoc = doc(db, "HHcollection", username);
        getDoc(myDoc)
        .then((user)=>{
            // const user_data = user.data();
            // const friends_list = user_data.friends;
            navigation.navigate("CreateGame",{username});
        }).catch((error)=>{
            Alert.alert("","An Error has occured please try again later (error code:)");
        }); 
    }

    function gotoFindGameNearbyScreen(){
        const myDoc = doc(db, "HHcollection", username);
        getDoc(myDoc)
        .then((user)=>{
            navigation.navigate("FindGameNearby",{username});
        }).catch((error)=>{
            Alert.alert("","An Error has occured please try again later (error code:)");
        }); 
    }

    return (
        <View style={styles.container}>
            <View style={styles.iconView}>
                <TouchableOpacity onPress={gotoHomeScreen}>
                    <Image 
                        style={styles.icons} 
                        source={require('../../assets/back-icon.png')}
                    />
                </TouchableOpacity>
            </View>
           
            <TouchableOpacity style={styles.buttons} onPress={gotoCreateGameScreen}>
                <Text style={styles.btnsText}>Create a new Game</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttons} onPress={gotoFindGameNearbyScreen}>
                <Text style={styles.btnsText}>Find Games Nearby!</Text>
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({

    btnStyle:{
        width: "5%",
        borderRadius: 40,
        height: 65,
        width: 65,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal:15,
        borderColor:colors.darkRed,
        borderWidth: 2,
    },

    buttons: {
        width: "70%",
        borderRadius: 7,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 30,
        backgroundColor: "white",
        
    },

    btnsText:{
        fontSize:20,
        fontWeight: 'bold',
    },

    btnsView:{
        alignSelf: "center",
        marginTop:"auto",
        marginBottom:"30%",
        flexDirection:"row",
        flexWrap: 'wrap',
        justifyContent:"center",
    },

    container: {
        flex: 1,
        backgroundColor: colors.bgColor,
        alignItems: "center",
        justifyContent: "center",
      },

    // finishBtn:{
    //     width: "40%",
    //     borderRadius: 7,
    //     height: 50,
    //     alignItems: "center",
    //     justifyContent: "center",
    //     marginTop: 20,
    //     marginBottom:10,
    //     backgroundColor: 'white',
    //     borderColor:"black",
    //     borderWidth: 2.5,
    // },

    finishText:{
        fontSize:25,
        fontWeight: 'bold',
        color:'black',
    },

    icons:{
        width:45,
        height:30, 
        marginRight:20,
        marginTop:30,
        marginLeft:20,
    },

    iconView:{
        position: 'absolute',
        top:0,
        alignSelf: "flex-start",
        flexDirection:"row"
    },

    image: {
        flex: 1,
    },

    pageTitle:{
        fontSize:30,
        fontWeight:"bold",
        color:colors.darkRed,
        marginBottom:40,
        textAlign:"center"
    },
   
});