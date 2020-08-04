import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {Button} from 'react-native-elements';
import {size, slice} from 'lodash';
import Icon from 'react-native-vector-icons/FontAwesome';
import Loading from '../../components/Loading';
import Intro from '../Intro/Intro';
import ChallengeController from '../Challenge1/ChallengeController';

import {firebaseApp} from '../../utils/firebase';
import firebase from 'firebase/app';
import 'firebase/storage';

const db = firebase.firestore(firebaseApp);

export default function ChallengeTest(props) {
  const {navigation, route} = props;
  const {id, nombre} = route.params;
  const [challenge, setChallente] = useState(null);
  const [idText, setIdText] = useState(0);
  navigation.setOptions({title: nombre}); //al actualizar el componente traer un warning

  useEffect(() => {
    db.collection('challenges')
      .doc(id)
      .get()
      .then((response) => {
        const data = response.data();
        data.id = response.id;
        setChallente(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (!challenge) return <Loading isVisible={true} text="Cargando" />;

  return (
    <View style={styles.viewBody}>
      {nombre === 'Introducción' && <Intro navigation={navigation} />}
      {nombre === 'Desafío 1' && (
        <ChallengeController navigation={navigation} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
  },

  btn: {
    marginTop: 30,
    borderRadius: 0,
    backgroundColor: '#05AFF2',
    borderTopWidth: 1,
    borderTopColor: '#e3e3e3',
    borderBottomWidth: 1,
    borderBottomColor: '#e3e3e3',
    paddingVertical: 10,
  },
  btnText: {
    color: '#fff',
    marginRight: 10,
  },
  btnContainer: {
    width: 150,
    marginHorizontal: 10,
  },
});
