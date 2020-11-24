import React, {useState, useEffect, useContext} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import ShowInfo from '../Challenge/ShowInfo';
import {challengeText_9} from './challengeText';
import {UserContext} from '../../contexts/UserContext';

export default function Challenge9({previousText, nextText, navigation}) {
  const [userInfo, setUserInfo] = useState(null);
  const {dataUser} = useContext(UserContext);
  const textWithName = challengeText_9.replace('[]', userInfo);
  const textIntro = textWithName.split('|');

  useEffect(() => {
    setUserInfo(dataUser.nameUser);
  }, []);

  useEffect(() => {
    navigation.setParams({name: 'Selección', progress: 0.28});
  }, []);

  useEffect(() => {
    storeData('@page_challenge_1', '9');
  }, []);

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ShowInfo
      text={textIntro}
      go={nextText}
      previousText={previousText}
      showPrevious={true}
    />
  );
}
