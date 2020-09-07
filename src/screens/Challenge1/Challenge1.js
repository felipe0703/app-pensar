import React from 'react';
import ShowInfo from '../Challenge/ShowInfo';
import {challengeText_1} from './challengeText';

export default function Challenge1({nextText}) {
  const textIntro = challengeText_1.split('|');

  return <ShowInfo text={textIntro} go={nextText} />;
}
