import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, Text, View, TextInput, Keyboard} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import {ChallengeContext} from '../../contexts/ChallengeContext';
import globalStyles from '../../styles/global';
import {challege2Text_6, challege2Text_6_1} from './challenge2text';
import {firebaseApp} from '../../utils/firebase';
import firebase from 'firebase';
import 'firebase/storage';

firebase.firestore().settings({experimentalForceLongPolling: true});
const db = firebase.firestore(firebaseApp);

export default function Challenge2_slice6({
  previousText,
  nextText,
  navigation,
}) {
  const [value, setValue] = useState('');
  const [showBtnNext, setShowBtnNext] = useState(true);
  const {challenge, setChallenge} = useContext(ChallengeContext);
  const [error, setError] = useState(false);
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
    storeData('@page_challenge_2', '6');
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
      const value1 = await AsyncStorage.getItem('@challenge_2_slice6_tesis');

      if (value1 !== null) {
        setValue(JSON.parse(value1));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    navigation.setParams({name: 'Tesis', progress: 0.42});
  }, []);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);

  const _keyboardDidShow = () => {
    setShowBtnNext(false);
  };

  const _keyboardDidHide = () => {
    setShowBtnNext(true);
  };

  const goNextText = () => {
    if (value) {
      setError(false);
      setChallenge({...challenge, thesis: value});
      storeData('@challenge_2_slice6_tesis', JSON.stringify(value));
      const payload = {
        challenge: [
          ...logs,
          {
            name: 'desafío 2',
            state: 'Iniciado',
            stage: 'Tesis',
            time: Date.now(),
            context: 'Tesis',
            action: value,
          },
        ],
      };
      db.collection('new_logs')
        .doc(idLog)
        .update(payload)
        .then(() => {
          nextText();
        });
    } else {
      setError(true);
    }
  };

  return (
    <View style={globalStyles.viewBody}>
      <View style={globalStyles.viewContent}>
        <Text style={globalStyles.content}>{challege2Text_6}</Text>
        <Text style={globalStyles.content2}>{challege2Text_6_1}</Text>
        <TextInput
          multiline
          numberOfLines={4}
          editable
          onChangeText={(val) => setValue(val)}
          value={value}
          style={error ? styles.inputError : styles.input}
        />
      </View>
      <View style={globalStyles.viewBtns}>
        {showBtnNext && idLog !== '' && (
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
              onPress={goNextText}
              title="Siguiente"
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
  input: {
    backgroundColor: '#fff',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 30,
    width: 300,
  },
  inputError: {
    backgroundColor: '#fff',
    borderColor: '#ff4b4b',
    borderWidth: 2,
    marginTop: 30,
    width: 300,
  },
});
