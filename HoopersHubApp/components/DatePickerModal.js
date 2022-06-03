import React, { useState } from 'react'
import { Button,
  StyleSheet,
  View,
  Modal,
  Image,
  TouchableOpacity,
  Text,
  Dimensions } from 'react-native';
import DatePicker from 'react-native-modern-datepicker';
import { colors } from '../screens/colors';

const { width,height } = Dimensions.get("window");

export default function DatePickerModal({toggleDatePickerModalVisibility,isDatePickerModalVisible,setDatePicked,currentDate}){

  function closeModal(){
    toggleDatePickerModalVisibility();
  }

  function openModal(){
    toggleDatePickerModalVisibility();
  }

  return (
    <>
      <TouchableOpacity style={styles.buttons} onPress={openModal}>
        <Text style={styles.btnsText}>Choose a date!</Text>   
      </TouchableOpacity>
      <Modal animationType="slide" 
            transparent visible={isDatePickerModalVisible} 
            presentationStyle="overFullScreen" 
        >
           <View style={styles.viewWrapper}>            
      <DatePicker
        minimumDate={currentDate.getFullYear()+"-"+((currentDate.getMonth()< 10 ? '0': '')+ (currentDate.getMonth() +1))+"-"+((currentDate.getDate() < 10 ? '0': '')+currentDate.getDate())}
        options={{
          textHeaderColor: '#FFA25B',
          textDefaultColor: colors.textColor,
          selectedTextColor: colors.selectedtextColor,
          mainColor: '#F4722B',
          textSecondaryColor: '#D6C7A1',
          borderColor: 'rgba(122, 146, 165, 0.1)',
        }}
        onSelectedChange={date => setDatePicked(date)}
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
      backgroundColor: "rgba(0, 0, 0, 0.2)",
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
      width: "45%",
      borderRadius: 3,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      alignSelf:'center',
      marginTop: 20,
      marginBottom:30,
      backgroundColor: colors.textColor,
  },

  btnsText:{
      fontSize:20,
      fontWeight: 'bold',
      color:'white',
  },
});