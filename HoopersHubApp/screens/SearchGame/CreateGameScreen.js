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
import {doc, getDoc, setDoc,getDocs,query,collection } from 'firebase/firestore';
import { useRoute } from '@react-navigation/native';

import { db } from '../../Config'
import { colors } from './../colors';
import * as Location from 'expo-location';
import { TextInput } from 'react-native-gesture-handler';
import {Picker} from '@react-native-picker/picker';
import DatePickerModal  from '../../components/DatePickerModal';
import uuid from 'react-native-uuid';

export default function CreateGameScreen() {

    const route = useRoute();
    const navigation = useNavigation();
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [numberOfPlayers, setNumberOfPlayers] = useState("1");
    const [gameName, setGameName] = useState(null);
    const username = route.params.username;
    const [selectedHours, setSelectedHours] = useState(0);
    const [selectedMinutes, setSelectedMinutes] = useState(0);
    const [warning,setWarning] = useState("");
    const [datePicked, setDatePicked] = useState(null);
    const [ownerHasGame,setOwnerHasGame] = useState(false);
    
    const[isDatePickerModalVisible,setDatePickerModalVisible] = useState(false);

  
    async function getLocation(){ 
      let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
    };

    // useEffect(() => , []);
  
    // let text = 'Waiting..';
    // if (errorMsg) {
    //   text = errorMsg;
    // } else if (location) {
    //   text = JSON.stringify(location);
    //   // console.log(location)
    // }

    function toggleDatePickerModalVisibility(){
      setDatePickerModalVisible(!isDatePickerModalVisible)
    }


    async function checkGames(){
        const q = query(collection(db, "Games"))
        getDocs(q)
        .then((querySnapshot)=>{
            querySnapshot.forEach((doc) => {
                if (doc.data().team_1 != undefined || doc.data().team_2 != undefined ){
                    if (doc.data().team_1.includes(username) || doc.data().team_2.includes(username)){
                      setOwnerHasGame(true);
                    }
                  }
            })
        })
      }

    function checkInputs(){
      let today = new Date();
      let year = today.getFullYear();
      let month = today.getMonth() + 1;
      let day = today.getDate();
      let hour = today.getHours();
      let minute = today.getMinutes();

      if(datePicked == null){
        return "problem"
      }else{
        console.log("date is null: "+ (datePicked == null))
        let year_picked = ""
        for (var i = 0; i <= 3; i++) {
          year_picked += datePicked.charAt(i);
        }
        year_picked = parseInt(year_picked);
        let month_picked = parseInt(datePicked.charAt(5) + datePicked.charAt(6));
        let day_picked = parseInt(datePicked.charAt(8) + datePicked.charAt(9));
        let hour_picked = parseInt(datePicked.charAt(11) + datePicked.charAt(12));
        let minute_picked = parseInt(datePicked.charAt(14) + datePicked.charAt(15));
        // console.log(year_picked+"/"+month_picked+"/"+day_picked)

        if(gameName == null){
          return "game_name_problem"
        }else if (gameName.trim().length === 0){
          return "game_name_problem"
        }

        if (month_picked > month){
          return "no_problem"
        } else if (month_picked == month){
          if (day_picked > day){
            return "no_problem"
          } else if (day_picked == day){
            if (hour_picked > hour){
              return "no_problem"
            } else if ( hour_picked == hour){
              if (minute_picked> minute){
                return "no_problem"
              } else {
                return "problem"
              } 
            } else{
              return "problem"
            }
          }
        } else {
          return "problem"
        }
      }
  }

    async function submitGame(){
      let problem = checkInputs();
      await checkGames();
      if (ownerHasGame == true){
        Alert.alert("Error","You have already made one game!");
      } else{
        if(problem == "problem"){
          Alert.alert("Error","Pick an appropriate date.");
        }else if(problem == "no_problem"){
          await getLocation();
          let year_picked = ""
          for (var i = 0; i <= 3; i++) {
            year_picked += datePicked.charAt(i);
          }
          year_picked = parseInt(year_picked);
          let month_picked = parseInt(datePicked.charAt(5) + datePicked.charAt(6));
          let day_picked = parseInt(datePicked.charAt(8) + datePicked.charAt(9));
          let hour_picked = parseInt(datePicked.charAt(11) + datePicked.charAt(12));
          let minute_picked = parseInt(datePicked.charAt(14) + datePicked.charAt(15));
          const docID = uuid.v4();
          const myDoc = doc(db, "Games", docID);
            let time_of_game ={'hour':hour_picked,
                              'minute':minute_picked}
            let date_of_game = {'day':day_picked,
                              'month': month_picked,
                              'year':year_picked}
            const docData = {
              "name": gameName,
              "owner": username,
              "latitude": location.coords.latitude ,
              "longitude": location.coords.longitude,
              "number_of_players": numberOfPlayers*2,
              "team_1":[username],
              "team_2":[],
              "time_of_game":time_of_game,
              "date_of_game":date_of_game
            }

            setDoc(myDoc, docData)
              .then(() => {
                Alert.alert("Game Created","");
                navigation.replace("SearchGameMain",{username});
              })
              .catch((error) => {
                Alert.alert("","An Error has occured please try again later");
              });
          }
        else if(problem =="game_name_problem"){
          Alert.alert("Error","Write a name for your game.");
        }
    }
    }

    function gotoSearchGameMainScreen(){
      navigation.navigate("SearchGameMain",{"username":username});
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
                <Text style={styles.pageTitle}>Create a Game</Text>
            </View>
              <Text style={styles.textStyle}>
                Name your Game
              </Text>
                <TextInput
                  style={styles.input}
                  onChangeText={setGameName}
                  value={gameName}
                  placeholder="Lobby Name"
                  keyboardType="default"
                />
                <Text style={styles.textStyle}>
                    Number of players per team
                </Text>
                <Picker
                  selectedValue={numberOfPlayers}
                  style={styles.picker}
                  onValueChange={(itemValue, itemIndex)=> setNumberOfPlayers(itemValue)}
                >
                  <Picker.Item label="1" value="1" />
                  <Picker.Item label="2" value="2" />
                  <Picker.Item label="3" value="3" />
                  <Picker.Item label="4" value="4" />
                  <Picker.Item label="5" value="5" />
                </Picker>
                <Text style={styles.textStyle}>Select Time and Date of the Game</Text>
                <DatePickerModal
                 toggleDatePickerModalVisibility={toggleDatePickerModalVisibility} 
                 isDatePickerModalVisible={isDatePickerModalVisible} 
                 setDatePicked= {setDatePicked}
                 currentDate={new Date()}
                 />
            <TouchableOpacity style={styles.createBtn} onPress={submitGame}>
              <Text style={styles.btnText}>Create Game!</Text>
            </TouchableOpacity>
            <Text style={styles.warning}>{warning}</Text>
        </View>
      );

      
}

