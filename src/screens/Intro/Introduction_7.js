import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {Button, Image} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import {firebaseApp} from '../../utils/firebase';
import firebase from 'firebase';
import 'firebase/storage';
import Modal from '../../components/Modal';
import globalStyles from '../../styles/global';
import {
  textIntro_7_1,
  textIntro_7_1_1,
  textIntro_7_2,
  textFeedback_7_1,
  textFeedback_7_2,
  textFeedback_7_3,
  textFeedback_7_4,
  textFeedback_7_5,
  textFeedback_7_6,
  textFeedback_7_7,
} from './text_Intro_1';

firebase.firestore().settings({experimentalForceLongPolling: true});
const db = firebase.firestore(firebaseApp);

export default function Introduction_3({navigation}) {
  const [showModal, setShowModal] = useState(false);
  const [textFeedback, setTextFeedback] = useState('');
  const [stepSeen1, setStepSeen1] = useState(false);
  const [stepSeen2, setStepSeen2] = useState(false);
  const [stepSeen3, setStepSeen3] = useState(false);
  const [stepSeen4, setStepSeen4] = useState(false);
  const [stepSeen5, setStepSeen5] = useState(false);
  const [stepSeen6, setStepSeen6] = useState(false);
  const [allStepSeen, setAllStepSeen] = useState(false);
  const [logs, setLogs] = useState([]);
  const [idLog, setIdLog] = useState('');
  const text_1 = textIntro_7_1.split('|');
  const text_2 = textIntro_7_2.split('|');

  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
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
        if (isMounted.current) {
          setLogs(data[0].data);
          setIdLog(data[0].id);
        }
      });
  }, []);

  useEffect(() => {
    storeData('@page_intro', '7');
    getAllKeys();
    // clearAll();
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
      '@page_intro',
      '@intro_2',
      '@intro_4_checkeds',
      '@intro_6_checkeds',
    ];
    try {
      await AsyncStorage.multiRemove(keys);
    } catch (e) {
      // remove error
      console.log(e);
    }
  };

  const getAllKeys = async () => {
    let keys = [];
    try {
      keys = await AsyncStorage.getAllKeys();
    } catch (e) {
      // read key error
    }
    console.log(keys);
  };

  const clearAll = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      // clear error
    }
    console.log('Done.');
  };

  const showInfo = (option) => {
    if (option === 1) {
      setTextFeedback(textFeedback_7_1);
      const payload = {
        challenge: [
          ...logs,
          {
            name: 'introducción',
            state: 'Iniciado',
            stage: '',
            time: Date.now(),
            context: 'Selección de información',
            action: 'Ver Información',
          },
        ],
      };
      db.collection('new_logs').doc(idLog).update(payload);
      setStepSeen1(true);
    } else if (option === 2) {
      setTextFeedback(textFeedback_7_2);
      const payload = {
        challenge: [
          ...logs,
          {
            name: 'introducción',
            state: 'Iniciado',
            stage: '',
            time: Date.now(),
            context: 'Elaboración de tesis',
            action: 'Ver Información',
          },
        ],
      };
      db.collection('new_logs').doc(idLog).update(payload);
      setStepSeen2(true);
    } else if (option === 3) {
      setTextFeedback(textFeedback_7_3);
      const payload = {
        challenge: [
          ...logs,
          {
            name: 'introducción',
            state: 'Iniciado',
            stage: '',
            time: Date.now(),
            context: 'Desarrollo de argumentos',
            action: 'Ver Información',
          },
        ],
      };
      db.collection('new_logs').doc(idLog).update(payload);
      setStepSeen3(true);
    } else if (option === 4) {
      setTextFeedback(textFeedback_7_4);
      const payload = {
        challenge: [
          ...logs,
          {
            name: 'introducción',
            state: 'Iniciado',
            stage: '',
            time: Date.now(),
            context: 'Desarrollo de contraargumentos',
            action: 'Ver Información',
          },
        ],
      };
      db.collection('new_logs').doc(idLog).update(payload);
      setStepSeen4(true);
    } else if (option === 5) {
      setTextFeedback(textFeedback_7_5);
      const payload = {
        challenge: [
          ...logs,
          {
            name: 'introducción',
            state: 'Iniciado',
            stage: '',
            time: Date.now(),
            context: 'Conclusión',
            action: 'Ver Información',
          },
        ],
      };
      db.collection('new_logs').doc(idLog).update(payload);
      setStepSeen5(true);
    } else {
      setTextFeedback(textFeedback_7_6);
      const payload = {
        challenge: [
          ...logs,
          {
            name: 'introducción',
            state: 'Iniciado',
            stage: '',
            time: Date.now(),
            context: 'Reconocimiento de sesgos cognitivos y heurísticas',
            action: 'Ver Información',
          },
        ],
      };
      db.collection('new_logs').doc(idLog).update(payload);
      setStepSeen6(true);
    }
    setShowModal(true);
  };

  const finish = () => {
    if (
      stepSeen1 &&
      stepSeen2 &&
      stepSeen3 &&
      stepSeen4 &&
      stepSeen5 &&
      stepSeen6
    ) {
      removeData();
      setTextFeedback(textFeedback_7_7);
      setAllStepSeen(true);
      setShowModal(true);
    } else {
      setTextFeedback('Debes visitar todos los pasos');
      setShowModal(true);
    }
  };

  const goHome = () => {
    const payload = {
      challenge: [
        ...logs,
        {
          name: 'introducción',
          state: 'Terminado',
          stage: '',
          time: Date.now(),
          context: 'Finalizó Introducción',
          action: 'Finalizar',
        },
      ],
    };
    db.collection('new_logs').doc(idLog).update(payload);
    setShowModal(false);
    navigation.navigate('home');
  };

  return (
    <View style={globalStyles.viewBody}>
      {/* <View style={globalStyles.viewContent}> */}
      <ScrollView
        contentContainerStyle={{
          paddingVertical: 10,
          marginRight: 30,
        }}>
        <Text style={globalStyles.content}>{text_1}</Text>
        <Text style={globalStyles.content2}>{textIntro_7_1_1}</Text>
        <View style={styles.viewOptions}>
          <TouchableOpacity
            onPress={() => showInfo(1)}
            style={globalStyles.touchable}>
            <Image
              style={globalStyles.icon}
              source={require('../../assets/iconos/icono-selección.png')}
              PlaceholderContent={<ActivityIndicator />}
            />
            <Text style={[globalStyles.textInfo]}>
              Selección de información
            </Text>
          </TouchableOpacity>
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
          <TouchableOpacity
            onPress={() => showInfo(3)}
            style={globalStyles.touchable}>
            <Image
              style={globalStyles.icon}
              source={require('../../assets/iconos/icono-argumentos.png')}
              PlaceholderContent={<ActivityIndicator />}
            />
            <Text style={globalStyles.textInfo}>Desarrollo de argumentos</Text>
          </TouchableOpacity>
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
          <TouchableOpacity
            onPress={() => showInfo(6)}
            style={globalStyles.touchable}>
            <Image
              style={globalStyles.icon}
              source={require('../../assets/iconos/icono-sesgo.png')}
              PlaceholderContent={<ActivityIndicator />}
            />
            <Text style={[globalStyles.textInfo, {marginRight: 60}]}>
              Reconocimiento de sesgos cognitivos y heurísticas
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={globalStyles.content}>{text_2}</Text>
      </ScrollView>
      <View style={globalStyles.viewBtns}>
        <Button
          onPress={finish}
          title="Vamos"
          buttonStyle={globalStyles.btn}
          containerStyle={globalStyles.btnContainer}
          titleStyle={globalStyles.btnText}
          // icon={<Icon name="arrow-right" size={15} color="#196674" icon />}
          // iconRight
        />
      </View>
      <Modal
        isVisible={showModal}
        setIsVisible={setShowModal}
        backPrees={!allStepSeen}>
        <View style={styles.viewModal}>
          <Text style={styles.textFeedback}>{textFeedback}</Text>
          {allStepSeen && (
            <Button
              onPress={goHome}
              title="Entendido"
              buttonStyle={globalStyles.btn}
              containerStyle={globalStyles.btnContainer}
              titleStyle={globalStyles.btnText}
            />
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  viewOptions: {
    marginLeft: 25,
    marginTop: 15,
    marginBottom: 15,
  },
  textFeedback: {
    marginVertical: 10,
  },
  overlay: {
    height: 'auto',
    width: '90%',
  },
  viewModal: {
    alignItems: 'center',
  },
});
