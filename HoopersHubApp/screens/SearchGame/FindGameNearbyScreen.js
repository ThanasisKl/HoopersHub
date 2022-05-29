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
import {collection, doc, getDoc,getDocs,query,setDoc} from 'firebase/firestore';
import { useRoute } from '@react-navigation/native';

import { db } from '../../Config'
import { colors } from './../colors';
// import GetLocation from 'react-native-get-location'
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import RangePickerModal from '../../components/RangePickerModal';



export default function FindGameNearbyScreen() {

  const route = useRoute();
  const navigation = useNavigation();
  const username = route.params.username;
  // const activeGames = route.params.gamesFound.sort((a, b) => a[2] - b[2]);
  const [activeGames,setActiveGames] = useState([]);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [lobbyChosen,setLobbyChosen] = useState(null);
  const [displayGames,setDisplayGames] = useState(null);
  const [gamesRetrieved, setGamesRetrieved] = useState(false);
  const [rangePicked, setRangePicked] = useState(3);
  const[isRangePickerModalVisible,setRangePickerModalVisible] = useState(false);




    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      })
      .then((result)=>{
          setLocation(result)
          // console.log("Location is : "+location +" is location null: "+ (location === null))
          retrieveGames()
      })
      .catch((error)=>{
        Alert.alert("","An Error has occured please try again later (error code:)"+error);
      })
    })();


function degrees_to_radians(degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
}


  function gotoSearchGameMainScreen(){
    navigation.navigate("SearchGameMain",{username});
  }

  function gotoGameLobbyScreen(lobbyID){
    const myDoc = doc(db, "Games", lobbyID);
    getDoc(myDoc)
    .then((game)=>{
        const lobbyData = game.data();
        if (lobbyData.team_1.length && lobbyData.team_2.length){
          if (lobbyData.team_1.length > lobbyData.team_2.length){
            lobbyData.team_2.push(username);
          } else {
            lobbyData.team_1.push(username);
          }
        } else if (lobbyData.team_1.length){
          lobbyData.team_2.push(username)
        } else {
          lobbyData.team_1.push(username)
        }
        const new_teams = {team_1 :lobbyData.team_1,
          team_2:lobbyData.team_2}
        setDoc(myDoc,new_teams,{merge: true})
        .then(()=>{
            Alert.alert("Congratulations!","Welcome to the Game");
            navigation.navigate("GameLobby",{username,lobbyID,lobbyData});
        }).catch((error) =>{
            console.log(error)
        });
    }).catch((error)=>{
        Alert.alert("","An Error has occured please try again later"+ error);
    }); 
  }

  function customButton(text,lobbyID,lobbyData){
    return (
      <TouchableOpacity style={styles.btnStyle} onPress={()=> gotoGameLobbyScreen(lobbyID,lobbyData)}>
      <Text style={styles.btnsText}>{text}</Text>
      </TouchableOpacity>
    )
  }

  useEffect(() => {
    let gamesShown = activeGames.map((Game,i) =>{  
      var players = 0;
      if ((Game[1].team_1.length != undefined && Game[1].team_2.length != undefined)){
        players = Game[1].team_1.length + Game[1].team_2.length;
      } else if (Game[1].team_1.length != undefined){
        players = Game[1].team_1.length;
      } else if (Game[1].team_2.length != undefined){
        players = Game[1].team_2.length;
      }
      return (
          <Row key={i}
              data={[Game[1].name+' - '+ players+'/'+ Game[1].number_of_players +' - '+ Game[2].toFixed(2)+" Km Away",customButton('Join',Game[0],Game[1])]} 
              style={[styles.row,{backgroundColor:colors.selectedtextColor}]}
              textStyle={{textAlign:"center",fontWeight:"bold"}}
              flexArr={[2,1]} />
      )
    })
    setDisplayGames(gamesShown)
  },[activeGames])

  function retrieveGames(){
    if ((!(location === null)) && (gamesRetrieved === false)){
      setGamesRetrieved(true)
      const q = query(collection(db, "Games"))
      const latitude = degrees_to_radians(location.coords.latitude);
      const longitude =degrees_to_radians(location.coords.longitude);
      const gamesFound = []
      let lobbyID = null;
      let lobbyData = null;
      getDocs(q)
      .then((querySnapshot)=>{
          querySnapshot.forEach((doc) => {
              if (doc.data().team_1 != undefined || doc.data().team_2 != undefined ){
                  if (doc.data().team_1.includes(username) || doc.data().team_2.includes(username)){
                  // console.log("Player included")
                      lobbyID = doc.id
                      lobbyData = doc.data()
                      navigation.navigate("GameLobby",{username,lobbyID,lobbyData});
                  } else {
                      let gameLatitude = degrees_to_radians(doc.data().latitude);
                      let gameLongitude = degrees_to_radians(doc.data().longitude);
                      let radius = Math.acos(Math.sin(latitude)*Math.sin(gameLatitude) + Math.cos(latitude)*Math.cos(gameLatitude)* Math.cos(gameLongitude - longitude)) * 6371
                      if (radius <= rangePicked){
                          let qualifiedGame = [doc.id,doc.data(),radius];
                          gamesFound.push(qualifiedGame);
                      }
                  }
              } else {
                  let gameLatitude = degrees_to_radians(doc.data().latitude);
                  let gameLongitude = degrees_to_radians(doc.data().longitude);
                  let radius = Math.acos(Math.sin(latitude)*Math.sin(gameLatitude) + Math.cos(latitude)*Math.cos(gameLatitude)* Math.cos(gameLongitude - longitude)) * 6371
                  if (radius <= rangePicked){
                      let qualifiedGame = [doc.id,doc.data(),radius];
                      gamesFound.push(qualifiedGame);
                  }
              }
          })
          if(lobbyID == null){
            gamesFound.sort((a, b) => a[2] - b[2])
            setActiveGames(gamesFound)
          // navigation.navigate("FindGameNearby",{username,gamesFound});
          }
      })
    }
  }


  useEffect(()=>{
    console.log("Range changed")
    setGamesRetrieved(false)
    retrieveGames()
  },[rangePicked])


  function toggleRangePickerModalVisibility(){
    setRangePickerModalVisible(!isRangePickerModalVisible)
  }

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
    <View style={styles.upperContainer}>
      <RangePickerModal 
       toggleRangePickerModalVisibility={toggleRangePickerModalVisibility} 
       isRangePickerModalVisible={isRangePickerModalVisible} 
       setRangePicked= {setRangePicked}
        />
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

