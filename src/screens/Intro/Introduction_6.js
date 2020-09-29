import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {Button, CheckBox, ListItem} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  textIntro_6,
  textFeedback_6_1,
  textFeedback_6_2,
  textFeedback_6_3,
} from './text_Intro_1';
import Modal from '../../components/Modal';
import {usePages} from '../../hooks/usePages';
import globalStyles from '../../styles/global';

export default function Introduction_4({navigation}) {
  const [showModal, setShowModal] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [ready, setReady] = useState(false);
  const {state: page, nextText, backText} = usePages();
  const [checked_1, setChecked_1] = useState(false);
  const [checked_2, setChecked_2] = useState(false);
  const [checked_3, setChecked_3] = useState(false);

  const allText = textIntro_6.split('|');

  if (!showNext) {
    if (checked_1 || checked_2 || checked_3) {
      setShowNext(true);
    }
  } else if (!checked_1 && !checked_2 && !checked_3) {
    setShowNext(false);
  }

  const resp = () => {
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
              onPress={() => setChecked_1(!checked_1)}
            />
            <CheckBox
              title="Un juicio de valor sobre lo bueno y lo malo"
              checked={checked_2}
              onPress={() => setChecked_2(!checked_2)}
            />
            <CheckBox
              title="Algo puramente teórico"
              checked={checked_3}
              onPress={() => setChecked_3(!checked_3)}
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
        {checked_1 && (
          <Text style={globalStyles.options}>{textFeedback_6_1}</Text>
        )}
        {checked_2 && (
          <Text style={globalStyles.options}>{textFeedback_6_2}</Text>
        )}
        {checked_3 && (
          <Text style={globalStyles.options}>{textFeedback_6_3}</Text>
        )}
      </Modal>
    </View>
  );
}
