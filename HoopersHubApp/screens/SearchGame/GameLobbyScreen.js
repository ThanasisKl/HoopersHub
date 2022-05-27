import React, {useState,useCallback} from 'react';
import { useNavigation } from '@react-navigation/core'
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Image,
    TouchableOpacity,
    Alert,
    Linking
} from "react-native";
import {doc, getDoc, setDoc} from 'firebase/firestore';
import { useRoute } from '@react-navigation/native';

import { db } from '../../Config'
import { colors } from './../colors';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';


export default function GameLobbyScreen() {
    const route = useRoute();
    const navigation = useNavigation();
    const username = route.params.username;
    const lobbyID = route.params.lobbyID;
    const lobbyData = route.params.lobbyData;
    const team_1 = lobbyData.team_1;
    const team_2 = lobbyData.team_2;
    const mapURL ="https://www.google.gr/maps/search/?api=1&query="+lobbyData.latitude+","+lobbyData.longitude



    function gotoFindGameNearbyScreen(){
        navigation.navigate("SearchGameMain",{username});
    }

    function changeTeam(){
        if (lobbyData.owner == username){
            navigation.navigate("ChangeTeamsMain",{username,lobbyID,lobbyData});
        } else {
            Alert.alert("Forbidden","Only the lobby Owner can change the teams");
        }
    }


    const OpenURLButton = ({ url, children }) => {
        const handlePress = useCallback(async () => {
          // Checking if the link is supported for links with custom URL scheme.
          const supported = await Linking.canOpenURL(url);
      
          if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(url);
          } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
          }
        }, [url]);
      
        return(<TouchableOpacity title={children} onPress={handlePress}>
        <Image 
            style={styles.map} 
            source={require('../../assets/map_transparent.png')}
        />
        </TouchableOpacity>
        )
      };

    function leaveGame(){
        const myDoc = doc(db, "Games", lobbyID);
        getDoc(myDoc)
        .then((game)=>{
            const lobbyData = game.data();
            const indexTeam1 = lobbyData.team_1.indexOf(username);
            const indexTeam2 = lobbyData.team_2.indexOf(username);
            var team_1 = lobbyData.team_1
            var team_2 = lobbyData.team_2
            console.log(Array.isArray(team_1))
            console.log("indexTeam1: "+ indexTeam1+ "    indexTeam2:  "+ indexTeam2);
            if (indexTeam1 > -1){
                team_1.splice(indexTeam1, 1)
            } else if (indexTeam2 > -1){
                team_2.splice(indexTeam2, 1)
            }
            const new_teams = {team_1 :team_1,
                team_2:team_2}
            setDoc(myDoc,new_teams,{merge: true})
            .then(()=>{
                Alert.alert("See you again","You left the game");
                navigation.navigate("SearchGameMain",{username});
            }).catch((error) =>{
                console.log(error)
            });
        }).catch((error)=>{
            Alert.alert("","An Error has occured please try again later"+ error);
        }); 
    }



    return (
        <View style={styles.container}>
        <View style={styles.iconView}>
            <TouchableOpacity onPress={gotoFindGameNearbyScreen}>
                <Image 
                    style={styles.icons} 
                    source={require('../../assets/back-icon.png')}
                />
            </TouchableOpacity>
        </View>
        <View style={styles.upperContainer}>
            <OpenURLButton url={mapURL}/>
        </View>

        <View>
            <Text style={{color:colors.darkRed, margin:50, textAlign: 'center', fontSize:20, fontWeight:"bold",}}>GAME DATE: {lobbyData.time_of_game.hour}:{lobbyData.time_of_game.minute}  {lobbyData.date_of_game.day}/{lobbyData.date_of_game.month}/{lobbyData.date_of_game.year}</Text>
            <Table borderStyle={{borderWidth: 3, borderColor: colors.darkRed}}>

            <Row style={[styles.row ,{height: 40,  backgroundColor: '#f1f8ff'}]} data= {["TEAM 1","TEAM 2"]} textStyle={styles.text_header} />
            <Row style={styles.row}  data = {[lobbyData.team_1[0],lobbyData.team_2[0]]}  textStyle={styles.text} />
            <Row style={styles.row} data = {[lobbyData.team_1[1],lobbyData.team_2[1]]} textStyle={styles.text} />
            <Row style={styles.row} data = {[lobbyData.team_1[2],lobbyData.team_2[2]]}  textStyle={styles.text}/>
            <Row style={styles.row} data = {[lobbyData.team_1[3],lobbyData.team_2[3]]}  textStyle={styles.text}/>
            <Row style={styles.row} data = {[lobbyData.team_1[4],lobbyData.team_2[4]]}  textStyle={styles.text}/>

            </Table>
            <View>
            <TouchableOpacity style={styles.btnStyle} onPress={()=> changeTeam()}>
                <Text style={styles.btnsText}>Change teams</Text>
            </TouchableOpacity>
            </View>
            <View>
            <TouchableOpacity style={styles.btnStyle} onPress={()=> leaveGame()}>
                <Text style={styles.btnsText}>Leave Game</Text>
            </TouchableOpacity>
            </View>

        </View>
    </View>
    )
}

const styles = StyleSheet.create({

//   customBtnStyle:{
//     width: "100%",
//     borderRadius: 100,
//     borderColor:colors.lightBlue,
//     borderWidth: 50,
//     alignItems: "center",
//     justifyContent: "center",
//   },

  btnStyle:{
    width: "50%",
    height: 50,
    width: 200,
    alignItems: "center",
    justifyContent: "center",
    marginTop:40, 
    marginHorizontal:95,
    borderColor:colors.darkRed,
    borderWidth: 2,
    backgroundColor:colors.darkRed
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

  map:{
    width:45,
    height:40, 
    marginRight:20,
    marginTop:20,
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
    // alignItems: "center",
    justifyContent: "center",
    backgroundColor:colors.selectedtextColor
    },

    text_header: { textAlign: 'center',
    fontSize:16,
    fontWeight: 'bold'
     },

    text: { textAlign: 'center',},
 
    upperContainer:{
        flex: 1,
        position:'absolute',
        top:30,
        justifyContent:'flex-end',
        alignSelf:'flex-end',
        flexDirection:'row'
    },
});