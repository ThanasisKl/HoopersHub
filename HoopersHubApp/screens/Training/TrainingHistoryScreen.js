import React, {useState} from 'react';
import { useNavigation } from '@react-navigation/core'
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    ScrollView,
    Image,
    TouchableOpacity,
    Alert,
} from "react-native";
import {doc, getDoc} from 'firebase/firestore';
import { useRoute } from '@react-navigation/native';

import { db } from '../../Config'
import { colors } from '../colors';
import ShotsModal from "../../components/ShotsModal";
import { stringify } from '@firebase/util';


export default function TrainingHistoryScreen() {
    const route = useRoute();
    const navigation = useNavigation();
    const username = route.params.username;
    const trainingHistoryData = route.params.training_history;
    const [showShotsModal,setShowShotsModal] = useState(false);
    // const [btnPressed,setBtnPressed] = useState(0);
    const [loaded,setLoaded] = useState(true);
    const [averageScores,setAverageResults] = useState([0,0,0,0,0,0,0]);
    // const [btnColor,setBtnColor] = useState([true,true,true,true,true,true,true]);
    const [tableData,setTableData] = useState({HeadTable : ['Θέση 1', 'Θέση 2', 'Θέση 3', 'Θέση 4', 'Θέση 5','Θέση 6','Θέση 7'],
    DataTable: [ ]})


    const sessionsOnScreen = 10;

    const reverseTrainingDataHistory = [...trainingHistoryData].reverse();
    let loops = reverseTrainingDataHistory.length > sessionsOnScreen ? sessionsOnScreen : reverseTrainingDataHistory.length;
    let screenTrainingDataHistory = [] ;
    for(let i=0;i<loops;i++){
        screenTrainingDataHistory.push(reverseTrainingDataHistory[i])
     }

    //  let sum_of_points = [0,0,0,0,0,0,0]
    //  for (i=0;i=screenTrainingDataHistory.length;i++){
    //      for (y=0;y=7;y++){
    //         console.log(screenTrainingDataHistory[0])
    //      }
    //  }
    //  for (i=0;i=7;i++){
    //      sum_of_points[i] = sum_of_points[i] / screenTrainingDataHistory.length
    //  }
    // setAverageResults(sum_of_points);




    // console.log(tableData)
//    for(let i=0;i<screenTrainingDataHistory.length;i++){
//
//    }


    function gotoTrainingMainScreen(){
        navigation.navigate("TrainingMain",{"username":username});
    }

    function toggleModalVisibility(number){
        setBtnPressed(number);
        setShowShotsModal(!showShotsModal);
    }

    function handleFinish(){
        // console.log(results);//fixme
        /*
            beginner
            regular
            great
            rising star
            professional
            legend
        */ 
    }

    let sessionStats = screenTrainingDataHistory.map((session,i) =>{
        let data =[session.Point_1, session.Point_2, session.Point_3, session.Point_4, session.Point_5, session.Point_6, session.Point_7];
        // console.log(data)
        return (
            <Row key={i}
            data={data} 
            style={styles.head} 
            />
        )
    })

    function statsAverage() {
        let sum_of_points = [0,0,0,0,0,0,0]
        for (let i=0;i<screenTrainingDataHistory.length;i++){
            sum_of_points[0] += screenTrainingDataHistory[i].Point_1
            sum_of_points[1] += screenTrainingDataHistory[i].Point_2
            sum_of_points[2] += screenTrainingDataHistory[i].Point_3
            sum_of_points[3] += screenTrainingDataHistory[i].Point_4
            sum_of_points[4] += screenTrainingDataHistory[i].Point_5
            sum_of_points[5] += screenTrainingDataHistory[i].Point_6
            sum_of_points[6] += screenTrainingDataHistory[i].Point_7
        }
        console.log(sum_of_points)
        for (let i=0;i<7;i++){
            sum_of_points[i] = (sum_of_points[i] / (screenTrainingDataHistory.length*3)*100).toFixed(2);
        }
    //    setAverageResults(sum_of_points);   
        return (
            <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
            <Row 
            data={sum_of_points} 
            style={styles.head} 
            />
            </Table>
        )
    }

    return (
        <View style={styles.container}>
                <View style={styles.iconView}>
                    <TouchableOpacity onPress={gotoTrainingMainScreen}>
                        <Image 
                            style={styles.icons} 
                            source={require('../../assets/back-icon.png')}
                        />
                    </TouchableOpacity> 
                </View>
                <View>
                <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                    <Row
                        data={tableData.HeadTable} 
                        style={styles.head} 
                    />
                    {/* <ScrollView> */}
                        {sessionStats}
                    {/* </ScrollView> */}
                </Table>
                </View>
                <View>
                    {statsAverage()}
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
        backgroundColor: colors.bgColor,
        // alignItems: "center",
        justifyContent: "center",
        padding:10
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
    // HeadStyle: { 
    //     height: 50,
    //     width:300,
    //     alignContent: "center",
    //     backgroundColor: '#ffe0f0'
    //   },
      
    //   TableText: { 
    //     margin: 10
    //   }


    // container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { 
        height: 40, 
        backgroundColor: '#f1f8ff',
        alignContent: "center", 
        textAlign:"center"
    },
    text: { margin: 6 }
});