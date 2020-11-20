import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import ShowInfo from '../Challenge/ShowInfo';
import {challengeText_13} from './challengeText';

export default function Challenge13({nextText}) {
  const textIntro = challengeText_13.split('|');

  useEffect(() => {
    storeData('@page_challenge_1', '13');
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
