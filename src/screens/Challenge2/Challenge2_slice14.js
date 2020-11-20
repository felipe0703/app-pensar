import React, {useState, useEffect} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {firebaseApp} from '../../utils/firebase';
import firebase from 'firebase';
import 'firebase/storage';
import {Button, Image} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import {challege2Text_14} from './challenge2text';
import globalStyles from '../../styles/global';

firebase.firestore().settings({experimentalForceLongPolling: true});
const db = firebase.firestore(firebaseApp);

export default function Challenge2_slice14({navigation}) {
  const allText = challege2Text_14.split('|');
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
    storeData('@page_challenge_2', '14');
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
      '@page_challenge_2',
      '@challenge_2_slice4_question',
      '@challenge_2_slice5_data',
      '@challenge_2_slice6_tesis',
      '@challenge_2_slice7_data',
      '@challenge_2_slice8_data',
      '@challenge_2_slice11_conclusion',
      '@challenge_2_slice12_sesgo',
    ];
    try {
      await AsyncStorage.multiRemove(keys);
    } catch (e) {
      console.log(e);
    }
  };

  const goTrivia = () => {
    removeData();
    const payload = {
      challenge: [
        ...logs,
        {
          name: 'desafío 2',
          state: 'Terminado',
          stage: 'Sesgo',
          time: Date.now(),
          context: 'Terminar desafío e ir a Trivia',
          action: 'Terminar',
        },
      ],
    };
    db.collection('new_logs').doc(idLog).update(payload);
    navigation.navigate('trivia', {challenge: 2});
  };

  return (
    <View style={globalStyles.viewBody}>
      <View style={globalStyles.viewContent}>
        <Image
          style={globalStyles.brain}
          source={require('../../assets/img/cerebrito/cerebro-like-rosa.png')}
          PlaceholderContent={<ActivityIndicator />}
        />
        <Text style={globalStyles.content}>{allText}</Text>
      </View>
      <View style={globalStyles.viewBtns}>
        <Button
          onPress={goTrivia}
          title="Listo"
          buttonStyle={globalStyles.btn}
          containerStyle={globalStyles.btnContainer}
          titleStyle={globalStyles.btnText}
          icon={<Icon name="arrow-right" size={15} color="#196674" icon />}
          iconRight
        />
      </View>
    </View>
  );
}
