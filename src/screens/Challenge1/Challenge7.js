import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Button, Card} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import Modal from '../../components/Modal';
import {
  challengeText_7,
  textFeedback_7_1,
  textFeedback_7_2,
  textFeedback_7_3,
  textFeedback_7_4,
} from './challengeText';
import globalStyles from '../../styles/global';
import {
  playSound_correct,
  playSound_incorrect,
} from '../../assets/playsound/playsound';
import {firebaseApp} from '../../utils/firebase';
import firebase from 'firebase';
import 'firebase/storage';

firebase.firestore().settings({experimentalForceLongPolling: true});
const db = firebase.firestore(firebaseApp);

export default function Challenge7({nextText}) {
  const [showModal, setShowModal] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [response, setResponse] = useState(false);
  const [backPress, setBackPress] = useState(false);
  const [pageFeedback, setPageFeedback] = useState(0);
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
    storeData('@page_challenge_1', '7');
  }, []);

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (err) {
      console.log(err);
    }
  };

  const resp = (response) => {
    setShowModal(true);
    if (!response) {
      playSound_correct();
    } else {
      playSound_incorrect();
    }
    setResponse(response);
    setShowNext(true);

    const payload = {
      challenge: [
        ...logs,
        {
          name: 'desafío 1',
          state: 'Iniciado',
          stage: 'Selección',
          time: Date.now(),
          context: '¿Cómo evaluarías esta información? imagen 2',
          action: response,
        },
      ],
    };
    db.collection('new_logs').doc(idLog).update(payload);
  };

  const nextPageFeedback = () => {
    setBackPress(true);
    setPageFeedback(pageFeedback + 1);
  };
  return (
    <View style={globalStyles.viewBody}>
      <View style={globalStyles.viewContent}>
        <Text style={globalStyles.content}>{challengeText_7}</Text>
        <Card
          image={require('../../assets/img/Selects/img5.png')}
          imageStyle={globalStyles.cardImage}></Card>
      </View>
      <View style={globalStyles.viewBtns}>
        {!showNext ? (
          <>
            <Button
              onPress={() => resp(true)}
              title="Verdadero"
              icon={<Icon name="thumbs-o-up" size={15} color="#196674" />}
              buttonStyle={globalStyles.btn}
              containerStyle={globalStyles.btnContainer}
              titleStyle={globalStyles.btnText}
            />
            <Button
              onPress={() => resp(false)}
              title="Falso"
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
            title="Siguiente"
            type="solid"
            icon={<Icon name="arrow-right" size={15} color="#196674" />}
            iconRight
            buttonStyle={globalStyles.btn}
            titleStyle={globalStyles.btnText}
            containerStyle={globalStyles.btnContainer}
            onPress={nextText}
          />
        )}
      </View>
      <Modal
        isVisible={showModal}
        setIsVisible={setShowModal}
        backPrees={backPress}>
        <View style={!response ? globalStyles.correct : globalStyles.incorrect}>
          {pageFeedback === 0 ? (
            <>
              <Text style={styles.textFeedback}>
                {!response ? textFeedback_7_1 : textFeedback_7_2}
              </Text>
              <Text style={styles.textFeedback}>{textFeedback_7_3}</Text>
              <View style={{alignItems: 'center'}}>
                <Button
                  title="Continuar"
                  type="solid"
                  icon={<Icon name="arrow-right" size={15} color="#196674" />}
                  iconRight
                  buttonStyle={globalStyles.btn}
                  titleStyle={globalStyles.btnText}
                  containerStyle={globalStyles.btnContainer}
                  onPress={nextPageFeedback}
                />
              </View>
            </>
          ) : (
            <Text style={styles.textFeedback2}>{textFeedback_7_4}</Text>
          )}
        </View>
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
    fontWeight: 'bold',
    textAlign: 'auto',
    marginHorizontal: 10,
    marginVertical: 5,
  },
});
