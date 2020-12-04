import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {Button, CheckBox} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import {
  challege2Text_4,
  challege2Text_4_1,
  challege2Text_4_2,
  challege2Text_4_3,
} from './challenge2text';
import globalStyles from '../../styles/global';
import {ChallengeContext} from '../../contexts/ChallengeContext';
import {firebaseApp} from '../../utils/firebase';
import firebase from 'firebase';
import 'firebase/storage';

firebase.firestore().settings({experimentalForceLongPolling: true});
const db = firebase.firestore(firebaseApp);

export default function Challenge2_slice4({
  previousText,
  nextText,
  navigation,
}) {
  const [question1, setQuestion1] = useState(false);
  const [question2, setQuestion2] = useState(false);
  const [question3, setQuestion3] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const {challenge, setChallenge} = useContext(ChallengeContext);

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
    storeData('@page_challenge_2', '4');
    getData();
  }, []);

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (err) {
      console.log(err);
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@challenge_2_slice4_question');
      if (value !== null) {
        if (value === '1') {
          resp(1);
        } else if (value === '2') {
          resp(2);
        } else if (value === '3') {
          resp(3);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    navigation.setParams({name: 'Selección', progress: 0.28});
  }, []);

  const resp = (question) => {
    storeData('@challenge_2_slice4_question', JSON.stringify(question));
    if (question === 1) {
      setChallenge({...challenge, proposal: challege2Text_4_1});
      setQuestion1(true);
      setQuestion2(false);
      setQuestion3(false);
    } else if (question === 2) {
      setChallenge({...challenge, proposal: challege2Text_4_2});
      setQuestion1(false);
      setQuestion2(true);
      setQuestion3(false);
    } else {
      setChallenge({...challenge, proposal: challege2Text_4_3});
      setQuestion1(false);
      setQuestion2(false);
      setQuestion3(true);
    }
    setShowNext(true);
  };

  const pushInfo = () => {
    const payload = {
      challenge: [
        ...logs,
        {
          name: 'desafío 2',
          state: 'Iniciado',
          stage: 'Selección',
          time: Date.now(),
          context: '¿Con cuál pregunta quieres empezar para elaborar la tesis?',
          action: challenge.proposal,
        },
      ],
    };
    db.collection('new_logs')
      .doc(idLog)
      .update(payload)
      .then(() => {
        nextText();
      });
  };
  return (
    <View style={globalStyles.viewBody}>
      <ScrollView
        contentContainerStyle={{
          marginVertical: 10,
          marginLeft: 20,
          marginRight: 30,
        }}>
        <Text style={globalStyles.content}>{challege2Text_4}</Text>
        <View style={globalStyles.viewOptions}>
          <CheckBox
            title={challege2Text_4_1}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={question1}
            onPress={() => resp(1)}
          />
          <CheckBox
            title={challege2Text_4_2}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={question2}
            onPress={() => resp(2)}
          />
          <CheckBox
            title={challege2Text_4_3}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={question3}
            onPress={() => resp(3)}
          />
        </View>
      </ScrollView>
      <View style={globalStyles.viewBtns}>
        {showNext && idLog !== '' && (
          <>
            <Button
              onPress={previousText}
              title="Anterior"
              buttonStyle={globalStyles.btn}
              containerStyle={globalStyles.btnContainer}
              titleStyle={globalStyles.btnText}
              icon={<Icon name="arrow-left" size={15} color="#196674" icon />}
            />
            <Button
              onPress={pushInfo}
              title="siguiente"
              buttonStyle={globalStyles.btn}
              containerStyle={globalStyles.btnContainer}
              titleStyle={globalStyles.btnText}
              icon={<Icon name="arrow-right" size={15} color="#196674" icon />}
              iconRight
            />
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content2: {
    color: '#fff',
    // fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'justify',
    marginLeft: 30,
    marginTop: 15,
  },
});
