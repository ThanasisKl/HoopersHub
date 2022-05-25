import React, {useState,useEffect} from 'react';
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
import {collection, doc, getDoc,getDocs,query} from 'firebase/firestore';
import { useRoute } from '@react-navigation/native';

import { db} from '../../Config'
import { colors } from './../colors';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { cos } from 'react-native-reanimated';


export default function SearchGameMainScreen() {
    const route = useRoute();
    const navigation = useNavigation();
    const username = route.params.username;
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    // const [playerFound,setPlayerFound] = useState(false);
    // const [lobbyID,setLobbyID] = useState(null);
    // const [lobbyData,setLobbyData] = useState(null);
    const [laps,setLaps] = useState(0);




    function gotoHomeScreen(){
        navigation.navigate("Home",{"username":username});
    }

    useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
        })();
      }, []);
    
    function degrees_to_radians(degrees)
    {
      var pi = Math.PI;
      return degrees * (pi/180);
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
        const q = query(collection(db, "Games"))
        // console.log("LATITUDE : "+ location.coords.latitude);
        // console.log("LONGITUDE : "+ location.coords.longitude);
        const latitude = degrees_to_radians(location.coords.latitude);
        const longitude =degrees_to_radians(location.coords.longitude);
        const gamesFound = []
        let playerFound = false;
        let lobbyID = null;
        let lobbyData = null;
        getDocs(q)
        .then((querySnapshot)=>{
            querySnapshot.forEach((doc) => {
                setLaps(laps+1)
                if (doc.data().team_1 != undefined || doc.data().team_2 != undefined ){
                    if (doc.data().team_1.includes(username) || doc.data().team_2.includes(username)){
                        console.log("Player included")
                        lobbyID = doc.id
                        lobbyData = doc.data()
                        playerFound = true
                    } else {
                        let gameLatitude = degrees_to_radians(doc.data().latitude);
                        let gameLongitude = degrees_to_radians(doc.data().longitude);
                        let radius = Math.acos(Math.sin(latitude)*Math.sin(gameLatitude) + Math.cos(latitude)*Math.cos(gameLatitude)* Math.cos(gameLongitude - longitude)) * 6371
                        if (radius <= 3){
                            let qualifiedGame = [doc.id,doc.data()];
                            gamesFound.push(qualifiedGame);
                        }
                    }
                } else {
                    let gameLatitude = degrees_to_radians(doc.data().latitude);
                    let gameLongitude = degrees_to_radians(doc.data().longitude);
                    let radius = Math.acos(Math.sin(latitude)*Math.sin(gameLatitude) + Math.cos(latitude)*Math.cos(gameLatitude)* Math.cos(gameLongitude - longitude)) * 6371
                    if (radius <= 3){
                        let qualifiedGame = [doc.id,doc.data()];
                        gamesFound.push(qualifiedGame);
                    }
                }
                if(laps >= querySnapshot.size){
                    if(playerFound){
                        console.log("Lobby time")
                        navigation.navigate("GameLobby",{username,lobbyID,lobbyData});
                    } else{
                        navigation.navigate("FindGameNearby",{username,gamesFound});
                    }
                }
            });
        })

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