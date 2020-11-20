import React, {useContext, useEffect, useState} from 'react';
import {Text, View, ScrollView, ActivityIndicator} from 'react-native';
import {Button, Image} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import {
  challengeText_14_1,
  challengeText_14_2,
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

export default function Challenge14({nextText, thesis, navigation}) {
  const {thesis1, thesis2} = challengeText_12_3;
  const [argument, setArgument] = useState([]);

  const {challenge, setChallenge} = useContext(ChallengeContext);
  const [logs, setLogs] = useState([]);
  const [idLog, setIdLog] = useState('');
  const [stateArgument, setStateArgument] = useState([]);

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
    storeData('@page_challenge_1', '14');
    getData();
  }, []);

  useEffect(() => {
    const data = [stateArgument, argument];
    storeData('@challenge_1_slice14_data', JSON.stringify(data));
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
      const value = await AsyncStorage.getItem('@challenge_1_slice14_data');
      const data = JSON.parse(value);
      setStateArgument(data[0]);
      setArgument(data[1]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    navigation.setParams({name: 'Contraargumentos', progress: 0.7});
  }, []);

  const setContext = () => {
    setChallenge({...challenge, counterargument: argument});

    const payload = {
      challenge: [
        ...logs,
        {
          name: 'desafío 1',
          state: 'Iniciado',
          stage: 'Contra-argumentos',
          time: Date.now(),
          context: 'Contra-argumentos',
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
          source={require('../../assets/iconos/icono-contra-argumento.png')}
          PlaceholderContent={<ActivityIndicator />}
        />
        <Text style={[globalStyles.title, {paddingTop: 10}]}>
          {challengeText_14_1}
        </Text>
        <Text style={globalStyles.content}>{challengeText_14_2}</Text>
        <ScrollView>
          {thesis === 1 &&
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
          {thesis === 2 &&
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
