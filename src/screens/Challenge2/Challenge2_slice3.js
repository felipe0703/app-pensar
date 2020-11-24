import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {challege2Text_3} from './challenge2text';
import ShowInfo from '../Challenge/ShowInfo';

export default function Challenge2_slice3({previousText, nextText}) {
  const allText = challege2Text_3.split('|');

  useEffect(() => {
    storeData('@page_challenge_2', '3');
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
      text={allText}
      go={nextText}
      previousText={previousText}
      showPrevious={true}
    />
  );
}
