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
    Button
} from "react-native";
import {doc, getDoc, setDoc} from 'firebase/firestore';
import { useRoute } from '@react-navigation/native';

import { db } from '../../Config'
import { colors } from './../colors';
// import GetLocation from 'react-native-get-location'
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';



export default function FindGameNearbyScreen() {

  const route = useRoute();
  const navigation = useNavigation();
  const username = route.params.username;
  const activeGames = route.params.gamesFound;
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  
 
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

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  function gotoSearchGameMainScreen(){
    navigation.navigate("SearchGameMain",{username});
  }

  function gotoGameLobbyScreen(lobbyID,lobbyData){
    const myDoc = doc(db, "Games", lobbyID);
    getDoc(myDoc)
    .then((game)=>{
        const user_data = game.data();
        if (user_data.team_1.lenght > user_data.team_2.lenght){
          user_data.team_2.push(username);
        } else {
          user_data.team_1.push(username);
        }
        const new_teams = {team_1 :[user_data.team_1],
          team_2:[user_data.team_2]}
        setDoc(myDoc,new_teams,{merge: true})
        .then(()=>{
            Alert.alert("Congratulations!","Welcome to the Game");
            navigation.navigate("GameLobby",{username,lobbyID,lobbyData});
        }).catch((error) =>{
            console.log(error)
        });
    }).catch((error)=>{
        Alert.alert("","An Error has occured please try again later");
    }); 
  }

  function customButton(text,lobbyID,lobbyData){
    return (
      <TouchableOpacity style={styles.btnStyle} onPress={()=> gotoGameLobbyScreen(lobbyID,lobbyData)}>
      <Text style={styles.btnsText}>{text}</Text>
      </TouchableOpacity>
    )
  }

  let displayGames = activeGames.map((Game,i) =>{  
    const players = 0;
    if ((Game[1].team_1.lenght + Game[1].team_2.lenght)){
      players = Game[1].team_1.lenght + Game[1].team_2.lenght;
    }
    return (
        <Row key={i}
            data={[Game[1].name+' - '+ players+'/'+ Game[1].number_of_players,customButton('Join',Game[0],Game[1])]} 
            style={[styles.row,{backgroundColor:colors.selectedtextColor}]}
            textStyle={{textAlign:"center",fontWeight:"bold"}}
            flexArr={[2,1]} />
    )
  })

  return (
    <View style={styles.container}>
    <View style={styles.iconView}>
        <TouchableOpacity onPress={gotoSearchGameMainScreen}>
            <Image 
                style={styles.icons} 
                source={require('../../assets/back-icon.png')}
            />
        </TouchableOpacity>
    </View>
   
    <View>
        <Table borderStyle={{borderWidth: 3, borderColor: colors.darkRed}}>
        {displayGames}
        </Table>
    </View>
</View>
  );
}

const styles = StyleSheet.create({

  customBtnStyle:{
    width: "100%",
    borderRadius: 100,
    borderColor:colors.lightBlue,
    borderWidth: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  btnStyle:{
      // width: "5%",
      borderRadius: 0,
      height: 30,
      width: 100,
      alignItems: "center",
      justifyContent: "center",
      marginHorizontal:15,
      borderColor:colors.darkRed,
      borderWidth: 2,
      backgroundColor:colors.darkRed,
  },

  // buttons: {
  //     width: "70%",
  //     borderRadius: 7,
  //     height: 50,
  //     alignItems: "center",
  //     justifyContent: "center",
  //     marginBottom: 30,
  //     backgroundColor: "white",
      
  // },

  btnsText:{
      fontSize:16,
      fontWeight: 'bold',
      color:colors.selectedtextColor
  },

  // btnsView:{
  //     alignSelf: "center",
  //     marginTop:"auto",
  //     marginBottom:"30%",
  //     flexDirection:"row",
  //     flexWrap: 'wrap',
  //     justifyContent:"center",
  // },

  container: {
      flex: 1,
      backgroundColor: colors.bgColor,
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
  row: { 
    height: 50, 
    alignContent: "center", 
    textAlign:"center",
    
},
 
});