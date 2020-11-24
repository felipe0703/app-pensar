import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import {Button, CheckBox, Image} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import {
  challengeText_10_1,
  challengeText_10_2,
  challengeText_10_3,
  challengeText_10_4,
  textFeedback_10,
} from './challengeText';
import Modal from '../../components/Modal';
import globalStyles from '../../styles/global';
import {ChallengeContext} from '../../contexts/ChallengeContext';
import {playSound_feedback} from '../../assets/playsound/playsound';

import {firebaseApp} from '../../utils/firebase';
import firebase from 'firebase';
import 'firebase/storage';

firebase.firestore().settings({experimentalForceLongPolling: true});
const db = firebase.firestore(firebaseApp);

export default function Challenge10({
  previousText,
  nextText,
  setThesis,
  navigation,
}) {
  const [showModal, setShowModal] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [allowShowNext, setAllowShowNext] = useState(false);
  const [checkedThesis1, setCheckedThesis1] = useState(false);
  const [checkedThesis2, setCheckedThesis2] = useState(false);
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
    storeData('@page_challenge_1', '10');
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
      const value = await AsyncStorage.getItem('@challenge_1_slice10_thesis');
      if (value !== null) {
        if (value === '1') {
          resp(1);
        } else if (value === '2') {
          resp(2);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    navigation.setParams({name: 'Tesis', progress: 0.42});
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setShowModal(true);
      playSound_feedback();
      setAllowShowNext(true);
    }, 500);
  }, []);

  const resp = (thesis) => {
    storeData('@challenge_1_slice10_thesis', JSON.stringify(thesis));
    if (thesis === 1) {
      setChallenge({...challenge, thesis: challengeText_10_3});
      setCheckedThesis1(true);
      setCheckedThesis2(false);
    } else if (thesis === 2) {
      setChallenge({...challenge, thesis: challengeText_10_4});
      setCheckedThesis1(false);
      setCheckedThesis2(true);
    }

    setThesis(thesis);
    if (allowShowNext) {
      setShowNext(true);
    }
  };

  const pushInfo = () => {
    const payload = {
      challenge: [
        ...logs,
        {
          name: 'desafío 1',
          state: 'Iniciado',
          stage: 'Tesis',
          time: Date.now(),
          context: 'Tesis',
          action: challenge.thesis,
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
          source={require('../../assets/iconos/icono-tesis.png')}
          PlaceholderContent={<ActivityIndicator />}
        />
        <Text style={[globalStyles.title, {paddingTop: 10}]}>
          {challengeText_10_1}
        </Text>
        <Text style={globalStyles.content}>{challengeText_10_2}</Text>
        <View style={globalStyles.viewOptions}>
          <CheckBox
            title={challengeText_10_3}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={checkedThesis1}
            // checkedColor="red"
            onPress={() => resp(1)}
          />
          <CheckBox
            title={challengeText_10_4}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={checkedThesis2}
            onPress={() => resp(2)}
          />
        </View>
      </View>
      <View style={globalStyles.viewBtns}>
        {showNext && (
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

      <Modal isVisible={showModal} setIsVisible={setShowModal}>
        <View style={globalStyles.modalFeedback}>
          <Image
            style={globalStyles.brain}
            source={require('../../assets/img/cerebrito/cerebro-rosado.png')}
            PlaceholderContent={<ActivityIndicator />}
          />
          <Text style={styles.textFeedback}>{textFeedback_10}</Text>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  touchable: {
    backgroundColor: '#fff',
    marginVertical: 10,
    width: 350,
    padding: 10,
    borderRadius: 8,
  },
  textFeedback: {
    marginVertical: 10,
  },
});
