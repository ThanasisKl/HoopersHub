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

import AddOutsiderModal from "../../components/AddOutsiderModal";
import { db } from '../../Config'
import { colors } from '../colors';


export default function AddTournamentMembersScreen() {
    const route = useRoute();
    const navigation = useNavigation();
    const username = route.params.username;
    const manually = route.params.manually;
    const [friends,setFriends] = useState(route.params.friends_list);
    const [outsiders,setOutsiders] = useState([]);
    const [groupList,setGroupList] = useState([]);
    const [tournamentName,setTournamentName] = useState("");
    const [showWarningName, setShowWarningName] = useState(false);
    const [showWarningList, setShowWarningList] = useState(false);
    const [isOutsiderModalVisible, setOutsiderModalVisible] = useState(false);


    let initialIconState = [];
    for (let i = 0; i < friends.length ; i++){
        initialIconState.push("+")
    }
    const [btnIcon,setBtnIcon] = useState([...initialIconState]);

    function toggleOutsiderModalVisibility(){
        setOutsiderModalVisible(!isOutsiderModalVisible);
    }

    function gotoSelectTeamsManuallyScreen(){
        console.log(tournamentName.length)
        if(tournamentName === "" || tournamentName.length === 0 || tournamentName.length > 15){
            setShowWarningName(true);
        }else if(groupList.length === 0){
            setShowWarningList(true);
        }else{
            if(!groupList.includes(username))groupList.push(username);
            navigation.navigate("SelectTeamsManually",{username,groupList,tournamentName,"friends_list":friends,outsiders});
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
                <AddOutsiderModal
                    isModalVisible={isOutsiderModalVisible}
                    toggleModalVisibility={toggleOutsiderModalVisibility}
                    friends={friends}
                    setFriends={setFriends}
                    btnIcon={btnIcon}
                    setBtnIcon={setBtnIcon}
                    username={username}
                    outsiders={outsiders}
                    setOutsiders={setOutsiders}
                />
                <View style={styles.pageTitleView}>
                    <TouchableOpacity onPress={()=>navigation.navigate("TournamentTeamsMain",{"username":username})}>
                        <Image 
                            style={styles.icons} 
                            source={require('../../assets/back-icon.png')}
                        />
                    </TouchableOpacity>
                    <Text style={styles.pageTitle}>Add your Friends</Text>
                </View>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Tournament Name"
                        placeholderTextColor = {colors.textColor}
                        onChangeText={(newName) => setTournamentName(newName)}
                    />
                </View>
                {showWarningName && <Text style={styles.warningText}>Please put a valid tournament name</Text>}
                <ScrollView>
                    {friendsList}
                    {showWarningList && <Text style={styles.warningText}>You need to add some friends first</Text>}
                    <View style={styles.btnView}>
                        <TouchableOpacity style={styles.nextBtn} onPress={gotoSelectTeamsManuallyScreen}>
                            <Text style={styles.nextText}>NEXT</Text>
                        </TouchableOpacity>
                        {manually &&
                            <TouchableOpacity style={styles.nextBtn} onPress={toggleOutsiderModalVisibility}>
                                <Text style={styles.outsiderText}>Add an Outsider</Text>
                            </TouchableOpacity>
                        }
                    </View>
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

    btnView:{
        flexDirection:"row-reverse",
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
        // fontFamily:'monospace',
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
        color:colors.textColor,
        fontSize:18,
        fontWeight :'bold',
    },

    outsiderText:{
        color:"red",
        fontSize:18,
        fontWeight :'bold',
        textAlign:"center",
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