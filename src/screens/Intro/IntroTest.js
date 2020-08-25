import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {textIntro} from './textIntro';
import * as firebase from 'firebase';
import ShowInfo from '../Challenge/ShowInfo';
import ChangeDisplayNameForm from '../../components/Account/ChangeDisplayNameForm';
import Modal from '../../components/Modal';

export default function IntroTest({navigation}) {
  const [userInfo, setUserInfo] = useState(null);
  const [reloadUserInfo, setReloadUserInfo] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const textWithName = textIntro.replace('[]', userInfo);
  const allText = textWithName.split('.');

  useEffect(() => {
    (async () => {
      const user = await firebase.auth().currentUser;
      setUserInfo(user.displayName);
    })();
  }, [reloadUserInfo]);

  const goChallenge = () => {
    navigation.navigate('home');
  };

  return (
    <>
      {userInfo ? (
        <ShowInfo text={allText} go={goChallenge} />
      ) : (
        <Modal isVisible={showModal} setIsVisible={setShowModal}>
          <ChangeDisplayNameForm
            displayName={userInfo}
            setShowModal={setShowModal}
            setReloadUserInfo={setReloadUserInfo}
          />
        </Modal>
      )}
    </>
  );
}

const styles = StyleSheet.create({});
