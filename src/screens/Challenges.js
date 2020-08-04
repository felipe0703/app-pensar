import React, {useEffect, useState, useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {firebaseApp} from '../utils/firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';

import ListChallenges from '../components/Challenges/ListChallenges';

firebase.firestore().settings({experimentalForceLongPolling: true});
const db = firebase.firestore(firebaseApp);

export default function Challenges() {
  const [challenges, setChallenges] = useState([]);
  const [totalChallenges, setTotalChallenges] = useState(0);
  const [startChallenges, setStartChallenges] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const limitChallenges = 5;

  useFocusEffect(
    useCallback(() => {
      db.collection('challenges')
        .get()
        .then((snap) => {
          setTotalChallenges(snap.size);
        });
      const resultChallenges = [];
      db.collection('challenges')
        .orderBy('nombre', 'desc')
        .limit(limitChallenges)
        .get()
        .then((response) => {
          setStartChallenges(response.docs[response.docs.length - 1]);
          response.forEach((doc) => {
            const challenge = doc.data();
            challenge.id = doc.id;
            resultChallenges.push(challenge);
          });
          setChallenges(resultChallenges);
        });
    }, []),
  );

  const handleLoadMore = () => {
    const resultChallenges = [];
    challenges.length < totalChallenges && setIsLoading(true);
    db.collection('challenges')
      .orderBy('nombre', 'desc')
      .startAfter(startChallenges.data().nombre)
      .limit(limitChallenges)
      .get()
      .then((response) => {
        if (response.docs.length > 0) {
          setStartChallenges(response.docs[response.docs.length - 1]);
        } else {
          setIsLoading(false);
        }

        response.forEach((doc) => {
          const challenge = doc.data();
          challenge.id = doc.id;
          resultChallenges.push(challenge);
        });
        setChallenges([...challenges, ...resultChallenges]);
      });
  };

  return (
    <View style={styles.viewBody}>
      <ListChallenges
        challenges={challenges}
        handleLoadMore={handleLoadMore}
        isLoading={isLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
