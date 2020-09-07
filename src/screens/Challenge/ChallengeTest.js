import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Loading from '../../components/Loading';

import {firebaseApp} from '../../utils/firebase';
import firebase from 'firebase/app';
import 'firebase/storage';
import Introduction from '../Intro/Introduction_1';
import Challenge1Text from '../Challenge1/Challenge1Text';
import ThesisAlternative from '../Challenge1/ThesisAlternative';

const db = firebase.firestore(firebaseApp);

export default function ChallengeTest({navigation, route}) {
  const {id, name} = route.params;
  const [challenge, setChallente] = useState(null);
  console.log(challenge);
  // navigation.setOptions({title: name}); //al actualizar el componente traer un warning
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

  if (!challenge && id !== 0)
    return <Loading isVisible={true} text="Cargando" />;

  return (
    <View style={styles.viewBody}>
      {name === 'Desafío 1' && (
        <Challenge1Text challenge={challenge} navigation={navigation} />
      )}
      {name !== 'Desafío 1' && (
        <ThesisAlternative challenge={challenge} navigation={navigation} />
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
