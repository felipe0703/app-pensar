import React from 'react';
import ShowInfo from '../Challenge/ShowInfo';
import {challengeText_5} from './challengeText';

export default function Challenge5({nextText}) {
  const textIntro = challengeText_5.split('|');

  return <ShowInfo text={textIntro} go={nextText} />;
}
