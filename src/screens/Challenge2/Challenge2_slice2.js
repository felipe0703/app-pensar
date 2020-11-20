import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {Button, Image} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {firebaseApp} from '../../utils/firebase';
import firebase from 'firebase';
import 'firebase/storage';

import AsyncStorage from '@react-native-community/async-storage';

import {challege2Text_2} from './challenge2text';
import {
  textFeedback_7_1,
  textFeedback_7_2,
  textFeedback_7_3,
  textFeedback_7_4,
  textFeedback_7_5,
  textFeedback_7_6,
} from '../Intro/text_Intro_1';
import Modal from '../../components/Modal';
import globalStyles from '../../styles/global';

firebase.firestore().settings({experimentalForceLongPolling: true});
const db = firebase.firestore(firebaseApp);

export default function Challenge2_slice2({nextText}) {
  const [showModal, setShowModal] = useState(false);
  const [textFeedback, setTextFeedback] = useState('');
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
    storeData('@page_challenge_2', '2');
  }, []);

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (err) {
      console.log(err);
    }
  };

  const showInfo = (option) => {
    if (option === 1) {
      setTextFeedback(textFeedback_7_1);
      const payload = {
        challenge: [
          ...logs,
          {
            name: 'Desafío 2',
            state: 'Iniciado',
            stage: '',
            time: Date.now(),
            context: 'Selección de información',
            action: 'Ver Información',
          },
        ],
      };
      db.collection('new_logs').doc(idLog).update(payload);
    } else if (option === 2) {
      setTextFeedback(textFeedback_7_2);
      const payload = {
        challenge: [
          ...logs,
          {
            name: 'Desafío 2',
            state: 'Iniciado',
            stage: '',
            time: Date.now(),
            context: 'Elaboración de tesis',
            action: 'Ver Información',
          },
        ],
      };
      db.collection('new_logs').doc(idLog).update(payload);
    } else if (option === 3) {
      setTextFeedback(textFeedback_7_3);
      const payload = {
        challenge: [
          ...logs,
          {
            name: 'Desafío 2',
            state: 'Iniciado',
            stage: '',
            time: Date.now(),
            context: 'Desarrollo de argumentos',
            action: 'Ver Información',
          },
        ],
      };
      db.collection('new_logs').doc(idLog).update(payload);
    } else if (option === 4) {
      setTextFeedback(textFeedback_7_4);
      const payload = {
        challenge: [
          ...logs,
          {
            name: 'Desafío 2',
            state: 'Iniciado',
            stage: '',
            time: Date.now(),
            context: 'Desarrollo de contraargumentos',
            action: 'Ver Información',
          },
        ],
      };
      db.collection('new_logs').doc(idLog).update(payload);
    } else if (option === 5) {
      setTextFeedback(textFeedback_7_5);
      const payload = {
        challenge: [
          ...logs,
          {
            name: 'Desafío 2',
            state: 'Iniciado',
            stage: '',
            time: Date.now(),
            context: 'Conclusión',
            action: 'Ver Información',
          },
        ],
      };
      db.collection('new_logs').doc(idLog).update(payload);
    } else {
      setTextFeedback(textFeedback_7_6);
      const payload = {
        challenge: [
          ...logs,
          {
            name: 'Desafío 2',
            state: 'Iniciado',
            stage: '',
            time: Date.now(),
            context: 'Reconocimiento de sesgos cognitivos y heurísticas',
            action: 'Ver Información',
          },
        ],
      };
      db.collection('new_logs').doc(idLog).update(payload);
    }
    setShowModal(true);
  };

  return (
    <View style={globalStyles.viewBody}>
      <View style={globalStyles.viewContent}>
        <Text style={globalStyles.content}>{challege2Text_2}</Text>
        <View style={{marginHorizontal: 20}}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => showInfo(1)}
              style={globalStyles.touchable}>
              <Image
                style={globalStyles.icon}
                source={require('../../assets/iconos/icono-selección.png')}
                PlaceholderContent={<ActivityIndicator />}
              />
              <Text style={globalStyles.textInfo}>
                Selección de información
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{flexDirection: 'row', marginTop: 10, alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => showInfo(2)}
              style={globalStyles.touchable}>
              <Image
                style={globalStyles.icon}
                source={require('../../assets/iconos/icono-tesis.png')}
                PlaceholderContent={<ActivityIndicator />}
              />
              <Text style={globalStyles.textInfo}>Elaboración de tesis</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{flexDirection: 'row', marginTop: 10, alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => showInfo(3)}
              style={globalStyles.touchable}>
              <Image
                style={globalStyles.icon}
                source={require('../../assets/iconos/icono-argumentos.png')}
                PlaceholderContent={<ActivityIndicator />}
              />
              <Text style={globalStyles.textInfo}>
                Desarrollo de argumentos
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{flexDirection: 'row', marginTop: 10, alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => showInfo(4)}
              style={globalStyles.touchable}>
              <Image
                style={globalStyles.icon}
                source={require('../../assets/iconos/icono-contra-argumento.png')}
                PlaceholderContent={<ActivityIndicator />}
              />
              <Text style={globalStyles.textInfo}>
                Desarrollo de contraargumentos
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{flexDirection: 'row', marginTop: 10, alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => showInfo(5)}
              style={globalStyles.touchable}>
              <Image
                style={globalStyles.icon}
                source={require('../../assets/iconos/icono-conclusión.png')}
                PlaceholderContent={<ActivityIndicator />}
              />
              <Text style={globalStyles.textInfo}>Conclusión</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{flexDirection: 'row', marginTop: 10, alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => showInfo(6)}
              style={globalStyles.touchable}>
              <Image
                style={globalStyles.icon}
                source={require('../../assets/iconos/icono-sesgo.png')}
                PlaceholderContent={<ActivityIndicator />}
              />
              <Text
                style={[
                  globalStyles.textInfo,
                  {marginRight: 60, marginBottom: 15},
                ]}>
                Reconocimiento de sesgos cognitivos y heurísticas
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={globalStyles.viewBtns}>
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
      <Modal isVisible={showModal} setIsVisible={setShowModal}>
        <Text style={styles.textFeedback}>{textFeedback}</Text>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  content2: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'left',
    marginLeft: 30,
    marginTop: 15,
  },
  textInfo: {
    color: '#fff',
    fontSize: 16,
  },
  textFeedback: {
    marginVertical: 10,
  },
});
