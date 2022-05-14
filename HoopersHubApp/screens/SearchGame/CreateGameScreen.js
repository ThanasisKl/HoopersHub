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
import {doc, getDoc, setDoc } from 'firebase/firestore';
import { useRoute } from '@react-navigation/native';

import { db } from '../../Config'
import { colors } from './../colors';
import * as Location from 'expo-location';
import { TextInput } from 'react-native-gesture-handler';
import {Picker} from '@react-native-picker/picker';
import {TimePicker} from 'react-native-simple-time-picker';
// import { set } from 'react-native-reanimated';
import DatePickerModal  from '../../components/DatePickerModal';
// import DatePicker from 'react-native-date-picker'

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
    const [date, setDate] = useState(new Date());
    
    const[isDatePickerModalVisible,setDatePickerModalVisible] = useState(false);

  
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
      // console.log(location)
    }

    function toggleDatePickerModalVisibility(){
      setDatePickerModalVisible(!isDatePickerModalVisible)
    }

    function checkInputs(){
      let today = new Date();
      let hours = (today.getHours() < 10 ? '0' : '') + today.getHours();
      let minutes = (today.getMinutes() < 10 ? '0' : '') + today.getMinutes();
      console.log

      if ((selectedHours - hours) > 0){
        return "no_problem"
      } else if ((selectedHours - hours) == 0){
        if ((selectedMinutes - minutes) > 0 ){
          return "no_problem"
        }
      } else {
        return "problem"
      }
    }

    async function submitGame(){
      let problem = checkInputs();

      if (problem == "no_problem"){
        const myDoc = doc(db, "HHcollection", username);
        let query_result = await getDoc(myDoc);
        const docData = {
          "name": gameName,
          "owner": username,
          "latitude": location.coords.latitude ,
          "longitude": location.coords.longitude,
          "team_1":[],
          "team_2":[],
          "time_of_game":[selectedHours,selectedMinutes]
        }
      } else{
        setWarning("Pick an appropriate time")
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
            </View>
              <Text>
                Name your Game :
              </Text>
                <TextInput
                style={styles.input}
                onChangeText={setGameName}
                value={gameName}
                placeholder="Game Title"
                keyboardType="default"
                />
                <Text>
                    Number of players per team:
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
                <Text>Time of the Game:</Text>
                <DatePickerModal
                 toggleDatePickerModalVisibility={toggleDatePickerModalVisibility} 
                 isDatePickerModalVisible={isDatePickerModalVisible} 
                 />
{/* 
                <TimePicker
                  selectedHours={selectedHours}
                  //initial Hourse value
                  selectedMinutes={selectedMinutes}
                  //initial Minutes value
                  onChange={(hours, minutes) => {
                    setSelectedHours(hours);
                    setSelectedMinutes(minutes);
                  }}
                /> */}
            <TouchableOpacity style={styles.createBtn} onPress={submitGame}>
                            <Text style={styles.nextText}>Create Game!</Text>
            </TouchableOpacity>
            <Text style={styles.warning}>{warning}</Text>
        </View>
      );

      
}

const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      marginBottom:20,
      borderWidth: 1,
      padding: 10,
    },

    createBtn:{
      borderRadius: 12,
      borderWidth:2,
      borderColor:colors.textColor,
      backgroundColor: "white",
      textAlign:'center',
      alignItems:"center",
      width:"75%",
      paddingVertical:14,
      marginTop:20,
      marginBottom:10,
      marginLeft:"auto",
      marginRight:"auto",
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
    marginTop:30,
    marginLeft:20,
},

iconView:{
    position: 'absolute',
    top:0,
    alignSelf: "flex-start",
    flexDirection:"row"
},

picker:{
  height: 50,
  width: 150,
  marginBottom:20
}

  });