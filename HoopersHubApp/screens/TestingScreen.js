import { useNavigation } from '@react-navigation/core'
import React, {useState,useEffect } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from "react-native";
import { deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';

import { db } from '../Config'
import { contains } from '@firebase/util';

export default function TestingScreen(props){
    const navigation = useNavigation();
    const [userDoc, setUserDoc] = useState(null);
    const [flag, setflag] = useState(false)
    
    
    function createData(){
        console.log("CREATE DATA");
        const username = "Thanasis";
        const myDoc = doc(db, "HHCollection", username);
        const docData = {
            "name": "name",
            "username":username,
            "password":"password",
            "heigth":"178",
            "weigth":"78",
            "yearOfBirth":"2000"
          }
          
          setDoc(myDoc, docData)
            .then(() => {
              alert("Successful Sign up");
            })
            .catch((error) => {
              alert(error.message)
          })
    }

    function getData(){
        console.log("GET DATA");
        const username = "thanasis";
        const myDoc = doc(db, "HHcollection", username);
        getDoc(myDoc)
        .then((snapshot) => {
            setUserDoc(null);
            // console.log(snapshot)
            if (snapshot.exists) {
                setUserDoc(snapshot.data());
                // console.log(snapshot.data());
                // console.log(userDoc);
                if(snapshot.data() == undefined){
                    console.log("NOT FOUND");
                }else{
                    console.log("FOUND");
                }
            }
            else {
                alert("No Doc Found")
            }
        })
        .catch((error) => {
          alert(error.message)
        });
    }

    // async function getData(){
    //     const users = await firestore().collection('Users').get();
    //     const user = await firestore().collection('Users').doc('ABC').get();
    // }

    return(

        <View style={styles.container}>
            <TouchableOpacity style={styles.buttons} onPress={createData}>
                <Text style={styles.btnsText}>CREATE</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttons} onPress={getData}>
                <Text style={styles.btnsText}>GET</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#e5a646",
      alignItems: "center",
      justifyContent: "center",
    },
    
    buttons: {
        width: "70%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
        backgroundColor: "white",
    },

    btnsText:{
        fontSize:20,
    },
});