const styles = StyleSheet.create({
    
  input: {
    height: 50,
    width: "75%",
    margin: 12,
    marginBottom:20,
    borderWidth: 1,
    padding: 10,
    backgroundColor:"white",
    color:"black",
    fontSize:18,
    borderRadius:7,
  },

  createBtn:{
    borderRadius: 12,
    borderWidth:2,
    borderColor:colors.textColor,
    backgroundColor: "white",
    textAlign:'center',
    alignItems:"center",
    width:"55%",
    paddingVertical:14,
    marginTop:20,
    marginBottom:10,
    marginLeft:"auto",
    marginRight:"auto",
  },

  btnText:{
    color:colors.textColor,
    fontSize:20,
    fontWeight:"bold",
  },
  
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
    alignItems: "center",
    justifyContent: "center",
  },

  
  icons:{
    width:45,
    height:30, 
    marginRight:20,
    marginLeft:20,
  },

  iconView:{
    position: 'absolute',
    top:0,
    alignSelf: "flex-start",
    alignItems:"baseline",
    justifyContent:"center",
    flexDirection:"row",
    marginTop:30,
  },

  picker:{
    height: 50,
    width: 150,
    marginBottom:20,
    backgroundColor:"white",
    marginTop:10,

  },

  textStyle:{
    fontSize:21,
    fontWeight:"bold",
  },

  pageTitle:{
    fontSize:30,
    borderColor:colors.bgColor,
    borderBottomColor:colors.textColor,
    borderWidth: 2,
  },
});