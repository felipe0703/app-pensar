import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import ShowInfo from '../Challenge/ShowInfo';
import {textIntro_5} from './text_Intro_1';

export default function Introduction_3({navigation}) {
  const allText = textIntro_5.split('|');

  useEffect(() => {
    storeData('5');
  }, []);

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@page_intro', value);
    } catch (err) {
      console.log(err);
    }
  };

  const goNext = () => {
    navigation.navigate('introduction_6');
  };

  return <ShowInfo text={allText} go={goNext} />;
}
