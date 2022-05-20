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

import { db } from '../../Config'
import { colors } from './../colors';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';


export default function GameLobbyScreen() {
    const route = useRoute();
    const navigation = useNavigation();
    const username = route.params.username;
    const [showShotsModal,setShowShotsModal] = useState(false);
    const [btnPressed,setBtnPressed] = useState(0);

    function gotoFindGameNearbyScreen(){
        navigation.navigate("FindGameNearby",{"username":username});
    }

    return (
        <View style={styles.container}>
        <View style={styles.iconView}>
            <TouchableOpacity onPress={gotoFindGameNearbyScreen}>
                <Image 
                    style={styles.icons} 
                    source={require('../../assets/back-icon.png')}
                />
            </TouchableOpacity>
        </View>
        <View style={styles.upperContainer}>
            <TouchableOpacity onPress={gotoFindGameNearbyScreen}>
                <Image 
                    style={styles.map} 
                    source={require('../../assets/map_transparent.png')}
                />
            </TouchableOpacity>
        </View>

        <View>
            <Text style={{color:colors.darkRed, margin:50, textAlign: 'center', fontSize:20, fontWeight:"bold",}}>GAME DATE: 15:00 23/05/2022</Text>
            <Table borderStyle={{borderWidth: 3, borderColor: colors.darkRed}}>

            <Row style={[styles.row ,{height: 40,  backgroundColor: '#f1f8ff'}]} data= {["TEAM 1","TEAM 2"]} textStyle={styles.text_header} />
            <Row style={styles.row}  data = {["Selios",'Thanasis']}  textStyle={styles.text} />
            <Row style={styles.row} data = {["Iasonas",'Themis']} textStyle={styles.text} />
            <Row style={styles.row} data = {['Nikos','Giwrgos']}  textStyle={styles.text}/>
            <Row style={styles.row} data = {['  ','Xristos']}  textStyle={styles.text}/>
            <Row style={styles.row} data = {['  ',' ']}  textStyle={styles.text}/>

            </Table>
            <View>
            <TouchableOpacity style={styles.btnStyle}>
                <Text style={styles.btnsText}>Change teams</Text>
            </TouchableOpacity>
            </View>
            <View>
            <TouchableOpacity style={styles.btnStyle}>
                <Text style={styles.btnsText}>Leave Game</Text>
            </TouchableOpacity>
            </View>

        </View>
    </View>
    )
}

const styles = StyleSheet.create({

//   customBtnStyle:{
//     width: "100%",
//     borderRadius: 100,
//     borderColor:colors.lightBlue,
//     borderWidth: 50,
//     alignItems: "center",
//     justifyContent: "center",
//   },

  btnStyle:{
    width: "50%",
    height: 50,
    width: 200,
    alignItems: "center",
    justifyContent: "center",
    marginTop:40, 
    marginHorizontal:95,
    borderColor:colors.darkRed,
    borderWidth: 2,
    backgroundColor:colors.darkRed
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

  map:{
    width:45,
    height:40, 
    marginRight:20,
    marginTop:20,
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
    // alignItems: "center",
    justifyContent: "center",
    backgroundColor:colors.selectedtextColor
    },

    text_header: { textAlign: 'center',
    fontSize:16,
    fontWeight: 'bold'
     },

    text: { textAlign: 'center',},
 
    upperContainer:{
        flex: 1,
        position:'absolute',
        top:30,
        justifyContent:'flex-end',
        alignSelf:'flex-end',
        flexDirection:'row'
    },
});