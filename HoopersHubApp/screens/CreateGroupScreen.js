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


export default function GroupMainScreen() {
    const route = useRoute();
    const navigation = useNavigation();
    const username = route.params.username;
    const friends = route.params.friends_list;
    const [groupList,setGroupList] = useState([]);
    const [groupName,setGroupName] = useState("");
    const [showWarningName, setShowWarningName] = useState(false);
    const [showWarningList, setShowWarningList] = useState(false);

    let initialIconState = [];
    for (let i = 0; i < friends.length ; i++){
        initialIconState.push("+")
    }
    const [btnIcon,setBtnIcon] = useState([...initialIconState]);

    function gotoGroupScreen(){
        navigation.navigate("GroupMain",{username});
    }

    function gotoCreateTeams(){
        if(groupName === ""){
            setShowWarningName(true);
        }else if(groupList.length === 0){
            setShowWarningList(true);
        }else{
            setShowWarningName(false);
            setShowWarningList(false);
            navigation.navigate("CreateTeams",{username,groupList,groupName,friends});
        }
    }

    function handleAddFriend(friendUname){
        let friend_index = getIndex(friendUname);
        let newIconState = btnIcon;
        newIconState[friend_index] = btnIcon[friend_index] ==="-" ? "+"  : "-";
        setBtnIcon([...newIconState])

        if(!groupList.includes(friendUname)){
            setGroupList([...groupList,friendUname])
        }else{
            const newGroupList = groupList.filter(uname => uname !== friendUname);
            setGroupList([...newGroupList])
        }
    }

    function getIndex(uname){
        return friends.indexOf(uname);
    }

    let friendsList = friends.map(uname =>{
        return (
            <View key={uname}>
                <View style={styles.friendsListStyle}>
                    <Text style={styles.friendText}>{uname}</Text>
                    <TouchableOpacity style={styles.btnStyle} onPress={()=>handleAddFriend(uname)}>
                        <Text style={styles.btnText}>{btnIcon[getIndex(uname)]}</Text>
                    </TouchableOpacity> 
                </View>
            </View>
        );
     }); 
    
    return (
        <View style={styles.container}>
            <View style={styles.container2}>
                <View style={styles.pageTitleView}>
                    <TouchableOpacity onPress={gotoGroupScreen}>
                        <Image 
                            style={styles.icons} 
                            source={require('../assets/back-icon.png')}
                        />
                    </TouchableOpacity>
                    <Text style={styles.pageTitle}>Add your Friends</Text>
                </View>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Group Name"
                        placeholderTextColor = {colors.textColor}
                        onChangeText={(newName) => setGroupName(newName)}
                    />
                </View>
                {showWarningName && <Text style={styles.warningText}>You need to name your group first</Text>}
                <ScrollView>
                    {friendsList}
                    {showWarningList && <Text style={styles.warningText}>You need to add some friends first</Text>}
                    <TouchableOpacity style={styles.nextBtn} onPress={gotoCreateTeams}>
                        <Text style={styles.nextText}>NEXT</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({ 
    btnStyle:{
        borderRadius: 5,
        paddingHorizontal:12,
        backgroundColor: "white",
        marginTop:8,
        marginLeft:7,
    },

    btnText:{
        color: colors.textColor,
        fontSize:18,
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

    friendsListStyle:{
        alignItems: "flex-start",
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom: 10,
    },

    friendText:{
        fontSize:25,
        fontFamily:'monospace',
        color:'white',
    },
    
    icons:{
        width:45,
        height:30, 
        marginRight:20,
    },

    inputView: {
        backgroundColor: "white",
        borderRadius: 15,
        width: "85%",
        height: 45,
        marginBottom: 10,
        alignItems:'flex-start',
        flexDirection:'row',
        
    },

    nextBtn:{
        marginTop:15,
        marginBottom:15,
        width: "35%",
        borderRadius: 7,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        marginLeft:'auto',
        marginRight:'auto',
    },

    nextText:{
        color: "black",
        fontSize:18,
        fontWeight :'bold',
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

    TextInput: {
        height: 30,
        flex: 1,
        marginLeft: 20,
        marginTop:8,
    },

    warningText:{
        color:'red',
    },
   
});