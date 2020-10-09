import React from 'react';
import ShowInfo from '../Challenge/ShowInfo';
import {challege2Text_10} from './challenge2text';

export default function Challenge2_slice10({nextText}) {
  const allText = challege2Text_10.split('|');

  return <ShowInfo text={allText} go={nextText} showBrain={true} />;
}
