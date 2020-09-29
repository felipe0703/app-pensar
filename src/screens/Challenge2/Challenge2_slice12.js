import React from 'react';
import ShowInfo from '../Challenge/ShowInfo';
import {challege2Text_12} from './challenge2text';

export default function Challenge2_slice12({navigation}) {
  const allText = challege2Text_12.split('|');

  const goTrivia = () => {
    navigation.navigate('trivia', {challenge: 2});
  };

  return <ShowInfo text={allText} go={goTrivia} textButton="Listo" />;
}
