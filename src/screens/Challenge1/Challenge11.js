import React from 'react';
import ShowInfo from '../Challenge/ShowInfo';
import {challengeText_11} from './challengeText';

export default function Challenge11({nextText}) {
  const textIntro = challengeText_11.split('|');

  return <ShowInfo text={textIntro} go={nextText} />;
}
