import React from 'react';
import ShowInfo from '../Challenge/ShowInfo';
import {textIntro_5} from './text_Intro_1';

export default function Introduction_3({navigation}) {
  const allText = textIntro_5.split('|');

  const goNext = () => {
    navigation.navigate('introduction_6');
  };

  return <ShowInfo text={allText} go={goNext} />;
}
