import React from 'react';
import ShowInfo from '../Challenge/ShowInfo';
import {challege2Text_9} from './challenge2text';

export default function Challenge2_slice9({nextText}) {
  const allText = challege2Text_9.split('|');

  return <ShowInfo text={allText} go={nextText} showBrain={true} />;
}
