import React, {useContext, useEffect, useState} from 'react';
import {Text, View, ScrollView, ActivityIndicator} from 'react-native';
import {Button, Image} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import {
  challengeText_12_1,
  challengeText_12_2,
  challengeText_12_3,
} from './challengeText';
import Argument from './Argument';
import globalStyles from '../../styles/global';
import {ChallengeContext} from '../../contexts/ChallengeContext';
import {firebaseApp} from '../../utils/firebase';
import firebase from 'firebase';
import 'firebase/storage';

firebase.firestore().settings({experimentalForceLongPolling: true});
const db = firebase.firestore(firebaseApp);
export default function Challenge12({nextText, thesis, navigation}) {
  const [argument, setArgument] = useState([]);
  const {thesis1, thesis2} = challengeText_12_3;
  const {challenge, setChallenge} = useContext(ChallengeContext);
  const [logs, setLogs] = useState([]);
  const [idLog, setIdLog] = useState('');
  const [stateArgument, setStateArgument] = useState([]);

  console.log(argument);
  useEffect(() => {
    storeData('@page_challenge_1', '12');
    getData();
  }, []);

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
    navigation.setParams({name: 'Argumentos', progress: 0.56});
  }, []);

  useEffect(() => {
    const data = [stateArgument, argument];
    storeData('@challenge_1_slice12_data', JSON.stringify(data));
  }, [argument]);

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (err) {
      console.log(err);
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@challenge_1_slice12_data');
      const data = JSON.parse(value);
      setStateArgument(data[0]);
      setArgument(data[1]);
    } catch (err) {
      console.log(err);
    }
  };

  const setContext = () => {
    setChallenge({...challenge, argument});

    const payload = {
      challenge: [
        ...logs,
        {
          name: 'desafío 1',
          state: 'Iniciado',
          stage: 'Argumentos',
          time: Date.now(),
          context: 'Argumentos',
          action: argument,
        },
      ],
    };
    db.collection('new_logs').doc(idLog).update(payload);
    nextText();
  };

  return (
    <View style={globalStyles.viewBody}>
      <View style={globalStyles.viewContent}>
        <Image
          style={globalStyles.icon}
          source={require('../../assets/iconos/icono-argumentos.png')}
          PlaceholderContent={<ActivityIndicator />}
        />
        <Text style={[globalStyles.title, {paddingTop: 10}]}>
          {challengeText_12_1}
        </Text>
        <Text style={globalStyles.content}>{challengeText_12_2}</Text>
        <ScrollView>
          {thesis === 1 &&
            thesis1.map((text, id) => (
              <Argument
                key={id}
                id={id}
                text={text}
                argument={argument}
                setArgument={setArgument}
                stateArgument={stateArgument}
                setStateArgument={setStateArgument}
              />
            ))}
          {thesis === 2 &&
            thesis2.map((text, id) => (
              <Argument
                key={id}
                id={id}
                text={text}
                argument={argument}
                setArgument={setArgument}
                stateArgument={stateArgument}
                setStateArgument={setStateArgument}
              />
            ))}
        </ScrollView>
      </View>
      <View style={globalStyles.viewBtns}>
        {argument.length > 0 && (
          <Button
            onPress={setContext}
            title="Siguiente"
            buttonStyle={globalStyles.btn}
            containerStyle={globalStyles.btnContainer}
            titleStyle={globalStyles.btnText}
            icon={<Icon name="arrow-right" size={15} color="#196674" icon />}
            iconRight
          />
        )}
      </View>
    </View>
  );
}
