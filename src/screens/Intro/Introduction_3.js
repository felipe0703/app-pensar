import React, {useState, useEffect, useContext} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import ShowInfo from '../Challenge/ShowInfo';
import {textIntro_3, textLearMore} from './text_Intro_1';
import {UserContext} from '../../contexts/UserContext';

export default function Introduction_3({navigation}) {
  const [userInfo, setUserInfo] = useState(null);
  const textWithName = textIntro_3.replace('[]', userInfo);
  const allText = textWithName.split('|');
  const {dataUser} = useContext(UserContext);

  useEffect(() => {
    setUserInfo(dataUser.nameUser);
  }, []);

  useEffect(() => {
    storeData('3');
  }, []);

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@page_intro', value);
    } catch (err) {
      console.log(err);
    }
  };

  const goNext = () => {
    navigation.navigate('introduction_4');
  };

  return (
    <ShowInfo
      text={allText}
      go={goNext}
      isVisibleLearnMore={true}
      learnMore={textLearMore}
      previousText={() => navigation.goBack()}
      showPrevious={true}
    />
  );
}
