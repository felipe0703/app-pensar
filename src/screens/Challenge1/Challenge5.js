import React, {useEffect} from 'react';
import ShowInfo from '../Challenge/ShowInfo';
import {challengeText_5} from './challengeText';

export default function Challenge5(props) {
  const {nextText, navigation} = props;

  const textIntro = challengeText_5.split('|');

  useEffect(() => {
    navigation.setParams({name: 'Selección', progress: 0.28});
  }, []);

  return <ShowInfo text={textIntro} go={nextText} />;
}
