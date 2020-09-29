import React, {useEffect, useState, useCallback} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {firebaseApp} from '../utils/firebase';
import firebase from 'firebase';
import 'firebase/storage';
import Carousel from '../components/Carousel';
import Thesis from './Challenge1/ThesisAlternative';

firebase.firestore().settings({experimentalForceLongPolling: true});
const db = firebase.firestore(firebaseApp);

export default function Home(props) {
  const {navigation} = props;
  const [challenges, setChallenges] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const resultChallenges = [];

      db.collection('challenges')
        .orderBy('order', 'desc')
        .get()
        .then((response) => {
          response.forEach((doc) => {
            const challenge = doc.data();

            challenge.id = doc.id;
            // challenge.status && resultChallenges.push(challenge);
            resultChallenges.push(challenge);
          });
          setChallenges(resultChallenges);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []),
  );

  return (
    <View style={styles.viewBody}>
      <Text style={styles.title}>Elige tu desafío</Text>
      {challenges ? (
        <Carousel arrayChallenges={challenges} navigation={navigation} />
      ) : (
        <Text>NO hay</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
  },
  title: {
    marginTop: 50,
    marginBottom: 50,
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'DINRoundPro',
    textAlign: 'center',
  },
});
