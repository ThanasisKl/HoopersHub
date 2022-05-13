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



export default function FindGameNearbyScreen() {

  const route = useRoute();
  const navigation = useNavigation();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

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

  return (
    <View >
      <Input></Input>
    </View>
  );
}