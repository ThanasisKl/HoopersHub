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
    TextInput,
} from "react-native";
import {doc, getDoc,setDoc} from 'firebase/firestore';
import { useRoute } from '@react-navigation/native';

import { db } from '../Config'
import { colors } from './colors';


export default function CreateTeamsScreen() {
    const route = useRoute();
    const navigation = useNavigation();
    const username = route.params.username;
    const friends_list = route.params.friends;
    const groupList = [...route.params.groupList,username];
    const groupName = route.params.groupName;
    const [team1,setTeam1] = useState([]);
    const [team2,setTeam2] = useState([]);
    const [btnBorder1,setBtnBorder1] = useState([]);
    const [btnBorder2,setBtnBorder2] = useState([]);
    const [flag,setFlag] = useState(true);
    

    let newBtnBorderState = [];
    for (let i=0;i<groupList.length;i++){
        newBtnBorderState.push(false);
    }
    if(flag){
        setFlag(false);
        setBtnBorder1([...newBtnBorderState]);
        setBtnBorder2([...newBtnBorderState]);
    }

    function gotoCreateGroupScreen(){
        navigation.navigate("CreateGroup",{username,friends_list});
    }

    function createGroup(){ //FIXME
        console.log(team1); //check that all the members have a team 
        console.log(team2); //db calls
    }

    function changeBtnBorder(uname,team){
        let index = getIndex(uname);
        
        if(team === "team1"){
            if (!team1.includes(uname)){
                team1.push(uname);
            }else{
                const newTeam1 = team1.filter(username => username !== uname);
                setTeam1([...newTeam1])
            }

            if (team2.includes(uname)){
                const newTeam2 = team2.filter(username => username !== uname);
                setTeam2([...newTeam2])
                let newState2 = btnBorder2;
                newState2[index] = !newState2[index];
                setBtnBorder2([...newState2]);
            }

            let newState = btnBorder1;
            newState[index] = !newState[index];
            setBtnBorder1([...newState]);
            
        }else{
            if (!team2.includes(uname)){
                team2.push(uname);
            }else{
                const newTeam2 = team2.filter(username => username !== uname);
                setTeam2([...newTeam2])
            }

            if (team1.includes(uname)){
                const newTeam1 = team1.filter(username => username !== uname);
                setTeam1([...newTeam1])
                let newState1 = btnBorder1;
                newState1[index] = !newState1[index];
                setBtnBorder1([...newState1]);
            }

            let newState2 = btnBorder2;
            newState2[index] = !newState2[index];
            setBtnBorder2([...newState2]);
        }
    }

    function getIndex(uname){
        return groupList.indexOf(uname);
    }

    let group = groupList.map(uname =>{//fixme
        return (
            <View style={styles.mainView} key={uname}>
                <Text style={styles.unameText}>{uname}</Text>
                <View style={styles.btnView}>
                    <TouchableOpacity 
                        style={[styles.btnStyle,{borderColor:btnBorder1[getIndex(uname)] ? colors.textColor : "white",borderWidth:btnBorder1[getIndex(uname)] ? 4 : 0}]}
                        onPress={()=>changeBtnBorder(uname,"team1")}
                    >
                        <Text style={styles.btnText}>Team 1</Text>
                    </TouchableOpacity> 
                    <TouchableOpacity 
                        style={[styles.btnStyle,{borderColor:btnBorder2[getIndex(uname)] ? colors.textColor : "white",borderWidth:btnBorder2[getIndex(uname)] ? 4 : 0}]}
                        onPress={()=>changeBtnBorder(uname,"team2")}
                    >
                        <Text style={styles.btnText}>Team 2</Text>
                    </TouchableOpacity> 
                </View>
            </View>
        );
     });
    
    return (
        <View style={styles.container}>
            <View style={styles.container2}>
                <View style={styles.pageTitleView}>
                    <TouchableOpacity onPress={gotoCreateGroupScreen}>
                        <Image 
                            style={styles.icons} 
                            source={require('../assets/back-icon.png')}
                        />
                    </TouchableOpacity>
                    <Text style={styles.pageTitle}>Create the Teams</Text>
                </View>
                <ScrollView>
                    {group}
                    <TouchableOpacity style={styles.createGroupBtn} onPress={createGroup}>  
                        <Text style={styles.createGroupText}>Create Group</Text>
                    </TouchableOpacity> 
                </ScrollView>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({ 

    btnStyle:{
        borderRadius: 5,
        paddingHorizontal:23,
        paddingVertical:5,
        backgroundColor: "white",
        marginTop:8,
        marginLeft:7,
    },

    btnText:{
        color: colors.textColor,
        fontSize:18,
        fontWeight :'bold',
    },

    btnView:{
        alignItems: "flex-start",
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom: 13,
    },

    createGroupBtn:{
        borderRadius: 10,
        paddingVertical:8,
        paddingHorizontal:18,
        backgroundColor: "white",
        alignItems: "center",
        marginLeft:'auto',
        marginRight:'auto',
        marginVertical:25,
    },

    createGroupText:{
        color: "black",
        fontSize: 21,
        fontWeight :'bold',
    },

    container: {
        backgroundColor: colors.bgColor,
        flex: 1,
        alignItems: "flex-start",
        justifyContent: "flex-start",
    },

    container2: {
        marginTop:50,
        marginLeft:10,
    },

    icons:{
        width:45,
        height:30, 
        marginRight:20,
    },

    mainView:{
        borderColor:colors.bgColor,
        borderBottomColor:colors.textColor,
        borderWidth: 2,
    },

    pageTitle:{
        fontSize:30,
        borderColor:colors.bgColor,
        borderBottomColor:colors.textColor,
        borderWidth: 2,
    },

    pageTitleView:{
        marginBottom:20,
        alignItems:'baseline',
        flexDirection:"row"
    },

    unameText:{
        fontSize:25,
        fontFamily:'monospace',
        color:'white',
    },
});