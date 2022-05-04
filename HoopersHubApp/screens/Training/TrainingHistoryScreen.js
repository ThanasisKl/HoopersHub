import React, {useState} from 'react';
import { useNavigation } from '@react-navigation/core'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
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

import { db } from '../../Config'
import { colors } from '../colors';
import ShotsModal from "../../components/ShotsModal";


export default function TrainingHistoryScreen() {
    const route = useRoute();
    const navigation = useNavigation();
    const username = route.params.username;
    const trainingHistoryData = route.params.training_history;
    const [showShotsModal,setShowShotsModal] = useState(false);
    const [btnPressed,setBtnPressed] = useState(0);
    // const [results,setResults] = useState([0,0,0,0,0,0,0]);
    // const [btnColor,setBtnColor] = useState([true,true,true,true,true,true,true]);
    const [tableData,setTableData] = useState({HeadTable : ['Θέση 1', 'Θέση 2', 'Θέση 3', 'Θέση 4', 'Θέση 5','Θέση 6','Θέση 7'],
    DataTable: [
      trainingHistoryData
    ]})

    function gotoHomeScreen(){
        navigation.navigate("Home",{"username":username});
    }

    function toggleModalVisibility(number){
        setBtnPressed(number);
        setShowShotsModal(!showShotsModal);
    }

    function handleFinish(){
        console.log(results);//fixme
        /*
            beginner
            regular
            great
            rising star
            professional
            legend
        */ 
    }

    return (
        <View style={styles.container}>
                <View style={styles.iconView}>
                    <TouchableOpacity onPress={gotoHomeScreen}>
                        <Image 
                            style={styles.icons} 
                            source={require('../../assets/back-icon.png')}
                        />
                    </TouchableOpacity> 
                </View>
                <View>
                <Table borderStyle={{borderWidth: 1, borderColor: '#ffa1d2'}}>
                    <Row data={tableData.HeadTable} style={styles.HeadStyle} textStyle={styles.TableText}/>
                    <Rows data={tableData.DataTable} textStyle={styles.TableText}/>
                </Table>
                <TouchableOpacity style={styles.finishBtn} onPress={handleFinish}>
                       <Text style={styles.finishText}>finish</Text>
                   </TouchableOpacity>
                </View>
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


    // Table design
    HeadStyle: { 
        height: 50,
        alignContent: "center",
        backgroundColor: '#ffe0f0'
      },
      TableText: { 
        margin: 10
      }
   
});