upperContainer:{
  flex: 1,
  position:'absolute',
  top:30,
  justifyContent:'flex-end',
  alignSelf:'flex-end',
  flexDirection:'row'
},
 
});






  // console.log("ACTIVE GAMES: ")
  // console.log("--------------------------------")
  // console.log(activeGames)

  // let displayGames = activeGames.map((Game,i) =>{  
  //     var players = 0;
  //     if ((Game[1].team_1.length != undefined && Game[1].team_2.length != undefined)){
  //       players = Game[1].team_1.length + Game[1].team_2.length;
  //     } else if (Game[1].team_1.length != undefined){
  //       players = Game[1].team_1.length;
  //     } else if (Game[1].team_2.length != undefined){
  //       players = Game[1].team_2.length;
  //     }
  //     return (
  //         <Row key={i}
  //             data={[Game[1].name+' - '+ players+'/'+ Game[1].number_of_players +' - '+ Game[2].toFixed(2)+" Km Away",customButton('Join',Game[0],Game[1])]} 
  //             style={[styles.row,{backgroundColor:colors.selectedtextColor}]}
  //             textStyle={{textAlign:"center",fontWeight:"bold"}}
  //             flexArr={[2,1]} />
  //     )
  //   })

  // let displayGames = activeGames.map((Game,i) =>{  
  //   var players = 0;
  //   if ((Game[1].team_1.length != undefined && Game[1].team_2.length != undefined)){
  //     players = Game[1].team_1.length + Game[1].team_2.length;
  //   } else if (Game[1].team_1.length != undefined){
  //     players = Game[1].team_1.length;
  //   } else if (Game[1].team_2.length != undefined){
  //     players = Game[1].team_2.length;
  //   }
  //   return (
  //       <Row key={i}
  //           data={[Game[1].name+' - '+ players+'/'+ Game[1].number_of_players +' - '+ Game[2].toFixed(2)+" Km Away",customButton('Join',Game[0],Game[1])]} 
  //           style={[styles.row,{backgroundColor:colors.selectedtextColor}]}
  //           textStyle={{textAlign:"center",fontWeight:"bold"}}
  //           flexArr={[2,1]} />
  //   )
  // })
