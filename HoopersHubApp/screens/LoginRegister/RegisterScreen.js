import React, { useState,useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Pressable, 
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from '@react-navigation/core';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {doc, getDoc, setDoc } from 'firebase/firestore';

import { db } from '../../Config'
import {colors} from "./../colors";


export default function Register(props) {
    
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [heigth, setHeigth] = useState(0);
    const [weigth, setWeigth] = useState(0);
    const [yearOfBirth, setYear] = useState(0);
    const [visiblePassword,setVisiblePassword] = useState(true);
    const [eye,setEye] = useState("eye");
    const [warning,setWarning] = useState("");
    const [userDoc, setUserDoc] = useState(null);
    const [radioButton,setRadioButton] = useState(true);
    const navigation = useNavigation();
    
    useEffect(() => {
      setName("");
      setUsername("");
      setPassword("");
      setHeigth(0);
      setWeigth(0);
      setYear(0);
      setVisiblePassword(true);
      setEye("eye");
      setWarning("");
      setUserDoc(null)
    }, []);
  
    function handlePasswordVisibility(){
      setEye(eye === "eye" ? "eye-off" : "eye");
      setVisiblePassword(!visiblePassword);
    }

    function handleMessage(problem){
      switch (problem){      
        case "name_problem":
          setWarning("Name must contain from 4 to 15 characters.");
          break; 
        case "heigth_problem":
          setWarning("Heigth must be a number that make sense");
          break;
        case "weigth_problem":
          setWarning("Weigth must be a number that make sense");
          break;
        case "year_problem":
          setWarning("Year of birth must be a number that make sense");
          break;
        case "password_problem":
          setWarning("Name must contain from 6 to 20 characters");
          break;
        case "username_problem":
          setWarning("The username already exists please use another one");
          break;
      }
      
    }

    function checkInputs(){
      if (name.length > 15 || name.length < 4){
        return "name_problem"
      }

      if(heigth.length > 3 || isNaN(heigth) || heigth > 210 || heigth < 40){
        return "heigth_problem"
      }

      if(weigth.length > 3 || isNaN(weigth) || weigth < 30 || weigth > 200){
        return "weigth_problem"
      }

      if(!(yearOfBirth.length == "4")  || isNaN(yearOfBirth) ||  yearOfBirth > new Date().getFullYear() || yearOfBirth < new Date().getFullYear() - 90){ 
        return "year_problem"
      }

      if (password.length > 20  || password.length < 6){ 
        return "password_problem"
      }

      return "no_problem"
    }

    async function handleRegister (){
      let problem = checkInputs();

      if (problem === "no_problem"){
        const myDoc = doc(db, "HHcollection", username);

        let query_result = await getDoc(myDoc);
       
        if (query_result.data() !== undefined){
          handleMessage("username_problem");
        }else{
          const myDoc2 = doc(db, "HHcollection", username)
          
          const docData = {
            "name": name,
            "username":username,
            "password":password,
            "heigth":heigth,
            "weigth":weigth,
            "yearOfBirth":yearOfBirth,
            "friendRequests": [],
            "friends":[],
            "ratings":[],
            "myRatings":[],
            "groups":[],
            "training":[],
            "tournaments":[],
            "begginer":radioButton
          }
          
          setDoc(myDoc2, docData)
          .then(() => {
            Alert.alert("","Successful Sign up");
            navigation.replace("Login");
          })
          .catch((error) => {
            Alert.alert("","An Error has occured please try again later (error code: 1)");
          });
        }
      }else{
        handleMessage(problem);
      }
    }

    function change2Login(){
        navigation.replace('Login');
    }

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require("../../assets/icon4.png")} />
            <StatusBar style="auto" />

            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Name"
                    placeholderTextColor= {colors.textColor}
                    onChangeText={(name) => setName(name)}
                />
            </View>

            <View style={styles.inputView}>
              <TextInput 
                style={styles.TextInput}
                keyboardType='numeric'
                placeholder="Heigth (cm)"
                placeholderTextColor={colors.textColor}
                onChangeText={(heigth)=>setHeigth(heigth)}
                maxLength={3}  
              />
            </View>

            <View style={styles.inputView}>
              <TextInput 
                style={styles.TextInput}
                keyboardType='numeric'
                placeholder="Weigth (kg)"
                placeholderTextColor={colors.textColor}
                onChangeText={(weigth)=>setWeigth(weigth)}
                maxLength={3}  
              />
            </View>

            <View style={styles.inputView}>
              <TextInput 
                style={styles.TextInput}
                keyboardType='numeric'
                placeholder="Year of Birth"
                placeholderTextColor={colors.textColor}
                onChangeText={(year)=>setYear(year)}
                maxLength={4}  
              />
            </View>

            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Username"
                    placeholderTextColor= {colors.textColor}
                    onChangeText={(username) => setUsername(username)}
                />
            </View>
   
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Password"
                    placeholderTextColor={colors.textColor}
                    secureTextEntry={visiblePassword}
                    onChangeText={(password) => setPassword(password)}
                />
                <Pressable 
                  style={styles.eye_icon} 
                  onPress={handlePasswordVisibility}
                >
                  <MaterialCommunityIcons name={eye} size={22} color="#232323" />
                </Pressable>
            </View>

            <View style={styles.radioButtonView}>
              <View style={[styles.radioButton,{backgroundColor: radioButton ? "white" : colors.textColor}]}>
                <TouchableOpacity style={{width:20,height:20}} onPress={() => setRadioButton(!radioButton)}/>
              </View>
              <Text>I play basketball professionally</Text>
            </View>

            <View style={styles.radioButtonView}>
              <View style={[styles.radioButton,{backgroundColor: !radioButton ? "white" : colors.textColor}]}>
                <TouchableOpacity style={{width:20,height:20}} onPress={() => setRadioButton(!radioButton)}/>
              </View>
              <Text>I do not play basketball professionally</Text>
            </View>

            <TouchableOpacity style={styles.registerBtn} onPress={handleRegister}>
                <Text style={styles.registerText}>Register</Text>
            </TouchableOpacity>

            <TouchableOpacity>
                <Text style={styles.login_link} onPress={change2Login}>Login Here</Text>
            </TouchableOpacity>
            <Text style={styles.warning}>{warning}</Text>
      </View>
    );
}

