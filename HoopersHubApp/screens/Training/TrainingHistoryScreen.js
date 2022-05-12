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
    const [showResults,setShowResults] = useState(false);
    const [bestPoint,setBestPoint] = useState(0);
    const [worstPoint,setWorstPoint] = useState(0);
    const [rerender,setRerender] = useState(true);
    const [tableData,setTableData] = useState({HeadTable : ['Point 1', 'Point 2', 'Point 3', 'Point 4', 'Point 5','Point 6','Point 7'],
    DataTable: [ ]})


    const sessionsOnScreen = 10;

    const reverseTrainingDataHistory = [...trainingHistoryData].reverse();
    let loops = reverseTrainingDataHistory.length > sessionsOnScreen ? sessionsOnScreen : reverseTrainingDataHistory.length;
    let screenTrainingDataHistory = [] ;
    for(let i=0;i<loops;i++){
        screenTrainingDataHistory.push(reverseTrainingDataHistory[i])
    }

    function gotoTrainingMainScreen(){
        navigation.navigate("TrainingMain",{"username":username});
    }

    function toggleModalVisibility(number){
        setBtnPressed(number);
        setShowShotsModal(!showShotsModal);
    }


    let sessionStats = screenTrainingDataHistory.map((session,i) =>{
        let data =[session.Point_1, session.Point_2, session.Point_3, session.Point_4, session.Point_5, session.Point_6, session.Point_7];
        
        return (
            <Row key={i}
                data={data} 
                style={[styles.head,{backgroundColor:colors.body}]}
                textStyle={{textAlign:"center"}} 
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

       
        
        let max = -1;
        let min = 101;
        let maxPoint = 0;
        let minPoint = 0;
        for (let i=0;i<7;i++){
            let pointRate = (sum_of_points[i] / (screenTrainingDataHistory.length*3)*100).toFixed(2);
            sum_of_points[i] = (sum_of_points[i] / (screenTrainingDataHistory.length*3)*100).toFixed(2) + "%";
            
            if (pointRate > max){
                max = pointRate;
                maxPoint = i + 1;
            }

            if(pointRate < min){
                min = pointRate;
                minPoint = i + 1;
            }
            
            if (rerender && minPoint !== maxPoint){
                setRerender(false)
                setBestPoint(maxPoint);
                setWorstPoint(minPoint);
                setShowResults(true);
            }
        }
   
        return (
            <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                <Row 
                    data={sum_of_points} 
                    style={[styles.head,{backgroundColor:colors.results}]} 
                    textStyle={{textAlign:"center"}}
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
                    <Text style={styles.pageTitle}>See your latest training results</Text>
                </View>
                <View>
                    <Table borderStyle={{borderWidth: 2, borderColor: colors.header}}>
                        <Row
                            data={tableData.HeadTable} 
                            style={[styles.head,{backgroundColor:colors.header}]}
                            textStyle={{textAlign:"center",fontWeight:"bold"}} 
                        />
        
                        {sessionStats}

                    </Table>
                </View>
                <View>
                    {statsAverage()}
                </View>
                {showResults && 
                    <View>
                        <Text style={styles.bestPointStyle}>Your best Point: <Text style={{fontSize:22,fontWeight:"bold"}}>Point{bestPoint}</Text></Text>
                        <Text style={styles.worstPointStyle}>Your best Point: <Text style={{fontSize:22,fontWeight:"bold"}}>Point{worstPoint}</Text></Text>
                    </View>
                }

        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bgColor,
        justifyContent: "center",
        padding:10
      },

    icons:{
        width:45,
        height:30, 
        marginRight:20,
        marginLeft:20,
    },

    iconView:{
        position: 'absolute',
        top:0,
        marginTop:35,
        alignSelf: "flex-start",
        flexDirection:"row"
    },

    image: {
        flex: 1,
    },

    pageTitle:{
        fontSize:20,
        fontWeight:"bold",
        color:colors.darkRed,
        marginBottom:40,
        textAlign:"center"
    },

    head: { 
        height: 40, 
        alignContent: "center", 
        textAlign:"center",
        
    },

    text:{ 
        margin: 6 
    },

    bestPointStyle:{
        fontSize:20,
        marginTop:30,
        marginBottom:15,
        letterSpacing:2.5,
        marginRight:"auto",
        marginLeft:"auto",
        color:"green",
    },

    worstPointStyle:{
        fontSize:20,
        letterSpacing:2.5,
        marginRight:"auto",
        marginLeft:"auto",
        color:"red",
    },
});