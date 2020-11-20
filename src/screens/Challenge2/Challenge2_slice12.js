import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, Text, View, TextInput, Keyboard} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import globalStyles from '../../styles/global';
import {challege2Text_12, textFeedback_12} from './challenge2text';
import Modal from '../../components/Modal';
import {ChallengeContext} from '../../contexts/ChallengeContext';
import {playSound_feedback} from '../../assets/playsound/playsound';
import {firebaseApp} from '../../utils/firebase';
import firebase from 'firebase';
import 'firebase/storage';

firebase.firestore().settings({experimentalForceLongPolling: true});
const db = firebase.firestore(firebaseApp);

export default function Challenge2_slice12({nextText, navigation}) {
  const [value, setValue] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showBtnNext, setShowBtnNext] = useState(true);
  const [error, setError] = useState(false);
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
    navigation.setParams({name: 'Sesgo', progress: 1});
  }, []);

  useEffect(() => {
    storeData('@page_challenge_2', '12');
    getData();
  }, []);

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      playSound_feedback();
      setShowModal(true);
    }, 3000);
  }, []);

  const getData = async () => {
    try {
      const value1 = await AsyncStorage.getItem('@challenge_2_slice12_sesgo');
      if (value1 !== null) {
        setValue(JSON.parse(value1));
      }
    } catch (err) {
      console.log(err);
    }
  };

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
      setChallenge({...challenge, slant: value});
      storeData('@challenge_2_slice12_sesgo', JSON.stringify(value));

      const payload = {
        challenge: [
          ...logs,
          {
            name: 'desafío 2',
            state: 'Iniciado',
            stage: 'Sesgo',
            time: Date.now(),
            context: 'Sesgo',
            action: value,
          },
        ],
      };
      db.collection('new_logs').doc(idLog).update(payload);
      nextText();
    } else {
      setError(true);
    }
  };

  return (
    <View style={globalStyles.viewBody}>
      <View style={globalStyles.viewContent}>
        <Text style={globalStyles.content}>{challege2Text_12}</Text>
        <TextInput
          multiline
          numberOfLines={4}
          editable
          onChangeText={(text) => setValue(text)}
          value={value}
          style={error ? styles.inputError : styles.input}
          onSubmitEditing={Keyboard.dismiss}
        />
      </View>
      <View style={globalStyles.viewBtns}>
        {showBtnNext && (
          <Button
            onPress={goNextText}
            title="Listo"
            buttonStyle={globalStyles.btn}
            containerStyle={globalStyles.btnContainer}
            titleStyle={globalStyles.btnText}
            icon={<Icon name="arrow-right" size={15} color="#196674" icon />}
            iconRight
          />
        )}
      </View>
      <Modal isVisible={showModal} setIsVisible={setShowModal}>
        <Text style={styles.textFeedback}>{textFeedback_12}</Text>
      </Modal>
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
  textFeedback: {
    marginVertical: 10,
  },
});