const styles = StyleSheet.create({

    radioButton:{
      borderRadius:15,
      borderColor:"white",
      borderWidth:2,
      marginRight:10,
      marginBottom:10,
    },

    radioButtonView:{
      flexDirection:"row",
      marginRight:"auto",
      marginLeft:"5%",
    },

    container: {
      flex: 1,
      backgroundColor: colors.bgColor,
      alignItems: "center",
      justifyContent: "center",
    },
   
    image: {
      marginTop:-25,
      marginBottom: 40,
      width: 95,
      height:110
    },
   
    inputView: {
      backgroundColor: "white",
      borderRadius: 30,
      width: "85%",
      height: 45,
      marginBottom: 15,
      alignItems:'flex-start',
      flexDirection:'row',
    },
   
    TextInput: {
      flex: 1,
      marginLeft: 20,
      marginTop:10
    },

    login_link: {
      height: 30,
      marginTop: 30,
      textDecorationLine:'underline',
      color:colors.textColor,
    },
   
    registerBtn: {
      width: "50%",
      borderRadius: 25,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "white",
      marginTop:10
    },

    registerText:{
      color:colors.textColor
    },

    numericInput:{
      backgroundColor: "white",
      borderRadius: 30,
      width: "85%",
      // height: 45,
      alignItems:'flex-start',
    },

    eye_icon:{
      marginRight:15,
      marginTop:10
    },

    warning:{
      color:"red",
    }
});