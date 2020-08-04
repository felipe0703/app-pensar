import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Carousel from '../components/Carousel';
import {firebaseApp} from '../utils/firebase';
import firebase from 'firebase/app';
import 'firebase/storage';

firebase.firestore().settings({experimentalForceLongPolling: true});
const db = firebase.firestore(firebaseApp);

export default function Home(props) {
  const {navigation} = props;
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    const resultChallenges = [];
    db.collection('challenges')
      .orderBy('nombre', 'desc')
      .get()
      .then((response) => {
        response.forEach((doc) => {
          const challenge = doc.data();
          challenge.id = doc.id;
          resultChallenges.push(challenge);
        });
        setChallenges(resultChallenges);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <View style={styles.viewBody}>
      <Text style={styles.title}>Elige tu desafío</Text>
      <Carousel arrayChallenges={challenges} navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
  },
  title: {
    marginTop: 60,
    marginBottom: 60,
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'DINRoundPro',
    textAlign: 'center',
  },
});
