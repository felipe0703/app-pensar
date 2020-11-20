import React, {useRef, useState, useEffect, useContext} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Button} from 'react-native-elements';
import Toast from 'react-native-easy-toast';
import {firebaseApp} from '../../utils/firebase';
import * as firebase from 'firebase';

import Loading from '../../components/Loading';
import UserInfo from '../../components/Account/InfoUser';
import AccountOptions from '../../components/Account/AccountOptions';
import {UserContext} from '../../contexts/UserContext';

firebase.firestore().settings({experimentalForceLongPolling: true});
const db = firebase.firestore(firebaseApp);

export default function UserLogged() {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  const [reloadUserInfo, setReloadUserInfo] = useState(false);
  const toastRef = useRef();
  const {dataUser} = useContext(UserContext);

  useEffect(() => {
    (async () => {
      const user = await firebase.auth().currentUser;
      setUserInfo(user);
    })();
    setReloadUserInfo(false);
  }, [reloadUserInfo]);

  const signOutSession = () => {
    // const payload = {
    //   idUser: dataUser.idUser,
    //   nameUser: dataUser.nameUser,
    //   email: dataUser.email,
    //   challenge: '',
    //   time: Date.now(),
    //   context: 'Cerro sesión',
    //   action: 'logout',
    // };

    // db.collection('logs')
    //   .add(payload)
    //   .then(() => {
    //     console.log('data subida');
    //     firebase.auth().signOut();
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    firebase.auth().signOut();
  };

  return (
    <View style={styles.viewUserInfo}>
      {userInfo && <UserInfo userInfo={userInfo} />}

      <AccountOptions
        userInfo={userInfo}
        toastRef={toastRef}
        setReloadUserInfo={setReloadUserInfo}
      />
      <Button
        title="Cerrar sesión"
        buttonStyle={styles.btnCloseSession}
        titleStyle={styles.btnCloseSessionText}
        onPress={signOutSession}
      />
      <Toast ref={toastRef} position="center" opacity={0.9} />
      <Loading text={loadingText} isVisible={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  viewUserInfo: {
    minHeight: '100%',
    backgroundColor: '#196674',
  },
  btnCloseSession: {
    marginTop: 30,
    borderRadius: 0,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e3e3e3',
    borderBottomWidth: 1,
    borderBottomColor: '#e3e3e3',
    paddingVertical: 10,
  },
  btnCloseSessionText: {
    color: '#196674',
  },
});
