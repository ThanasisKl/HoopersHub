import React, {useState} from 'react';
import { useNavigation } from '@react-navigation/core'
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Alert,
    ScrollView,
} from "react-native";
import {Picker} from '@react-native-picker/picker';
import {doc, getDoc} from 'firebase/firestore';
import { useRoute } from '@react-navigation/native';

import { db } from '../../Config'
import { colors } from '../colors';


export default function SelectTeamsManuallyScreen() {
    const route = useRoute();
    const navigation = useNavigation();
    const username = route.params.username;
    const friends_list = route.params.friends_list;
    const [selectedValue, setSelectedValue] = useState("8");
    const [showTeamsCreation,setShowTeamsCreation] = useState(false);

    let friendsList = [...friends_list,username].map(uname =>{
        return (
            <View key={uname}>
                <Text style={styles.playerTitle}>{uname}</Text>
                <Picker
                    selectedValue={selectedValue}
                    style={styles.picker4Players}
                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                >
                    <Picker.Item label="4" value="4" />
                    <Picker.Item label="5" value="5" />
                    <Picker.Item label="6" value="6" />
                    <Picker.Item label="7" value="7" />
                    <Picker.Item label="8" value="8" />
                </Picker>
            </View>
        );
     }); 

    return (
        <View style={styles.container}>
            <View style={styles.container2}>

                <View style={styles.pageTitleView}>
                    <TouchableOpacity>
                        <Image 
                            style={styles.icons} 
                            source={require('../../assets/back-icon.png')}
                        />
                    </TouchableOpacity>
                </View>
                <Text style={styles.pickerText}>Select the number of teams                         </Text>
                <Picker
                    selectedValue={selectedValue}
                    style={styles.picker}
                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                >
                    <Picker.Item label="4" value="4" />
                    <Picker.Item label="5" value="5" />
                    <Picker.Item label="6" value="6" />
                    <Picker.Item label="7" value="7" />
                    <Picker.Item label="8" value="8" />
                    <Picker.Item label="9" value="9" />
                    <Picker.Item label="10" value="10" />
                    <Picker.Item label="11" value="11" />
                    <Picker.Item label="12" value="12" />
                    <Picker.Item label="13" value="13" />
                    <Picker.Item label="14" value="14" />
                    <Picker.Item label="15" value="15" />
                    <Picker.Item label="16" value="16" />
                </Picker>
                <TouchableOpacity style={styles.buttons} onPress={() => setShowTeamsCreation(true)}>
                    <Text style={styles.nextText}>Next</Text>
                </TouchableOpacity>
                {showTeamsCreation && 
                    <View>
                        <Text style={styles.teamsCreationTitle}>Choose team for every player</Text>
                        <ScrollView>
                            {friendsList}
                        </ScrollView>
                    </View>
                }
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    buttons: {
        borderRadius: 25,
        borderWidth:2,
        borderColor:colors.textColor,
        backgroundColor: "white",
        textAlign:'center',
        alignItems:"center",
        width:100,
        paddingVertical:14,
        marginTop:20,
        marginLeft:"auto",
        marginRight:"auto",
    },

    nextText:{
        fontSize:20,
        fontWeight:"bold",
        color:colors.textColor,
    },

    btnsText:{
        fontSize:20,
        fontWeight: 'bold',
        textAlign:'center',
    },

    container: {
      flex: 1,
      backgroundColor: colors.bgColor,
      alignItems: "flex-start",
      justifyContent: "flex-start",
    },

    container2: {
        marginTop:50,
        marginLeft:10,
        flex:1,
    },
    
    icons:{
        width:45,
        height:30, 
        marginRight:20,
    },

    iconView:{
        position: 'absolute',
        top:0,
        alignSelf: "flex-start",
    },
    
    pageTitleView:{
        marginBottom:20,
        alignItems:'baseline',
        flexDirection:"row"
    },

    picker:{ 
        height: 50, 
        width: 150 ,
        backgroundColor:"white",
        color:"black"
    },

    picker4Players:{
        height: 50, 
        width: 80 ,
        color:"black",
        marginBottom:10,
        backgroundColor:"white",
    },

    pickerText:{
        fontSize:23,
        marginBottom:5,
        fontWeight:"bold",
        color:colors.textColor,
    },

    playerTitle:{
        fontSize:20,
        fontWeight:"bold",
        marginBottom:10,
    },

    teamsCreationTitle:{
        fontSize:23,
        marginBottom:5,
        marginTop:10,
        fontWeight:"bold",
        color:colors.textColor,
    },
});