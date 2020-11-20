import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import ShowInfo from '../Challenge/ShowInfo';
import {challege2Text_10} from './challenge2text';

export default function Challenge2_slice10({nextText}) {
  const allText = challege2Text_10.split('|');

  useEffect(() => {
    storeData('@page_challenge_2', '10');
  }, []);

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ShowInfo text={allText} go={nextText} showBrain={true} showLike={true} />
  );
}
