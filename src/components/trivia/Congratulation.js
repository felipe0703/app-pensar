import React, {useEffect, useState} from 'react';
import {Text, View, ActivityIndicator} from 'react-native';
import {Button, Image} from 'react-native-elements';
import {firebaseApp} from '../../utils/firebase';
import firebase from 'firebase';
import 'firebase/storage';
import globalStyles from '../../styles/global';
import {
  congratulation_challenge1,
  congratulation_challenge2,
} from '../../screens/Challenge2/challenge2text';
import {playSound_congratulation} from '../../assets/playsound/playsound';

firebase.firestore().settings({experimentalForceLongPolling: true});
const db = firebase.firestore(firebaseApp);

export default function Congratulation({navigation, route}) {
  const {challenge} = route.params;
  const [text, setText] = useState('');

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

  const go = () => {
    const payload = {
      challenge: [
        ...logs,
        {
          name: 'Trivia',
          state: 'Terminado',
          stage: '',
          time: Date.now(),
          context: 'Felicidades Trivia',
          action: 'Terminar',
        },
      ],
    };
    db.collection('new_logs').doc(idLog).update(payload);
    navigation.navigate('home');
  };

  useEffect(() => {
    playSound_congratulation();
    if (challenge === 1) {
      setText(congratulation_challenge1);
    } else if (challenge === 2) {
      setText(congratulation_challenge2);
    } else {
      setText('Terminaste el desafío');
    }
  }, []);

  return (
    <View style={globalStyles.viewBody}>
      <View style={globalStyles.viewContent}>
        <Image
          style={globalStyles.brain}
          source={require('../../assets/img/cerebrito/cerebro-saludando.png')}
          PlaceholderContent={<ActivityIndicator />}
        />
        <Text style={globalStyles.title}>🎉¡Felicidades!🎉</Text>
        <Text style={globalStyles.content3}>{text}</Text>
      </View>
      <View style={globalStyles.viewBtns}>
        {idLog !== '' && (
          <Button
            onPress={go}
            title="Continuar"
            buttonStyle={globalStyles.btn}
            containerStyle={globalStyles.btnContainer}
            titleStyle={globalStyles.btnText}
          />
        )}
      </View>
    </View>
  );
}
