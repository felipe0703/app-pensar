import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  TextInput,
  Keyboard,
} from 'react-native';
import {Button, Image} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import {challengeText_3, textFeedback_3} from './challengeText';
import Modal from '../../components/Modal';
import globalStyles from '../../styles/global';
import {playSound_feedback} from '../../assets/playsound/playsound';
import {firebaseApp} from '../../utils/firebase';
import firebase from 'firebase';
import 'firebase/storage';
import {UserContext} from '../../contexts/UserContext';

firebase.firestore().settings({experimentalForceLongPolling: true});
const db = firebase.firestore(firebaseApp);

export default function Challenge3({nextText}) {
  const [showModal, setShowModal] = useState(false);
  const [showNext, setShowNext] = useState(true);
  const [value, setValue] = useState('');
  const textIntro = challengeText_3.split('|');
  const {dataUser} = useContext(UserContext);
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
    storeData('@page_challenge_1', '3');
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
      const value1 = await AsyncStorage.getItem('@challenge_1_slice3_data');

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

    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);

  const _keyboardDidShow = () => {
    setShowNext(false);
  };

  const _keyboardDidHide = () => {
    setShowNext(true);
  };

  const showFeedback = () => {
    playSound_feedback();
    storeData('@challenge_1_slice3_data', JSON.stringify(value));
    const payload = {
      challenge: [
        ...logs,
        {
          name: 'desafío 1',
          state: 'Iniciado',
          stage: '',
          time: Date.now(),
          context: '¿qué es lo que haces cuando creas un argumento?',
          action: value,
        },
      ],
    };
    db.collection('new_logs').doc(idLog).update(payload);
    setShowModal(true);
    setShowNext(false);
  };

  return (
    <View style={globalStyles.viewBody}>
      <View style={globalStyles.viewContent}>
        <Text style={globalStyles.content}>{textIntro}</Text>
        <TextInput
          multiline
          numberOfLines={4}
          editable
          onChangeText={(val) => setValue(val)}
          value={value}
          style={styles.input}
        />
      </View>
      <View style={globalStyles.viewBtns}>
        {showNext && (
          <Button
            onPress={showFeedback}
            title="siguiente"
            buttonStyle={globalStyles.btn}
            containerStyle={globalStyles.btnContainer}
            titleStyle={globalStyles.btnText}
            icon={<Icon name="arrow-right" size={15} color="#196674" icon />}
            iconRight
          />
        )}
      </View>
      <Modal
        isVisible={showModal}
        setIsVisible={setShowModal}
        backPrees={false}>
        <View style={globalStyles.modalFeedback}>
          <Image
            style={globalStyles.brain}
            source={require('../../assets/img/cerebrito/cerebro-rosado.png')}
            PlaceholderContent={<ActivityIndicator />}
          />
          <Text style={styles.textModal}>{textFeedback_3}</Text>
          <Button
            onPress={nextText}
            title="siguiente"
            buttonStyle={globalStyles.btn}
            containerStyle={globalStyles.btnContainer}
            titleStyle={globalStyles.btnText}
            icon={<Icon name="arrow-right" size={15} color="#196674" icon />}
            iconRight
          />
        </View>
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
  textModal: {
    marginVertical: 10,
    textAlign: 'justify',
  },
});
