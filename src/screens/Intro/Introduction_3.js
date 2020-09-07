import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import * as firebase from 'firebase';
import ShowInfo from '../Challenge/ShowInfo';
import {textIntro_3, textLearMore} from './text_Intro_1';

export default function Introduction_3({navigation}) {
  const [userInfo, setUserInfo] = useState(null);
  const textWithName = textIntro_3.replace('[]', userInfo);
  const allText = textWithName.split('|');
  useEffect(() => {
    (async () => {
      const user = await firebase.auth().currentUser;
      setUserInfo(user.displayName);
    })();
  }, []);

  const goNext = () => {
    navigation.navigate('introduction_4');
  };

  return (
    <ShowInfo
      text={allText}
      go={goNext}
      isVisibleLearnMore={true}
      learnMore={textLearMore}
      pageToLearMore={1}
    />
  );
}

const styles = StyleSheet.create({});
