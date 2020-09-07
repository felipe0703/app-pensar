import React from 'react';
import ShowInfo from '../Challenge/ShowInfo';
import {challengeText_13} from './challengeText';

export default function Challenge13({nextText}) {
  const textIntro = challengeText_13.split('|');

  return <ShowInfo text={textIntro} go={nextText} />;
}
