import React, {useState} from 'react';
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
import {doc, getDoc} from 'firebase/firestore';
import { useRoute } from '@react-navigation/native';

import { db } from '../Config'
import { colors } from './colors';
import ShotsModal from "../components/ShotsModal";


export default function GroupMainScreen() {
    const route = useRoute();
    const navigation = useNavigation();
    const username = route.params.username;
    const [showShotsModal,setShowShotsModal] = useState(false);
    const [btnPressed,setBtnPressed] = useState(0);
    const [results,setResults] = useState([0,0,0,0,0,0,0]);

    function gotoHomeScreen(){
        navigation.navigate("Home",{"username":username});
    }

    function toggleModalVisibility(number){
        setBtnPressed(number);
        setShowShotsModal(!showShotsModal);
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/basket-court4.jpg')} resizeMode="stretch" style={styles.image}>
                <ShotsModal
                    isShotsModalVisible={showShotsModal}
                    toggleShotsModalVisibility={toggleModalVisibility}
                    btnNumber={btnPressed}
                    // results={results}
                    // setResults={setResults}
                />
                <View style={styles.iconView}>
                    <TouchableOpacity onPress={gotoHomeScreen}>
                        <Image 
                            style={styles.icons} 
                            source={require('../assets/back-icon.png')}
                        />
                    </TouchableOpacity>
                    
                </View>

               <View  style={styles.btnsView}>
                    
                   <Text style={styles.pageTitle}>Shoot 3 shots from each point</Text>

                   <TouchableOpacity style={styles.btnStyle} onPress={()=>toggleModalVisibility(1)}>
                       <Text style={styles.btnText}>1</Text>
                   </TouchableOpacity>

                   <TouchableOpacity style={styles.btnStyle} onPress={()=>toggleModalVisibility(2)}>
                       <Text style={styles.btnText}>2</Text>
                   </TouchableOpacity>

                   <TouchableOpacity style={styles.btnStyle} onPress={()=>toggleModalVisibility(3)}>
                       <Text style={styles.btnText}>3</Text>
                   </TouchableOpacity>

                   <TouchableOpacity style={styles.btnStyle} onPress={()=>toggleModalVisibility(4)}>
                       <Text style={styles.btnText}>4</Text>
                   </TouchableOpacity>

                   <TouchableOpacity style={styles.btnStyle} onPress={()=>toggleModalVisibility(5)}>
                       <Text style={styles.btnText}>5</Text>
                   </TouchableOpacity>

                   <TouchableOpacity style={styles.btnStyle} onPress={()=>toggleModalVisibility(6)}>
                       <Text style={styles.btnText}>6</Text>
                   </TouchableOpacity>

                   <TouchableOpacity style={styles.btnStyle} onPress={()=>toggleModalVisibility(7)}>
                       <Text style={styles.btnText}>7</Text>
                   </TouchableOpacity>
               </View>
            </ImageBackground>
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
        backgroundColor: "white",
        marginHorizontal:15,
        borderColor:"#962020",
        borderWidth: 2,
    },

    btnText:{
        fontSize:26,
        fontWeight: 'bold',
        color:"#962020",
    },

    btnsView:{
        alignSelf: "center",
        marginTop:"auto",
        marginBottom:"40%",
        flexDirection:"row",
        flexWrap: 'wrap',
        justifyContent:"center",
        // justifyContent: "flex-end",
    },

    container: {
        flex: 1,
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
        color:"#962020",
        marginBottom:40,
        textAlign:"center"
    },
   
});