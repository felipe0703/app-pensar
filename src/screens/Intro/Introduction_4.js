import React, {useContext, useEffect, useState} from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {Button, CheckBox, Image} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import {textIntro_4, textFeedback_4} from './text_Intro_1';
import Modal from '../../components/Modal';
import {usePages} from '../../hooks/usePages';
import globalStyles from '../../styles/global';
import {playSound_feedback} from '../../assets/playsound/playsound';
import {firebaseApp} from '../../utils/firebase';
import firebase from 'firebase';
import 'firebase/storage';
import {UserContext} from '../../contexts/UserContext';
import {inRange} from 'lodash';

firebase.firestore().settings({experimentalForceLongPolling: true});
const db = firebase.firestore(firebaseApp);

export default function Introduction_4({navigation}) {
  const [showModal, setShowModal] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [ready, setReady] = useState(false);
  const {state: page, nextText, backText} = usePages();
  const [infoPush, setInfoPush] = useState([]);
  const [checked_1, setChecked_1] = useState(false);
  const [checked_2, setChecked_2] = useState(false);
  const [checked_3, setChecked_3] = useState(false);
  const [checked_4, setChecked_4] = useState(false);
  const [checked_5, setChecked_5] = useState(false);
  const [checked_6, setChecked_6] = useState(false);
  const {dataUser} = useContext(UserContext);
  const [logs, setLogs] = useState([]);
  const [idLog, setIdLog] = useState('');

  const allText = textIntro_4.split('|');

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
    storeData('@page_intro', '4');
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
    const data = [
      checked_1,
      checked_2,
      checked_3,
      checked_4,
      checked_5,
      checked_6,
    ];
    storeData('@intro_4_checkeds', JSON.stringify(data));
  }, [checked_1, checked_2, checked_3, checked_4, checked_5, checked_6]);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@intro_4_checkeds');
      const data = JSON.parse(value);
      console.log(data);

      if (data !== null) {
        setChecked_1(data[0]);
        setChecked_2(data[1]);
        setChecked_3(data[2]);
        setChecked_4(data[3]);
        setChecked_5(data[4]);
        setChecked_6(data[5]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (!showNext) {
    if (
      checked_1 ||
      checked_2 ||
      checked_3 ||
      checked_4 ||
      checked_5 ||
      checked_6
    ) {
      setShowNext(true);
    }
  } else if (
    !checked_1 &&
    !checked_2 &&
    !checked_3 &&
    !checked_4 &&
    !checked_5 &&
    !checked_6
  ) {
    setShowNext(false);
  }

  const resp = () => {
    setShowModal(true);
    playSound_feedback();
    nextText();
    // pushInfo();
    setReady(true);
  };

  const setCheckeds = (checked) => {
    if (checked === '1') {
      setChecked_1(!checked_1);
    } else if (checked === '2') {
      setChecked_2(!checked_2);
    } else if (checked === '3') {
      setChecked_3(!checked_3);
    } else if (checked === '4') {
      setChecked_4(!checked_4);
    } else if (checked === '5') {
      setChecked_5(!checked_5);
    } else if (checked === '6') {
      setChecked_6(!checked_6);
    }
  };

  // todo: MERJORAR
  const pushInfo = () => {
    if (checked_1) {
      console.log('check1');
      setInfoPush('sgadas');
      console.log(infoPush);
    }
    if (checked_2) {
      setInfoPush([...infoPush, 'Nuevas']);
    }
    if (checked_3) {
      setInfoPush([...infoPush, 'Graciosas']);
    }
    if (checked_4) {
      setInfoPush([...infoPush, 'Conmovedoras']);
    }
    if (checked_5) {
      setInfoPush([...infoPush, 'Visualmente impactantes']);
    }
    if (checked_6) {
      setInfoPush([...infoPush, 'Que se repiten']);
    }

    const payload = {
      challenge: [
        ...logs,
        {
          name: 'introducción',
          state: 'Iniciado',
          stage: '',
          time: Date.now(),
          context: infoPush,
          action: 'Si',
        },
      ],
    };
    db.collection('new_logs').doc(idLog).update(payload);
  };

  const goNext = () => {
    navigation.navigate('introduction_5');
  };

  return (
    <View style={globalStyles.viewBody}>
      {/* <ScrollView style={globalStyles.viewContent}> */}
      <ScrollView contentContainerStyle={styles.viewContent}>
        <Text style={globalStyles.content}>{allText[page]}</Text>
        {!ready && (
          <View style={globalStyles.viewOptions}>
            <CheckBox
              title="Extrañas"
              // checkedIcon="dot-circle-o"
              // uncheckedIcon="circle-o"
              checked={checked_1}
              onPress={() => setCheckeds('1')}
            />
            <CheckBox
              title="Nuevas"
              checked={checked_2}
              onPress={() => setCheckeds('2')}
            />
            <CheckBox
              title="Graciosas"
              checked={checked_3}
              onPress={() => setCheckeds('3')}
            />
            <CheckBox
              title="Conmovedoras"
              checked={checked_4}
              onPress={() => setCheckeds('4')}
            />
            <CheckBox
              title="Visualmente impactantes"
              checked={checked_5}
              onPress={() => setCheckeds('5')}
            />
            <CheckBox
              title="Que se repiten"
              checked={checked_6}
              onPress={() => setCheckeds('6')}
            />
          </View>
        )}
      </ScrollView>
      <View style={globalStyles.viewBtns}>
        {showNext && !ready && (
          <Button
            onPress={resp}
            title="Listo"
            icon={<Icon name="thumbs-o-up" size={15} color="#196674" />}
            buttonStyle={globalStyles.btn}
            containerStyle={globalStyles.btnContainer}
            titleStyle={globalStyles.btnText}
          />
        )}
        {ready && (
          <Button
            onPress={goNext}
            title="Siguiente"
            icon={<Icon name="arrow-right" size={15} color="#196674" />}
            buttonStyle={globalStyles.btn}
            containerStyle={globalStyles.btnContainer}
            titleStyle={globalStyles.btnText}
            iconRight
          />
        )}
      </View>
      <Modal isVisible={showModal} setIsVisible={setShowModal}>
        <View style={globalStyles.correct}>
          <Image
            style={globalStyles.brain}
            source={require('../../assets/img/cerebrito/cerebro-like.png')}
            PlaceholderContent={<ActivityIndicator />}
          />
          <Text style={globalStyles.textFeedback}>{textFeedback_4}</Text>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  viewContent: {
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
});
