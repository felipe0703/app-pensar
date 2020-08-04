import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  View,
  Text,
  Button,
  YellowBox,
  LogBox,
} from 'react-native';

import Navigation from './src/navigations/Navigation';
import Auth from './src/screens/Account/Auth';

import {firebaseApp} from './src/utils/firebase';
import 'firebase/auth';

//YellowBox.ignoreWarnings(['Setting a timer']);
LogBox.ignoreLogs(['Setting a timer']);

export default function App() {
  const [user, setUser] = useState(undefined);

  //si quiero probar el loading comento el useEffect
  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged((response) => {
      setUser(response);
    });
  }, []);

  if (user === undefined) return null;

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        {user ? <Navigation /> : <Auth />}
      </SafeAreaView>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#196674',
    height: '100%',
  },
});
