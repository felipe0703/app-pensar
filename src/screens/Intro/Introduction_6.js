import React, {useEffect, useState} from 'react';
import {Text, View, ActivityIndicator} from 'react-native';
import {Button, CheckBox, Image} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import {
  textIntro_6,
  textFeedback_6_1,
  textFeedback_6_2,
  textFeedback_6_3,
  textFeedback_6_4,
} from './text_Intro_1';
import Modal from '../../components/Modal';
import {usePages} from '../../hooks/usePages';
import globalStyles from '../../styles/global';
import {playSound_incorrect} from '../../assets/playsound/playsound';

export default function Introduction_4({navigation}) {
  const [showModal, setShowModal] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [ready, setReady] = useState(false);
  const {state: page, nextText, backText} = usePages();
  const [checked_1, setChecked_1] = useState(false);
  const [checked_2, setChecked_2] = useState(false);
  const [checked_3, setChecked_3] = useState(false);
  const [checked_4, setChecked_4] = useState(false);

  const allText = textIntro_6.split('|');

  useEffect(() => {
    storeData('@page_intro', '6');
    getData();
  }, []);

  useEffect(() => {
    const data = [checked_1, checked_2, checked_3, checked_4];
    storeData('@intro_6_checkeds', JSON.stringify(data));
  }, [checked_1, checked_2, checked_3, checked_4]);

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (err) {
      console.log(err);
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@intro_6_checkeds');
      const data = JSON.parse(value);
      console.log(data);
      if (data !== null) {
        setChecked_1(data[0]);
        setChecked_2(data[1]);
        setChecked_3(data[2]);
        setChecked_4(data[3]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const setCheckeds = (checked) => {
    if (checked === '1') {
      setChecked_1(!checked_1);
      setChecked_4(false);
    } else if (checked === '2') {
      setChecked_2(!checked_2);
      setChecked_4(false);
    } else if (checked === '3') {
      setChecked_3(!checked_3);
      setChecked_4(false);
    } else if (checked === '4') {
      setChecked_1(false);
      setChecked_2(false);
      setChecked_3(false);
      setChecked_4(!checked_4);
    }
  };

  if (!showNext) {
    if (checked_1 || checked_2 || checked_3 || checked_4) {
      setShowNext(true);
    }
  } else if (!checked_1 && !checked_2 && !checked_3 && !checked_4) {
    setShowNext(false);
  }

  const resp = () => {
    playSound_incorrect();
    setShowModal(true);
    nextText();
    setReady(true);
  };

  const goNext = () => {
    navigation.navigate('introduction_7');
  };

  return (
    <View style={globalStyles.viewBody}>
      <View style={globalStyles.viewContent}>
        <Text style={globalStyles.content}>{allText[page]}</Text>
        {!ready && (
          <View style={globalStyles.viewOptions}>
            <CheckBox
              title="Una crítica"
              // checkedIcon="dot-circle-o"
              // uncheckedIcon="circle-o"
              checked={checked_1}
              onPress={() => setCheckeds('1')}
            />
            <CheckBox
              title="Un juicio de valor sobre lo bueno y lo malo"
              checked={checked_2}
              onPress={() => setCheckeds('2')}
            />
            <CheckBox
              title="Algo puramente teórico"
              checked={checked_3}
              onPress={() => setCheckeds('3')}
            />
            <CheckBox
              title="Ninguna de las anteriores"
              checked={checked_4}
              onPress={() => setCheckeds('4')}
            />
          </View>
        )}
      </View>
      <View style={globalStyles.viewBtns}>
        {showNext && !ready && (
          <Button
            onPress={resp}
            title="Listo"
            icon={<Icon name="thumbs-o-up" size={15} color="#196674" />}
            buttonStyle={globalStyles.btn}
            containerStyle={globalStyles.btnContainer}
            titleStyle={globalStyles.btnText}
          />
        )}
        {ready && (
          <Button
            onPress={goNext}
            title="Siguiente"
            icon={<Icon name="arrow-right" size={15} color="#196674" />}
            buttonStyle={globalStyles.btn}
            containerStyle={globalStyles.btnContainer}
            titleStyle={globalStyles.btnText}
            iconRight
          />
        )}
      </View>
      <Modal isVisible={showModal} setIsVisible={setShowModal}>
        <View style={checked_4 ? globalStyles.correct : globalStyles.incorrect}>
          <Image
            style={globalStyles.brain}
            source={require('../../assets/img/cerebrito/cerebro-dudando.png')}
            PlaceholderContent={<ActivityIndicator />}
          />
          {checked_1 && (
            <Text style={globalStyles.options}>{textFeedback_6_1}</Text>
          )}
          {checked_2 && (
            <Text style={globalStyles.options}>{textFeedback_6_2}</Text>
          )}
          {checked_3 && (
            <Text style={globalStyles.options}>{textFeedback_6_3}</Text>
          )}
          {checked_4 && (
            <Text style={globalStyles.options}>{textFeedback_6_4}</Text>
          )}
        </View>
      </Modal>
    </View>
  );
}
