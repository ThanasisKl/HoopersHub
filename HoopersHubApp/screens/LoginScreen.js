import { StatusBar } from "expo-status-bar";
import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Pressable,
    TouchableOpacity,
    KeyboardAvoidingView,
    Alert,
} from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {doc, getDoc} from 'firebase/firestore';

import { db } from '../Config'
import {colors} from "./colors";


export default function LoginScreen(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [credentialsWarning,setCredentialsWarning] = useState("");
    const [visiblePassword,setVisiblePassword] = useState(true);
    const [eye,setEye] = useState("eye");

    const navigation = useNavigation();


    function handlePasswordVisibility(){
      setEye(eye === "eye" ? "eye-off" : "eye");
      setVisiblePassword(!visiblePassword);
    }


    function change2Register(){
      navigation.replace("Register");
    }

    async function getCredentials (){
      const myDoc = doc(db, "HHcollection", username);
      let gotoHome = false;
      let query_result = await getDoc(myDoc);
      let credentials = query_result.data();
      if (credentials !== undefined){
        if (credentials.password === password){
          gotoHome = true;
        }
      }
      return gotoHome;
    }

    function validationCheck (){
      getCredentials()
      .then((response) => {
        if(response)navigation.navigate("Home",{"username":username});
        setCredentialsWarning("");
        setUsername("");
        setPassword("");
        if(!response)setCredentialsWarning("Incorrect Password or Username");
      })
      .catch((error)=>{
        setCredentialsWarning("Incorrect Password or Username");
      })
    }

    return (
        <KeyboardAvoidingView style={styles.container}>
            <Image style={styles.image} source={require("../assets/icon3.jpg")} />
            <StatusBar style="auto" />
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Username"
                    placeholderTextColor = {colors.textColor}
                    onChangeText={(username) => setUsername(username)}
                    value={username}
                />
            </View>
   
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Password"
                    placeholderTextColor={colors.textColor}
                    secureTextEntry={visiblePassword}
                    onChangeText={(password) => setPassword(password)}
                    value={password}
                />
                <Pressable 
                  style={styles.eye_icon} 
                  onPress={handlePasswordVisibility}
                >
                  <MaterialCommunityIcons name={eye} size={22} color="#232323" />
                </Pressable>
            </View>
   
            <TouchableOpacity style={styles.loginBtn} onPress={validationCheck}>
                <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity>
                <Text style={styles.register_button} onPress={change2Register}>Register Here</Text>
            </TouchableOpacity>

            <Text style={styles.warning}>{credentialsWarning}</Text>
      </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    eye_icon:{
      marginRight:15,
      marginTop:10
    },

    container: {
      flex: 1,
      backgroundColor: colors.bgColor,
      alignItems: "center",
      justifyContent: "center",
    },
   
    image: {
      marginTop:-25,
      marginBottom: 60,
      width: 150,
      height:120
    },
   
    inputView: {
      backgroundColor: "white",
      borderRadius: 30,
      width: "85%",
      height: 45,
      marginBottom: 10,
      alignItems:'flex-start',
      flexDirection:'row',
    },
   
    TextInput: {
      height: 30,
      flex: 1,
      marginLeft: 20,
      marginTop:8,
    },
   
    register_button: {
      height: 30,
      textDecorationLine:'underline',
      marginTop: 60,
      color:colors.textColor
    },
   
    loginBtn: {
      width: "50%",
      borderRadius: 25,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 100,
      backgroundColor: "white",
    },

    loginText:{
      color: colors.textColor,
    },

    warning:{
      color:'red',
      paddingTop:20,
    }
});