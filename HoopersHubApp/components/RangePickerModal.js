import React, { useState } from 'react'
import { Button,
  StyleSheet,
  View,
  Modal,
  Image,
  TouchableOpacity,
  Text,
  Dimensions } from 'react-native';
import { colors } from '../screens/colors';
import Slider from '@react-native-community/slider';

const { width,height } = Dimensions.get("window");

export default function RangePickerModal({toggleRangePickerModalVisibility,isRangePickerModalVisible,setRangePicked}){

    const [temperaryRange,setTemperaryRange] = useState(3);

  function closeModal(){
    setRangePicked(temperaryRange)
    toggleRangePickerModalVisibility();
  }

  function openModal(){
    toggleRangePickerModalVisibility();
  }

  return (
    <>
      <TouchableOpacity  onPress={openModal}>
      <Image 
            style={styles.map} 
            source={require('../assets/range-icon.png')}
        />
      </TouchableOpacity>
      <Modal animationType="slide" 
            transparent visible={isRangePickerModalVisible} 
            presentationStyle="overFullScreen" >
        <View style={styles.viewWrapper}> 
           <Text style={{fontSize:30,fontWeight:"bold",color:"white"}}>{temperaryRange} Km</Text>
        <Slider
            style={{width: 200, height: 40}}
            minimumValue={1}
            maximumValue={10}
            value={temperaryRange}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
            step={0.5}
            onValueChange = {(value) => setTemperaryRange(value)}
        />
        <TouchableOpacity style={styles.buttons} onPress={closeModal}>
        <Text style={styles.btnsText}>Done!</Text>   
      </TouchableOpacity>
      </View>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({

  textInput: {
      width: 50,
      height:50,
      borderRadius: 5,
      borderColor: "rgba(0, 0, 0, 0.2)",
      borderWidth: 1,
      marginBottom: 8,
      textAlign:'center',
      fontSize:20,
  },


  viewWrapper: {
      // marginTop:,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  modalView: {
      alignItems: "center",
      justifyContent: "flex-start",
      position: "absolute",
      top: "15%",
      left: "50%",
      elevation: 5,
      transform: [{ translateX: -(width * 0.4) }, 
                  { translateY: -90 }],
      height:200,
      width: width * 0.85,
      backgroundColor: "#fff",
      borderRadius: 7,
  },

  textScore:{
      fontSize:20,
      fontWeight:'bold',
      marginBottom:10,
      marginHorizontal:5.,
  },

  scoreView:{
      marginLeft:10,
      flexDirection:"row",
      alignItems: "center",
      justifyContent: "center",
  },

  xicon:{
      width:20,
      height:20, 
      marginRight:10,
  },

  buttons: {
      width: "40%",
      borderRadius: 3,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 20,
      marginBottom:30,
      backgroundColor: colors.textColor,
  },

  btnsText:{
      fontSize:20,
      fontWeight: 'bold',
      color:'white',
  },

  map:{
    width:50,
    height:60, 
    marginRight:20,
    marginTop:20,
    marginLeft:20,
},
});