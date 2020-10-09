import React, {useContext, useEffect, useState} from 'react';
import * as firebase from 'firebase';

import ShowInfo from '../Challenge/ShowInfo';
import {challege2Text_1} from './challenge2text';
import {ChallengeContext} from '../../navigations/ChallengeContext';

export default function Challenge2_slice1({nextText}) {
  const [userInfo, setUserInfo] = useState(null);
  const textWithName = challege2Text_1.replace('[]', userInfo);
  const allText = textWithName.split('|');
  const {setChallenge} = useContext(ChallengeContext);

  useEffect(() => {
    (async () => {
      const user = await firebase.auth().currentUser;
      setUserInfo(user.displayName);
    })();
  }, []);

  useEffect(() => {
    setChallenge({
      id: 2,
      challenge: 'desafío 2',
    });
  }, []);

  return <ShowInfo text={allText} go={nextText} showBrain={true} />;
}
