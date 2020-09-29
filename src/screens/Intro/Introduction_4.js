import React, {useState} from 'react';
import {Text, View, ActivityIndicator} from 'react-native';
import {Button, CheckBox, Image} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {textIntro_4, textFeedback_4} from './text_Intro_1';
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
  const [checked_4, setChecked_4] = useState(false);
  const [checked_5, setChecked_5] = useState(false);
  const [checked_6, setChecked_6] = useState(false);

  const allText = textIntro_4.split('|');

  if (!showNext) {
    if (
      checked_1 ||
      checked_2 ||
      checked_3 ||
      checked_4 ||
      checked_5 ||
      checked_6
    ) {
      setShowNext(true);
    }
  } else if (
    !checked_1 &&
    !checked_2 &&
    !checked_3 &&
    !checked_4 &&
    !checked_5 &&
    !checked_6
  ) {
    setShowNext(false);
  }

  const resp = () => {
    setShowModal(true);
    nextText();
    setReady(true);
  };

  const goNext = () => {
    navigation.navigate('introduction_5');
  };

  return (
    <View style={globalStyles.viewBody}>
      <View style={globalStyles.viewContent}>
        <Text style={globalStyles.content}>{allText[page]}</Text>
        {!ready && (
          <View style={globalStyles.viewOptions}>
            <CheckBox
              title="Extrañas"
              // checkedIcon="dot-circle-o"
              // uncheckedIcon="circle-o"
              checked={checked_1}
              onPress={() => setChecked_1(!checked_1)}
            />
            <CheckBox
              title="Nuevas"
              checked={checked_2}
              onPress={() => setChecked_2(!checked_2)}
            />
            <CheckBox
              title="Graciosas"
              checked={checked_3}
              onPress={() => setChecked_3(!checked_3)}
            />
            <CheckBox
              title="Conmovedoras"
              checked={checked_4}
              onPress={() => setChecked_4(!checked_4)}
            />
            <CheckBox
              title="Visualmente impactantes"
              checked={checked_5}
              onPress={() => setChecked_5(!checked_5)}
            />
            <CheckBox
              title="Que se repiten"
              checked={checked_6}
              onPress={() => setChecked_6(!checked_6)}
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
        <View style={globalStyles.correct}>
          <Image
            style={globalStyles.brain}
            source={require('../../assets/img/cerebrito/cerebro-rosado.png')}
            PlaceholderContent={<ActivityIndicator />}
          />
          <Text style={globalStyles.textFeedback}>{textFeedback_4}</Text>
        </View>
      </Modal>
    </View>
  );
}
