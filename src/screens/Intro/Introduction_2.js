import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, ActivityIndicator} from 'react-native';
import {Button, Image} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {firebaseApp} from '../../utils/firebase';
import firebase from 'firebase';
import 'firebase/storage';
import AsyncStorage from '@react-native-community/async-storage';
import {
  textIntro_2,
  textFeedback_2_1,
  textFeedback_2_2,
  textFeedback_2_3,
} from './text_Intro_1';
import Modal from '../../components/Modal';
import {
  playSound_correct,
  playSound_incorrect,
} from '../../assets/playsound/playsound';
import globalStyles from '../../styles/global';

firebase.firestore().settings({experimentalForceLongPolling: true});
const db = firebase.firestore(firebaseApp);

export default function Introduction_2({navigation}) {
  const [showModal, setShowModal] = useState(false);
  const [showSiguiente, setShowSiguiente] = useState(false);
  const [response, setResponse] = useState(false);
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
    storeData('@page_intro', '2');
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
      const value = await AsyncStorage.getItem('@intro_2');
      if (value !== null) {
        setShowSiguiente(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const goChallenge = () => {
    navigation.navigate('introduction_3');
  };

  const resp = (resp) => {
    storeData('@intro_2', 'resp');
    setShowModal(true);
    setShowSiguiente(true);
    if (resp) {
      playSound_correct();

      const payload = {
        challenge: [
          ...logs,
          {
            name: 'introducción',
            state: 'Iniciado',
            stage: '',
            time: Date.now(),
            context:
              '¿Has reflexionado alguna vez sobre cómo suceden los pensamientos en tu cabeza y cómo se articulan tus ideas?',
            action: 'Si',
          },
        ],
      };
      db.collection('new_logs').doc(idLog).update(payload);
    } else {
      playSound_incorrect();

      const payload = {
        challenge: [
          ...logs,
          {
            name: 'introducción',
            state: 'Iniciado',
            stage: '',
            time: Date.now(),
            context:
              '¿Has reflexionado alguna vez sobre cómo suceden los pensamientos en tu cabeza y cómo se articulan tus ideas?',
            action: 'No',
          },
        ],
      };
      db.collection('new_logs').doc(idLog).update(payload);
    }
    setResponse(resp);
  };

  return (
    <View style={globalStyles.viewBody}>
      <View style={globalStyles.viewContent}>
        <Text style={globalStyles.content}>{textIntro_2}</Text>
      </View>
      <View style={globalStyles.viewBtns}>
        {!showSiguiente ? (
          <>
            <Button
              onPress={() => resp(true)}
              title="Si"
              icon={<Icon name="thumbs-o-up" size={15} color="#196674" />}
              buttonStyle={globalStyles.btn}
              containerStyle={globalStyles.btnContainer}
              titleStyle={globalStyles.btnText}
            />

            <Button
              onPress={() => resp(false)}
              title="No"
              buttonStyle={globalStyles.btn}
              containerStyle={globalStyles.btnContainer}
              titleStyle={globalStyles.btnText}
              icon={
                <Icon name="thumbs-o-down" size={15} color="#196674" icon />
              }
              iconRight
            />
          </>
        ) : (
          <Button
            onPress={goChallenge}
            title="Siguiente"
            buttonStyle={globalStyles.btn}
            containerStyle={globalStyles.btnContainer}
            titleStyle={globalStyles.btnText}
            icon={<Icon name="arrow-right" size={15} color="#196674" icon />}
            iconRight
          />
        )}
      </View>
      <Modal isVisible={showModal} setIsVisible={setShowModal}>
        {response ? (
          <View style={globalStyles.correct}>
            <Image
              style={globalStyles.brain}
              source={require('../../assets/img/cerebrito/cerebro-like.png')}
              PlaceholderContent={<ActivityIndicator />}
            />
            <Text style={styles.textFeedback}>{textFeedback_2_1}</Text>
            <Text style={styles.textFeedback2}>{textFeedback_2_3}</Text>
          </View>
        ) : (
          <View style={globalStyles.correct}>
            <Image
              style={globalStyles.brain}
              source={require('../../assets/img/cerebrito/cerebro-saludando.png')}
              PlaceholderContent={<ActivityIndicator />}
            />
            <Text style={styles.textFeedback}>{textFeedback_2_2}</Text>
            <Text style={styles.textFeedback2}>{textFeedback_2_3}</Text>
          </View>
        )}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  textFeedback: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 5,
  },
  textFeedback2: {
    color: '#fff',
    textAlign: 'center',
    marginHorizontal: 10,
    marginVertical: 5,
  },
});
