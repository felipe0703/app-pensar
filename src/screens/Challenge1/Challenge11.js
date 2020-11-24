import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import ShowInfo from '../Challenge/ShowInfo';
import {challengeText_11} from './challengeText';

export default function Challenge11({previousText, nextText, navigation}) {
  const textIntro = challengeText_11.split('|');

  useEffect(() => {
    storeData('@page_challenge_1', '11');
  }, []);

  useEffect(() => {
    navigation.setParams({name: 'Tesis', progress: 0.42});
  }, []);

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ShowInfo
      text={textIntro}
      go={nextText}
      previousText={previousText}
      showPrevious={true}
    />
  );
}
