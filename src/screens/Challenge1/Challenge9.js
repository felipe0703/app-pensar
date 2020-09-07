import React, {useState, useEffect} from 'react';
import * as firebase from 'firebase';

import ShowInfo from '../Challenge/ShowInfo';
import {challengeText_9} from './challengeText';

export default function Challenge9({nextText}) {
  const [userInfo, setUserInfo] = useState(null);
  const textWithName = challengeText_9.replace('[]', userInfo);
  const textIntro = textWithName.split('|');

  useEffect(() => {
    (async () => {
      const user = await firebase.auth().currentUser;
      setUserInfo(user.displayName);
    })();
  }, []);

  return <ShowInfo text={textIntro} go={nextText} />;
}
