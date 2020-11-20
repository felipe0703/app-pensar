import React, {useContext} from 'react';
import {firebaseApp} from '../utils/firebase';
import firebase from 'firebase';
import 'firebase/storage';

firebase.firestore().settings({experimentalForceLongPolling: true});
const db = firebase.firestore(firebaseApp);

export const pushLogs = async ({
  idUser,
  nameUser,
  email,
  challenge,
  context,
  action,
}) => {
  console.log(idUser);
  const payload = {
    idUser: idUser,
    nameUser: nameUser,
    email: email,
    time: Date.now(),
    challenge: challenge,
    context: context,
    action: action,
  };

  await db
    .collection('logs')
    .add(payload)
    .then(() => {
      console.log('data subida');
    })
    .catch((err) => {
      console.log(err);
    });
};
