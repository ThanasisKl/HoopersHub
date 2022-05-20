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
import {doc, getDoc} from 'firebase/firestore';
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
    console.log
  }

  function gotoSearchGameMainScreen(){
    navigation.navigate("SearchGameMain",{"username":username});
  }

  function gotoGameLobbyScreen(){
    navigation.navigate("GameLobby",{"username":username});
  }

  function customButton(text){
    return (
      <TouchableOpacity style={styles.btnStyle} onPress={gotoGameLobbyScreen}>
      <Text style={styles.btnsText}>{text}</Text>
      </TouchableOpacity>
    )
  }


  let displayGames = activeGames.map((Game,i) =>{  
    const players = 0;
    if ((Game.team_1.lenght + Game.team_2.lenght)){
      players = Game.team_1.lenght + Game.team_2.lenght;
    }
    return (
        <Row key={i}
            data={[Game.name+' - '+ players+'/'+ Game.number_of_players,customButton('Join')]} 
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
        {/* <Row
                        data={["Game 1  -  3/10 players - 1km away",customButton('Join')]} 
                        style={[styles.row,{backgroundColor:colors.selectedtextColor}]}
                        textStyle={{textAlign:"center",fontWeight:"bold"}}
                        flexArr={[2,1]} />
        <Row
                        data={["Game 2  -  2/4 players - 2km away",customButton("Join")]} 
                        style={[styles.row,{backgroundColor:colors.selectedtextColor}]}
                        textStyle={{textAlign:"center",fontWeight:"bold"}}
                        flexArr={[2,1]} />
        <Row
                        data={["Game 3  -  6/8 players - 3km away",customButton("Join")]} 
                        style={[styles.row,{backgroundColor:colors.selectedtextColor}]}
                        textStyle={{textAlign:"center",fontWeight:"bold"}}
                        flexArr={[2,1]} />                                                 */}
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