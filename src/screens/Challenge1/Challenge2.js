import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import {Button, Image} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {firebaseApp} from '../../utils/firebase';
import firebase from 'firebase';
import 'firebase/storage';

import AsyncStorage from '@react-native-community/async-storage';

import {
  challengeText_2,
  challengeText_2_1,
  textFeedback_2_1,
  textFeedback_2_2,
  textFeedback_2_3,
  textFeedback_2_4,
  textFeedback_2_5,
  textFeedback_2_6,
} from './challengeText';
import Modal from '../../components/Modal';
import globalStyles from '../../styles/global';

firebase.firestore().settings({experimentalForceLongPolling: true});
const db = firebase.firestore(firebaseApp);

export default function Challenge2({previousText, nextText}) {
  const [showModal, setShowModal] = useState(false);
  const [textFeedback, setTextFeedback] = useState('');
  const [thinker, setThinker] = useState(0);
  const [logs, setLogs] = useState([]);
  const [idLog, setIdLog] = useState('');

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
  }, [showModal]);

  useEffect(() => {
    storeData('@page_challenge_1', '2');
  }, []);

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (isMounted.current) {
      if (idLog !== '') {
        if (thinker === 1) {
          const payload = {
            challenge: [
              ...logs,
              {
                name: 'desafío 1',
                state: 'Iniciado',
                stage: '',
                time: Date.now(),
                context: 'Martin Luther King Jr.',
                action: 'Ver pensador',
              },
            ],
          };
          db.collection('new_logs').doc(idLog).update(payload);
        } else if (thinker === 2) {
          const payload = {
            challenge: [
              ...logs,
              {
                name: 'desafío 1',
                state: 'Iniciado',
                stage: '',
                time: Date.now(),
                context: 'Simone de Beauvoir',
                action: 'Ver pensador',
              },
            ],
          };
          db.collection('new_logs').doc(idLog).update(payload);
        } else if (thinker === 3) {
          const payload = {
            challenge: [
              ...logs,
              {
                name: 'desafío 1',
                state: 'Iniciado',
                stage: '',
                time: Date.now(),
                context: 'Elena Caffarena',
                action: 'Ver pensador',
              },
            ],
          };
          db.collection('new_logs').doc(idLog).update(payload);
        } else if (thinker === 4) {
          const payload = {
            challenge: [
              ...logs,
              {
                name: 'desafío 1',
                state: 'Iniciado',
                stage: '',
                time: Date.now(),
                context: 'Camilo Henríquez',
                action: 'Ver pensador',
              },
            ],
          };
          db.collection('new_logs').doc(idLog).update(payload);
        } else if (thinker === 5) {
          const payload = {
            challenge: [
              ...logs,
              {
                name: 'desafío 1',
                state: 'Iniciado',
                stage: '',
                time: Date.now(),
                context: 'Marie Curie',
                action: 'Ver pensador',
              },
            ],
          };
          db.collection('new_logs').doc(idLog).update(payload);
        } else if (thinker === 6) {
          const payload = {
            challenge: [
              ...logs,
              {
                name: 'desafío 1',
                state: 'Iniciado',
                stage: '',
                time: Date.now(),
                context: 'Bertrand Rusell',
                action: 'Ver pensador',
              },
            ],
          };
          db.collection('new_logs').doc(idLog).update(payload);
        }
      }
    }
  }, [thinker, idLog]);

  const showInfo = (option) => {
    if (option === 1) {
      setTextFeedback(textFeedback_2_1);
      setThinker(1);
    } else if (option === 2) {
      setTextFeedback(textFeedback_2_2);
      setThinker(2);
    } else if (option === 3) {
      setTextFeedback(textFeedback_2_3);
      setThinker(3);
    } else if (option === 4) {
      setTextFeedback(textFeedback_2_4);
      setThinker(4);
    } else if (option === 5) {
      setTextFeedback(textFeedback_2_5);
      setThinker(5);
    } else if (option === 6) {
      setTextFeedback(textFeedback_2_6);
      setThinker(6);
    }
    setShowModal(true);
  };

  return (
    <View style={globalStyles.viewBody}>
      <View style={globalStyles.viewContent}>
        <Text style={globalStyles.content}>{challengeText_2}</Text>
        <Text style={globalStyles.content2}>{challengeText_2_1}</Text>
        <View style={styles.viewOptions}>
          <TouchableOpacity
            onPress={() => showInfo(1)}
            style={globalStyles.touchable}>
            <Text style={{fontSize: 16, color: '#fff'}}>
              1.{' '}
              <Text style={globalStyles.textInfo}>Martin Luther King Jr.</Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => showInfo(2)}
            style={globalStyles.touchable}>
            <Text style={{fontSize: 16, color: '#fff'}}>
              2. <Text style={globalStyles.textInfo}>Simone de Beauvoir</Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => showInfo(3)}
            style={globalStyles.touchable}>
            <Text style={{fontSize: 16, color: '#fff'}}>
              3. <Text style={globalStyles.textInfo}>Elena Caffarena</Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => showInfo(4)}
            style={globalStyles.touchable}>
            <Text style={{fontSize: 16, color: '#fff'}}>
              4. <Text style={globalStyles.textInfo}>Camilo Henríquez</Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => showInfo(5)}
            style={globalStyles.touchable}>
            <Text style={{fontSize: 16, color: '#fff'}}>
              5. <Text style={globalStyles.textInfo}>Marie Curie</Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => showInfo(6)}
            style={globalStyles.touchable}>
            <Text style={{fontSize: 16, color: '#fff'}}>
              6. <Text style={globalStyles.textInfo}>Bertrand Rusell</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={globalStyles.viewBtns}>
        <Button
          onPress={previousText}
          title="Anterior"
          buttonStyle={globalStyles.btn}
          containerStyle={globalStyles.btnContainer}
          titleStyle={globalStyles.btnText}
          icon={<Icon name="arrow-left" size={15} color="#196674" icon />}
        />
        <Button
          onPress={nextText}
          title="Siguiente"
          buttonStyle={globalStyles.btn}
          containerStyle={globalStyles.btnContainer}
          titleStyle={globalStyles.btnText}
          icon={<Icon name="arrow-right" size={15} color="#196674" icon />}
          iconRight
        />
      </View>

      <Modal
        isVisible={showModal}
        setIsVisible={setShowModal}
        withPadding={true}>
        <ImageBackground
          source={require('../../assets/img/Pergamino.jpg')}
          style={styles.background}>
          <View style={globalStyles.modalFeedback}>
            {thinker === 1 ? (
              <Image
                style={styles.img}
                source={require('../../assets/img/pensadores/martin-luther-king-jr.jpg')}
                PlaceholderContent={<ActivityIndicator />}
                containerStyle={styles.containerImg}
              />
            ) : thinker === 2 ? (
              <Image
                style={styles.img}
                source={require('../../assets/img/pensadores/Simone-de-Beauvoir.jpg')}
                PlaceholderContent={<ActivityIndicator />}
                containerStyle={styles.containerImg}
              />
            ) : thinker === 3 ? (
              <Image
                style={styles.img}
                source={require('../../assets/img/pensadores/elena-caffarena.jpg')}
                PlaceholderContent={<ActivityIndicator />}
                containerStyle={styles.containerImg}
              />
            ) : thinker === 4 ? (
              <Image
                style={styles.img}
                source={require('../../assets/img/pensadores/camilo-henriquez.jpg')}
                PlaceholderContent={<ActivityIndicator />}
                containerStyle={styles.containerImg}
              />
            ) : thinker === 5 ? (
              <Image
                style={styles.img}
                source={require('../../assets/img/pensadores/Marie_Curie.jpg')}
                PlaceholderContent={<ActivityIndicator />}
                containerStyle={styles.containerImg}
              />
            ) : (
              <Image
                style={styles.img}
                source={require('../../assets/img/pensadores/Bertrand_Russell.jpg')}
                PlaceholderContent={<ActivityIndicator />}
                containerStyle={styles.containerImg}
              />
            )}

            <Text style={styles.textFeedback}>{textFeedback}</Text>
          </View>
        </ImageBackground>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  containerImg: {
    borderRadius: 50,
    width: 100,
    marginTop: 10,
  },
  img: {
    height: 100,
    width: 100,
  },
  background: {
    // flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    height: 'auto',
    width: '100%',
  },
  textFeedback: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  viewOptions: {
    marginLeft: 15,
    marginVertical: 20,
  },
});
