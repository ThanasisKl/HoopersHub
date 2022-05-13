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
import {doc, getDoc, setDoc} from 'firebase/firestore';
import { useRoute } from '@react-navigation/native';

import { db } from '../../Config'
import { colors } from '../colors';
import ShotsModal from "../../components/ShotsModal";
import TrainingResultsModal from "../../components/TrainingResultsModal";


export default function TrainingSessionScreen() {
    const route = useRoute();
    const navigation = useNavigation();
    const username = route.params.username;

    const [isResultModalVisible,setResultModalVisibility] = useState(false);
    const [showShotsModal,setShowShotsModal] = useState(false);
    const [btnPressed,setBtnPressed] = useState(0);
    const [results,setResults] = useState([0,0,0,0,0,0,0]);
    const [btnColor,setBtnColor] = useState([true,true,true,true,true,true,true]);
    const [newSave,setNewSave] = useState(false);

    if(newSave){
        setNewSave(false);
        handleFinish();
    }

    function toggleResultModalVisibility(){
        setResultModalVisibility(!isResultModalVisible)
    }

    function gotoTrainingMainScreen(){
        navigation.navigate("TrainingMain",{"username":username});
    }

    function toggleModalVisibility(number){
        setBtnPressed(number);
        setShowShotsModal(!showShotsModal);
    }

    function handleFinish(){
        const myDoc = doc(db, "HHcollection",username);
        getDoc(myDoc)
        .then((user)=>{
            const user_data = user.data();
            const new_session = {
                "Point_1": results[0],
                "Point_2": results[1],
                "Point_3": results[2],
                "Point_4": results[3],
                "Point_5": results[4],
                "Point_6": results[5],
                "Point_7": results[6],
            }

            const new_training_data = {training:[...user_data.training,new_session]}
            setDoc(myDoc,new_training_data,{merge: true})
            .then(()=>{
                Alert.alert("Congratulations!","Training Session Completed!");
                navigation.navigate("TrainingMain",{username});
            }).catch((error) =>{
                console.log(error)
            });

        }).catch((error)=>{
            Alert.alert("","An Error has occured please try again later");
        }); 
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../assets/basket-court4.jpg')} resizeMode="stretch" style={styles.image}>
                <ShotsModal
                    isShotsModalVisible={showShotsModal}
                    toggleShotsModalVisibility={toggleModalVisibility}
                    btnNumber={btnPressed}
                    results={results}
                    setResults={setResults}
                    btnColor={btnColor}
                    setBtnColor={setBtnColor}
                />

                <TrainingResultsModal
                    isModalVisible={isResultModalVisible}
                    toggleModalVisibility={toggleResultModalVisibility}
                    results={results}
                    setNewSave={setNewSave}
                />

                <View style={styles.iconView}>
                    <TouchableOpacity onPress={gotoTrainingMainScreen}>
                        <Image 
                            style={styles.icons} 
                            source={require('../../assets/back-icon.png')}
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

                   <TouchableOpacity style={styles.finishBtn} onPress={toggleResultModalVisibility}>
                       <Text style={styles.finishText}>FINISH</Text>
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
        fontSize:22,
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