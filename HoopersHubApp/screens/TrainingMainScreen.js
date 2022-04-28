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
    const [btnColor,setBtnColor] = useState([true,true,true,true,true,true,true]);

    function gotoHomeScreen(){
        navigation.navigate("Home",{"username":username});
    }

    function toggleModalVisibility(number){
        setBtnPressed(number);
        setShowShotsModal(!showShotsModal);
    }

    function handleFinish(){
        console.log(results);//fixme
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/basket-court4.jpg')} resizeMode="stretch" style={styles.image}>
                <ShotsModal
                    isShotsModalVisible={showShotsModal}
                    toggleShotsModalVisibility={toggleModalVisibility}
                    btnNumber={btnPressed}
                    results={results}
                    setResults={setResults}
                    btnColor={btnColor}
                    setBtnColor={setBtnColor}
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

                   <TouchableOpacity style={[styles.btnStyle,{backgroundColor: btnColor[0] ? 'white' :colors.lightBlue}]} onPress={()=>toggleModalVisibility(1)}>
                       <Text style={styles.btnText}>1</Text>
                   </TouchableOpacity>

                   <TouchableOpacity style={[styles.btnStyle,{backgroundColor: btnColor[1] ? 'white' :colors.lightBlue}]} onPress={()=>toggleModalVisibility(2)}>
                       <Text style={styles.btnText}>2</Text>
                   </TouchableOpacity>

                   <TouchableOpacity style={[styles.btnStyle,{backgroundColor: btnColor[2] ? 'white' :colors.lightBlue}]} onPress={()=>toggleModalVisibility(3)}>
                       <Text style={styles.btnText}>3</Text>
                   </TouchableOpacity>

                   <TouchableOpacity style={[styles.btnStyle,{backgroundColor: btnColor[3] ? 'white' :colors.lightBlue}]} onPress={()=>toggleModalVisibility(4)}>
                       <Text style={styles.btnText}>4</Text>
                   </TouchableOpacity>

                   <TouchableOpacity style={[styles.btnStyle,{backgroundColor: btnColor[4] ? 'white' :colors.lightBlue}]} onPress={()=>toggleModalVisibility(5)}>
                       <Text style={styles.btnText}>5</Text>
                   </TouchableOpacity>

                   <TouchableOpacity style={[styles.btnStyle,{backgroundColor: btnColor[5] ? 'white' :colors.lightBlue}]} onPress={()=>toggleModalVisibility(6)}>
                       <Text style={styles.btnText}>6</Text>
                   </TouchableOpacity>

                   <TouchableOpacity style={[styles.btnStyle,{backgroundColor: btnColor[6] ? 'white' :colors.lightBlue}]} onPress={()=>toggleModalVisibility(7)}>
                       <Text style={styles.btnText}>7</Text>
                   </TouchableOpacity>

                   <TouchableOpacity style={styles.finishBtn} onPress={handleFinish}>
                       <Text style={styles.finishText}>finish</Text>
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
        marginHorizontal:15,
        borderColor:colors.darkRed,
        borderWidth: 2,
    },

    btnText:{
        fontSize:26,
        fontWeight: 'bold',
        color:colors.darkRed,
    },

    btnsView:{
        alignSelf: "center",
        marginTop:"auto",
        marginBottom:"30%",
        flexDirection:"row",
        flexWrap: 'wrap',
        justifyContent:"center",
    },

    container: {
        flex: 1,
    },

    finishBtn:{
        width: "40%",
        borderRadius: 7,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        marginBottom:10,
        backgroundColor: 'white',
        borderColor:"black",
        borderWidth: 2.5,
    },

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
   
});