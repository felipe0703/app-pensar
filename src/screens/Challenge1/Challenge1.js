import React, {useContext, useEffect} from 'react';
import {ChallengeContext} from '../../navigations/ChallengeContext';
import ShowInfo from '../Challenge/ShowInfo';
import {challengeText_1} from './challengeText';

export default function Challenge1({nextText}) {
  const textIntro = challengeText_1.split('|');

  const {setChallenge} = useContext(ChallengeContext);

  useEffect(() => {
    setChallenge({
      id: 1,
      challenge: 'desafío 1',
    });
  }, []);

  return <ShowInfo text={textIntro} go={nextText} />;
}
