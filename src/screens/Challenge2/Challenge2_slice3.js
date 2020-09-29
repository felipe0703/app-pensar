import React from 'react';
import {challege2Text_3} from './challenge2text';
import ShowInfo from '../Challenge/ShowInfo';

export default function Challenge2_slice3({nextText}) {
  const allText = challege2Text_3.split('|');
  return <ShowInfo text={allText} go={nextText} />;
}
