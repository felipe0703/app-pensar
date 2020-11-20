import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import ShowInfo from '../Challenge/ShowInfo';
import {challengeText_11} from './challengeText';

export default function Challenge11({nextText}) {
  const textIntro = challengeText_11.split('|');

  useEffect(() => {
    storeData('@page_challenge_1', '11');
  }, []);

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (err) {
      console.log(err);
    }
  };

  return <ShowInfo text={textIntro} go={nextText} />;
}
