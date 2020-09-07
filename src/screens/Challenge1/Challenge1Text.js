import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {challengeText} from './challengeText';
import * as firebase from 'firebase';
import ShowInfo from '../Challenge/ShowInfo';

export default function Challenge1Text({navigation, challenge}) {
  const [userInfo, setUserInfo] = useState(null);
  //trabajo del texto estatico
  const textWithName = challengeText.replace('[]', userInfo);
  const text = textWithName.split('##');
  const textIntro = text[0].split('|');
  const textContent = text.slice(1, text.length - 1);
  const textFinish = text[text.length - 1].split('.');
  const textChallenge1 = [...textIntro, ...textContent, ...textFinish];

  useEffect(() => {
    (async () => {
      const user = await firebase.auth().currentUser;
      setUserInfo(user.displayName);
    })();
  }, []);

  const goChallenge = () => {
    navigation.navigate('thesis', {challenge});
  };

  return <ShowInfo text={textChallenge1} go={goChallenge} />;
}

const styles = StyleSheet.create({});
