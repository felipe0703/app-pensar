import React, {useContext, useEffect, useState} from 'react';
import {View, Text, ScrollView, ActivityIndicator} from 'react-native';
import {Button, CheckBox, Image} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import {
  challengeText_16_1,
  challengeText_16_2,
  challengeText_16_3,
  challengeText_16_4,
} from './challengeText';
import globalStyles from '../../styles/global';
import {ChallengeContext} from '../../contexts/ChallengeContext';
import {firebaseApp} from '../../utils/firebase';
import firebase from 'firebase';
import 'firebase/storage';

firebase.firestore().settings({experimentalForceLongPolling: true});
const db = firebase.firestore(firebaseApp);

export default function Challenge16({previousText, nextText, navigation}) {
  const [showNext, setShowNext] = useState(false);
  const [checkedConclusion1, setCheckedConclusion1] = useState(false);
  const [checkedConclusion2, setCheckedConclusion2] = useState(false);
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
    storeData('@page_challenge_1', '16');
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
      const value = await AsyncStorage.getItem(
        '@challenge_1_slice16_conclusion',
      );
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
    navigation.setParams({name: 'Conclusión', progress: 0.84});
  }, []);

  const resp = (conclusion) => {
    storeData('@challenge_1_slice16_conclusion', JSON.stringify(conclusion));
    if (conclusion === 1) {
      setChallenge({...challenge, conclusion: challengeText_16_3});
      setCheckedConclusion1(true);
      setCheckedConclusion2(false);
    } else if (conclusion === 2) {
      setChallenge({...challenge, conclusion: challengeText_16_4});
      setCheckedConclusion1(false);
      setCheckedConclusion2(true);
    }
    setShowNext(true);
  };

  const pushInfo = () => {
    const payload = {
      challenge: [
        ...logs,
        {
          name: 'desafío 1',
          state: 'Iniciado',
          stage: 'Conclusión',
          time: Date.now(),
          context: 'Conclusión',
          action: challenge.conclusion,
        },
      ],
    };
    db.collection('new_logs').doc(idLog).update(payload);
    nextText();
  };

  return (
    <View style={globalStyles.viewBody}>
      <ScrollView
        contentContainerStyle={{
          paddingVertical: 10,
          marginLeft: 20,
          marginRight: 30,
        }}>
        <View style={{alignItems: 'center'}}>
          <Image
            style={globalStyles.icon}
            source={require('../../assets/iconos/icono-conclusión.png')}
            PlaceholderContent={<ActivityIndicator />}
          />
        </View>
        <Text style={[globalStyles.title, {paddingTop: 10}]}>
          {challengeText_16_1}
        </Text>
        <Text style={globalStyles.content}>{challengeText_16_2}</Text>
        <View style={globalStyles.viewOptions}>
          <CheckBox
            title={challengeText_16_3}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={checkedConclusion1}
            // checkedColor="red"
            onPress={() => resp(1)}
          />
          <CheckBox
            title={challengeText_16_4}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={checkedConclusion2}
            onPress={() => resp(2)}
          />
        </View>
      </ScrollView>
      <View style={globalStyles.viewBtns}>
        {showNext && idLog !== '' && (
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
    </View>
  );
}
