import React, {useEffect, useState} from 'react';
import * as firebase from 'firebase';

import ShowInfo from '../Challenge/ShowInfo';
import {challege2Text_1} from './challenge2text';
import globalStyles from '../../styles/global';

export default function Challenge2_slice1({nextText}) {
  const [userInfo, setUserInfo] = useState(null);
  const textWithName = challege2Text_1.replace('[]', userInfo);
  const allText = textWithName.split('|');

  useEffect(() => {
    (async () => {
      const user = await firebase.auth().currentUser;
      setUserInfo(user.displayName);
    })();
  }, []);

  return <ShowInfo text={allText} go={nextText} showBrain={true} />;
}
