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
import {doc, getDoc} from 'firebase/firestore';
import { useRoute } from '@react-navigation/native';

import { db } from '../../Config'
import { colors } from './../colors';
import ShotsModal from "../../components/ShotsModal";
// import GetLocation from 'react-native-get-location'
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';



export default function FindGameNearbyScreen() {

  const route = useRoute();
  const navigation = useNavigation();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [tableData,setTableData] = useState({DataTable:["Game 1 - 3/10 players - 1km away","Join","Game 2 - 2/4 players - 2km away","Join","Game 3 - 6/8 players - 3km away","Join"]})

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
    console.log
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
   
    <View>
        <Table borderStyle={{borderWidth: 2, borderColor: colors.header}}>
            <Rows data={tableData.DataTable} textStyle={{textAlign:"center",fontWeight:"bold"}}/>
\       </Table>
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

  buttons: {
      width: "70%",
      borderRadius: 7,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 30,
      backgroundColor: "white",
      
  },

  btnsText:{
      fontSize:20,
      fontWeight: 'bold',
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
      backgroundColor: colors.bgColor,
      alignItems: "center",
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