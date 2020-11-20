import React, {useEffect, useState} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {Button, Image} from 'react-native-elements';
import {firebaseApp} from '../../utils/firebase';
import firebase from 'firebase';
import 'firebase/storage';
import AsyncStorage from '@react-native-community/async-storage';
import {challengeText_18_1, challengeText_18_2} from './challengeText';
import globalStyles from '../../styles/global';

firebase.firestore().settings({experimentalForceLongPolling: true});
const db = firebase.firestore(firebaseApp);

export default function Challenge18({navigation}) {
  const [logs, setLogs] = useState([]);
  const [idLog, setIdLog] = useState('');

  useEffect(() => {
    db.collection('new_logs')
      .where('idUser', '==', firebaseApp.auth().currentUser.uid)
      .get()
      .then((response) => {
        const data = response.docs.map((doc) => {
          return {
            id: doc.id,
            data: doc.data().challenge,
          };
        });
        setLogs(data[0].data);
        setIdLog(data[0].id);
      });
  }, []);

  useEffect(() => {
    storeData('@page_challenge_1', '18');
  }, []);

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (err) {
      console.log(err);
    }
  };
  const removeData = async () => {
    const keys = [
      '@page_challenge_1',
      '@challenge_1_slice3_data',
      '@challenge_1_slice10_thesis',
      '@challenge_1_slice12_data',
      '@challenge_1_slice14_data',
      '@challenge_1_slice16_conclusion',
    ];
    try {
      await AsyncStorage.multiRemove(keys);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    navigation.setParams({name: 'Sesgo', progress: 1});
  }, []);

  const go = () => {
    removeData();
    const payload = {
      challenge: [
        ...logs,
        {
          name: 'desafío 1',
          state: 'Terminado',
          stage: 'Sesgo',
          time: Date.now(),
          context: 'Terminar desafío e ir a Trivia',
          action: 'Terminar',
        },
      ],
    };
    db.collection('new_logs').doc(idLog).update(payload);
    navigation.navigate('trivia', {challenge: 1});
  };
  return (
    <View style={globalStyles.viewBody}>
      <View style={globalStyles.viewContent}>
        <Image
          style={globalStyles.icon}
          source={require('../../assets/iconos/icono-sesgo.png')}
          PlaceholderContent={<ActivityIndicator />}
        />
        <Text style={[globalStyles.title, {paddingTop: 10}]}>
          {challengeText_18_1}
        </Text>
        <Text style={globalStyles.content}>{challengeText_18_2}</Text>
      </View>
      <View style={globalStyles.viewBtns}>
        <Button
          onPress={go}
          title="Vamos"
          buttonStyle={globalStyles.btn}
          containerStyle={globalStyles.btnContainer}
          titleStyle={globalStyles.btnText}
        />
      </View>
    </View>
  );
}
