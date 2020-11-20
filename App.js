import React, {useEffect, useState} from 'react';
import {StyleSheet, SafeAreaView, StatusBar, LogBox} from 'react-native';

import Navigation from './src/navigations/Navigation';
import Auth from './src/screens/Account/Auth';
import {firebaseApp} from './src/utils/firebase';
import firebase from 'firebase';
import 'firebase/storage';
import 'firebase/auth';

firebase.firestore().settings({experimentalForceLongPolling: true});
const db = firebase.firestore(firebaseApp);

import {UserContext} from './src/contexts/UserContext';

//YellowBox.ignoreWarnings(['Setting a timer']);
LogBox.ignoreLogs(
  ['Setting a timer'],
  ['Warning: AsyncStorage has been extracted from react-native core'],
);

export default function App() {
  const [user, setUser] = useState(undefined);
  const [dataUser, setDataUser] = useState({});

  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged((response) => {
      setUser(response);
      if (response) {
        // db.collection('new_logs')
        //   .where('idUser', '==', firebaseApp.auth().currentUser.uid)
        //   .get()
        //   .then((response) => {
        //     const data = response.docs.map((doc) => {
        //       return doc.id;
        //     });
        //     setIdLog(data[0]);
        //   });
        setDataUser({
          idUser: firebaseApp.auth().currentUser.uid,
          nameUser: firebaseApp.auth().currentUser.displayName,
          email: firebaseApp.auth().currentUser.email,
        });
      }
    });
  }, []);

  if (user === undefined) return null;

  return (
    <>
      <StatusBar barStyle="light-content" />
      <UserContext.Provider value={{dataUser, setDataUser}}>
        <SafeAreaView style={styles.container}>
          {user ? <Navigation /> : <Auth />}
        </SafeAreaView>
      </UserContext.Provider>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#196674',
    height: '100%',
  },
});
